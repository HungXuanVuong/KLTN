import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChitiettinComponent } from './chitiettin.component';
const routes: Routes = [
    { 
        path: '', component: ChitiettinComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChitiettinRoutingModule {}