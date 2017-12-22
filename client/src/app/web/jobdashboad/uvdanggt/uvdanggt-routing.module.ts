import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UvdanggtComponent } from './uvdanggt.component';
const routes: Routes = [
    { 
        path: '', component: UvdanggtComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UvdanggtRoutingModule {}