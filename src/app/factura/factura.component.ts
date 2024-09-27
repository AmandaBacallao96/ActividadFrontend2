import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { GestionService } from '../gestion.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FacturaFormComponent } from '../forms/factura-form/factura-form.component';
import { Factura } from '../models/factura.model';
import { DownloadFacturaServiceService } from '../file/download-factura-service.service';
import { ModalService } from '../forms/modal/modal.service';
import { NgxPrintModule } from 'ngx-print';
import { NgxPrintService } from 'ngx-print';
import { DownloadFacturaComponent } from "../file/download-factura/download-factura.component";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FacturaDetailComponent } from './factura-detail.component';
import { HttpClient } from '@angular/common/http';  // Importa HttpClient para las llamadas HTTP

const MATIRIAL_MODULES = [
  MatIconModule,
  MatDividerModule,
  MatButtonModule,
  MatTableModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
];

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [MATIRIAL_MODULES, CommonModule, FacturaFormComponent, NgxPrintModule, DownloadFacturaComponent],
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['code', 'dni', 'iva', 'irpf', 'pagado', 'rectificativa', 're', 'actions'];
  dataSource: Factura[] = [];

  facturas: Factura[] = [];
  filteredFacturas: Factura[] = [];
  searchQuery: string = '';
  revision: boolean = false;

  constructor(
    private facturasService: GestionService,
    public dialog: MatDialog,
    private pdfService: DownloadFacturaServiceService,
    private printService: NgxPrintService,
    private http: HttpClient // Añadido HttpClient para enviar la factura
  ) {}

  ngOnInit(): void {
    this.fetchFacturas();
  }

  fetchFacturas(): void {
    this.facturasService.getAll('facturas').subscribe((response) => {
      console.log(response.data.items); // Verifica el formato de la respuesta
      this.facturas = response.data.items; // Acceder al array dentro de 'items'
      this.filteredFacturas = response.data.items; // Filtrado sobre el mismo array
      this.dataSource = response.data.items;
      this.revision = true;
    });
  }

  // Ver Factura
  verFactura(id: string): void {
    // Encuentra la factura correspondiente en el array `dataSource`
    const facturaSeleccionada = this.dataSource.find((factura: any) => factura.codigo_factura === id);
  
    if (facturaSeleccionada) {
      // Abrir un modal con el componente de detalle de la factura
      this.dialog.open(FacturaDetailComponent, {
        width: '600px',
        data: { factura: facturaSeleccionada } // Pasar la factura seleccionada al componente del modal
      });
    } else {
      console.error('Factura no encontrada para el ID proporcionado:', id);
    }
  };

  private readonly _modalService = inject(ModalService);

  /// Método para abrir el modal para crear
  crearFactura(): void {
    this._modalService.openModal<FacturaFormComponent, Factura>(FacturaFormComponent);
  }

  // Método para abrir el modal y actualizar
  actualizarFactura(factura: Factura): void {
    this._modalService.openModal<FacturaFormComponent, Factura>(FacturaFormComponent, factura, true);
  }

  deleteFactura(id: string): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar esta Factura?');

    if (confirmation) {
      this.facturasService.delete('facturas', id).subscribe(
        (response) => {
          console.log(response);
          this.fetchFacturas();
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  @ViewChild('otherContent', { static: false }) otherContent: ElementRef | undefined;

  ngAfterViewInit() {
    // Verifica que `otherContent` está definido
    if (this.otherContent) {
      console.log(this.otherContent.nativeElement.innerHTML); // Acceso al contenido del otro componente
    }
  }

  @ViewChild('contentToExport', { static: false }) contentToExport!: ElementRef;

  // Método para imprimir sin utilizar imágenes, solo texto
  imprimir(id: string) {
    // Encuentra la factura correspondiente en el array `dataSource`
    const facturaSeleccionada = this.dataSource.find((factura: any) => factura.codigo_factura === id);

    if (facturaSeleccionada) {
      // Crear una nueva instancia de jsPDF
      const pdf = new jsPDF();

      // Definir un margen y posición inicial
      let yPosition = 10;
      const marginLeft = 20;

      // Añadir el título de la factura
      pdf.setFontSize(18);
      pdf.text('Factura Detallada', marginLeft, yPosition);
      yPosition += 10;

      // Añadir contenido de la factura seleccionada
      pdf.setFontSize(12);
      pdf.text(`Código: ${facturaSeleccionada.codigo_factura}`, marginLeft, yPosition);
      yPosition += 10;
      pdf.text(`DNI: ${facturaSeleccionada.dni}`, marginLeft, yPosition);
      yPosition += 10;
      pdf.text(`IVA: ${facturaSeleccionada.iva ? 'Sí' : 'No'}`, marginLeft, yPosition);
      yPosition += 10;
      pdf.text(`IRPF: ${facturaSeleccionada.irpf ? 'Sí' : 'No'}`, marginLeft, yPosition);
      yPosition += 10;
      pdf.text(`Pagado: ${facturaSeleccionada.pagado ? 'Sí' : 'No'}`, marginLeft, yPosition);
      yPosition += 10;
      pdf.text(`RE: ${facturaSeleccionada.re ? 'Sí' : 'No'}`, marginLeft, yPosition);
      yPosition += 10;
      pdf.text(`Rectificativa: ${facturaSeleccionada.rectificativa ? 'Sí' : 'No'}`, marginLeft, yPosition);

      // Guardar el PDF con el nombre de la factura
      pdf.save('factura-' + id + '.pdf');
    } else {
      console.error('Factura no encontrada para el ID proporcionado:', id);
    }
  }

  enviarFactura(id: string): void {
    // Encuentra la factura correspondiente en el array `dataSource`
    const facturaSeleccionada = this.dataSource.find((factura: any) => factura.codigo_factura === id);

    if (facturaSeleccionada) {
      // Suponiendo que hay un endpoint en el backend para enviar la factura por correo
      const url = 'https://tudominio.com/api/enviar-factura';
      
      // Crear el payload con la información de la factura a enviar
      const payload = {
        facturaId: facturaSeleccionada.codigo_factura,
        email: 'correo@ejemplo.com' // Usar el campo email de la factura o un valor predeterminado
      };

      // Realizar la petición HTTP para enviar la factura
      this.http.post(url, payload).subscribe({
        next: (response) => {
          console.log('Factura enviada con éxito', response);
          alert('Factura enviada con éxito');
        },
        error: (error) => {
          console.error('Error al enviar la factura', error);
          alert('Hubo un error al enviar la factura');
        }
      });
    } else {
      console.error('Factura no encontrada para el ID proporcionado:', id);
    }
  }
}
