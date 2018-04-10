import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { HeaderComponent } from './common/header/header.component';
import { SlidebarComponent } from './common/slidebar/slidebar.component';
import { ListcatagoryComponent } from './catagory/listcatagory/listcatagory.component';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { FormproductComponent } from './product/formproduct/formproduct.component';
import { EditproductComponent } from './product/editproduct/editproduct.component';
import { ListuvComponent } from './news/listuv/listuv.component';
import { DetailnewsComponent } from './news/detailnews/detailnews.component';
import { TransactionhistoryComponent } from './transactionhistory/transactionhistory.component';
import { ListtransactionComponent } from './transactionhistory/listtransaction/listtransaction.component';
import { FormtransactionComponent } from './transactionhistory/formtransaction/formtransaction.component';
import { EdittransactionComponent } from './transactionhistory/edittransaction/edittransaction.component';
import { DeletetransactionComponent } from './transactionhistory/deletetransaction/deletetransaction.component';


@NgModule({
    imports: [
        CommonModule,
        AdminRoutingModule,
        //HeaderModule

    ],
    declarations: [
        AdminComponent,
        HeaderComponent,
        SlidebarComponent
    ]
})

export class AdminModule {}