import {Component, View, For} from 'angular2/angular2';
import {TodoStore} from 'stores/TodoStore';


@Component({
    selector: 'todo-main',
    injectables: [TodoStore]
})
@View({
    templateUrl: System.baseURL + 'components/todo-main/todo-main.html',
    directives: [
        For
    ]
})
export class TodoMain {
    todoService : TodoStore;

    constructor(todoService : TodoStore) {
        this.todoService = todoService;
        console.log('todo-main');
    }

    getList() {
        // TODO: filter list
        console.log(this.todoService.getFilteredList())
        return this.todoService.getFilteredList();
    }

    editTodo(todo) {
        this.todoService.editing(todo);
    }

    toggleComplete(todo) {
        this.todoService.toggleComplete(todo);
    }
}


