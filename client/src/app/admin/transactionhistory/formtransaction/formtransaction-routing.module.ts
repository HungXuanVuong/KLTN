import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormtransactionComponent } from './formtransaction.component';
const routes: Routes = [
    { 
        path: '', component: FormtransactionComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormtransactionRoutingModule {}