import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl = environment.url + '/api';

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get(`${this.apiUrl}/todos`);
  }

  addTodo(description: string) {
    return this.http.post(`${this.apiUrl}/todos`, { description }, { responseType: 'text' });
  }

  deleteTodo(id: number) {
    return this.http.delete(`${this.apiUrl}/todos/${id}`, { responseType: 'text' });
  }
}