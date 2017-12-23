import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditchinhsachComponent } from './editchinhsach.component';
const routes: Routes = [
    { 
        path: '', component: EditchinhsachComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditchinhsachRoutingModule {}