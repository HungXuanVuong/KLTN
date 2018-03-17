import { RedirectpageComponent } from './redirectpage.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';


const routes: Routes = [
    { 
        path: '', component: RedirectpageComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RedirectpageRoutingModule {}