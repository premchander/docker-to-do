import { Component } from '@angular/core';
import { TodoService } from '../service/to-do.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {

  todos: any[] = [];
  newTodoDescription: any;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe((todos:any) => {
      this.todos = todos;
    });
  }

  addTodo(description: string) {
    console.log(description)
    this.todoService.addTodo(description).subscribe((response) => {
      //this.todos.push(response)
      console.log('############')
      this.loadTodos();
      
    });
    this.newTodoDescription = '';
  }

  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe((response) => {
      this.loadTodos();
    });
  }
}
