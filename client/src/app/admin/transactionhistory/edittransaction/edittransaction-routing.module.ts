import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EdittransactionComponent } from './edittransaction.component';
const routes: Routes = [
    { 
        path: '', component: EdittransactionComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EdittransactionRoutingModule {}