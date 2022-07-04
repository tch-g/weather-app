import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup, Validators } from '@angular/forms';
import {  debounceTime,  } from 'rxjs';
import { Weather } from '../weather';
import { WeatherService } from '../weather.service';
import { LoadingService } from '../loader/loading.service';
import {  finalize } from 'rxjs/operators';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weather: Weather | undefined;
  form!: FormGroup;

  msg =  {
    isFound: false,
    errorMessage: ''
  }

  constructor(private weatherService: WeatherService, private fb: FormBuilder,  private loadingService: LoadingService) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      val: ["", [Validators.required,  Validators.minLength(3)]
      ]})
  this.form.valueChanges.pipe(debounceTime(500)).subscribe((dataStream: {val: string}) => {
    this.search(dataStream.val)
  })
  }
  search(city: string){
   if(this.form.valid){
    this.loadingService.start()
    this.weatherService.getWeather(city).pipe(finalize(()=>this.loadingService.stop())).subscribe(weather => {
   this.weather = weather
   console.log(this.weather)
   console.log(weather.weather[0].icon)
   this.msg.isFound = true;
    },(error)=>{
      this.msg.isFound = false;
      this.msg.errorMessage = error
    }
    )}
    }

}