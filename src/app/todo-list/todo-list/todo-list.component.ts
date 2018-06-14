import { Component, OnInit } from '@angular/core';
import { TodoListItem } from '../todo-list-item.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public todoItems: TodoListItem[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoItems = this.todoService.getTodoItems();
  }

}
