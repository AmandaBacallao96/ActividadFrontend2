import { Routes } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { NotFoundComponent } from './enrutamiento/not-found/not-found.component';
import { ServicioComponent } from './servicio/servicio.component';
import { ContratoComponent } from './contrato/contrato.component';
import { FacturaComponent } from './factura/factura.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { VentasComponent } from './ventas/ventas.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'usuarios',
        component: UsuarioComponent,

    },
    {
        path: 'contrato',
        component: ContratoComponent,
    },
    {
        path: 'factura',
        component: FacturaComponent,
    },
    {
        path: 'servicios',
        component: ServicioComponent,
    },
    {
        path: 'clientes',
        component: EmpresaComponent,
    },
    {
        path: 'ventas',
        component: VentasComponent,
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
