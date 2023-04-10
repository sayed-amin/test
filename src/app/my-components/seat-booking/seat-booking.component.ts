import { Component, OnInit } from '@angular/core';
import { SeatService } from 'src/app/seat.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/api.service';
interface Seat {
  id: number;
  row: number;
  col: number;
  reserved: boolean;
}


@Component({
  selector: 'app-seat-booking',
  template: `
  
    <h2>Seat Booking App</h2>
    <p>Select number of seats to book:</p>
    <p>Enter the Number of seat to be booked</p>
    
    <div class="form-group row">
    <div class="col-md-6 mx-auto">
      <div class="input-group">
        <input type="number" [(ngModel)]="numSeats" min="1" max="7" class="form-control" style="width: 50px;">
        <button (click)="bookSeats()" class="btn btn-primary">Book</button>
      </div>
    </div>
  </div>
  
  

  <button type="button" class="btn btn-light">Seat is Free</button>
  <button type="button" class="btn btn-danger">Seat is Reserved and read from the DB</button>
  <p>It Takes 5-10 second to Read the Data from the database </p>
  <div class="container">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <div class="seats border p-3">
        <div *ngFor="let row of rows" class="row mb-3">
          <div *ngFor="let seat of row.seats" class="seat col-2 p-2 text-center" [class.reserved]="seat.reserved" (click)="toggleSeat(seat)">
            {{seat.id}}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>





  `,
  styles: [`
  .seats {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
  }
  .row {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
  }
  .seat {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .reserved {
    background-color: red;
  }
  .seat {
    display: inline-block;
    width: 50px;
    height: 50px;
    margin: 10px;
    text-align: center;
    line-height: 50px;
    font-size: 24px;
    font-weight: bold;
    border-radius: 5px;
  }
  
  .red {
    background-color: red;
    color: white;
  }
  
  .white {
    background-color: white;
    color: black;
  }
  
`] 

})

export class SeatBookingComponent   {
  
  numSeats = 1;
  rows: { row: number, seats: Seat[] }[] = [];

constructor(private service: ApiService) {
  const lastRowSeats = new Array(3).fill(null).map((_, i) => ({ id: i + 77, row: 10, col: i + 1, reserved: false }));
  this.rows = [
    ...new Array(12).fill(null).map((_, i) => ({ row: i + 1, seats: new Array(i < 11 ? 7 : 3).fill(null).map((__, j) => ({ id: i * 7 + j + 1, row: i + 1, col: j + 1, reserved: false })) })),
  ];
  
  this.service.getData().subscribe(seatMap => {
    for (const row of this.rows) {
      for (const seat of row.seats) {
        const seatNumber = (seat.row - 1) * 7 + seat.col;
        seat.reserved = !seatMap.get(seatNumber);
      }
    }
  });
}


  bookSeats() {
    const availableSeats = this.getAvailableSeats();
    const bookingSeats = availableSeats.slice(0, this.numSeats);
    if (bookingSeats.length !== this.numSeats) {
      alert(`Only ${bookingSeats.length} seats are available`);
      return;
    }
    bookingSeats.forEach(seat => seat.reserved = true);
    alert(`Booked seats: ${bookingSeats.map(seat => seat.id).join(', ')}`);
  }


  toggleSeat(seat: Seat) {
    if (!seat.reserved) {
      seat.reserved = true;
    }
  }


 
  private getAvailableSeats() {
    const availableSeats: Seat[] = [];
    this.rows.forEach(row => {
      let startIdx = 0;
      while (startIdx < row.seats.length) {
        let endIdx = startIdx;
        while (endIdx < row.seats.length && !row.seats[endIdx].reserved) {
          endIdx++;
        }
        if (endIdx - startIdx >= this.numSeats) {
          availableSeats.push(...row.seats.slice(startIdx, endIdx));
        }
        startIdx = endIdx + 1;
      }
    });
    return availableSeats;
  }
  
}
