import { Component ,OnInit} from '@angular/core';
import { Storage } from '@ionic/storage'
import { NavController ,NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Onedaycast} from './onedaycast';
import {CityPage} from '../city/city'
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
  imgFromNet:string;
  constructor(private dataservice:WeatherDataService,private navParams:NavParams,
  private storage:Storage,private navController:NavController) {
    this.selectedCity = navParams.get('item');
    this.forecasts=[];
  }
  ngOnInit(): void {
    if(this.selectedCity!=null && this.selectedCity!=""){//如果是页面跳转过来且带item对象的，则显示item的城市天气
      this.selectedCityId=this.selectedCity.cityId;
      this.dataservice.getAllWeatherInfo(this.selectedCityId);
      this.initData();
    }else{//否则去indexedDB查历史
      this.storage.ready().then(()=>{
          this.storage.get('selectedCity').then((item) => {
             if(item!=null && item!="" && item!=undefined){//如果有历史选择的则加载历史选择的城市天气
                 this.dataservice.getAllWeatherInfo(item.cityId);
                 this.initData();
             }else{//否则跳转到选择页面
                 this.navController.push(CityPage);
             }
          })
      })  
    }
  }
  /**
   * 数据绑定总入口
   */
  initData():void{
    this.initForecasts();
    this.initBasicInfo();
    this.initNow();
    this.initAQI();
    this.initSuggestion();
    this.initBackgroundImg();
  }
  /**
   * 将从后台取出的【背景图】数据绑定到前台变量上
   */
  initBackgroundImg():void{
    this.dataservice.getBackgroundImgUrl().subscribe(data=>this.imgFromNet="url("+data+")");
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

  doRefresh(refresher) {
      this.forecasts=[];
      this.initData();
      refresher.complete(); 
  }


}




  
  
  



