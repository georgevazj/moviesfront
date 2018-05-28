import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movies-form',
  templateUrl: './movies-form.component.html',
  styleUrls: ['./movies-form.component.css']
})
export class MoviesFormComponent {
  model: Movie = {id:'',title:'',genre:'', formats: {dvd:true, digital:true,bluray:false}};
  genres = ['Science Fiction','Action','Drama','Adventures','Cartoons'];

  submitted = false;

  constructor(
    private movieService: MovieService
  ){};

  get diagnostic() {
    return JSON.stringify(this.model);
  }

  onSubmit() {
    this.submitted = true;
    this.movieService.addMovie(this.model).subscribe(
      response => console.log(response),
      err => console.log(err)
    );
  }

}
