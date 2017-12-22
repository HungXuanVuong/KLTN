import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
const routes: Routes = [
    {
    //    path: '', component: AppComponent
        path: '', loadChildren: './web/web.module#WebModule'
    },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule'},
    { path: 'web', loadChildren: './web/web.module#WebModule'},
    { path: 'login', loadChildren: './login/login.module#LoginModule'},
    { path: 'register', loadChildren: './register/register.module#RegisterModule'},
    { path: 'notfound', loadChildren: './notfound/notfound.module#NotfoundModule'},
    { path: '**', redirectTo: 'notfound'}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}