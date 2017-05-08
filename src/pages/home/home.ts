import { Component ,OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, Response,Jsonp,Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Onedaycast} from './onedaycast';
import {WeatherDataService} from '../dataservice/weatherdata.service'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  public aaa:any;
  forecasts:Onedaycast[];
  res:any;
  city:String;
  constructor(private jsonp:Jsonp,private dataservice:WeatherDataService) {
      }
  ngOnInit(): void {
    this.forecasts=this.getForecasts();
    this.city="城市";
    this.dataservice.getInfoByUrl("/").subscribe(data => console.log(data));
    
}


  getForecasts():Onedaycast[]{
    let onedaycast:Onedaycast[]=[
    {date:"2017-4-4",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"},
    {date:"2017-4-5",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"},
    {date:"2017-4-6",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"}];
    return onedaycast; 
  }   
}




  
  
  



