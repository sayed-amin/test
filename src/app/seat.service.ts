import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Seat {
  seatNumber: number;
  isAvailable: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private apiUrl = 'http://localhost:3000/seats';

  constructor(private http: HttpClient) {}

  getSeats(): Observable<Seat[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        const seats: Seat[] = [];
        data.forEach(item => {
          const seat: Seat = {
            seatNumber: item.seat_number,
            isAvailable: item.is_available
          };
          seats.push(seat);
        });

        const a: boolean[] = [];
        seats.forEach(seat => {
          a[seat.seatNumber] = seat.isAvailable;
        });

        return seats;
      })
    );
  }
}
