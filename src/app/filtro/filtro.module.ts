import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FiltroComponent } from './filtro.component';

@NgModule({
  declarations: [FiltroComponent],  // Declaramos FiltroComponent
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [FiltroComponent]  // Exportamos FiltroComponent para usarlo en otros módulos
})
export class FiltroModule { }
