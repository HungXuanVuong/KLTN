import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormsharedComponent } from './formshared.component';
const routes: Routes = [
    { 
        path: '', component: FormsharedComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormsharedRoutingModule {}