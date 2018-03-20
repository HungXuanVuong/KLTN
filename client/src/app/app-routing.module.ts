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
    { path: 'register1', loadChildren: './register1/register1.module#Register1Module'},
    { path: 'forgotpassword', loadChildren: './fogotpassword/fogotpassword.module#FogotpasswordModule'},
    { path: 'redirectpage', loadChildren: './redirectpage/redirectpage.module#RedirectpageModule'},
    { path: 'notfound', loadChildren: './notfound/notfound.module#NotfoundModule'},
    { path: '**', redirectTo: 'notfound'}
    
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}