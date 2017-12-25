import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormcatagoryComponent } from './formcatagory.component';
const routes: Routes = [
    { 
        path: '', component: FormcatagoryComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormcatagoryRoutingModule {}