import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EdituserComponent } from './edituser.component';
const routes: Routes = [
    { 
        path: '', component: EdituserComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EdituserRoutingModule {}