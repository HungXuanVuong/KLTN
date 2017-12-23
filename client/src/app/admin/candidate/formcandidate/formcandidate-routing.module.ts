import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { FormcandidateComponent } from './formcandidate.component';
const routes: Routes = [
    { 
        path: '', component: FormcandidateComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormcandidateRoutingModule {}