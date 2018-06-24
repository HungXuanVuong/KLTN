import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckorderComponent } from './checkorder.component';
const routes: Routes = [
    { 
        path: '', component: CheckorderComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckorderRoutingModule {}