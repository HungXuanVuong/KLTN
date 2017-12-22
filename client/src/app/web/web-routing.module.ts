import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';

import { WebComponent } from './web.component';
const routes: Routes = [
    { 
        path: '', component: WebComponent,
        
        // path: '', loadChildren: './home/home.module#HomeModule',
        children: [
            { path: '', redirectTo: 'home'},
            { path: 'home', loadChildren: './home/home.module#HomeModule'},
            { path: 'chitiettin', loadChildren: './chitiettin/chitiettin.module#ChitiettinModule'},
            { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
            { path: 'formgioithieu', loadChildren: './formgioithieu/formgioithieu.module#FormgioithieuModule'},
            { path: 'shopping', loadChildren: './shopping/shopping.module#ShoppingModule'},
            { path: 'jobdashboard', loadChildren: './jobdashboad/jobdashboard.module#JobdashboadModule'},
            { path: 'giohang', loadChildren: './giohang/giohang.module#GiohangModule'},
            { path: 'giaohang', loadChildren: './giaohang/giaohang.module#GiaohangModule'}
            
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WebRoutingModule {}