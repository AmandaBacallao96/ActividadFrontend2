
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Componentes de la aplicación
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FacturaComponent } from './factura/factura.component';
import { VentasComponent } from './ventas/ventas.component';

@NgModule({
  declarations: [
    AppComponent,
    FacturaComponent,
    LoginComponent,
    VentasComponent  // Declarar VentasComponent en AppModule
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'ventas', component: VentasComponent }
    ])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
