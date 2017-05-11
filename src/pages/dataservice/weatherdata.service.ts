import {Injectable} from '@angular/core';
import {Jsonp,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publishReplay';
import {Onedaycast} from '../home/Onedaycast';
import {Observable} from 'rxjs/Observable';
import {ConnectService} from './connect.service'

@Injectable()
export class WeatherDataService{
    weatherInfo:Observable<any>;
    constructor(private jsonp:Jsonp,private http:Http,private connectService:ConnectService){}

    /**
     *从后台一次取出所有数据,注意要使用publishReplay来cache流,否则流只能被消费一次 
     */
    getAllWeatherInfo(cityId:string):void{
      let hefengUrl="https://free-api.heweather.com/v5/weather?city="+cityId+"&key=0be3745ab0a54ef4bd7f8c6a3c9fcd95";
      let params={"cityId":cityId};
      this.weatherInfo=this.connectService.postInfoFromBackend("/",{params:params}).map(res=>res.json()).publishReplay(1,1000).refCount().take(1);
       //his.weatherInfo=this.connectService.getInfoFromPubNet(hefengUrl).publishReplay(1,1000).refCount().take(1);
  }


    /**
     *取省级基本信息
     */
    getBackgroundImgUrl():Observable<any>{
      return this.connectService.getInfoFromBackend("/bgUrl").map(res=>res.json());
    }
    /**
     *取省级基本信息
     */
    getProvinceInfo():Observable<any>{
        return this.connectService.getInfoFromBackend("/province").map(res=>res.json());
    }
    /**
     *取市级基本信息
     */
    getCityInfo(provinceId:string):Observable<any>{
        let params={"provinceId":provinceId};
        return this.connectService.postInfoFromBackend("/city",{params:params}).map(res=>res.json());
    }
    /**
     *取县级基本信息
     */
    getCountyInfo(provinceId:string,cityId:string):Observable<any>{
        let params={"provinceId":provinceId,"cityId":cityId};
        return this.connectService.postInfoFromBackend("/county",{params:params}).map(res=>res.json());
    }
    /**
     *取基本信息
     */
    getBasicInfo():Observable<any>{
        return this.weatherInfo.map(res=>res.HeWeather5[0].basic);
    }
    /**
     *取三天预报
     */
    get3DayWeather():Observable<any>{     
      return this.weatherInfo.map(res=>res.HeWeather5[0].daily_forecast);     
    }
    /**
     *取实况天气
     */
    getNowWeather():Observable<any>{     
      return this.weatherInfo.map(res=>res.HeWeather5[0].now);     
    }
    /**
     *取AQI
     */
    getAQI():Observable<any>{     
      return this.weatherInfo.map(res=>res.HeWeather5[0].aqi);     
    }
    /**
     *取生活建议
     */
    getSuggestion():Observable<any>{     
      return this.weatherInfo.map(res=>res.HeWeather5[0].suggestion);     
    }


}