import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListuserComponent } from './listuser.component';
const routes: Routes = [
    { 
        path: '', component: ListuserComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListuserRoutingModule {}