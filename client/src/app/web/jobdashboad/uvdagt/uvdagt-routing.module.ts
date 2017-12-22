import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UvdagtComponent } from './uvdagt.component';
const routes: Routes = [
    { 
        path: '', component: UvdagtComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UvdagtRoutingModule {}