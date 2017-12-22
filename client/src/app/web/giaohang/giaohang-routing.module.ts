import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GiaohangComponent } from './giaohang.component';
const routes: Routes = [
    { 
        path: '', component: GiaohangComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GiaohangRoutingModule {}