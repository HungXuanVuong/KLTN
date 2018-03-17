import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { DeletecatagoryComponent } from './deletecatagory.component';
const routes: Routes = [
    { 
        path: '', component: DeletecatagoryComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeletecatagoryRoutingModule {}