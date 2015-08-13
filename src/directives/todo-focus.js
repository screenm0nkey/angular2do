import {Directive, NgElement} from 'angular2/angular2';

@Directive({
    selector: '[todo-focus]',
    properties: { 'isFocused': 'todo-focus'}
})
export class TodoFocus {
    constructor(el: NgElement) {
        this.element = el;
        console.log('todo-focus', el.domElement);
    }
    // this is a
    set isFocused(value) {
        if (value) {
            this.element.domElement.focus();
        }
        return value;
    }
}


