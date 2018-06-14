import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { DeleteproductComponent } from './deleteproduct.component';
const routes: Routes = [
    {
        path: '', component: DeleteproductComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeleteproductRoutingModule {}
