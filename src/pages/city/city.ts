import { Component ,ViewChild,OnInit} from '@angular/core';
import { NavController, NavParams,Nav} from 'ionic-angular';
import {WeatherDataService} from '../dataservice/weatherdata.service';
import {HomePage} from '../home/home'

@Component({
  selector: 'city-list',
  templateUrl: 'city.html'
})
export class CityPage implements OnInit{
  @ViewChild(Nav) nav: Nav;
  selectedItem: any;
  cityListTitle:string;
  icons: string[];
  items: Array<{cityId: string, cityName: string,level:number,preCityId:string}>;//level定义当前item级别：1省 2市 3县

  constructor(public navCtrl: NavController, public navParams: NavParams,private weatherDataService:WeatherDataService){
    // 如果导航到此页，则可以通过NavParams取到跳转过来时的参数
    this.selectedItem = navParams.get('item');
    this.items = []; 
  }

  ngOnInit(): void {
      if(this.selectedItem==null || this.selectedItem==""){//查询省级
        this.cityListTitle="中国";
        this.weatherDataService.getProvinceInfo().subscribe(data=>{
            for(let index=0;index<data.length;index++){
                this.items.push({
                    cityId:data[index].id,
                    cityName:data[index].name,
                    level:1,
                    preCityId:""
                })
            }
        });
    }else{
        if(this.selectedItem.level==1){//查询市级
            this.cityListTitle=this.selectedItem.cityName;
            this.weatherDataService.getCityInfo(this.selectedItem.cityId).subscribe(data=>{
                for(let index=0;index<data.length;index++){
                    this.items.push({
                        cityId:data[index].id,
                        cityName:data[index].name,
                        level:2,
                        preCityId:this.selectedItem.cityId
                    })
                }
            })
        }else if (this.selectedItem.level==2){//查县级
            this.cityListTitle=this.selectedItem.cityName;
            this.weatherDataService.getCountyInfo(this.selectedItem.preCityId,this.selectedItem.cityId).subscribe(data=>{
                for(let index=0;index<data.length;index++){
                    this.items.push({
                        cityId:data[index].weather_id,
                        cityName:data[index].name,
                        level:3,
                        preCityId:this.selectedItem.cityId
                    })
                }
            })
        }
    }
  }
   itemTapped(event, item) {
       if(item.level==3){//如果是县级，就跳转home页显示具体天气信息
           this.navCtrl.push(HomePage,{
            item: item
         });
       }else{//否则跳转本页继续显示下级市县
         this.navCtrl.push(CityPage,{
            item: item
         });
       }
  }

  
}
