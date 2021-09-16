import { Weather } from "./weather";

export class App{

    cityInput:HTMLInputElement;
    cityName: string;
    cities:string[]=[];
    cityWeather: Weather;
    opwApiKey = '38b9db4de440d4358facd2e774de1a44';

    constructor() {
        this.cityInput = document.querySelector('#city');
        document.querySelector('#add').addEventListener('click' ,() =>this.performAction());
        this.getData();
    }


    performAction() {
        this.getCity();
        this.getCityInfo(this.cityName)
    }

    getCity() {
        this.cityName = this.cityInput.value;
        this.cities.push(this.cityName);
        this.saveData(this.cities);
    }

    
     async getCityInfo(city : string) {
         const weather = await this.getWeather(city);
         console.log(weather);
         let name:string = weather.name;
         let temp:number = weather.main.temp;
         let wind:number = weather.speed.wind;
         let press:number = weather.main.pressure;
         let weatherDesc:string = weather.weather[2];
         this.cityWeather = new Weather(name,temp,wind,press,weatherDesc);
         this.createBox(this.cityWeather);

    }

    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    saveData(data : any) {
        localStorage.setItem('weatherData', JSON.stringify(data));
    }

    getData() {
        const data = localStorage.getItem('weatherData');
        if (data)
        {
            JSON.parse(data);
            let datatable :string[]=[]
          datatable=JSON.parse(data);
          console.log(datatable);
        
        for(let i=0;i<datatable.length;i++)
        {
            this.cities.push(datatable[i])
            this.saveData(this.cities)
            this.getCityInfo(datatable[i]);
        }
    } else {
        return{};
    }
    
}
    createBox(obj: Weather) {
        const div = document.querySelector('weather-line');
        const element = document.createElement('div');
        element.className='weatherBox';
        element.innerHTML+=`<span class="temperature">${this.cityWeather.temperature}°C</span><br>
        <span class="cityName">${this.cityWeather.cityName}</span><br>
        <span class="additional-city-info">${this.cityWeather.pressure}Hpa</span><br>
        <span class="additional-city-info">${this.cityWeather.windSpeed}Km/h</span>`;

       div.appendChild(element);
    }
}