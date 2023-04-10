import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://unstop-server-api.azurewebsites.net/seats';
  constructor(private http: HttpClient) {}
  getData(): Observable<Map<number, boolean>> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => {
        const seatMap = new Map<number, boolean>();
        data.forEach(item => {
          const seatNumber = item.seat_number;
          const isAvailable = item.is_available;
          seatMap.set(seatNumber, isAvailable);
        });
        return seatMap;
      })
    );
  }
  
  
}
