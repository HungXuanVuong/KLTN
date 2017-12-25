import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormproductComponent } from './formproduct.component';
const routes: Routes = [
    { 
        path: '', component: FormproductComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormproductRoutingModule {}