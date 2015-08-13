import {Component, View} from 'angular2/angular2';
import {TodoStore} from 'stores/TodoStore';

@Component({
    selector: 'todo-item',
    injectables: [TodoStore]
})
@View({
    templateUrl: System.baseURL + 'components/todo-item/todo-item.html'
})
export class TodoItem {
    todoService:TodoStore;

    constructor(todoService:TodoStore) {
        this.todoService = todoService;
        this.todoService = todoService;
        this.todo = null;
        console.log('todo-item', this.todoService);
    }

}


