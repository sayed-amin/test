import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Traing booking app';
constructor(private service: ApiService){}
ngOnInit() {
  this.getDataFromapi()
}
getDataFromapi(){
  this.service.getData().subscribe((Response)=>{
  console.log('response from api is',Response);
},(error)=>{
  console.log('Error',error);
})}
}
