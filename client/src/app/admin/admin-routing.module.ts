
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { animate } from '@angular/animations';


import { AdminComponent } from './admin.component';
const routes: Routes = [
    { 
        path: '', component: AdminComponent,
        children: [
            { path: '', redirectTo: 'dashboard'},
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
            //catagory
            { path: 'listcatagory', loadChildren: './catagory/listcatagory/listcatagory.module#ListcatagoryModule'},
            { path: 'formcatagory', loadChildren: './catagory/formcatagory/formcatagory.module#FormcatagoryModule'},
            { path: 'editcatagory/:id', loadChildren: './catagory/editcatagory/editcatagory.module#EditcatagoryModule'},
            { path: 'deletecatagory/:id', loadChildren: './catagory/deletecatagory/deletecatagory.module#DeletecatagoryModule'},
            //Transaction history
              { path: 'listtransaction', loadChildren: './transactionhistory/listtransaction/listtransaction.module#ListtransactionModule'},
              { path: 'formtransaction', loadChildren: './transactionhistory/formtransaction/formtransaction.module#FormtransactionModule'},
              { path: 'edittransaction/:id', loadChildren: './transactionhistory/edittransaction/edittransaction.module#EdittransactionModule'},
              { path: 'deletetransaction/:id', loadChildren: './transactionhistory/deletetransaction/deletetransaction.module#DeletetransactionModule'},
            //product
            { path: 'listproduct', loadChildren: './product/listproduct/listproduct.module#ListproductModule'},
            { path: 'formproduct', loadChildren: './product/formproduct/formproduct.module#FormproductModule'},
            { path: 'editproduct/:id', loadChildren: './product/editproduct/editproduct.module#EditproductModule'},
            { path: 'deleteproduct/:id', loadChildren: './product/editproduct/editproduct.module#EditproductModule'},
            //user
            { path: 'listuser', loadChildren: './users/listuser/listuser.module#ListuserModule'},
            { path: 'formuser', loadChildren: './users/formuser/formuser.module#FormuserModule'},
            { path: 'edituser', loadChildren: './users/edituser/edituser.module#EdituserModule'},
            
            //shared
            { path: 'listshared', loadChildren: './pointshared/listshared/listshared.module#ListsharedModule'},
            { path: 'formshared', loadChildren: './pointshared/formshared/formshared.module#FormsharedModule'},
            { path: 'editshared', loadChildren: './pointshared/editshared/editshared.module#EditsharedModule'},
            //news
            { path: 'listnews', loadChildren: './news/listnews/listnews.module#ListnewsModule'},
            { path: 'formnews', loadChildren: './news/formnews/formnews.module#FormnewsModule'},
            { path: 'editnews', loadChildren: './news/editnews/editnews.module#EditnewsModule'},
            { path: 'deletenews/:id', loadChildren: './news/deletenews/deletenews.module#DeletenewsModule'},
            { path: 'listuv', loadChildren: './news/listuv/listuv.module#ListuvModule'},
            { path: 'detailnews/:id', loadChildren: './news/detailnews/detailnews.module#DetailnewsModule'},
            // candidate
            { path: 'listcandidate', loadChildren: './candidate/listcandidate/listcandidate.module#ListcandidateModule'},
            { path: 'formcandidate', loadChildren: './candidate/formcandidate/formcandidate.module#FormcandidateModule'},
            { path: 'editcandidate', loadChildren: './candidate/editcandidate/editcandidate.module#EditcandidateModule'},
            // chinhsach
            { path: 'listchinhsach', loadChildren: './point/listchinhsach/listchinhsach.module#ListchinhsachModule'},
            { path: 'editchinhsach', loadChildren: './point/editchinhsach/editchinhsach.module#EditchinhsachModule'},
            { path: 'formchinhsach', loadChildren: './point/formchinhsach/formchinhsach.module#FormchinhsachModule'}
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}