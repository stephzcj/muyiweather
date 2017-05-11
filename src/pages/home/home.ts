import { Component ,OnInit} from '@angular/core';
import { NavController ,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Onedaycast} from './onedaycast';
import {WeatherDataService} from '../dataservice/weatherdata.service'
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{
  forecasts:Onedaycast[];
  city:string;
  time:string;
  nowWeather:string;
  nowTemp:string;
  aqi:string;
  pm25:string;
  quality:string;
  airSuggestion:string;
  sportSuggestion:string;
  uvSuggestion:string;
  travSuggestion:string;
  wearSuggestion:string;
  selectedCityId:string;
  selectedCity:any;
  constructor(private dataservice:WeatherDataService,private navParams:NavParams) {
    this.selectedCity = navParams.get('item');
    this.forecasts=[];
  }
  ngOnInit(): void {
    if(this.selectedCity!=null && this.selectedCity!=""){
      this.selectedCityId=this.selectedCity.cityId;
      this.dataservice.getAllWeatherInfo(this.selectedCityId);
    }else{
      //TODO:暂时给定桐庐
      this.selectedCityId="CN101210103";
      this.dataservice.getAllWeatherInfo(this.selectedCityId);
    }
    this.initForecasts();
    this.initBasicInfo();
    this.initNow();
    this.initAQI();
    this.initSuggestion();
  }  
/**
 * 将从后台取出的【三天天气预报】数据绑定到前台变量上
 */
  initForecasts():void{
    this.dataservice.get3DayWeather().subscribe(data => {
      if(data!=undefined){
        for(let index=0;index<3;index++){
          let dayweather:Onedaycast={weather:data[index].cond.txt_d,date:data[index].date,maxTemp:data[index].tmp.max+"℃",minTemp:data[index].tmp.min+"℃"};
          this.forecasts.push(dayweather);
        }
      }else{
        for(let index=0;index<3;index++){
          let dayweather:Onedaycast={weather:"N/A",date:"N/A",maxTemp:"N/A",minTemp:"N/A"};
          this.forecasts.push(dayweather);
        }
      }     
    },error=>{
      for(let index=0;index<3;index++){
        let dayweather:Onedaycast={weather:"N/A",date:"N/A",maxTemp:"N/A",minTemp:"N/A"};
        this.forecasts.push(dayweather);
      }
    });
  } 
  /**
  * 将从后台取出的【基本信息】数据绑定到前台变量上
  */  
  initBasicInfo():void{
    this.dataservice.getBasicInfo().subscribe(data=>{
      if (data!=undefined) {
        this.city=data.city;
        this.time=data.update.loc.split(" ")[1]; 
      }else{
        this.city="N/A";
        this.time="N/A"; 
      }   
    },error=>{
       this.city="N/A";
       this.time="N/A";  
    });
  }
  /**
  * 将从后台取出的【实况天气】数据绑定到前台变量上
  */  
  initNow():void{
    this.dataservice.getNowWeather().subscribe(data=>{
      if (data!=undefined) {
        this.nowTemp=data.tmp;
        this.nowWeather=data.cond.txt;
      }else{
        this.nowTemp="N/A";
        this.nowWeather="N/A"; 
      }
    },error=>{
      this.nowTemp="N/A";
      this.nowWeather="N/A";  
    })
  }
  /**
  * 将从后台取出的【AQI】数据绑定到前台变量上
  */  
  initAQI():void{
    this.dataservice.getAQI().subscribe(data=>{
      if(data!=undefined){
        this.aqi=data.city.aqi;
        this.pm25=data.city.pm25;
        this.quality=data.city.qlty;
      }else{
        this.aqi="N/A";
        this.pm25="N/A";  
        this.quality="N/A";  
      }
    },error=>{
      this.aqi="N/A";
      this.pm25="N/A";  
      this.quality="N/A";  
    })
  }
  /**
  * 将从后台取出的【生活建议】数据绑定到前台变量上
  */  
  initSuggestion():void{
    this.dataservice.getSuggestion().subscribe(data=>{
      if (data!=undefined) {
        this.airSuggestion=data.air.txt;
        this.sportSuggestion=data.sport.txt;
        this.uvSuggestion=data.uv.txt;
        this.travSuggestion=data.trav.txt;
        this.wearSuggestion=data.drsg.txt;
      }else{
        this.airSuggestion="N/A";
        this.sportSuggestion="N/A";
        this.uvSuggestion="N/A";
        this.travSuggestion="N/A";
        this.wearSuggestion="N/A";
      }
    },error=>{
      this.airSuggestion="N/A";
      this.sportSuggestion="N/A";
      this.uvSuggestion="N/A";
      this.travSuggestion="N/A";
      this.wearSuggestion="N/A";  
    })
  }


}




  
  
  



