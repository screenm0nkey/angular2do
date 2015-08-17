import {Component, View, For} from 'angular2/angular2';
import {TodoItem} from 'components/todo-item/todo-item';
import {TodoStore} from 'stores/TodoService';


@Component({
    selector: 'todo-main',
    injectables: [TodoStore]
})
@View({
    templateUrl: System.baseURL + 'components/todo-main/todo-main.html',
    directives: [
        For,
        TodoItem
    ]
})
export class TodoMain {
    todoService:TodoStore;

    constructor(todoService:TodoStore) {
        this.todoService = todoService;
        console.log('todo-main');
    }

    getList() {
        return this.todoService.getFilteredList();
    }

    toggleComplete(todo) {
        this.todoService.toggleComplete(todo);
    }
}


