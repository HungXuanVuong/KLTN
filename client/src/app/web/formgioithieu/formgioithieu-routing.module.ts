import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormgioithieuComponent } from './formgioithieu.component';
const routes: Routes = [
    { 
        path: '', component: FormgioithieuComponent,
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FormgioithieuRoutingModule {}