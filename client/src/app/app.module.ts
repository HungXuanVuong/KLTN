import { NewsuserService } from './service/newsuser.service';
import { NewscandidateService } from './service/newscandidate.service';
import { PolicyService } from './service/policy.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthServiceService } from './service/auth-service.service';
import { NewsService } from './service/news.service';
import { GiftService } from './service/gift.service';
import { TypeGiftService } from './service/type-gift.service';
import { OrderService } from './service/order.service';



@NgModule({
  declarations: [
    AppComponent,
    // HeaderComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,

  ],
  providers: [
    AuthServiceService,
    NewsService,
    GiftService,
    TypeGiftService,
    PolicyService,
    OrderService,
    NewscandidateService,
    NewsuserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
