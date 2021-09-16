export class Weather {

    cityName:string;
    temperature: number;
    windSpeed:number;
    pressure:number;
    weatherDescription:string;

    constructor(city:string, temp:number, wind:number, press:number, weatherdesc:string) 
    {
        this.cityName = city;
        this.temperature =parseInt((temp-273.15).toPrecision(3));
        this.windSpeed = wind;
        this.pressure = press;
        this.weatherDescription = weatherdesc;
    }

}