import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfiledetailComponent } from './profiledetail.component';

const routes: Routes = [
    { 
        path: '', component: ProfiledetailComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfiledetailRoutingModule {}