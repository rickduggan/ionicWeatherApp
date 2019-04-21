import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

import * as _ from 'lodash';
import { NavigationStart } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentWeather;
  location: String;
  searching: Boolean = false;
  minTemp: Number;
  maxTemp: Number;
  precip: Number;
  wind: Number;
  weatherResults: Object;
  forecast: any[];
  
  constructor(private weather: WeatherService) {}

  ngOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(currentPosition => {
        this.getWeather(currentPosition.coords.latitude + ',' + currentPosition.coords.longitude);
      });
    }
  }

  getWeather(location) {
    this.weather.getWeather(location)
    .subscribe((resp: any) => {
      this.weatherResults = resp;
      this.currentWeather = resp.current.temp_f;
      this.location = resp.location.name;
      this.precip = resp.current.precip_in;
      this.wind = resp.current.wind_mph;

      _.each(resp.forecast, (data) => {
        this.forecast = data;
        this.maxTemp = data[0].day.maxtemp_f;
        this.minTemp = data[0].day.mintemp_f;
      })

      console.log(resp);
    });
  }

  toggleSearch() {
    this.searching = !this.searching;
    this.location = '';
  }
}
