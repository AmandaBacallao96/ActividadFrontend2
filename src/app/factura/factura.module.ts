import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura.component'; // Declaramos FacturaComponent
import { FormsModule } from '@angular/forms'; // Si usas formularios
import { MatIconModule } from '@angular/material/icon'; // Para los iconos
import { MatButtonModule } from '@angular/material/button'; // Para los botones
import { MatTableModule } from '@angular/material/table'; // Si usas tablas
import { MatToolbarModule } from '@angular/material/toolbar'; // Para las toolbars
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Para el spinner
import { FiltroModule } from '../filtro/filtro.module'; // Importamos FiltroModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs'; // Si usas pestañas
import { MatDialogModule } from '@angular/material/dialog'; // Importa MatDialogModule
import { FacturaDetailComponent } from './factura-detail.component'; // Importamos el componente del modal

@NgModule({
  declarations: [
    FacturaComponent,
    FacturaDetailComponent // Declaramos FacturaDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    FiltroModule,
    MatDialogModule // Importamos MatDialogModule para el modal
  ],
  entryComponents: [FacturaDetailComponent] // Añadimos FacturaDetailComponent a entryComponents
})
export class FacturaModule { }
