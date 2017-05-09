import {Injectable} from '@angular/core';
import {Jsonp,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/publishReplay';
import {Onedaycast} from '../home/Onedaycast';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WeatherDataService{
    callback:string="?callback=JSONP_CALLBACK";
    publicUrl:string="http://localhost:8080";
    weatherInfo:Observable<any>;
    constructor(private jsonp:Jsonp,private http:Http){
        //从后台一次取出所有数据,注意要使用publishReplay来cache流
        this.weatherInfo=this.getInfoByUrl("/").publishReplay(1,1000).refCount().take(1);
    }

    /**
     * jsonp访问后台
     */
    getInfoByUrl(extraurl:string):Observable<any>{
         let url=this.publicUrl+extraurl+this.callback;
        return this.jsonp.get(url).map(res=>res.json());
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