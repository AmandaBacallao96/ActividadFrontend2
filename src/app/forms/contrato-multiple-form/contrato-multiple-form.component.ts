import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GestionService } from '../../gestion.service';
import { ModalService } from '../modal/modal.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { v4 as uuid4 } from 'uuid';
import { ContratoControlHorario } from '../../models/contratocontrolhorario.model';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ContratoMultiple } from '../../models/contratomultiple.model';

const MATIRIAL_MODULES = [MatLabel, MatFormField, MatInput, MatDialogModule, MatButtonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule];

@Component({
  selector: 'app-contrato-form',
  standalone: true,
  imports: [MATIRIAL_MODULES, ReactiveFormsModule],
  templateUrl: './contrato-multiple-form.component.html',
  styleUrls: ['./contrato-multiple-form.component.scss'],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContratoMultipleFormComponent implements OnInit {
  contratoForm!: FormGroup;

  private readonly _fb = inject(FormBuilder);
  private readonly _matDialog = inject(MAT_DIALOG_DATA);
  private _snackBar = inject(MatSnackBar);
  private readonly _service = inject(GestionService);
  private readonly _modalService = inject(ModalService);
  private crearContratoMultiple = false;
  date: Date = new Date();

  ngOnInit(): void {
    this._buildForm();

    if (this._matDialog.data) {
      this.contratoForm.patchValue({
        precio: this._matDialog.data.precio,
        estado: this._matDialog.data.estado.toString(),
        dni: this._matDialog.data.dni,
        fecha: this._matDialog.data.fecha
      });

      // Convertir la fecha a formato adecuado
      const fechaFormateada = this._matDialog.data.fecha.replace(' ', 'T');
      this.date = new Date(fechaFormateada);
    } else {
      this.date = new Date();
    }
  }

  onSubmit(): void {
    console.log('Enviando formulario de Contrato Múltiple...');
    const contrato = this.contratoForm.value;

    if (!this.contratoForm.valid) {
      console.error('Formulario no válido. Verifica los campos obligatorios.');
      this.openSnackBar('Formulario no válido. Revisa los campos obligatorios.', 'Cerrar');
      return;
    }

    if (this._matDialog.isEditing) {
      // Actualizar contrato existente
      console.log('Actualizando contrato existente...');
      this._service.update('contrato', this._matDialog.data.id_contrato, contrato).subscribe(
        (response) => {
          console.log('Contrato actualizado exitosamente.');
          this.openSnackBar('Contrato actualizado exitosamente', 'Aceptar');
          this.updateContratoMultiple();
        },
        (error) => {
          console.error('Error al actualizar el contrato:', error);
          this.openSnackBar('Error al actualizar el contrato', 'Cerrar');
        }
      );
    } else {
      // Crear nuevo contrato
      console.log('Creando nuevo contrato...');
      contrato.id_contrato = uuid4();
      this._service.create('contrato', contrato).subscribe(
        (response) => {
          console.log('Contrato creado exitosamente.');
          this.openSnackBar('Contrato creado exitosamente', 'Aceptar');
          this.crearContratoMultiple = true;
          this.createContratoMultiple(contrato.id_contrato);
        },
        (error) => {
          console.error('Error al crear el contrato:', error);
          this.openSnackBar('Error al crear el contrato', 'Cerrar');
        }
      );
    }
  }

  private createContratoMultiple(id_contrato: string) {
    if (this.crearContratoMultiple) {
      let contrato_multiple = new ContratoMultiple(uuid4(), this.contratoForm.value.fecha, id_contrato);
      this._service.create('contrato_multiple', contrato_multiple).subscribe(
        (response) => {
          if (response.status === 200) {
            console.log('Contrato múltiple creado exitosamente.');
            this.openSnackBar('Contrato múltiple creado exitosamente', 'Aceptar');
          }
        },
        (error) => {
          console.error('Error al crear el contrato múltiple:', error);
          this.openSnackBar('Error al crear el contrato múltiple', 'Cerrar');
        }
      );
    }
  }

  private updateContratoMultiple() {
    let contrato_multiple = new ContratoMultiple(this._matDialog.data.id_contrato_multiple, this.contratoForm.value.fecha, this._matDialog.data.id_contrato);
    this._service.update('contrato_multiple', this._matDialog.data.id_contrato_multiple, contrato_multiple).subscribe(
      (response) => {
        if (response.status === 200) {
          console.log('Contrato múltiple actualizado exitosamente.');
          this.openSnackBar('Contrato múltiple actualizado exitosamente', 'Aceptar');
        }
      },
      (error) => {
        console.error('Error al actualizar el contrato múltiple:', error);
        this.openSnackBar('Error al actualizar el contrato múltiple', 'Cerrar');
      }
    );
  }

  getTitle(): string {
    return this._matDialog.data ? 'Actualizar' : 'Agregar';
  }

  private _buildForm(): void {
    this.contratoForm = this._fb.nonNullable.group({
      precio: ['', Validators.required],
      estado: [null, [Validators.required, Validators.pattern('^[01]$')]],
      dni: ['', Validators.required],
      fecha: ['', Validators.required],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
