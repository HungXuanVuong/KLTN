import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { ListcandidateComponent } from './listcandidate.component';
const routes: Routes = [
    { 
        path: '', component: ListcandidateComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ListcandidateRoutingModule {}