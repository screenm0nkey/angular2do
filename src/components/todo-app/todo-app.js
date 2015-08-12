import {Component, View} from 'angular2/angular2';
import {TodoHeader} from 'components/todo-header/todo-header';

@Component({
  selector: 'todo-app'
})
@View({
    templateUrl: System.baseURL+'components/todo-app/todo-app.html',
    directives:[
        TodoHeader,
        TodoMain
    ]
})
export class TodoApp {
  constructor() {
    console.log('init app');
  }
}


