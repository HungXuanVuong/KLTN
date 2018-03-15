import { FogotpasswordComponent } from './fogotpassword.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';
const routes: Routes = [
    { 
        path: '', component: FogotpasswordComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FogotpasswordRoutingModule {}