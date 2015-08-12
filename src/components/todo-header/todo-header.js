import {Component, View} from 'angular2/angular2';
import {TodoStore} from 'stores/TodoStore';

var keymap = {
    tab: 9,
    enter: 13,
    esc: 27,
    up: 38,
    down: 40
};

@Component({
    selector: 'todo-header',
    injectables: [TodoStore]
})
@View({
    templateUrl: System.baseURL + 'components/todo-header/todo-header.html'
})
export class TodoHeader {
    todoService:TodoStore;

    constructor(todoService:TodoStore) {
        this.todoService = todoService;
        console.log('todo-header', this.todoService);
    }

    enterTodo($event) {
        // ENTER_KEY
        if ($event.which === keymap.enter) {
            $event.preventDefault();
            // if value
            if ($event.target.value !== '') {
                this.addTodo($event.target.value);
                $event.target.value = '';
            }
        }
    }

    addTodo(text) {
        if (!text) return;
        this.todoService.create({
            content: text,
            completed: false
        });
    }

    toggleAll(isComplete) {
        this.todoService.toggleAll(isComplete);
    }
}


