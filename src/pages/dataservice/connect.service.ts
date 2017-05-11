import {Injectable} from '@angular/core';
import {Jsonp,Http} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw'
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConnectService{
    callback:string="?callback=JSONP_CALLBACK";
    publicUrl:string="http://localhost:8080";
    constructor(private jsonp:Jsonp,private http:Http){}
    /**
     * 用http的get方法访问muyiweather的后台服务器
     */
    getInfoFromBackend(extraurl:string):Observable<any>{
        let url=this.publicUrl+extraurl;
        return this.http.get(url).catch(this.handleError);
    }
    /**
     * 用http的post方法访问muyiweather的后台服务器
     * options有：
     * search?: {[key: string]: any | any[];};
     * params?: {[key: string]: any | any[];};
     * headers?: Headers;
     * body?: any;
     * withCredentials?: boolean;
     * responseType?: ResponseContentType;
     */
     postInfoFromBackend(extraurl:string,options?:any):Observable<Response>{
         let url=this.publicUrl+extraurl;
         return this.http.post(url,"",options).catch(this.handleError);
     }
    /**
     * 用http的get方法访问公网API，但浏览器调试时需要设置跨域
     * MAC的chrome使用以下命令
     * open -a "Google Chrome" --args --disable-web-security –user-data-dir="[your directory]"
     */
    getInfoFromPubNet(url:string):Observable<any>{
        return this.http.get(url).catch(this.handleError);
    }
     /**
     * 用http的post方法访问公网API，但浏览器调试时需要设置跨域
     * MAC的chrome使用以下命令
     * open -a "Google Chrome" --args --disable-web-security –user-data-dir="[your directory]"
     * options有：
     * search?: {[key: string]: any | any[];};
     * params?: {[key: string]: any | any[];};
     * headers?: Headers;
     * body?: any;
     * withCredentials?: boolean;
     * responseType?: ResponseContentType;
     */
    postInfoFromPubNet(url:string,options?:any):Observable<any>{
        return this.http.post(url,"",options).catch(this.handleError);
    }

    private handleError (error: Response | any) {
        // In a real world app, you might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
          console.log("if:"+errMsg);
        } else {
          errMsg = error.message ? error.message : error.toString();
          console.log("else:"+errMsg);
        }      
        return Observable.throw(errMsg);
    }




}