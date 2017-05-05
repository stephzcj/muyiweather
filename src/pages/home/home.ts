import { Component ,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response,Jsonp,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {Onedaycast} from './onedaycast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  
  forecasts:Onedaycast[];
  city:String;
  constructor(public navCtrl: NavController,private http:Http,private jsonp:Jsonp) {
      }
  ngOnInit(): void {
    this.forecasts=this.getForecasts();
    this.city="城市";
  }

  getForecasts():Onedaycast[]{
    let onedaycast:Onedaycast[]=[
    {date:"2017-4-4",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"},
    {date:"2017-4-5",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"},
    {date:"2017-4-6",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"}];
    return onedaycast; 
  }   
}




  
  
  



