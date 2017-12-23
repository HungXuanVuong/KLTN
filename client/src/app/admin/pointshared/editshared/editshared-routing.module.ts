import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditsharedComponent } from './editshared.component';
const routes: Routes = [
    { 
        path: '', component: EditsharedComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditsharedRoutingModule {}