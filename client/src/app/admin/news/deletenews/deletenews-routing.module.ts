import { DeletenewsComponent } from './deletenews.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
const routes: Routes = [
    { 
        path: '', component: DeletenewsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeletenewsRoutingModule {}