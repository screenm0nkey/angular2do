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
    // this is a setter for 'isFocused' from es5
    set isFocused(value) {
        console.log('lowman', value, this.element.domElement);
        if (value) {
            this.element.domElement.focus();
        }
        return value;
    }
}


