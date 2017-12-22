import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NoelComponent } from './noel.component';
const routes: Routes = [
    { 
        path: '', component: NoelComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NoelRoutingModule {}