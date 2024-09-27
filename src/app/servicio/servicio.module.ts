import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';  // Si estás utilizando formularios o campos de entrada
import { ServicioComponent } from './servicio.component';
import { FiltroModule } from '../filtro/filtro.module';  // Cambiar a FiltroModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';  // Si usas pestañas



@NgModule({
  declarations: [
    ServicioComponent  // Declaramos ServicioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,  // Importar MatInputModule si usas <mat-form-field> y <input>
    FiltroModule  // Importamos el FiltroModule para usar FiltroComponent
  ]
})
export class ServicioModule { }
