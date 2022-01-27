import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface TodosElement {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}



@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) { }

  getAll() {
    const url = 'https://jsonplaceholder.typicode.com/todos';
    return this.http.get<TodosElement[]>(url);
  }
}
