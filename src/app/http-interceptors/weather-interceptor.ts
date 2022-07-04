import { Injectable,  } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { WeatherService } from '../weather.service';

/** Pass untouched request through to the next request handler. */
@Injectable({
  providedIn: 'root'
})
export class WeatherInterceptor implements HttpInterceptor {
  constructor(private weatherService: WeatherService){}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    
    this.weatherService.getWeathers()
      console.log('intercepttt :: ?')
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse)=> {
        console.log(error.error.message);
        return throwError(error.error.message)
      })
    )
  }
}