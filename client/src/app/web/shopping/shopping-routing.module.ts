import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
const routes: Routes = [
    { 
        path: '', component: ShoppingComponent,
        children: [
            { path: '', redirectTo: 'tatca'},
            { path: 'tatca', loadChildren: './noel/noel.module#NoelModule'},
            { path: 'loaiqua/:id', loadChildren: './gau/gau.module#GauModule'},
            { path: 'chitietsp/:id', loadChildren: './chitietsp/chitietsp.module#ChitietspModule'},
            { path: 'xacnhanhoadon', loadChildren: './checkorder/checkorder.module#CheckorderModule'}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingRoutingModule {}