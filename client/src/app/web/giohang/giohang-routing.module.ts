import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiohangComponent } from './giohang.component';
const routes: Routes = [
    { 
        path: '', component: GiohangComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GiohangRoutingModule {}