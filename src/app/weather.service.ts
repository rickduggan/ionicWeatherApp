import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(location) {
    let weatherURL = 'http://api.apixu.com/v1/forecast.json?key=8ca3550e6ec5459d8ac224045170711&q=' + location + '&days=1';
    return this.http.get(weatherURL);
  }
}
