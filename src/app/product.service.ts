import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

interface DeleteResult{
  count:number;
}

@Injectable()
export class ProductService {
  private productsUrl = 'api/products'; //URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getProducts(): Observable<Product[]> {
    this.messageService.add('ProductService: fetched products');
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => this.log('fetched products')),
        catchError(this.handleError('getProducts', []))
        );
  }

/** GET hero by id. Will 404 if id not found */
getProduct(id: number): Observable<Product> {
  const url = `${this.productsUrl}/${id}`;
  return this.http.get<Product>(url).pipe(
    tap(_ => this.log(`fetched product id=${id}`)),
    catchError(this.handleError<Product>(`getProduct id=${id}`))
  );
}

updateProduct (product:Product): Observable<any> {
	return this.http.put(this.productsUrl, product, httpOptions).pipe(
	  tap(_ => this.log('updated product id = ${product.id}')),
	  catchError(this.handleError<any>('updateProduct'))
	  );
}

addProduct (product:Product): Observable<Product> {
	return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
	  tap((product:Product) => this.log('added product w/ id=${product.id}')),
	  catchError(this.handleError<Product>('addProduct'))
	  );
}

deleteProduct(product:Product):Observable<any>{
    return this.http.delete<DeleteResult>(this.productsUrl+"/"+product.id,httpOptions).pipe(
      tap((deleteResult:DeleteResult)=>console.log('Count of deleted products: '+deleteResult.count)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }


/**deleteProduct(){
this.productService.deleteProduct(this.product).subscribe(
      data=>
        this.productService.triggerRefresh(true)
    );*/

/**deleteProduct (product: Product | number): Observable<Product> {
  const id = typeof product === 'number' ? product: product.id; 
  const url = '${this.productsUrl}/${id}';

  return this.http.delete<Product>(url, httpOptions).pipe(
    tap(_ => this.log('deleted product id = ${id}')),
    catchError(this.handleError<Product>('deleteProduct'))
    );
}*/
  
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add('ProductService: ' + message);
  }

  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Product[]>('api/products/?name=${term}').
    pipe(
      tap(_ => this.log('found products matching "${term}"')),
      catchError(this.handleError<Product[]>('searchProducts', []))
      );
  }

  
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    console.error(error); // log to console instead

    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}



}
