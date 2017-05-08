import {Injectable} from '@angular/core';
import {Jsonp} from '@angular/http';
import 'rxjs/add/operator/map';
import {Onedaycast} from '../home/Onedaycast';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WeatherDataService{
    callback:string="?callback=JSONP_CALLBACK";
    publicUrl:string="http://localhost:8080";

    constructor(private jsonp:Jsonp){}
    get3DayWeather():Onedaycast[]{
        let onedaycast:Onedaycast[]=[
        {date:"2017-4-4",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"},
        {date:"2017-4-5",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"},
        {date:"2017-4-6",weather:"晴天",maxTemp:"36℃",minTemp:"16℃"}];
        return onedaycast; 
    }

    getInfoByUrl(extraurl:string):Observable<any>{
         let url=this.publicUrl+extraurl+this.callback;
        return this.jsonp.get(url).map(res=>res.json());
    }
}