import {isPresent} from 'angular2/src/facade/lang';
// default exports (one per module) do not need curly braces
import State from 'stores/app-state';
import utils from 'stores/common-utils';



// This stores the state for the app.
var state = State.getState();


export class TodoStore {
    constructor() {
        console.log('TodoStore');
        this.state = state;
    }

    get list() {
        // return copy of the list. Immutable
        return this.state.list.slice(0);
    }

    get count() {
        return this.list.length;
    }

    get remainingCount() {
        return this.list.filter(function (todo) {
            return !todo.completed;
        }.bind(this)).length;
    }

    get completedCount() {
        return this.list.filter(function (todo) {
            return todo.completed;
        }.bind(this)).length;
    }

    getFilteredList() {
        return this.list.filter(this.state.filter);
    }

    toggleComplete(todo) {
        todo.completed = !todo.completed;
        this.update(todo);
    }

    filterList(func) {
        debugger
        State.setState({
            filter: func || this.filter
        });
    }

    editing(todo = null) {
        State.setState({
            editing: todo
        });
    }

    clearCompleted() {
        var todos = this.list.filter(function (todo) {
            return !todo.completed;
        }.bind(this));
        State.setState({
            list: todos
        });
    }

    toggleAll(isComplete = true) {
        var todos = this.list.map(function (todo) {
                todo.completed = isComplete;
                return todo;
            }.bind(this))
            ;
        State.setState({
            list: todos
        });
    }



    create(newTodo) {
        var completed = isPresent(newTodo.completed) ? newTodo.completed : false;
        var todo = {
            id: utils.UUID(),
            content: newTodo.content,
            completed: completed,
            created_at: utils.getDate()
        };
        var todos = this.list;
        todos.push(todo);
        State.setState({
            list: todos
        });
    }

    remove(todo_id) {
        var todos = this.list.filter(function (todo) {
            return todo.id !== todo_id;
        }.bind(this));
        State.setState({
            list: todos
        });
    }

    update(todo) {
        var todos = this.list;
        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id && todos[i].id === todo.id) {
                todos[i] = todo;
                break;
            }
        }
        State.setState({
            list: todos
        });
    }
}