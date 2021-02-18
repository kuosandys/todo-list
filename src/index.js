import "normalize.css";
import "./style.scss";

import { TodosModel, Todo } from "./todos_model";
import { ViewController } from "./view_controller.js";
import placeholderData from "./placeholder_data";

// Factory Function that creates the controller object with a single API method: startUp
const TodosController = () => {
  const model = TodosModel(placeholderData);
  const view = ViewController(Todo());

  // Initialize app
  const startUp = () => {
    // Initial render
    view.renderInitial();

    // Bind Controller actions to todosModel
    model.bindTodosChanged(handleTodosChanged);
    model.bindGotTodos(handleGotTodos);

    // Bind methods to event listeners in view controller
    view.bindRequestAddTodo(handleAddTodo);
    view.bindRequestDeleteTodo(handleDeleteTodo);
    view.bindRequestEditTodo(handleRequestTodo);
    view.bindRequestSaveTodo(handleRequestEditTodo);
    view.bindRequestCompleteTodo(handleRequestCompleteTodo);
    view.bindRequestByProject(handleRequestTodo);
    view.bindRequestClearCompleted(handleDeleteTodo);

    // Call handleTodosChanged to render all todo's in model
    handleTodosChanged(model.getTodos(), model.getProjects());
  };

  // Model -> View to render todos on change
  const handleTodosChanged = (todos, projects) => {
    view.renderTodos(todos);
    view.renderProjects(projects);
  };

  // View -> Model to add a new Todo
  const handleAddTodo = (inputObject) => {
    model.addTodo(inputObject);
  };

  // View -> Model to delete a Todo
  const handleDeleteTodo = (todoId) => {
    model.deleteTodo(todoId);
  };

  // View -> Model to get a Todo by id
  const handleRequestTodo = (key, value) => {
    model.getTodos(key, value);
  };

  // Model -> View to return requested Todo(s)
  const handleGotTodos = (key, todos) => {
    if (key === "id") {
      view.renderEditTodo(todos[0]);
    } else {
      view.renderTodos(todos);
    }
  };

  const handleRequestEditTodo = (inputObject, todoId) => {
    model.editTodo(inputObject, todoId);
  };

  const handleRequestCompleteTodo = (id) => {
    model.toggleTodoComplete(+id);
  };

  return {
    startUp,
  };
};

let app = TodosController();
app.startUp();
