import { TodosModel } from './todos_model.js';
import { ViewController } from './view_controller.js';

const appController = (() => {
    const model = TodosModel();
    const view = ViewController();

    const startUp = () => {
        model.bindUpdateTodoList(updateTodoList);
        view.renderInitial();
        updateTodoList(model.getAllTodos());
        view.bindAddTodo(handleAddTodo);
        view.bindDeleteTodo(handleDeleteTodo);
    };

    const updateTodoList = (todos) => {
        view.renderTodos(todos)
    };

    const handleAddTodo = (newFormInput) => {
        model.addTodo(newFormInput);
    };

    const handleDeleteTodo = (todoId) => {
        model.deleteTodo(todoId);
    }


    return {
        startUp
    };

})();

console.log('starting')
appController.startUp();