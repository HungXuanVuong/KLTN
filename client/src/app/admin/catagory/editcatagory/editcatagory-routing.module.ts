import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditcatagoryComponent } from './editcatagory.component';
const routes: Routes = [
    { 
        path: '', component: EditcatagoryComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditcatagoryRoutingModule {}