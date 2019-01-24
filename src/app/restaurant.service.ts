import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';


import { Restaurant } from './restaurant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class RestaurantService {

  private restaurantsUrl = 'api/restaurants';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getRestaurants(): Observable<Restaurant[]> {
    this.messageService.add('RestaurantService: fetched restaurants');
    return this.http.get<Restaurant[]>(this.restaurantsUrl)
      .pipe(
      tap(restaurants => this.log('fetched restaurants')),
      catchError(this.handleError('getRestaurants', []))
    );
  }


/** GET restaurant by id. Will 404 if id not found */
getRestaurant(id: number): Observable<Restaurant> {
  const url = `${this.restaurantsUrl}/${id}`;
  return this.http.get<Restaurant>(url).pipe(
    tap(_ => this.log(`fetched restaurant id=${id}`)),
    catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
  );
}

updateRestaurant (restaurant: Restaurant): Observable<any> {
	return this.http.put(this.restaurantsUrl, restaurant, httpOptions).pipe(
	  tap(_ => this.log('updated restaurant id = ${restaurant.id}')),
	  catchError(this.handleError<any>('updateRestaurant'))
	  );
}


  /**getRestaurant(id: number): Observable<Restaurant> {
    this.messageService.add('RestaurantService: fetched restaurant id=${id}');
    return of(RESTAURANTS.find(restaurant => restaurant.id === id));
  }*/

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('RestaurantService: ' + message);
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
