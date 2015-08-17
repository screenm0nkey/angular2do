import {Component, View} from 'angular2/angular2';
import {TodoFocus} from 'directives/todo-focus';
import {TodoStore} from 'stores/TodoStore';

var keymap = {
    tab: 9,
    enter: 13,
    esc: 27,
    up: 38,
    down: 40
};

@Component({
    selector: 'todo-item',
    injectables: [TodoStore],
    properties: { 'todo': 'value' }
})
@View({
    templateUrl: System.baseURL + 'components/todo-item/todo-item.html',
    directives : [TodoFocus]
})
export class TodoItem {
    todoService: TodoStore;

    constructor(todoService: TodoStore) {
        console.log('todo-item');
        this.todoService = todoService;
        this.todo = null;
    }

    deleteMe(todo) {
        this.todoService.remove(todo.id);
    }

    editTodo(todo) {
        console.log(1111, 'Nick')
        this.todoService.editing(todo);
    }

    doneEditing($event, todo) {
        var which = $event.which;
        var target = $event.target;
        if (which === keymap.enter) {

            todo.content = target.value;
            this.todoService.update(todo);
            this.todoService.editing(null);

        } else if (which === keymap.esc) {

            this.todoService.update(todo);
            this.todoService.editing(null);
        }
    }
}


