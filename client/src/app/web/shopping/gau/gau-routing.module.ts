import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GauComponent } from './gau.component';
const routes: Routes = [
    { 
        path: '', component: GauComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GauRoutingModule {}