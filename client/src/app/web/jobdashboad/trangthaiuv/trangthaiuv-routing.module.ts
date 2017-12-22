import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrangthaiuvComponent } from './trangthaiuv.component';
const routes: Routes = [
    { 
        path: '', component: TrangthaiuvComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TrangthaiuvRoutingModule {}