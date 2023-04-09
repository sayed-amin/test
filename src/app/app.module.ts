import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Add this line
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SeatBookingComponent } from './my-components/seat-booking/seat-booking.component';
import { HttpClientModule } from '@angular/common/http';

import {SeatService} from 'src/app/seat.service'
@NgModule({
  declarations: [
    AppComponent,
    SeatBookingComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  
     FormsModule // Add this line
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
