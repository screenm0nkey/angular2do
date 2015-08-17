import Utils from 'stores/common-utils';

var utils = new Utils();
var state = {
    list: [
        {
            id: utils.UUID(),
            content: 'create todo PR',
            completed: false,
            created_at: utils.getDate()
        },
        {
            id: utils.UUID(),
            content: 'fix filters',
            completed: true,
            created_at: utils.getDate()
        },
        {
            id: utils.UUID(),
            content: 'attend ng-conf',
            completed: false,
            created_at: utils.getDate()
        }
    ],
    // this is the default filter for the list. new filters are assigned
    // from the footer filter buttons
    filter: todo => todo,
    currentFilter: 'all',
    editing: null
};

class StateProvider {

    getState () {
        return state;
    }

    setState(newState) {
        Object.assign(state, newState);
        console.log('SET State', state);
        // Emit change
    }
}

export default new StateProvider()