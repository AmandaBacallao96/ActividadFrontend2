import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaComponent } from './empresa.component';
import { MatToolbarModule } from '@angular/material/toolbar';  // Importa MatToolbarModule para la toolbar
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';  // Si usas pestañas
import { FormsModule } from '@angular/forms';
import { FiltroModule } from '../filtro/filtro.module';  // Si usas FiltroComponent

@NgModule({
  declarations: [
    EmpresaComponent  // Declaramos EmpresaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,  // Asegúrate de que MatToolbarModule esté aquí
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatTabsModule,
    FiltroModule  // Si usas FiltroComponent
  ]
})
export class EmpresaModule { }
