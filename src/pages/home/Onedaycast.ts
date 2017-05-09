export class Onedaycast{
    date:String;
    weather:String;
    maxTemp:String;
    minTemp:String;
    constructor(idate:String,iweather:String,imaxTemp:String,iminTemp:String){
        this.date=idate;
        this.maxTemp=imaxTemp;
        this.minTemp=iminTemp;
        this.weather=iweather;
    }
}