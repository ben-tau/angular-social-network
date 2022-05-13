import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor() { }

  createDb() {
    return{
      heroes: [
        {
          id: 1,
          name : 'Spiderman',
          team : 'avengers'
        }
      ]
    }
  }
}
