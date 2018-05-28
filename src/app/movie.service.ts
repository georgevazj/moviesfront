import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './movie';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:9090/movie'

  constructor(private http: HttpClient) { }

  /* Consulta el catalogo de peliculas al API de backend */
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl)
    .pipe(
      tap(_ => this.log(`fetched movies`)),
      catchError(this.handleError('getMovies', []))
    );
  }

  /* Crea una pelicula en la base de datos */
  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl, movie, httpOptions).pipe(
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  private log(message: string) {
    console.log(message);
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
