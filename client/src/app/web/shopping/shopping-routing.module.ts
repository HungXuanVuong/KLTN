import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
const routes: Routes = [
    { 
        path: '', component: ShoppingComponent,
        children: [
            { path: '', redirectTo: 'noel'},
            { path: 'noel', loadChildren: './noel/noel.module#NoelModule'},
            { path: 'gau', loadChildren: './gau/gau.module#GauModule'},
            { path: 'chitietsp', loadChildren: './chitietsp/chitietsp.module#ChitietspModule'}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ShoppingRoutingModule {}