import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChitietspComponent } from './chitietsp.component';
const routes: Routes = [
    { 
        path: '', component: ChitietspComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChitietspRoutingModule {}