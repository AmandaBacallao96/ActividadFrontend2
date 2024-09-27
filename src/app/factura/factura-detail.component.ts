import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-factura-detail',
  template: `
    <h1 mat-dialog-title>Detalle de la Factura</h1>
    <div mat-dialog-content>
      <p><strong>Código:</strong> {{data.factura.codigo_factura}}</p>
      <p><strong>DNI:</strong> {{data.factura.dni}}</p>
      <p><strong>IVA:</strong> {{data.factura.iva ? 'Sí' : 'No'}}</p>
      <p><strong>IRPF:</strong> {{data.factura.irpf ? 'Sí' : 'No'}}</p>
      <p><strong>Pagado:</strong> {{data.factura.pagado ? 'Sí' : 'No'}}</p>
      <p><strong>RE:</strong> {{data.factura.re ? 'Sí' : 'No'}}</p>
      <p><strong>Rectificativa:</strong> {{data.factura.rectificativa ? 'Sí' : 'No'}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClose()">Cerrar</button>
    </div>
  `,
  styles: [`
    mat-dialog-content {
      font-size: 16px;
      margin-bottom: 20px;
    }
    mat-dialog-title {
      font-size: 18px;
      margin-bottom: 10px;
    }
    mat-dialog-actions {
      text-align: right;
    }
  `]
})
export class FacturaDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<FacturaDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
