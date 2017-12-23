import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
import { EditnewsComponent } from './editnews.component';
const routes: Routes = [
    { 
        path: '', component: EditnewsComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditnewsRoutingModule {}