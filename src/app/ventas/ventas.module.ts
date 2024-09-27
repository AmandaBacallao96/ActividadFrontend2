
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VentasComponent } from './ventas.component';
import { PruebaComponent } from './prueba.component';  // Importar el componente de prueba

@NgModule({
  declarations: [
    VentasComponent,
    PruebaComponent  // Declarar el componente de prueba
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VentasComponent,
    PruebaComponent  // Asegurar que PruebaComponent se exporta
  ]
})
export class VentasModule {}
