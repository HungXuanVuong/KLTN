import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditproductComponent } from './editproduct.component';
const routes: Routes = [
    { 
        path: '', component: EditproductComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditproductRoutingModule {}