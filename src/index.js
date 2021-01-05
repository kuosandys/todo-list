import { TodosModel } from './todos_model.js';
import { ViewController } from './view_controller.js';

const App = (() => {
    const model = TodosModel();
    const view = ViewController();

    const TodoListChanged = (todos) => {
        view.renderTodos(todos)
    };

    const startUp = () => {
        view.renderInitial();
        TodoListChanged(model.getAllTodos());
    };

    return {
        startUp
    }

})();

App.startUp();