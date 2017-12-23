import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditcandidateComponent } from './editcandidate.component';
const routes: Routes = [
    { 
        path: '', component: EditcandidateComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditcandidateRoutingModule {}