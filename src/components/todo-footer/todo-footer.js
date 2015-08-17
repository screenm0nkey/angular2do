import {Component, View} from 'angular2/angular2';
import {TodoStore} from 'stores/TodoService';
import Utils from 'stores/common-utils';

@Component({
    selector: 'todo-footer',
    injectables: [TodoStore, Utils]
})
@View({
    templateUrl: System.baseURL + 'components/todo-footer/todo-footer.html'
})
export class TodoFooter {
    todoService: TodoStore;
    utils : Utils;

    constructor(todoService: TodoStore, utils : Utils) {
        this.todoService = todoService;
        this.utils = utils;
        // TODO: location service
        this.currentFilter = location.hash.replace('#/', '') || 'all';
        this.changeFilter(this.currentFilter);

    }

    clearCompleted() {
        this.todoService.clearCompleted();
    }

    changeFilter(filter = 'all', $event) {
        if (filter === 'all') {
            this.todoService.filterList((todo) => true);
        } else if (filter === 'completed') {
            this.todoService.filterList((todo) => todo.completed);
        } else if (filter === 'active') {
            this.todoService.filterList((todo) => !todo.completed);
        }

        this.currentFilter = filter;
    }

}


