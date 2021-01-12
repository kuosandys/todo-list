/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var normalize_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! normalize.css */ \"./node_modules/normalize.css/normalize.css\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ \"./src/style.scss\");\n/* harmony import */ var _todos_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos_model */ \"./src/todos_model.js\");\n/* harmony import */ var _view_controller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view_controller.js */ \"./src/view_controller.js\");\n\n\n\n // Factory Function that creates the controller object with a single API method: startUp\n\nvar TodosController = function TodosController() {\n  var model = (0,_todos_model__WEBPACK_IMPORTED_MODULE_2__.TodosModel)();\n  var view = (0,_view_controller_js__WEBPACK_IMPORTED_MODULE_3__.ViewController)((0,_todos_model__WEBPACK_IMPORTED_MODULE_2__.Todo)()); // Initialize app\n\n  var startUp = function startUp() {\n    // Initial render\n    view.renderInitial(); // Bind Controller actions to todosModel\n\n    model.bindTodosChanged(handleTodosChanged);\n    model.bindGotTodos(handleGotTodos); // Bind methods to event listeners in view controller\n\n    view.bindRequestAddTodo(handleAddTodo);\n    view.bindRequestDeleteTodo(handleDeleteTodo);\n    view.bindRequestEditTodo(handleRequestTodo);\n    view.bindRequestSaveTodo(handleRequestEditTodo);\n    view.bindRequestCompleteTodo(handleRequestCompleteTodo);\n    view.bindRequestByProject(handleRequestTodo);\n    view.bindRequestClearCompleted(handleDeleteTodo); // Call handleTodosChanged to render all todo's in model\n\n    handleTodosChanged(model.getTodos(), model.getProjects());\n  }; // Model -> View to render todos on change\n\n\n  var handleTodosChanged = function handleTodosChanged(todos, projects) {\n    view.renderTodos(todos);\n    view.renderProjects(projects);\n  }; // View -> Model to add a new Todo\n\n\n  var handleAddTodo = function handleAddTodo(inputObject) {\n    model.addTodo(inputObject);\n  }; // View -> Model to delete a Todo\n\n\n  var handleDeleteTodo = function handleDeleteTodo(todoId) {\n    model.deleteTodo(todoId);\n  }; // View -> Model to get a Todo by id\n\n\n  var handleRequestTodo = function handleRequestTodo(key, value) {\n    model.getTodos(key, value);\n  }; // Model -> View to return requested Todo(s)\n\n\n  var handleGotTodos = function handleGotTodos(key, todos) {\n    if (key === 'id') {\n      view.renderEditTodo(todos[0]);\n    } else {\n      view.renderTodos(todos);\n    }\n\n    ;\n  };\n\n  var handleRequestEditTodo = function handleRequestEditTodo(inputObject, todoId) {\n    model.editTodo(inputObject, todoId);\n  };\n\n  var handleRequestCompleteTodo = function handleRequestCompleteTodo(id) {\n    model.toggleTodoComplete(+id);\n  };\n\n  return {\n    startUp: startUp\n  };\n};\n\nvar app = TodosController();\napp.startUp();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/todos_model.js":
/*!****************************!*\
  !*** ./src/todos_model.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TodosModel\": () => /* binding */ TodosModel,\n/* harmony export */   \"Todo\": () => /* binding */ Todo\n/* harmony export */ });\n// Factory function that creates a model to organize Todo's\nvar TodosModel = function TodosModel() {\n  var _todos = JSON.parse(localStorage.getItem('todos')) || [];\n\n  var _projectList = JSON.parse(localStorage.getItem('projects')) || [];\n\n  var todosCount = function () {\n    var max = 1;\n\n    _todos.forEach(function (todo) {\n      max = todo.id > max ? todo.id : max;\n    });\n\n    return max + 1;\n  }();\n\n  var todosChanged;\n  var gotTodos; // Creates a Todo and adds it to the appropriate project array\n\n  var addTodo = function addTodo(infoObject, id) {\n    var todo = Todo(infoObject['title'], infoObject['description'], infoObject['due'], infoObject['project'], id || todosCount++);\n\n    _todos.push(todo);\n\n    var project = todo['project'];\n    if (!_projectList.includes(project)) _projectList.push(project);\n\n    _saveChanges();\n  }; // Delete a Todo by id\n\n\n  var deleteTodo = function deleteTodo(id) {\n    _todos = _todos.filter(function (todo) {\n      return todo.id !== +id;\n    });\n\n    _saveChanges();\n  }; //edits a todo item - by storing a new todo object with the same id\n\n\n  var editTodo = function editTodo(todo, id) {\n    var todoSelected = _todos.find(function (todo) {\n      return todo['id'] == id;\n    });\n\n    var todoNew = Object.assign(todoSelected, todo);\n    _todos = _todos.filter(function (todo) {\n      return todo.id !== +id;\n    });\n\n    _todos.push(todoNew);\n\n    var project = todo['project'];\n    if (!_projectList.includes(project)) _projectList.push(project);\n\n    _saveChanges();\n  }; //get a todo from the _projectList by key and specified value\n\n\n  var getTodos = function getTodos(key, value) {\n    if (!key && !value) {\n      _saveChanges();\n\n      return _todos;\n    } else {\n      var todosFiltered = _todos.filter(function (todo) {\n        return todo[key] == value;\n      });\n\n      gotTodos(key, todosFiltered);\n    }\n\n    ;\n  }; // Get the list of projects\n\n\n  var getProjects = function getProjects() {\n    return _projectList;\n  };\n\n  var toggleTodoComplete = function toggleTodoComplete(id) {\n    var todoSelected = _todos.find(function (todo) {\n      return todo['id'] === id;\n    });\n\n    todoSelected['complete'] = !todoSelected['complete'];\n\n    _saveChanges();\n  }; // Bind a Controller action to todosChanged event\n\n\n  var bindTodosChanged = function bindTodosChanged(controllerAction) {\n    todosChanged = controllerAction;\n  }; // Bind a Controller action to gotTodo event\n\n\n  var bindGotTodos = function bindGotTodos(controllerAction) {\n    gotTodos = controllerAction;\n  };\n\n  var _saveChanges = function _saveChanges() {\n    _updateProjectList();\n\n    todosChanged(_todos, _projectList);\n    localStorage.setItem('todos', JSON.stringify(_todos));\n    localStorage.setItem('projects', JSON.stringify(_projectList));\n  };\n\n  var _updateProjectList = function _updateProjectList() {\n    _projectList = [];\n\n    _todos.forEach(function (todo) {\n      if (!_projectList.includes(todo['project'])) _projectList.push(todo['project']);\n    });\n\n    return _projectList;\n  };\n\n  return {\n    addTodo: addTodo,\n    deleteTodo: deleteTodo,\n    editTodo: editTodo,\n    getTodos: getTodos,\n    getProjects: getProjects,\n    toggleTodoComplete: toggleTodoComplete,\n    bindTodosChanged: bindTodosChanged,\n    bindGotTodos: bindGotTodos\n  };\n}; // Function factory to create Todo objects\n\n\nvar Todo = function Todo(title, description, due, project, id) {\n  var complete = false;\n  return {\n    title: title,\n    description: description,\n    due: due,\n    complete: complete,\n    project: project,\n    id: id\n  };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/todos_model.js?");

/***/ }),

/***/ "./src/view_controller.js":
/*!********************************!*\
  !*** ./src/view_controller.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ViewController\": () => /* binding */ ViewController\n/* harmony export */ });\n/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! date-fns */ \"./node_modules/date-fns/esm/format/index.js\");\n // Factory function that creates an object to interact with the DOM\n\nvar ViewController = function ViewController(Todo) {\n  // Create an empty Todo as a template\n  var templateTodo = Todo;\n  var root = document.body;\n  var newTodo;\n  var viewProjects;\n  var formDiv;\n  var backdropDiv;\n  var todosDiv;\n  var editTodoDiv;\n  var projectsDiv;\n  var formElements = [];\n  var projectList = []; // Initialize the display\n\n  var renderInitial = function renderInitial() {\n    // Header\n    var header = document.createElement('header'); // Title\n\n    var titleDiv = document.createElement('div');\n    titleDiv.classList.add('title');\n    var title = document.createElement('h1');\n    title.textContent = 'Things';\n    var description = document.createElement('h2');\n    description.textContent = 'to do';\n    titleDiv.appendChild(title);\n    titleDiv.appendChild(description);\n    header.appendChild(titleDiv); // Add New Todo button\n\n    newTodo = document.createElement('div');\n    newTodo.classList.add('new-todo');\n    var newButton = document.createElement('button');\n    newButton.innerHTML = '<i class=\"fas fa-plus\"></i>';\n    newButton.addEventListener('click', function (e) {\n      renderForm();\n      newTodo.classList.add('hide-new-todo-button');\n      viewProjects.classList.remove('show-projects-button');\n    });\n    newTodo.appendChild(newButton);\n    header.appendChild(newTodo); // View project list button\n\n    viewProjects = document.createElement('div');\n    viewProjects.classList.add('projects-button');\n    viewProjects.classList.add('show-projects-button');\n    var viewProjectsButton = document.createElement('button');\n    viewProjectsButton.innerHTML = '<i class=\"far fa-folder\"></i>';\n    viewProjects.addEventListener('click', function () {\n      projectsDiv.classList.toggle('show-projects-div');\n      backdropDiv.classList.toggle('show-backdrop');\n      newTodo.classList.toggle('hide-new-todo-button');\n    });\n    viewProjects.appendChild(viewProjectsButton);\n    header.appendChild(viewProjects);\n    root.appendChild(header); // Form div\n\n    formDiv = document.createElement('form');\n    formDiv.classList.add('form-div');\n    root.appendChild(formDiv); // Backdrop div - used to grey out background\n\n    backdropDiv = document.createElement('div');\n    backdropDiv.classList.add('backdrop');\n    root.appendChild(backdropDiv); // Todos div\n\n    todosDiv = document.createElement('div');\n    todosDiv.classList.add('todos-div');\n    root.appendChild(todosDiv); // Edit Todos div\n\n    editTodoDiv = document.createElement('div');\n    editTodoDiv.classList.add('edit-todo-div');\n    root.appendChild(editTodoDiv); // Projects view div\n\n    projectsDiv = document.createElement('div');\n    projectsDiv.classList.add('projects-div');\n    root.appendChild(projectsDiv);\n  }; // Render a form to add Todos from the templateTodo\n\n\n  var renderForm = function renderForm() {\n    formDiv.classList.add('show-form-div');\n    backdropDiv.classList.add('show-backdrop');\n    var title = document.createElement('p');\n    title.textContent = 'Remember to...';\n    formDiv.appendChild(title);\n    Object.keys(templateTodo).forEach(function (key) {\n      if (key === 'id' || key === 'complete') {\n        return;\n      }\n\n      ;\n      var newInput = document.createElement('input');\n\n      if (key === 'due') {\n        newInput.type = 'date';\n        newInput.value = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(new Date(), 'yyyy-MM-dd');\n      } else if (key === 'description') {\n        newInput = document.createElement('textarea');\n        newInput.placeholder = 'Notes e.g. don\\'t use floo powder';\n        newInput.rows = '3';\n      } else {\n        newInput.type = 'text';\n        newInput.value = key === 'project' ? 'New Project' : '';\n        newInput.placeholder = key === 'title' ? 'Task e.g. go to Diagon Alley' : '';\n      }\n\n      ;\n      newInput.name = key;\n      formDiv.appendChild(newInput);\n      formElements.push(newInput);\n    }); // submit button to add new todo\n\n    var submitButton = document.createElement('button');\n    submitButton.classList.add('submit-form');\n    submitButton.type = 'submit';\n    submitButton.textContent = 'Add';\n    formDiv.appendChild(submitButton); // cancel button to clear and hide form\n\n    var cancelButton = document.createElement('button');\n    cancelButton.id = 'cancel-form';\n    cancelButton.classList.add('cancel-button');\n    cancelButton.innerHTML = '<i class=\"fas fa-times\"></i>';\n    cancelButton.type = 'reset';\n    cancelButton.addEventListener('click', function (e) {\n      e.preventDefault();\n\n      _hideForm();\n    });\n    formDiv.appendChild(cancelButton);\n  }; // Clear and hide the form\n\n\n  var _hideForm = function _hideForm() {\n    while (formDiv.firstChild) {\n      formDiv.removeChild(formDiv.lastChild);\n    }\n\n    ;\n    formElements = []; // Show button to create form again\n\n    newTodo.classList.remove('hide-new-todo-button'); // Show button for project view again\n\n    viewProjects.classList.add('show-projects-button');\n    formDiv.classList.remove('show-form-div');\n    backdropDiv.classList.remove('show-backdrop');\n  }; // Render an array of Todos\n\n\n  var renderTodos = function renderTodos(todos) {\n    backdropDiv.classList.remove('show-backdrop');\n    newTodo.classList.remove('hide-new-todo-button');\n    projectsDiv.classList.remove('show-projects-div'); // Delete all elements from the Todos div\n\n    while (todosDiv.firstChild) {\n      todosDiv.removeChild(todosDiv.lastChild);\n    }\n\n    ; // Create a separate div to display completed Todos\n\n    var todosCompletedDiv = document.createElement('div');\n    todosCompletedDiv.classList.add('todos-completed-div'); // 'Tasks' label for subsection\n\n    var taskLabel = document.createElement('p');\n    taskLabel.classList.add('todos-label');\n    var taskCount = 0;\n    todosDiv.appendChild(taskLabel); // 'Completed' label for section\n\n    var completedLabel = document.createElement('p');\n    completedLabel.classList.add('todos-label');\n    var completedCount = 0;\n    todosCompletedDiv.appendChild(completedLabel); // Clear completed Todos button\n\n    var clearCompletedTodos = document.createElement('p');\n    clearCompletedTodos.textContent = 'Clear';\n    clearCompletedTodos.classList.add('clear-completed-todos');\n    todosCompletedDiv.appendChild(clearCompletedTodos); // Sort Todos by id descending to show latest add on top\n\n    todos = todos.sort(function (a, b) {\n      return b.id - a.id;\n    });\n    todos.forEach(function (todo) {\n      var todoDiv = _renderTodo(todo);\n\n      if (todo.complete === true) {\n        todosCompletedDiv.appendChild(todoDiv);\n        completedCount++;\n      } else {\n        todosDiv.appendChild(todoDiv);\n        taskCount++;\n      }\n\n      ;\n    });\n    taskLabel.textContent = \"Tasks (\".concat(taskCount, \")\");\n    completedLabel.textContent = \"Completed (\".concat(completedCount, \")\"); // Display placeholder text if no Todos\n\n    if (taskCount === 0) {\n      var p = document.createElement('p');\n      p.classList.add('no-todo-placeholder-text');\n      p.textContent = 'Nothing to do yet...';\n      todosDiv.appendChild(p);\n    } // Hide completed Todos div if empty\n\n\n    if (completedCount === 0) {\n      todosCompletedDiv.classList.add('hide-todos-completed-div');\n    }\n\n    todosDiv.appendChild(todosCompletedDiv);\n  }; // Render a single Todo\n\n\n  var _renderTodo = function _renderTodo(todo) {\n    // Create a div for each todo todo\n    var todoDiv = document.createElement('div');\n    todoDiv.classList.add('todo-div');\n    var todoTitleDiv = document.createElement('div');\n    todoTitleDiv.classList.add('todo-title-div'); // Iterate through the keys of the todo\n\n    for (var key in todo) {\n      if (key === 'id') {\n        todoDiv.id = todo[key];\n      } else if (todo.hasOwnProperty(key)) {\n        var p = document.createElement('p');\n\n        if (key === 'complete') {\n          p.innerHTML = '<i class=\"fas fa-check\"></i>';\n          p.setAttribute('data-complete', todo[key]);\n\n          if (todo[key] === true) {\n            p.classList.add('completed');\n            todoDiv.classList.add('completed-todo');\n          }\n\n          ;\n        } else if (key === 'due') {\n          p.textContent = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(new Date(todo[key]), 'dd MMM, yyyy');\n        } else if (key === 'description' && todo[key] === '') {\n          p.textContent = 'No notes yet...';\n          p.classList.add('todo-placeholder-text');\n        } else {\n          p.textContent = todo[key];\n        }\n\n        ;\n        p.classList.add(\"todo-\".concat(key));\n\n        if (key === 'title') {\n          todoTitleDiv.appendChild(p);\n          todoDiv.appendChild(todoTitleDiv);\n        } else {\n          todoDiv.appendChild(p);\n        }\n\n        ;\n      }\n\n      ;\n    }\n\n    ; // click on title to expand Todo\n\n    todoTitleDiv.addEventListener('click', function () {\n      todoDiv.classList.toggle('expanded-todo');\n    }); // delete button\n\n    var deleteButton = document.createElement('button');\n    deleteButton.innerHTML = '<i class=\"far fa-trash-alt\"></i>';\n    deleteButton.classList.add('delete-todo');\n    todoDiv.appendChild(deleteButton); // edit button\n\n    var editButton = document.createElement('button');\n    editButton.innerHTML = '<i class=\"fas fa-pencil-alt\"></i>';\n    editButton.classList.add('edit-todo');\n    todoDiv.appendChild(editButton);\n    return todoDiv;\n  };\n\n  var renderProjects = function renderProjects(projects) {\n    while (projectsDiv.firstChild) {\n      projectsDiv.removeChild(projectsDiv.lastChild);\n    }\n\n    ;\n    var divTitle = document.createElement('div');\n    divTitle.classList.add('projects-title');\n    var projectsDivTitle = document.createElement('p');\n    projectsDivTitle.textContent = 'Projects';\n    divTitle.appendChild(projectsDivTitle);\n    projectsDiv.appendChild(divTitle);\n\n    if (projects.length === 0) {\n      var div = document.createElement('div');\n      div.classList.add('projects-placeholder');\n      var placeholder = document.createElement('p');\n      placeholder.textContent = 'No projects yet...';\n      div.appendChild(placeholder);\n      projectsDiv.appendChild(div);\n    }\n\n    ;\n    projectList = [];\n    projects.forEach(function (project) {\n      var div = document.createElement('div');\n      div.classList.add('project-div');\n      var p = document.createElement('p');\n      p.textContent = project;\n      p.classList.add('project-name');\n      div.appendChild(p);\n      projectList.push(p);\n      projectsDiv.appendChild(div);\n    });\n    var divBottom = document.createElement('div');\n    divBottom.classList.add('project-div', 'view-all-todos');\n    var p = document.createElement('p');\n    p.textContent = 'View All Todos';\n    divBottom.appendChild(p);\n    projectsDiv.appendChild(divBottom);\n  }; // Render a form to edit Todo\n\n\n  var renderEditTodo = function renderEditTodo(todo) {\n    editTodoDiv.classList.add('show-edit-div');\n    backdropDiv.classList.add('show-backdrop');\n    viewProjects.classList.remove('show-projects-button');\n    newTodo.classList.add('hide-new-todo-button');\n    var title = document.createElement('p');\n    title.textContent = 'On second thought...';\n    editTodoDiv.appendChild(title);\n    Object.keys(todo).forEach(function (key) {\n      if (key === 'id' || key === 'complete') {\n        return;\n      }\n\n      ;\n      var newInput = document.createElement('input');\n\n      if (key === 'due') {\n        newInput.type = 'date';\n        newInput.value = (0,date_fns__WEBPACK_IMPORTED_MODULE_0__.default)(new Date(todo[key]), 'yyyy-MM-dd');\n      } else {\n        newInput.type = 'text';\n        newInput.value = todo[key];\n      }\n\n      ;\n      newInput.name = key;\n      formElements.push(newInput);\n      editTodoDiv.appendChild(newInput);\n    }); // save edit button\n\n    var saveEditButton = document.createElement('button');\n    saveEditButton.textContent = 'Save Edit';\n    saveEditButton.classList.add('save-todo-edit');\n    saveEditButton.id = todo['id'];\n    editTodoDiv.appendChild(saveEditButton); // cancel edit button\n\n    var cancelButton = document.createElement('button');\n    cancelButton.innerHTML = '<i class=\"fas fa-times\"></i>';\n    cancelButton.id = 'cancel-todo-edit';\n    cancelButton.classList.add('cancel-button');\n    cancelButton.addEventListener('click', function (e) {\n      e.preventDefault();\n\n      _hideEdit();\n    });\n    editTodoDiv.appendChild(cancelButton);\n  }; // Hide the Edit Todo div\n\n\n  var _hideEdit = function _hideEdit() {\n    while (editTodoDiv.firstChild) {\n      editTodoDiv.removeChild(editTodoDiv.lastChild);\n    }\n\n    ;\n    formElements = [];\n    editTodoDiv.classList.remove('show-edit-div');\n    backdropDiv.classList.remove('show-backdrop');\n    viewProjects.classList.add('show-projects-button');\n    var newTodo = document.getElementsByClassName('new-todo')[0];\n    newTodo.classList.remove('hide-new-todo-button');\n  }; // Return form input if valid, else false\n\n\n  var _getFormInput = function _getFormInput() {\n    var inputObject = {};\n    formElements.forEach(function (element) {\n      if (element.name === 'due') {\n        inputObject[element.name] = element.valueAsDate;\n      } else {\n        inputObject[element.name] = element.value;\n      }\n    });\n    return _verifyFormInput(inputObject);\n  }; // Verify the form input\n\n\n  var _verifyFormInput = function _verifyFormInput(inputObject) {\n    if (inputObject.title === '') {\n      alert('Please add the name of your task!');\n      return false;\n    } else if (inputObject.project === '') {\n      inputObject.project = 'Untitled Project';\n      return inputObject;\n    } else {\n      return inputObject;\n    }\n\n    ;\n  };\n\n  var _getCompletedIds = function _getCompletedIds() {\n    var ids = [];\n    var completedTodos = Array.from(document.getElementsByClassName('completed-todo'));\n    completedTodos.forEach(function (todo) {\n      ids.push(todo.id);\n    });\n    return ids;\n  }; // Bind methods: binds an event to a controller method\n  // Form submission button to send the form input\n\n\n  var bindRequestAddTodo = function bindRequestAddTodo(controllerAction) {\n    formDiv.addEventListener('submit', function (e) {\n      e.preventDefault();\n\n      var inputObject = _getFormInput();\n\n      if (inputObject) {\n        controllerAction(inputObject);\n\n        _hideForm();\n      } else {\n        return;\n      }\n\n      ;\n    });\n  }; // Delete Todo buttons send the id of the Todo for deletion\n\n\n  var bindRequestDeleteTodo = function bindRequestDeleteTodo(controllerAction) {\n    todosDiv.addEventListener('click', function (e) {\n      if (e.target.classList.contains('fa-trash-alt' || 0)) {\n        // confirm the delete\n        var confirmation = confirm('Are you sure you want to delete this task?');\n\n        if (confirmation) {\n          var id = e.target.parentElement.parentElement.id;\n          controllerAction(id);\n        } else {\n          return;\n        }\n      }\n\n      ;\n    });\n  }; // Edit Todo buttons send the id of the Todo for edit\n\n\n  var bindRequestEditTodo = function bindRequestEditTodo(controllerAction) {\n    todosDiv.addEventListener('click', function (e) {\n      if (e.target.classList.contains('fa-pencil-alt' || 0)) {\n        var id = e.target.parentElement.parentElement.id;\n        controllerAction('id', +id);\n      }\n\n      ;\n    });\n  }; // Save Todo buttons send the editted Todo and its id\n\n\n  var bindRequestSaveTodo = function bindRequestSaveTodo(controllerAction) {\n    editTodoDiv.addEventListener('click', function (e) {\n      if (e.target.classList.contains('save-todo-edit')) {\n        var id = e.target.id;\n\n        var inputObject = _getFormInput();\n\n        if (inputObject) {\n          controllerAction(inputObject, id);\n\n          _hideEdit();\n        } else {\n          return;\n        }\n\n        ;\n      }\n\n      ;\n    });\n  }; // Toggle Complete status of Todos\n\n\n  var bindRequestCompleteTodo = function bindRequestCompleteTodo(controllerAction) {\n    todosDiv.addEventListener('click', function (e) {\n      if (e.target.classList.contains('fa-check' || 0)) {\n        var _boolean = e.target.parentElement.getAttribute('data-complete');\n\n        e.target.parentElement.setAttribute('data-complete', !_boolean);\n        var id = e.target.parentElement.parentElement.id;\n        controllerAction(id);\n      }\n    });\n  };\n\n  var bindRequestByProject = function bindRequestByProject(controllerAction) {\n    projectsDiv.addEventListener('click', function (e) {\n      if (e.target.classList.contains('project-name')) {\n        controllerAction('project', e.target.textContent);\n      } else {\n        controllerAction();\n      }\n    });\n  };\n\n  var bindRequestClearCompleted = function bindRequestClearCompleted(controllerAction) {\n    todosDiv.addEventListener('click', function (e) {\n      if (e.target.classList.contains('clear-completed-todos')) {\n        var confirmation = confirm('Are you sure you want to clear?');\n\n        if (confirmation) {\n          _getCompletedIds().forEach(function (id) {\n            return controllerAction(id);\n          });\n        } else {\n          return;\n        }\n\n        ;\n      }\n\n      ;\n    });\n  };\n\n  return {\n    renderInitial: renderInitial,\n    renderTodos: renderTodos,\n    renderProjects: renderProjects,\n    renderEditTodo: renderEditTodo,\n    bindRequestAddTodo: bindRequestAddTodo,\n    bindRequestDeleteTodo: bindRequestDeleteTodo,\n    bindRequestEditTodo: bindRequestEditTodo,\n    bindRequestSaveTodo: bindRequestSaveTodo,\n    bindRequestCompleteTodo: bindRequestCompleteTodo,\n    bindRequestByProject: bindRequestByProject,\n    bindRequestClearCompleted: bindRequestClearCompleted\n  };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/view_controller.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css":
/*!*******************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css ***!
  \*******************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\\n/* Document\\n   ========================================================================== */\\n/**\\n * 1. Correct the line height in all browsers.\\n * 2. Prevent adjustments of font size after orientation changes in iOS.\\n */\\nhtml {\\n  line-height: 1.15;\\n  /* 1 */\\n  -webkit-text-size-adjust: 100%;\\n  /* 2 */\\n}\\n\\n/* Sections\\n   ========================================================================== */\\n/**\\n * Remove the margin in all browsers.\\n */\\nbody {\\n  margin: 0;\\n}\\n\\n/**\\n * Render the `main` element consistently in IE.\\n */\\nmain {\\n  display: block;\\n}\\n\\n/**\\n * Correct the font size and margin on `h1` elements within `section` and\\n * `article` contexts in Chrome, Firefox, and Safari.\\n */\\nh1 {\\n  font-size: 2em;\\n  margin: 0.67em 0;\\n}\\n\\n/* Grouping content\\n   ========================================================================== */\\n/**\\n * 1. Add the correct box sizing in Firefox.\\n * 2. Show the overflow in Edge and IE.\\n */\\nhr {\\n  box-sizing: content-box;\\n  /* 1 */\\n  height: 0;\\n  /* 1 */\\n  overflow: visible;\\n  /* 2 */\\n}\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\npre {\\n  font-family: monospace, monospace;\\n  /* 1 */\\n  font-size: 1em;\\n  /* 2 */\\n}\\n\\n/* Text-level semantics\\n   ========================================================================== */\\n/**\\n * Remove the gray background on active links in IE 10.\\n */\\na {\\n  background-color: transparent;\\n}\\n\\n/**\\n * 1. Remove the bottom border in Chrome 57-\\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\\n */\\nabbr[title] {\\n  border-bottom: none;\\n  /* 1 */\\n  text-decoration: underline;\\n  /* 2 */\\n  text-decoration: underline dotted;\\n  /* 2 */\\n}\\n\\n/**\\n * Add the correct font weight in Chrome, Edge, and Safari.\\n */\\nb,\\nstrong {\\n  font-weight: bolder;\\n}\\n\\n/**\\n * 1. Correct the inheritance and scaling of font size in all browsers.\\n * 2. Correct the odd `em` font sizing in all browsers.\\n */\\ncode,\\nkbd,\\nsamp {\\n  font-family: monospace, monospace;\\n  /* 1 */\\n  font-size: 1em;\\n  /* 2 */\\n}\\n\\n/**\\n * Add the correct font size in all browsers.\\n */\\nsmall {\\n  font-size: 80%;\\n}\\n\\n/**\\n * Prevent `sub` and `sup` elements from affecting the line height in\\n * all browsers.\\n */\\nsub,\\nsup {\\n  font-size: 75%;\\n  line-height: 0;\\n  position: relative;\\n  vertical-align: baseline;\\n}\\n\\nsub {\\n  bottom: -0.25em;\\n}\\n\\nsup {\\n  top: -0.5em;\\n}\\n\\n/* Embedded content\\n   ========================================================================== */\\n/**\\n * Remove the border on images inside links in IE 10.\\n */\\nimg {\\n  border-style: none;\\n}\\n\\n/* Forms\\n   ========================================================================== */\\n/**\\n * 1. Change the font styles in all browsers.\\n * 2. Remove the margin in Firefox and Safari.\\n */\\nbutton,\\ninput,\\noptgroup,\\nselect,\\ntextarea {\\n  font-family: inherit;\\n  /* 1 */\\n  font-size: 100%;\\n  /* 1 */\\n  line-height: 1.15;\\n  /* 1 */\\n  margin: 0;\\n  /* 2 */\\n}\\n\\n/**\\n * Show the overflow in IE.\\n * 1. Show the overflow in Edge.\\n */\\nbutton,\\ninput {\\n  /* 1 */\\n  overflow: visible;\\n}\\n\\n/**\\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\\n * 1. Remove the inheritance of text transform in Firefox.\\n */\\nbutton,\\nselect {\\n  /* 1 */\\n  text-transform: none;\\n}\\n\\n/**\\n * Correct the inability to style clickable types in iOS and Safari.\\n */\\nbutton,\\n[type=button],\\n[type=reset],\\n[type=submit] {\\n  -webkit-appearance: button;\\n}\\n\\n/**\\n * Remove the inner border and padding in Firefox.\\n */\\nbutton::-moz-focus-inner,\\n[type=button]::-moz-focus-inner,\\n[type=reset]::-moz-focus-inner,\\n[type=submit]::-moz-focus-inner {\\n  border-style: none;\\n  padding: 0;\\n}\\n\\n/**\\n * Restore the focus styles unset by the previous rule.\\n */\\nbutton:-moz-focusring,\\n[type=button]:-moz-focusring,\\n[type=reset]:-moz-focusring,\\n[type=submit]:-moz-focusring {\\n  outline: 1px dotted ButtonText;\\n}\\n\\n/**\\n * Correct the padding in Firefox.\\n */\\nfieldset {\\n  padding: 0.35em 0.75em 0.625em;\\n}\\n\\n/**\\n * 1. Correct the text wrapping in Edge and IE.\\n * 2. Correct the color inheritance from `fieldset` elements in IE.\\n * 3. Remove the padding so developers are not caught out when they zero out\\n *    `fieldset` elements in all browsers.\\n */\\nlegend {\\n  box-sizing: border-box;\\n  /* 1 */\\n  color: inherit;\\n  /* 2 */\\n  display: table;\\n  /* 1 */\\n  max-width: 100%;\\n  /* 1 */\\n  padding: 0;\\n  /* 3 */\\n  white-space: normal;\\n  /* 1 */\\n}\\n\\n/**\\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\\n */\\nprogress {\\n  vertical-align: baseline;\\n}\\n\\n/**\\n * Remove the default vertical scrollbar in IE 10+.\\n */\\ntextarea {\\n  overflow: auto;\\n}\\n\\n/**\\n * 1. Add the correct box sizing in IE 10.\\n * 2. Remove the padding in IE 10.\\n */\\n[type=checkbox],\\n[type=radio] {\\n  box-sizing: border-box;\\n  /* 1 */\\n  padding: 0;\\n  /* 2 */\\n}\\n\\n/**\\n * Correct the cursor style of increment and decrement buttons in Chrome.\\n */\\n[type=number]::-webkit-inner-spin-button,\\n[type=number]::-webkit-outer-spin-button {\\n  height: auto;\\n}\\n\\n/**\\n * 1. Correct the odd appearance in Chrome and Safari.\\n * 2. Correct the outline style in Safari.\\n */\\n[type=search] {\\n  -webkit-appearance: textfield;\\n  /* 1 */\\n  outline-offset: -2px;\\n  /* 2 */\\n}\\n\\n/**\\n * Remove the inner padding in Chrome and Safari on macOS.\\n */\\n[type=search]::-webkit-search-decoration {\\n  -webkit-appearance: none;\\n}\\n\\n/**\\n * 1. Correct the inability to style clickable types in iOS and Safari.\\n * 2. Change font properties to `inherit` in Safari.\\n */\\n::-webkit-file-upload-button {\\n  -webkit-appearance: button;\\n  /* 1 */\\n  font: inherit;\\n  /* 2 */\\n}\\n\\n/* Interactive\\n   ========================================================================== */\\n/*\\n * Add the correct display in Edge, IE 10+, and Firefox.\\n */\\ndetails {\\n  display: block;\\n}\\n\\n/*\\n * Add the correct display in all browsers.\\n */\\nsummary {\\n  display: list-item;\\n}\\n\\n/* Misc\\n   ========================================================================== */\\n/**\\n * Add the correct display in IE 10+.\\n */\\ntemplate {\\n  display: none;\\n}\\n\\n/**\\n * Add the correct display in IE 10.\\n */\\n[hidden] {\\n  display: none;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todo-list/./node_modules/normalize.css/normalize.css?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);\n// Imports\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n  box-sizing: border-box;\\n  line-height: 1.2;\\n}\\n\\nhtml {\\n  font-family: \\\"Nunito\\\", \\\"Arial\\\", sans-serif;\\n  margin: 0;\\n  padding: 0;\\n}\\n\\nbody {\\n  margin: 0;\\n  padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);\\n  background-color: #e2e6e9;\\n  -webkit-text-size-adjust: none;\\n}\\n\\nbutton {\\n  border: none;\\n  -webkit-appearance: none;\\n  -moz-appearance: none;\\n  appearance: none;\\n  cursor: pointer;\\n}\\n\\ninput {\\n  -webkit-appearance: none;\\n  -moz-appearance: none;\\n  appearance: none;\\n}\\n\\np {\\n  color: #212121;\\n}\\n\\nheader {\\n  position: fixed;\\n  top: 0;\\n  width: 100%;\\n  min-width: 300px;\\n  height: 80px;\\n  background-color: #f7f7f8;\\n  border-bottom: 6px solid #aad3d5;\\n  z-index: 5;\\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\\n  display: flex;\\n  align-items: center;\\n  justify-content: flex-end;\\n  padding: 12px;\\n}\\n\\n.title {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  padding: 6px 14px;\\n  height: 68px;\\n  display: flex;\\n  align-items: flex-start;\\n}\\n.title h1 {\\n  color: #212121;\\n  font-size: 30px;\\n  font-weight: 600;\\n}\\n.title h2 {\\n  color: #229aa0;\\n  font-size: 16px;\\n  font-style: italic;\\n  font-weight: 400;\\n  margin-left: 4px;\\n}\\n\\n.new-todo {\\n  order: 3;\\n  visibility: visible;\\n}\\n.new-todo button {\\n  height: 48px;\\n  width: 48px;\\n  border-radius: 7px;\\n  background-color: #13767c;\\n  color: #f7f7f8;\\n  font-size: 20px;\\n  line-height: 1;\\n  padding: 0;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n}\\n\\n.hide-new-todo-button {\\n  visibility: hidden;\\n}\\n\\n.projects-button {\\n  visibility: hidden;\\n}\\n\\n.show-projects-button {\\n  order: 2;\\n  margin: 6px;\\n  visibility: visible;\\n}\\n.show-projects-button button {\\n  height: 48px;\\n  width: 48px;\\n  border-radius: 7px;\\n  background-color: #13767c;\\n  color: #f7f7f8;\\n  font-size: 20px;\\n  line-height: 1;\\n  padding: 0;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n}\\n\\n.projects-div {\\n  display: none;\\n}\\n\\n.show-projects-div {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: stretch;\\n  justify-content: space-around;\\n  max-height: 360px;\\n  height: auto;\\n  width: 100%;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  margin-top: 80px;\\n  z-index: 10;\\n  border-bottom: 1px solid #b3b6bc;\\n  border-bottom-left-radius: 7px;\\n  border-bottom-right-radius: 7px;\\n  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.2);\\n  background-color: #e0eaeb;\\n  padding: 36px;\\n  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);\\n}\\n.show-projects-div p {\\n  text-align: center;\\n  margin: 0;\\n}\\n.show-projects-div .project-div {\\n  cursor: pointer;\\n  margin: 0 auto 12px;\\n}\\n.show-projects-div .project-div p {\\n  color: #13767c;\\n  font-size: 16px;\\n  text-decoration: underline;\\n}\\n.show-projects-div .projects-title {\\n  text-transform: uppercase;\\n  letter-spacing: -0.02em;\\n  font-size: 20px;\\n  margin: 0 auto 14px;\\n}\\n.show-projects-div .projects-placeholder {\\n  margin: 12px auto 24px;\\n}\\n.show-projects-div .projects-placeholder p {\\n  font-style: italic;\\n  color: #b3b6bc;\\n}\\n\\n.todos-div {\\n  position: absolute;\\n  top: 80px;\\n  width: 100%;\\n  min-width: 300px;\\n  height: auto;\\n  background-color: #e2e6e9;\\n  z-index: 0;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: flex-start;\\n}\\n.todos-div * {\\n  margin: 0;\\n}\\n.todos-div .no-todo-placeholder-text {\\n  text-align: center;\\n  font-style: italic;\\n  color: #13767c;\\n}\\n\\n.todos-label {\\n  margin: 20px 12px 6px;\\n  text-transform: uppercase;\\n  color: #505458;\\n  font-size: 16px;\\n  letter-spacing: -0.02em;\\n}\\n\\n.todos-completed-div {\\n  margin-top: 0;\\n  position: relative;\\n}\\n\\n.hide-todos-completed-div {\\n  display: none;\\n}\\n\\n.clear-completed-todos {\\n  position: absolute;\\n  right: 12px;\\n  top: 20px;\\n  text-transform: uppercase;\\n  letter-spacing: -0.02em;\\n  text-decoration: underline;\\n  margin: 0;\\n  color: #13767c;\\n  cursor: pointer;\\n}\\n\\n.todo-div {\\n  position: relative;\\n  font-size: 16px;\\n  height: 72px;\\n  flex-grow: 1;\\n  border: 1px solid #e2e6e9;\\n  border-radius: 7px;\\n  padding: 14px 24px 16px 16px;\\n  background-color: #f7f7f8;\\n  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);\\n  margin: 0 6px 6px;\\n  display: flex;\\n  flex-direction: column;\\n}\\n.todo-div .todo-due {\\n  margin: 0 0 0 54px;\\n  font-size: 12px;\\n  text-transform: uppercase;\\n  letter-spacing: -0.02em;\\n  color: #13767c;\\n}\\n.todo-div .todo-description {\\n  display: none;\\n}\\n.todo-div .todo-project {\\n  display: none;\\n}\\n.todo-div .delete-todo {\\n  display: none;\\n}\\n.todo-div .edit-todo {\\n  display: none;\\n}\\n\\n.todo-title-div {\\n  margin: 0 0 0 54px;\\n  display: flex;\\n  align-items: stretch;\\n  min-height: 24px;\\n  cursor: pointer;\\n  padding: 0;\\n}\\n.todo-title-div .todo-title {\\n  font-size: 20px;\\n  margin: 0;\\n  align-items: stretch;\\n  white-space: nowrap;\\n  overflow: hidden;\\n  text-overflow: ellipsis;\\n  color: #373b3e;\\n  font-weight: 600;\\n}\\n\\n.todo-complete {\\n  height: 36px;\\n  width: 36px;\\n  margin: 0;\\n  position: absolute;\\n  top: 18px;\\n  left: 18px;\\n  border: 3px solid #aad3d5;\\n  border-radius: 36px;\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n  cursor: pointer;\\n}\\n.todo-complete i::before {\\n  height: 36px;\\n  width: 36px;\\n  font-size: 20px;\\n  color: #cadddd;\\n}\\n\\n.completed-todo .todo-title {\\n  text-decoration: line-through;\\n  color: #b3b6bc;\\n  font-weight: 400;\\n}\\n.completed-todo .todo-due, .completed-todo .todo-project {\\n  color: #b3b6bc !important;\\n}\\n.completed-todo button {\\n  background-color: #b3b6bc !important;\\n}\\n\\n.completed {\\n  background-color: #aad3d5;\\n  border: 3px solid #aad3d5;\\n}\\n.completed i::before {\\n  color: #f7f7f8;\\n}\\n\\n.expanded-todo {\\n  height: auto;\\n  min-height: 180px;\\n  max-height: 216px;\\n  background-color: #f7f7f8;\\n  border: 1px solid #e2e6e9;\\n  border-radius: 7px;\\n  padding-bottom: 20px;\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: baseline;\\n}\\n.expanded-todo .todo-title {\\n  overflow-x: scroll;\\n}\\n.expanded-todo .todo-description {\\n  order: 2;\\n  display: initial;\\n  margin: 6px 0 0 54px;\\n  overflow-y: scroll;\\n  white-space: pre-wrap;\\n}\\n.expanded-todo .todo-placeholder-text {\\n  font-style: italic;\\n  color: #b3b6bc;\\n}\\n.expanded-todo .todo-project {\\n  order: 1;\\n  display: initial;\\n  margin: 14px 0 0 54px;\\n  padding-top: 14px;\\n  border-top: 1px solid #e2e6e9;\\n  color: #13767c;\\n}\\n.expanded-todo button {\\n  color: #f7f7f8;\\n  background-color: #229aa0;\\n  margin: 0;\\n  padding: 0;\\n}\\n.expanded-todo .delete-todo {\\n  display: initial;\\n  position: absolute;\\n  top: 128px;\\n  left: 20px;\\n  height: 30px;\\n  width: 30px;\\n  border-radius: 7px;\\n}\\n.expanded-todo .delete-todo i::before {\\n  text-align: center;\\n  font-size: 16px;\\n  line-height: 1;\\n}\\n.expanded-todo .edit-todo {\\n  display: initial;\\n  position: absolute;\\n  top: 84px;\\n  left: 20px;\\n  height: 30px;\\n  width: 30px;\\n  border-radius: 7px;\\n}\\n.expanded-todo .edit-todo i::before {\\n  text-align: center;\\n  font-size: 14px;\\n  line-height: 1;\\n}\\n\\n.form-div {\\n  display: none;\\n}\\n\\n.show-form-div {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: space-around;\\n  max-height: 360px;\\n  height: auto;\\n  width: 100%;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  margin-top: 80px;\\n  z-index: 10;\\n  border-bottom: 1px solid #b3b6bc;\\n  border-bottom-left-radius: 7px;\\n  border-bottom-right-radius: 7px;\\n  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);\\n  background-color: #cadddd;\\n  padding: 36px;\\n}\\n.show-form-div input, .show-form-div textarea {\\n  width: 80%;\\n  height: auto;\\n  font-size: 16px;\\n  margin: 0 auto 14px;\\n  color: #505458;\\n  background-color: #e2e6e9;\\n  border: none;\\n  border-radius: 7px;\\n  padding: 6px;\\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 -2px 0 rgba(0, 0, 0, 0.1);\\n}\\n.show-form-div input ::placeholder, .show-form-div textarea ::placeholder {\\n  font-style: italic;\\n}\\n.show-form-div textarea {\\n  resize: none;\\n}\\n.show-form-div p {\\n  font-size: 20px;\\n  margin: 0 auto 12px;\\n  color: #212121;\\n  font-style: italic;\\n}\\n.show-form-div button {\\n  text-transform: uppercase;\\n  letter-spacing: -0.02em;\\n  padding: 12px 24px;\\n  font-size: 16px;\\n  font-weight: 600;\\n  border: 1px solid #229aa0;\\n  border-radius: 7px;\\n  background-color: #229aa0;\\n  color: #f7f7f8;\\n  align-items: center;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n  margin-top: 6px;\\n}\\n.show-form-div .cancel-button {\\n  height: 48px;\\n  width: 48px;\\n  border-radius: 7px;\\n  background-color: #13767c;\\n  color: #f7f7f8;\\n  font-size: 20px;\\n  line-height: 1;\\n  padding: 0;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n  position: absolute;\\n  top: -67px;\\n  right: 12px;\\n  background-color: #13767c;\\n  border: none;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n  margin: 0;\\n}\\n\\n.backdrop {\\n  display: none;\\n}\\n\\n.show-backdrop {\\n  display: initial;\\n  width: 100%;\\n  height: 100%;\\n  position: fixed;\\n  top: 80px;\\n  background-color: #818388;\\n  opacity: 0.4;\\n  z-index: 9;\\n}\\n\\n.edit-todo-div {\\n  display: none;\\n}\\n\\n.show-edit-div {\\n  display: flex;\\n  flex-direction: column;\\n  align-items: center;\\n  justify-content: space-around;\\n  max-height: 360px;\\n  height: auto;\\n  width: 100%;\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n  margin-top: 80px;\\n  z-index: 10;\\n  border-bottom: 1px solid #b3b6bc;\\n  border-bottom-left-radius: 7px;\\n  border-bottom-right-radius: 7px;\\n  box-shadow: inset 0 2px 2px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2);\\n  background-color: #cadddd;\\n  padding: 36px;\\n}\\n.show-edit-div input, .show-edit-div textarea {\\n  width: 80%;\\n  height: auto;\\n  font-size: 16px;\\n  margin: 0 auto 14px;\\n  color: #505458;\\n  background-color: #e2e6e9;\\n  border: none;\\n  border-radius: 7px;\\n  padding: 6px;\\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 -2px 0 rgba(0, 0, 0, 0.1);\\n}\\n.show-edit-div input ::placeholder, .show-edit-div textarea ::placeholder {\\n  font-style: italic;\\n}\\n.show-edit-div textarea {\\n  resize: none;\\n}\\n.show-edit-div p {\\n  font-size: 20px;\\n  margin: 0 auto 12px;\\n  color: #212121;\\n  font-style: italic;\\n}\\n.show-edit-div button {\\n  text-transform: uppercase;\\n  letter-spacing: -0.02em;\\n  padding: 12px 24px;\\n  font-size: 16px;\\n  font-weight: 600;\\n  border: 1px solid #229aa0;\\n  border-radius: 7px;\\n  background-color: #229aa0;\\n  color: #f7f7f8;\\n  align-items: center;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n  margin-top: 6px;\\n}\\n.show-edit-div .cancel-button {\\n  height: 48px;\\n  width: 48px;\\n  border-radius: 7px;\\n  background-color: #13767c;\\n  color: #f7f7f8;\\n  font-size: 20px;\\n  line-height: 1;\\n  padding: 0;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n  position: absolute;\\n  top: -67px;\\n  right: 12px;\\n  background-color: #13767c;\\n  border: none;\\n  box-shadow: inset 0 1px 1px rgba(252, 252, 252, 0.2), 0 2px 4px rgba(0, 0, 0, 0.2);\\n  margin: 0;\\n}\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://todo-list/./src/style.scss?./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (cssWithMappingToString) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ addLeadingZeros\n/* harmony export */ });\nfunction addLeadingZeros(number, targetLength) {\n  var sign = number < 0 ? '-' : '';\n  var output = Math.abs(number).toString();\n\n  while (output.length < targetLength) {\n    output = '0' + output;\n  }\n\n  return sign + output;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/formatters/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/formatters/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lightFormatters/index.js */ \"./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js\");\n/* harmony import */ var _lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../_lib/getUTCDayOfYear/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js\");\n/* harmony import */ var _lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeek/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js\");\n/* harmony import */ var _lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../_lib/getUTCISOWeekYear/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js\");\n/* harmony import */ var _lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../_lib/getUTCWeek/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCWeek/index.js\");\n/* harmony import */ var _lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/getUTCWeekYear/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js\");\n/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ \"./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js\");\n\n\n\n\n\n\n\nvar dayPeriodEnum = {\n  am: 'am',\n  pm: 'pm',\n  midnight: 'midnight',\n  noon: 'noon',\n  morning: 'morning',\n  afternoon: 'afternoon',\n  evening: 'evening',\n  night: 'night'\n  /*\n   * |     | Unit                           |     | Unit                           |\n   * |-----|--------------------------------|-----|--------------------------------|\n   * |  a  | AM, PM                         |  A* | Milliseconds in day            |\n   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |\n   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |\n   * |  d  | Day of month                   |  D  | Day of year                    |\n   * |  e  | Local day of week              |  E  | Day of week                    |\n   * |  f  |                                |  F* | Day of week in month           |\n   * |  g* | Modified Julian day            |  G  | Era                            |\n   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |\n   * |  i! | ISO day of week                |  I! | ISO week of year               |\n   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |\n   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |\n   * |  l* | (deprecated)                   |  L  | Stand-alone month              |\n   * |  m  | Minute                         |  M  | Month                          |\n   * |  n  |                                |  N  |                                |\n   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |\n   * |  p! | Long localized time            |  P! | Long localized date            |\n   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |\n   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |\n   * |  s  | Second                         |  S  | Fraction of second             |\n   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |\n   * |  u  | Extended year                  |  U* | Cyclic year                    |\n   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |\n   * |  w  | Local week of year             |  W* | Week of month                  |\n   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |\n   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |\n   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |\n   *\n   * Letters marked by * are not implemented but reserved by Unicode standard.\n   *\n   * Letters marked by ! are non-standard, but implemented by date-fns:\n   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)\n   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,\n   *   i.e. 7 for Sunday, 1 for Monday, etc.\n   * - `I` is ISO week of year, as opposed to `w` which is local week of year.\n   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.\n   *   `R` is supposed to be used in conjunction with `I` and `i`\n   *   for universal ISO week-numbering date, whereas\n   *   `Y` is supposed to be used in conjunction with `w` and `e`\n   *   for week-numbering date specific to the locale.\n   * - `P` is long localized date format\n   * - `p` is long localized time format\n   */\n\n};\nvar formatters = {\n  // Era\n  G: function (date, token, localize) {\n    var era = date.getUTCFullYear() > 0 ? 1 : 0;\n\n    switch (token) {\n      // AD, BC\n      case 'G':\n      case 'GG':\n      case 'GGG':\n        return localize.era(era, {\n          width: 'abbreviated'\n        });\n      // A, B\n\n      case 'GGGGG':\n        return localize.era(era, {\n          width: 'narrow'\n        });\n      // Anno Domini, Before Christ\n\n      case 'GGGG':\n      default:\n        return localize.era(era, {\n          width: 'wide'\n        });\n    }\n  },\n  // Year\n  y: function (date, token, localize) {\n    // Ordinal number\n    if (token === 'yo') {\n      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)\n\n      var year = signedYear > 0 ? signedYear : 1 - signedYear;\n      return localize.ordinalNumber(year, {\n        unit: 'year'\n      });\n    }\n\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.y(date, token);\n  },\n  // Local week-numbering year\n  Y: function (date, token, localize, options) {\n    var signedWeekYear = (0,_lib_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)\n\n    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year\n\n    if (token === 'YY') {\n      var twoDigitYear = weekYear % 100;\n      return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(twoDigitYear, 2);\n    } // Ordinal number\n\n\n    if (token === 'Yo') {\n      return localize.ordinalNumber(weekYear, {\n        unit: 'year'\n      });\n    } // Padding\n\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(weekYear, token.length);\n  },\n  // ISO week-numbering year\n  R: function (date, token) {\n    var isoWeekYear = (0,_lib_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(date); // Padding\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(isoWeekYear, token.length);\n  },\n  // Extended year. This is a single number designating the year of this calendar system.\n  // The main difference between `y` and `u` localizers are B.C. years:\n  // | Year | `y` | `u` |\n  // |------|-----|-----|\n  // | AC 1 |   1 |   1 |\n  // | BC 1 |   1 |   0 |\n  // | BC 2 |   2 |  -1 |\n  // Also `yy` always returns the last two digits of a year,\n  // while `uu` pads single digit years to 2 characters and returns other years unchanged.\n  u: function (date, token) {\n    var year = date.getUTCFullYear();\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(year, token.length);\n  },\n  // Quarter\n  Q: function (date, token, localize) {\n    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);\n\n    switch (token) {\n      // 1, 2, 3, 4\n      case 'Q':\n        return String(quarter);\n      // 01, 02, 03, 04\n\n      case 'QQ':\n        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(quarter, 2);\n      // 1st, 2nd, 3rd, 4th\n\n      case 'Qo':\n        return localize.ordinalNumber(quarter, {\n          unit: 'quarter'\n        });\n      // Q1, Q2, Q3, Q4\n\n      case 'QQQ':\n        return localize.quarter(quarter, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n      // 1, 2, 3, 4 (narrow quarter; could be not numerical)\n\n      case 'QQQQQ':\n        return localize.quarter(quarter, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n      // 1st quarter, 2nd quarter, ...\n\n      case 'QQQQ':\n      default:\n        return localize.quarter(quarter, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // Stand-alone quarter\n  q: function (date, token, localize) {\n    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);\n\n    switch (token) {\n      // 1, 2, 3, 4\n      case 'q':\n        return String(quarter);\n      // 01, 02, 03, 04\n\n      case 'qq':\n        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(quarter, 2);\n      // 1st, 2nd, 3rd, 4th\n\n      case 'qo':\n        return localize.ordinalNumber(quarter, {\n          unit: 'quarter'\n        });\n      // Q1, Q2, Q3, Q4\n\n      case 'qqq':\n        return localize.quarter(quarter, {\n          width: 'abbreviated',\n          context: 'standalone'\n        });\n      // 1, 2, 3, 4 (narrow quarter; could be not numerical)\n\n      case 'qqqqq':\n        return localize.quarter(quarter, {\n          width: 'narrow',\n          context: 'standalone'\n        });\n      // 1st quarter, 2nd quarter, ...\n\n      case 'qqqq':\n      default:\n        return localize.quarter(quarter, {\n          width: 'wide',\n          context: 'standalone'\n        });\n    }\n  },\n  // Month\n  M: function (date, token, localize) {\n    var month = date.getUTCMonth();\n\n    switch (token) {\n      case 'M':\n      case 'MM':\n        return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.M(date, token);\n      // 1st, 2nd, ..., 12th\n\n      case 'Mo':\n        return localize.ordinalNumber(month + 1, {\n          unit: 'month'\n        });\n      // Jan, Feb, ..., Dec\n\n      case 'MMM':\n        return localize.month(month, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n      // J, F, ..., D\n\n      case 'MMMMM':\n        return localize.month(month, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n      // January, February, ..., December\n\n      case 'MMMM':\n      default:\n        return localize.month(month, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // Stand-alone month\n  L: function (date, token, localize) {\n    var month = date.getUTCMonth();\n\n    switch (token) {\n      // 1, 2, ..., 12\n      case 'L':\n        return String(month + 1);\n      // 01, 02, ..., 12\n\n      case 'LL':\n        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(month + 1, 2);\n      // 1st, 2nd, ..., 12th\n\n      case 'Lo':\n        return localize.ordinalNumber(month + 1, {\n          unit: 'month'\n        });\n      // Jan, Feb, ..., Dec\n\n      case 'LLL':\n        return localize.month(month, {\n          width: 'abbreviated',\n          context: 'standalone'\n        });\n      // J, F, ..., D\n\n      case 'LLLLL':\n        return localize.month(month, {\n          width: 'narrow',\n          context: 'standalone'\n        });\n      // January, February, ..., December\n\n      case 'LLLL':\n      default:\n        return localize.month(month, {\n          width: 'wide',\n          context: 'standalone'\n        });\n    }\n  },\n  // Local week of year\n  w: function (date, token, localize, options) {\n    var week = (0,_lib_getUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_4__.default)(date, options);\n\n    if (token === 'wo') {\n      return localize.ordinalNumber(week, {\n        unit: 'week'\n      });\n    }\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(week, token.length);\n  },\n  // ISO week of year\n  I: function (date, token, localize) {\n    var isoWeek = (0,_lib_getUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_5__.default)(date);\n\n    if (token === 'Io') {\n      return localize.ordinalNumber(isoWeek, {\n        unit: 'week'\n      });\n    }\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(isoWeek, token.length);\n  },\n  // Day of the month\n  d: function (date, token, localize) {\n    if (token === 'do') {\n      return localize.ordinalNumber(date.getUTCDate(), {\n        unit: 'date'\n      });\n    }\n\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.d(date, token);\n  },\n  // Day of year\n  D: function (date, token, localize) {\n    var dayOfYear = (0,_lib_getUTCDayOfYear_index_js__WEBPACK_IMPORTED_MODULE_6__.default)(date);\n\n    if (token === 'Do') {\n      return localize.ordinalNumber(dayOfYear, {\n        unit: 'dayOfYear'\n      });\n    }\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dayOfYear, token.length);\n  },\n  // Day of week\n  E: function (date, token, localize) {\n    var dayOfWeek = date.getUTCDay();\n\n    switch (token) {\n      // Tue\n      case 'E':\n      case 'EE':\n      case 'EEE':\n        return localize.day(dayOfWeek, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n      // T\n\n      case 'EEEEE':\n        return localize.day(dayOfWeek, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n      // Tu\n\n      case 'EEEEEE':\n        return localize.day(dayOfWeek, {\n          width: 'short',\n          context: 'formatting'\n        });\n      // Tuesday\n\n      case 'EEEE':\n      default:\n        return localize.day(dayOfWeek, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // Local day of week\n  e: function (date, token, localize, options) {\n    var dayOfWeek = date.getUTCDay();\n    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;\n\n    switch (token) {\n      // Numerical value (Nth day of week with current locale or weekStartsOn)\n      case 'e':\n        return String(localDayOfWeek);\n      // Padded numerical value\n\n      case 'ee':\n        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localDayOfWeek, 2);\n      // 1st, 2nd, ..., 7th\n\n      case 'eo':\n        return localize.ordinalNumber(localDayOfWeek, {\n          unit: 'day'\n        });\n\n      case 'eee':\n        return localize.day(dayOfWeek, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n      // T\n\n      case 'eeeee':\n        return localize.day(dayOfWeek, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n      // Tu\n\n      case 'eeeeee':\n        return localize.day(dayOfWeek, {\n          width: 'short',\n          context: 'formatting'\n        });\n      // Tuesday\n\n      case 'eeee':\n      default:\n        return localize.day(dayOfWeek, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // Stand-alone local day of week\n  c: function (date, token, localize, options) {\n    var dayOfWeek = date.getUTCDay();\n    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;\n\n    switch (token) {\n      // Numerical value (same as in `e`)\n      case 'c':\n        return String(localDayOfWeek);\n      // Padded numerical value\n\n      case 'cc':\n        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localDayOfWeek, token.length);\n      // 1st, 2nd, ..., 7th\n\n      case 'co':\n        return localize.ordinalNumber(localDayOfWeek, {\n          unit: 'day'\n        });\n\n      case 'ccc':\n        return localize.day(dayOfWeek, {\n          width: 'abbreviated',\n          context: 'standalone'\n        });\n      // T\n\n      case 'ccccc':\n        return localize.day(dayOfWeek, {\n          width: 'narrow',\n          context: 'standalone'\n        });\n      // Tu\n\n      case 'cccccc':\n        return localize.day(dayOfWeek, {\n          width: 'short',\n          context: 'standalone'\n        });\n      // Tuesday\n\n      case 'cccc':\n      default:\n        return localize.day(dayOfWeek, {\n          width: 'wide',\n          context: 'standalone'\n        });\n    }\n  },\n  // ISO day of week\n  i: function (date, token, localize) {\n    var dayOfWeek = date.getUTCDay();\n    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;\n\n    switch (token) {\n      // 2\n      case 'i':\n        return String(isoDayOfWeek);\n      // 02\n\n      case 'ii':\n        return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(isoDayOfWeek, token.length);\n      // 2nd\n\n      case 'io':\n        return localize.ordinalNumber(isoDayOfWeek, {\n          unit: 'day'\n        });\n      // Tue\n\n      case 'iii':\n        return localize.day(dayOfWeek, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n      // T\n\n      case 'iiiii':\n        return localize.day(dayOfWeek, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n      // Tu\n\n      case 'iiiiii':\n        return localize.day(dayOfWeek, {\n          width: 'short',\n          context: 'formatting'\n        });\n      // Tuesday\n\n      case 'iiii':\n      default:\n        return localize.day(dayOfWeek, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // AM or PM\n  a: function (date, token, localize) {\n    var hours = date.getUTCHours();\n    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';\n\n    switch (token) {\n      case 'a':\n      case 'aa':\n      case 'aaa':\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n\n      case 'aaaaa':\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n\n      case 'aaaa':\n      default:\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // AM, PM, midnight, noon\n  b: function (date, token, localize) {\n    var hours = date.getUTCHours();\n    var dayPeriodEnumValue;\n\n    if (hours === 12) {\n      dayPeriodEnumValue = dayPeriodEnum.noon;\n    } else if (hours === 0) {\n      dayPeriodEnumValue = dayPeriodEnum.midnight;\n    } else {\n      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';\n    }\n\n    switch (token) {\n      case 'b':\n      case 'bb':\n      case 'bbb':\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n\n      case 'bbbbb':\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n\n      case 'bbbb':\n      default:\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // in the morning, in the afternoon, in the evening, at night\n  B: function (date, token, localize) {\n    var hours = date.getUTCHours();\n    var dayPeriodEnumValue;\n\n    if (hours >= 17) {\n      dayPeriodEnumValue = dayPeriodEnum.evening;\n    } else if (hours >= 12) {\n      dayPeriodEnumValue = dayPeriodEnum.afternoon;\n    } else if (hours >= 4) {\n      dayPeriodEnumValue = dayPeriodEnum.morning;\n    } else {\n      dayPeriodEnumValue = dayPeriodEnum.night;\n    }\n\n    switch (token) {\n      case 'B':\n      case 'BB':\n      case 'BBB':\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'abbreviated',\n          context: 'formatting'\n        });\n\n      case 'BBBBB':\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'narrow',\n          context: 'formatting'\n        });\n\n      case 'BBBB':\n      default:\n        return localize.dayPeriod(dayPeriodEnumValue, {\n          width: 'wide',\n          context: 'formatting'\n        });\n    }\n  },\n  // Hour [1-12]\n  h: function (date, token, localize) {\n    if (token === 'ho') {\n      var hours = date.getUTCHours() % 12;\n      if (hours === 0) hours = 12;\n      return localize.ordinalNumber(hours, {\n        unit: 'hour'\n      });\n    }\n\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.h(date, token);\n  },\n  // Hour [0-23]\n  H: function (date, token, localize) {\n    if (token === 'Ho') {\n      return localize.ordinalNumber(date.getUTCHours(), {\n        unit: 'hour'\n      });\n    }\n\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.H(date, token);\n  },\n  // Hour [0-11]\n  K: function (date, token, localize) {\n    var hours = date.getUTCHours() % 12;\n\n    if (token === 'Ko') {\n      return localize.ordinalNumber(hours, {\n        unit: 'hour'\n      });\n    }\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(hours, token.length);\n  },\n  // Hour [1-24]\n  k: function (date, token, localize) {\n    var hours = date.getUTCHours();\n    if (hours === 0) hours = 24;\n\n    if (token === 'ko') {\n      return localize.ordinalNumber(hours, {\n        unit: 'hour'\n      });\n    }\n\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(hours, token.length);\n  },\n  // Minute\n  m: function (date, token, localize) {\n    if (token === 'mo') {\n      return localize.ordinalNumber(date.getUTCMinutes(), {\n        unit: 'minute'\n      });\n    }\n\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.m(date, token);\n  },\n  // Second\n  s: function (date, token, localize) {\n    if (token === 'so') {\n      return localize.ordinalNumber(date.getUTCSeconds(), {\n        unit: 'second'\n      });\n    }\n\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.s(date, token);\n  },\n  // Fraction of second\n  S: function (date, token) {\n    return _lightFormatters_index_js__WEBPACK_IMPORTED_MODULE_0__.default.S(date, token);\n  },\n  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)\n  X: function (date, token, _localize, options) {\n    var originalDate = options._originalDate || date;\n    var timezoneOffset = originalDate.getTimezoneOffset();\n\n    if (timezoneOffset === 0) {\n      return 'Z';\n    }\n\n    switch (token) {\n      // Hours and optional minutes\n      case 'X':\n        return formatTimezoneWithOptionalMinutes(timezoneOffset);\n      // Hours, minutes and optional seconds without `:` delimiter\n      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets\n      // so this token always has the same output as `XX`\n\n      case 'XXXX':\n      case 'XX':\n        // Hours and minutes without `:` delimiter\n        return formatTimezone(timezoneOffset);\n      // Hours, minutes and optional seconds with `:` delimiter\n      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets\n      // so this token always has the same output as `XXX`\n\n      case 'XXXXX':\n      case 'XXX': // Hours and minutes with `:` delimiter\n\n      default:\n        return formatTimezone(timezoneOffset, ':');\n    }\n  },\n  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)\n  x: function (date, token, _localize, options) {\n    var originalDate = options._originalDate || date;\n    var timezoneOffset = originalDate.getTimezoneOffset();\n\n    switch (token) {\n      // Hours and optional minutes\n      case 'x':\n        return formatTimezoneWithOptionalMinutes(timezoneOffset);\n      // Hours, minutes and optional seconds without `:` delimiter\n      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets\n      // so this token always has the same output as `xx`\n\n      case 'xxxx':\n      case 'xx':\n        // Hours and minutes without `:` delimiter\n        return formatTimezone(timezoneOffset);\n      // Hours, minutes and optional seconds with `:` delimiter\n      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets\n      // so this token always has the same output as `xxx`\n\n      case 'xxxxx':\n      case 'xxx': // Hours and minutes with `:` delimiter\n\n      default:\n        return formatTimezone(timezoneOffset, ':');\n    }\n  },\n  // Timezone (GMT)\n  O: function (date, token, _localize, options) {\n    var originalDate = options._originalDate || date;\n    var timezoneOffset = originalDate.getTimezoneOffset();\n\n    switch (token) {\n      // Short\n      case 'O':\n      case 'OO':\n      case 'OOO':\n        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');\n      // Long\n\n      case 'OOOO':\n      default:\n        return 'GMT' + formatTimezone(timezoneOffset, ':');\n    }\n  },\n  // Timezone (specific non-location)\n  z: function (date, token, _localize, options) {\n    var originalDate = options._originalDate || date;\n    var timezoneOffset = originalDate.getTimezoneOffset();\n\n    switch (token) {\n      // Short\n      case 'z':\n      case 'zz':\n      case 'zzz':\n        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');\n      // Long\n\n      case 'zzzz':\n      default:\n        return 'GMT' + formatTimezone(timezoneOffset, ':');\n    }\n  },\n  // Seconds timestamp\n  t: function (date, token, _localize, options) {\n    var originalDate = options._originalDate || date;\n    var timestamp = Math.floor(originalDate.getTime() / 1000);\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(timestamp, token.length);\n  },\n  // Milliseconds timestamp\n  T: function (date, token, _localize, options) {\n    var originalDate = options._originalDate || date;\n    var timestamp = originalDate.getTime();\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(timestamp, token.length);\n  }\n};\n\nfunction formatTimezoneShort(offset, dirtyDelimiter) {\n  var sign = offset > 0 ? '-' : '+';\n  var absOffset = Math.abs(offset);\n  var hours = Math.floor(absOffset / 60);\n  var minutes = absOffset % 60;\n\n  if (minutes === 0) {\n    return sign + String(hours);\n  }\n\n  var delimiter = dirtyDelimiter || '';\n  return sign + String(hours) + delimiter + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(minutes, 2);\n}\n\nfunction formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {\n  if (offset % 60 === 0) {\n    var sign = offset > 0 ? '-' : '+';\n    return sign + (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(Math.abs(offset) / 60, 2);\n  }\n\n  return formatTimezone(offset, dirtyDelimiter);\n}\n\nfunction formatTimezone(offset, dirtyDelimiter) {\n  var delimiter = dirtyDelimiter || '';\n  var sign = offset > 0 ? '-' : '+';\n  var absOffset = Math.abs(offset);\n  var hours = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(Math.floor(absOffset / 60), 2);\n  var minutes = (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(absOffset % 60, 2);\n  return sign + hours + delimiter + minutes;\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/format/formatters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../addLeadingZeros/index.js */ \"./node_modules/date-fns/esm/_lib/addLeadingZeros/index.js\");\n\n/*\n * |     | Unit                           |     | Unit                           |\n * |-----|--------------------------------|-----|--------------------------------|\n * |  a  | AM, PM                         |  A* |                                |\n * |  d  | Day of month                   |  D  |                                |\n * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |\n * |  m  | Minute                         |  M  | Month                          |\n * |  s  | Second                         |  S  | Fraction of second             |\n * |  y  | Year (abs)                     |  Y  |                                |\n *\n * Letters marked by * are not implemented but reserved by Unicode standard.\n */\n\nvar formatters = {\n  // Year\n  y: function (date, token) {\n    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens\n    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |\n    // |----------|-------|----|-------|-------|-------|\n    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |\n    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |\n    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |\n    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |\n    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |\n    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)\n\n    var year = signedYear > 0 ? signedYear : 1 - signedYear;\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(token === 'yy' ? year % 100 : year, token.length);\n  },\n  // Month\n  M: function (date, token) {\n    var month = date.getUTCMonth();\n    return token === 'M' ? String(month + 1) : (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(month + 1, 2);\n  },\n  // Day of the month\n  d: function (date, token) {\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCDate(), token.length);\n  },\n  // AM or PM\n  a: function (date, token) {\n    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';\n\n    switch (token) {\n      case 'a':\n      case 'aa':\n      case 'aaa':\n        return dayPeriodEnumValue.toUpperCase();\n\n      case 'aaaaa':\n        return dayPeriodEnumValue[0];\n\n      case 'aaaa':\n      default:\n        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';\n    }\n  },\n  // Hour [1-12]\n  h: function (date, token) {\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCHours() % 12 || 12, token.length);\n  },\n  // Hour [0-23]\n  H: function (date, token) {\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCHours(), token.length);\n  },\n  // Minute\n  m: function (date, token) {\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCMinutes(), token.length);\n  },\n  // Second\n  s: function (date, token) {\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(date.getUTCSeconds(), token.length);\n  },\n  // Fraction of second\n  S: function (date, token) {\n    var numberOfDigits = token.length;\n    var milliseconds = date.getUTCMilliseconds();\n    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));\n    return (0,_addLeadingZeros_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(fractionalSeconds, token.length);\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatters);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/format/lightFormatters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/format/longFormatters/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/format/longFormatters/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\nfunction dateLongFormatter(pattern, formatLong) {\n  switch (pattern) {\n    case 'P':\n      return formatLong.date({\n        width: 'short'\n      });\n\n    case 'PP':\n      return formatLong.date({\n        width: 'medium'\n      });\n\n    case 'PPP':\n      return formatLong.date({\n        width: 'long'\n      });\n\n    case 'PPPP':\n    default:\n      return formatLong.date({\n        width: 'full'\n      });\n  }\n}\n\nfunction timeLongFormatter(pattern, formatLong) {\n  switch (pattern) {\n    case 'p':\n      return formatLong.time({\n        width: 'short'\n      });\n\n    case 'pp':\n      return formatLong.time({\n        width: 'medium'\n      });\n\n    case 'ppp':\n      return formatLong.time({\n        width: 'long'\n      });\n\n    case 'pppp':\n    default:\n      return formatLong.time({\n        width: 'full'\n      });\n  }\n}\n\nfunction dateTimeLongFormatter(pattern, formatLong) {\n  var matchResult = pattern.match(/(P+)(p+)?/);\n  var datePattern = matchResult[1];\n  var timePattern = matchResult[2];\n\n  if (!timePattern) {\n    return dateLongFormatter(pattern, formatLong);\n  }\n\n  var dateTimeFormat;\n\n  switch (datePattern) {\n    case 'P':\n      dateTimeFormat = formatLong.dateTime({\n        width: 'short'\n      });\n      break;\n\n    case 'PP':\n      dateTimeFormat = formatLong.dateTime({\n        width: 'medium'\n      });\n      break;\n\n    case 'PPP':\n      dateTimeFormat = formatLong.dateTime({\n        width: 'long'\n      });\n      break;\n\n    case 'PPPP':\n    default:\n      dateTimeFormat = formatLong.dateTime({\n        width: 'full'\n      });\n      break;\n  }\n\n  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));\n}\n\nvar longFormatters = {\n  p: timeLongFormatter,\n  P: dateTimeLongFormatter\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (longFormatters);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/format/longFormatters/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ getTimezoneOffsetInMilliseconds\n/* harmony export */ });\nvar MILLISECONDS_IN_MINUTE = 60000;\n\nfunction getDateMillisecondsPart(date) {\n  return date.getTime() % MILLISECONDS_IN_MINUTE;\n}\n/**\n * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.\n * They usually appear for dates that denote time before the timezones were introduced\n * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891\n * and GMT+01:00:00 after that date)\n *\n * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,\n * which would lead to incorrect calculations.\n *\n * This function returns the timezone offset in milliseconds that takes seconds in account.\n */\n\n\nfunction getTimezoneOffsetInMilliseconds(dirtyDate) {\n  var date = new Date(dirtyDate.getTime());\n  var baseTimezoneOffset = Math.ceil(date.getTimezoneOffset());\n  date.setSeconds(0, 0);\n  var hasNegativeUTCOffset = baseTimezoneOffset > 0;\n  var millisecondsPartOfTimezoneOffset = hasNegativeUTCOffset ? (MILLISECONDS_IN_MINUTE + getDateMillisecondsPart(date)) % MILLISECONDS_IN_MINUTE : getDateMillisecondsPart(date);\n  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ getUTCDayOfYear\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\nvar MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction getUTCDayOfYear(dirtyDate) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  var timestamp = date.getTime();\n  date.setUTCMonth(0, 1);\n  date.setUTCHours(0, 0, 0, 0);\n  var startOfYearTimestamp = date.getTime();\n  var difference = timestamp - startOfYearTimestamp;\n  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/getUTCDayOfYear/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ getUTCISOWeek\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js\");\n/* harmony import */ var _startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCISOWeekYear/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n\nvar MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction getUTCISOWeek(dirtyDate) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  var diff = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(date).getTime() - (0,_startOfUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(date).getTime(); // Round the number of days to the nearest integer\n  // because the number of milliseconds in a week is not constant\n  // (e.g. it's different in the week of the daylight saving time clock shift)\n\n  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/getUTCISOWeek/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ getUTCISOWeekYear\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction getUTCISOWeekYear(dirtyDate) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  var year = date.getUTCFullYear();\n  var fourthOfJanuaryOfNextYear = new Date(0);\n  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);\n  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);\n  var startOfNextYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(fourthOfJanuaryOfNextYear);\n  var fourthOfJanuaryOfThisYear = new Date(0);\n  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);\n  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);\n  var startOfThisYear = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(fourthOfJanuaryOfThisYear);\n\n  if (date.getTime() >= startOfNextYear.getTime()) {\n    return year + 1;\n  } else if (date.getTime() >= startOfThisYear.getTime()) {\n    return year;\n  } else {\n    return year - 1;\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeek/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeek/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ getUTCWeek\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js\");\n/* harmony import */ var _startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeekYear/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n\nvar MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction getUTCWeek(dirtyDate, options) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  var diff = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(date, options).getTime() - (0,_startOfUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(date, options).getTime(); // Round the number of days to the nearest integer\n  // because the number of milliseconds in a week is not constant\n  // (e.g. it's different in the week of the daylight saving time clock shift)\n\n  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/getUTCWeek/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ getUTCWeekYear\n/* harmony export */ });\n/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../toInteger/index.js */ \"./node_modules/date-fns/esm/_lib/toInteger/index.js\");\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction getUTCWeekYear(dirtyDate, dirtyOptions) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate, dirtyOptions);\n  var year = date.getUTCFullYear();\n  var options = dirtyOptions || {};\n  var locale = options.locale;\n  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;\n  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localeFirstWeekContainsDate);\n  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN\n\n  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {\n    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');\n  }\n\n  var firstWeekOfNextYear = new Date(0);\n  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);\n  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);\n  var startOfNextYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(firstWeekOfNextYear, dirtyOptions);\n  var firstWeekOfThisYear = new Date(0);\n  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);\n  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);\n  var startOfThisYear = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(firstWeekOfThisYear, dirtyOptions);\n\n  if (date.getTime() >= startOfNextYear.getTime()) {\n    return year + 1;\n  } else if (date.getTime() >= startOfThisYear.getTime()) {\n    return year;\n  } else {\n    return year - 1;\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/protectedTokens/index.js":
/*!*****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/protectedTokens/index.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"isProtectedDayOfYearToken\": () => /* binding */ isProtectedDayOfYearToken,\n/* harmony export */   \"isProtectedWeekYearToken\": () => /* binding */ isProtectedWeekYearToken,\n/* harmony export */   \"throwProtectedError\": () => /* binding */ throwProtectedError\n/* harmony export */ });\nvar protectedDayOfYearTokens = ['D', 'DD'];\nvar protectedWeekYearTokens = ['YY', 'YYYY'];\nfunction isProtectedDayOfYearToken(token) {\n  return protectedDayOfYearTokens.indexOf(token) !== -1;\n}\nfunction isProtectedWeekYearToken(token) {\n  return protectedWeekYearTokens.indexOf(token) !== -1;\n}\nfunction throwProtectedError(token, format, input) {\n  if (token === 'YYYY') {\n    throw new RangeError(\"Use `yyyy` instead of `YYYY` (in `\".concat(format, \"`) for formatting years to the input `\").concat(input, \"`; see: https://git.io/fxCyr\"));\n  } else if (token === 'YY') {\n    throw new RangeError(\"Use `yy` instead of `YY` (in `\".concat(format, \"`) for formatting years to the input `\").concat(input, \"`; see: https://git.io/fxCyr\"));\n  } else if (token === 'D') {\n    throw new RangeError(\"Use `d` instead of `D` (in `\".concat(format, \"`) for formatting days of the month to the input `\").concat(input, \"`; see: https://git.io/fxCyr\"));\n  } else if (token === 'DD') {\n    throw new RangeError(\"Use `dd` instead of `DD` (in `\".concat(format, \"`) for formatting days of the month to the input `\").concat(input, \"`; see: https://git.io/fxCyr\"));\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/protectedTokens/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ requiredArgs\n/* harmony export */ });\nfunction requiredArgs(required, args) {\n  if (args.length < required) {\n    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/requiredArgs/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ startOfUTCISOWeek\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction startOfUTCISOWeek(dirtyDate) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var weekStartsOn = 1;\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  var day = date.getUTCDay();\n  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;\n  date.setUTCDate(date.getUTCDate() - diff);\n  date.setUTCHours(0, 0, 0, 0);\n  return date;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ startOfUTCISOWeekYear\n/* harmony export */ });\n/* harmony import */ var _getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../getUTCISOWeekYear/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCISOWeekYear/index.js\");\n/* harmony import */ var _startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../startOfUTCISOWeek/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCISOWeek/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction startOfUTCISOWeekYear(dirtyDate) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var year = (0,_getUTCISOWeekYear_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  var fourthOfJanuary = new Date(0);\n  fourthOfJanuary.setUTCFullYear(year, 0, 4);\n  fourthOfJanuary.setUTCHours(0, 0, 0, 0);\n  var date = (0,_startOfUTCISOWeek_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(fourthOfJanuary);\n  return date;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/startOfUTCISOWeekYear/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ startOfUTCWeek\n/* harmony export */ });\n/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toInteger/index.js */ \"./node_modules/date-fns/esm/_lib/toInteger/index.js\");\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction startOfUTCWeek(dirtyDate, dirtyOptions) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var options = dirtyOptions || {};\n  var locale = options.locale;\n  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;\n  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(localeWeekStartsOn);\n  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN\n\n  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {\n    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');\n  }\n\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate);\n  var day = date.getUTCDay();\n  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;\n  date.setUTCDate(date.getUTCDate() - diff);\n  date.setUTCHours(0, 0, 0, 0);\n  return date;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ startOfUTCWeekYear\n/* harmony export */ });\n/* harmony import */ var _toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toInteger/index.js */ \"./node_modules/date-fns/esm/_lib/toInteger/index.js\");\n/* harmony import */ var _getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../getUTCWeekYear/index.js */ \"./node_modules/date-fns/esm/_lib/getUTCWeekYear/index.js\");\n/* harmony import */ var _startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../startOfUTCWeek/index.js */ \"./node_modules/date-fns/esm/_lib/startOfUTCWeek/index.js\");\n/* harmony import */ var _requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n // This function will be a part of public API when UTC function will be implemented.\n// See issue: https://github.com/date-fns/date-fns/issues/376\n\nfunction startOfUTCWeekYear(dirtyDate, dirtyOptions) {\n  (0,_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var options = dirtyOptions || {};\n  var locale = options.locale;\n  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;\n  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(localeFirstWeekContainsDate);\n  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(options.firstWeekContainsDate);\n  var year = (0,_getUTCWeekYear_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate, dirtyOptions);\n  var firstWeek = new Date(0);\n  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);\n  firstWeek.setUTCHours(0, 0, 0, 0);\n  var date = (0,_startOfUTCWeek_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(firstWeek, dirtyOptions);\n  return date;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/startOfUTCWeekYear/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ toInteger\n/* harmony export */ });\nfunction toInteger(dirtyNumber) {\n  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {\n    return NaN;\n  }\n\n  var number = Number(dirtyNumber);\n\n  if (isNaN(number)) {\n    return number;\n  }\n\n  return number < 0 ? Math.ceil(number) : Math.floor(number);\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/_lib/toInteger/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/addMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/addMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ addMilliseconds\n/* harmony export */ });\n/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ \"./node_modules/date-fns/esm/_lib/toInteger/index.js\");\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n/**\n * @name addMilliseconds\n * @category Millisecond Helpers\n * @summary Add the specified number of milliseconds to the given date.\n *\n * @description\n * Add the specified number of milliseconds to the given date.\n *\n * ### v2.0.0 breaking changes:\n *\n * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).\n *\n * @param {Date|Number} date - the date to be changed\n * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.\n * @returns {Date} the new date with the milliseconds added\n * @throws {TypeError} 2 arguments required\n *\n * @example\n * // Add 750 milliseconds to 10 July 2014 12:45:30.000:\n * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)\n * //=> Thu Jul 10 2014 12:45:30.750\n */\n\nfunction addMilliseconds(dirtyDate, dirtyAmount) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);\n  var timestamp = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate).getTime();\n  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyAmount);\n  return new Date(timestamp + amount);\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/addMilliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/format/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/format/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ format\n/* harmony export */ });\n/* harmony import */ var _isValid_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../isValid/index.js */ \"./node_modules/date-fns/esm/isValid/index.js\");\n/* harmony import */ var _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../locale/en-US/index.js */ \"./node_modules/date-fns/esm/locale/en-US/index.js\");\n/* harmony import */ var _subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../subMilliseconds/index.js */ \"./node_modules/date-fns/esm/subMilliseconds/index.js\");\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../_lib/format/formatters/index.js */ \"./node_modules/date-fns/esm/_lib/format/formatters/index.js\");\n/* harmony import */ var _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../_lib/format/longFormatters/index.js */ \"./node_modules/date-fns/esm/_lib/format/longFormatters/index.js\");\n/* harmony import */ var _lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../_lib/getTimezoneOffsetInMilliseconds/index.js */ \"./node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js\");\n/* harmony import */ var _lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../_lib/protectedTokens/index.js */ \"./node_modules/date-fns/esm/_lib/protectedTokens/index.js\");\n/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ \"./node_modules/date-fns/esm/_lib/toInteger/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n\n\n\n\n\n\n // This RegExp consists of three parts separated by `|`:\n// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token\n//   (one of the certain letters followed by `o`)\n// - (\\w)\\1* matches any sequences of the same letter\n// - '' matches two quote characters in a row\n// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),\n//   except a single quote symbol, which ends the sequence.\n//   Two quote characters do not end the sequence.\n//   If there is no matching single quote\n//   then the sequence will continue until the end of the string.\n// - . matches any single character unmatched by previous parts of the RegExps\n\nvar formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\\w)\\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also\n// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`\n\nvar longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;\nvar escapedStringRegExp = /^'([^]*?)'?$/;\nvar doubleQuoteRegExp = /''/g;\nvar unescapedLatinCharacterRegExp = /[a-zA-Z]/;\n/**\n * @name format\n * @category Common Helpers\n * @summary Format the date.\n *\n * @description\n * Return the formatted date string in the given format. The result may vary by locale.\n *\n * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.\n * > See: https://git.io/fxCyr\n *\n * The characters wrapped between two single quotes characters (') are escaped.\n * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.\n * (see the last example)\n *\n * Format of the string is based on Unicode Technical Standard #35:\n * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table\n * with a few additions (see note 7 below the table).\n *\n * Accepted patterns:\n * | Unit                            | Pattern | Result examples                   | Notes |\n * |---------------------------------|---------|-----------------------------------|-------|\n * | Era                             | G..GGG  | AD, BC                            |       |\n * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |\n * |                                 | GGGGG   | A, B                              |       |\n * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |\n * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |\n * |                                 | yy      | 44, 01, 00, 17                    | 5     |\n * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |\n * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |\n * |                                 | yyyyy   | ...                               | 3,5   |\n * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |\n * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |\n * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |\n * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |\n * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |\n * |                                 | YYYYY   | ...                               | 3,5   |\n * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |\n * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |\n * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |\n * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |\n * |                                 | RRRRR   | ...                               | 3,5,7 |\n * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |\n * |                                 | uu      | -43, 01, 1900, 2017               | 5     |\n * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |\n * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |\n * |                                 | uuuuu   | ...                               | 3,5   |\n * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |\n * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |\n * |                                 | QQ      | 01, 02, 03, 04                    |       |\n * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |\n * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |\n * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |\n * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |\n * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |\n * |                                 | qq      | 01, 02, 03, 04                    |       |\n * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |\n * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |\n * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |\n * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |\n * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |\n * |                                 | MM      | 01, 02, ..., 12                   |       |\n * |                                 | MMM     | Jan, Feb, ..., Dec                |       |\n * |                                 | MMMM    | January, February, ..., December  | 2     |\n * |                                 | MMMMM   | J, F, ..., D                      |       |\n * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |\n * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |\n * |                                 | LL      | 01, 02, ..., 12                   |       |\n * |                                 | LLL     | Jan, Feb, ..., Dec                |       |\n * |                                 | LLLL    | January, February, ..., December  | 2     |\n * |                                 | LLLLL   | J, F, ..., D                      |       |\n * | Local week of year              | w       | 1, 2, ..., 53                     |       |\n * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |\n * |                                 | ww      | 01, 02, ..., 53                   |       |\n * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |\n * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |\n * |                                 | II      | 01, 02, ..., 53                   | 7     |\n * | Day of month                    | d       | 1, 2, ..., 31                     |       |\n * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |\n * |                                 | dd      | 01, 02, ..., 31                   |       |\n * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |\n * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |\n * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |\n * |                                 | DDD     | 001, 002, ..., 365, 366           |       |\n * |                                 | DDDD    | ...                               | 3     |\n * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |\n * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |\n * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |\n * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |\n * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |\n * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |\n * |                                 | ii      | 01, 02, ..., 07                   | 7     |\n * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |\n * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |\n * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |\n * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |\n * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |\n * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |\n * |                                 | ee      | 02, 03, ..., 01                   |       |\n * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |\n * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |\n * |                                 | eeeee   | M, T, W, T, F, S, S               |       |\n * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |\n * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |\n * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |\n * |                                 | cc      | 02, 03, ..., 01                   |       |\n * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |\n * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |\n * |                                 | ccccc   | M, T, W, T, F, S, S               |       |\n * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |\n * | AM, PM                          | a..aaa  | AM, PM                            |       |\n * |                                 | aaaa    | a.m., p.m.                        | 2     |\n * |                                 | aaaaa   | a, p                              |       |\n * | AM, PM, noon, midnight          | b..bbb  | AM, PM, noon, midnight            |       |\n * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |\n * |                                 | bbbbb   | a, p, n, mi                       |       |\n * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |\n * |                                 | BBBB    | at night, in the morning, ...     | 2     |\n * |                                 | BBBBB   | at night, in the morning, ...     |       |\n * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |\n * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |\n * |                                 | hh      | 01, 02, ..., 11, 12               |       |\n * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |\n * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |\n * |                                 | HH      | 00, 01, 02, ..., 23               |       |\n * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |\n * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |\n * |                                 | KK      | 01, 02, ..., 11, 00               |       |\n * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |\n * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |\n * |                                 | kk      | 24, 01, 02, ..., 23               |       |\n * | Minute                          | m       | 0, 1, ..., 59                     |       |\n * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |\n * |                                 | mm      | 00, 01, ..., 59                   |       |\n * | Second                          | s       | 0, 1, ..., 59                     |       |\n * |                                 | so      | 0th, 1st, ..., 59th               | 7     |\n * |                                 | ss      | 00, 01, ..., 59                   |       |\n * | Fraction of second              | S       | 0, 1, ..., 9                      |       |\n * |                                 | SS      | 00, 01, ..., 99                   |       |\n * |                                 | SSS     | 000, 0001, ..., 999               |       |\n * |                                 | SSSS    | ...                               | 3     |\n * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |\n * |                                 | XX      | -0800, +0530, Z                   |       |\n * |                                 | XXX     | -08:00, +05:30, Z                 |       |\n * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |\n * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |\n * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |\n * |                                 | xx      | -0800, +0530, +0000               |       |\n * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |\n * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |\n * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |\n * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |\n * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |\n * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |\n * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |\n * | Seconds timestamp               | t       | 512969520                         | 7     |\n * |                                 | tt      | ...                               | 3,7   |\n * | Milliseconds timestamp          | T       | 512969520900                      | 7     |\n * |                                 | TT      | ...                               | 3,7   |\n * | Long localized date             | P       | 05/29/1453                        | 7     |\n * |                                 | PP      | May 29, 1453                      | 7     |\n * |                                 | PPP     | May 29th, 1453                    | 7     |\n * |                                 | PPPP    | Sunday, May 29th, 1453            | 2,7   |\n * | Long localized time             | p       | 12:00 AM                          | 7     |\n * |                                 | pp      | 12:00:00 AM                       | 7     |\n * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |\n * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |\n * | Combination of date and time    | Pp      | 05/29/1453, 12:00 AM              | 7     |\n * |                                 | PPpp    | May 29, 1453, 12:00:00 AM         | 7     |\n * |                                 | PPPppp  | May 29th, 1453 at ...             | 7     |\n * |                                 | PPPPpppp| Sunday, May 29th, 1453 at ...     | 2,7   |\n * Notes:\n * 1. \"Formatting\" units (e.g. formatting quarter) in the default en-US locale\n *    are the same as \"stand-alone\" units, but are different in some languages.\n *    \"Formatting\" units are declined according to the rules of the language\n *    in the context of a date. \"Stand-alone\" units are always nominative singular:\n *\n *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`\n *\n *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`\n *\n * 2. Any sequence of the identical letters is a pattern, unless it is escaped by\n *    the single quote characters (see below).\n *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)\n *    the output will be the same as default pattern for this unit, usually\n *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units\n *    are marked with \"2\" in the last column of the table.\n *\n *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`\n *\n *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`\n *\n *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`\n *\n *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`\n *\n *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`\n *\n * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).\n *    The output will be padded with zeros to match the length of the pattern.\n *\n *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`\n *\n * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.\n *    These tokens represent the shortest form of the quarter.\n *\n * 5. The main difference between `y` and `u` patterns are B.C. years:\n *\n *    | Year | `y` | `u` |\n *    |------|-----|-----|\n *    | AC 1 |   1 |   1 |\n *    | BC 1 |   1 |   0 |\n *    | BC 2 |   2 |  -1 |\n *\n *    Also `yy` always returns the last two digits of a year,\n *    while `uu` pads single digit years to 2 characters and returns other years unchanged:\n *\n *    | Year | `yy` | `uu` |\n *    |------|------|------|\n *    | 1    |   01 |   01 |\n *    | 14   |   14 |   14 |\n *    | 376  |   76 |  376 |\n *    | 1453 |   53 | 1453 |\n *\n *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),\n *    except local week-numbering years are dependent on `options.weekStartsOn`\n *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}\n *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).\n *\n * 6. Specific non-location timezones are currently unavailable in `date-fns`,\n *    so right now these tokens fall back to GMT timezones.\n *\n * 7. These patterns are not in the Unicode Technical Standard #35:\n *    - `i`: ISO day of week\n *    - `I`: ISO week of year\n *    - `R`: ISO week-numbering year\n *    - `t`: seconds timestamp\n *    - `T`: milliseconds timestamp\n *    - `o`: ordinal number modifier\n *    - `P`: long localized date\n *    - `p`: long localized time\n *\n * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.\n *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr\n *\n * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.\n *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr\n *\n * ### v2.0.0 breaking changes:\n *\n * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).\n *\n * - The second argument is now required for the sake of explicitness.\n *\n *   ```javascript\n *   // Before v2.0.0\n *   format(new Date(2016, 0, 1))\n *\n *   // v2.0.0 onward\n *   format(new Date(2016, 0, 1), \"yyyy-MM-dd'T'HH:mm:ss.SSSxxx\")\n *   ```\n *\n * - New format string API for `format` function\n *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).\n *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.\n *\n * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.\n *\n * @param {Date|Number} date - the original date\n * @param {String} format - the string of tokens\n * @param {Object} [options] - an object with options.\n * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}\n * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)\n * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is\n * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;\n *   see: https://git.io/fxCyr\n * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;\n *   see: https://git.io/fxCyr\n * @returns {String} the formatted date string\n * @throws {TypeError} 2 arguments required\n * @throws {RangeError} `date` must not be Invalid Date\n * @throws {RangeError} `options.locale` must contain `localize` property\n * @throws {RangeError} `options.locale` must contain `formatLong` property\n * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6\n * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7\n * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr\n * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr\n * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr\n * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr\n * @throws {RangeError} format string contains an unescaped latin alphabet character\n *\n * @example\n * // Represent 11 February 2014 in middle-endian format:\n * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')\n * //=> '02/11/2014'\n *\n * @example\n * // Represent 2 July 2014 in Esperanto:\n * import { eoLocale } from 'date-fns/locale/eo'\n * var result = format(new Date(2014, 6, 2), \"do 'de' MMMM yyyy\", {\n *   locale: eoLocale\n * })\n * //=> '2-a de julio 2014'\n *\n * @example\n * // Escape string by single quote characters:\n * var result = format(new Date(2014, 6, 2, 15), \"h 'o''clock'\")\n * //=> \"3 o'clock\"\n */\n\nfunction format(dirtyDate, dirtyFormatStr, dirtyOptions) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);\n  var formatStr = String(dirtyFormatStr);\n  var options = dirtyOptions || {};\n  var locale = options.locale || _locale_en_US_index_js__WEBPACK_IMPORTED_MODULE_1__.default;\n  var localeFirstWeekContainsDate = locale.options && locale.options.firstWeekContainsDate;\n  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localeFirstWeekContainsDate);\n  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN\n\n  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {\n    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');\n  }\n\n  var localeWeekStartsOn = locale.options && locale.options.weekStartsOn;\n  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(localeWeekStartsOn);\n  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN\n\n  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {\n    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');\n  }\n\n  if (!locale.localize) {\n    throw new RangeError('locale must contain localize property');\n  }\n\n  if (!locale.formatLong) {\n    throw new RangeError('locale must contain formatLong property');\n  }\n\n  var originalDate = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__.default)(dirtyDate);\n\n  if (!(0,_isValid_index_js__WEBPACK_IMPORTED_MODULE_4__.default)(originalDate)) {\n    throw new RangeError('Invalid time value');\n  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.\n  // This ensures that when UTC functions will be implemented, locales will be compatible with them.\n  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376\n\n\n  var timezoneOffset = (0,_lib_getTimezoneOffsetInMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_5__.default)(originalDate);\n  var utcDate = (0,_subMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_6__.default)(originalDate, timezoneOffset);\n  var formatterOptions = {\n    firstWeekContainsDate: firstWeekContainsDate,\n    weekStartsOn: weekStartsOn,\n    locale: locale,\n    _originalDate: originalDate\n  };\n  var result = formatStr.match(longFormattingTokensRegExp).map(function (substring) {\n    var firstCharacter = substring[0];\n\n    if (firstCharacter === 'p' || firstCharacter === 'P') {\n      var longFormatter = _lib_format_longFormatters_index_js__WEBPACK_IMPORTED_MODULE_7__.default[firstCharacter];\n      return longFormatter(substring, locale.formatLong, formatterOptions);\n    }\n\n    return substring;\n  }).join('').match(formattingTokensRegExp).map(function (substring) {\n    // Replace two single quote characters with one single quote character\n    if (substring === \"''\") {\n      return \"'\";\n    }\n\n    var firstCharacter = substring[0];\n\n    if (firstCharacter === \"'\") {\n      return cleanEscapedString(substring);\n    }\n\n    var formatter = _lib_format_formatters_index_js__WEBPACK_IMPORTED_MODULE_8__.default[firstCharacter];\n\n    if (formatter) {\n      if (!options.useAdditionalWeekYearTokens && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.isProtectedWeekYearToken)(substring)) {\n        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);\n      }\n\n      if (!options.useAdditionalDayOfYearTokens && (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.isProtectedDayOfYearToken)(substring)) {\n        (0,_lib_protectedTokens_index_js__WEBPACK_IMPORTED_MODULE_9__.throwProtectedError)(substring, dirtyFormatStr, dirtyDate);\n      }\n\n      return formatter(utcDate, substring, locale.localize, formatterOptions);\n    }\n\n    if (firstCharacter.match(unescapedLatinCharacterRegExp)) {\n      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');\n    }\n\n    return substring;\n  }).join('');\n  return result;\n}\n\nfunction cleanEscapedString(input) {\n  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, \"'\");\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/format/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/isValid/index.js":
/*!****************************************************!*\
  !*** ./node_modules/date-fns/esm/isValid/index.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ isValid\n/* harmony export */ });\n/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ \"./node_modules/date-fns/esm/toDate/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n/**\n * @name isValid\n * @category Common Helpers\n * @summary Is the given date valid?\n *\n * @description\n * Returns false if argument is Invalid Date and true otherwise.\n * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}\n * Invalid Date is a Date, whose time value is NaN.\n *\n * Time value of Date: http://es5.github.io/#x15.9.1.1\n *\n * ### v2.0.0 breaking changes:\n *\n * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).\n *\n * - Now `isValid` doesn't throw an exception\n *   if the first argument is not an instance of Date.\n *   Instead, argument is converted beforehand using `toDate`.\n *\n *   Examples:\n *\n *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |\n *   |---------------------------|---------------|---------------|\n *   | `new Date()`              | `true`        | `true`        |\n *   | `new Date('2016-01-01')`  | `true`        | `true`        |\n *   | `new Date('')`            | `false`       | `false`       |\n *   | `new Date(1488370835081)` | `true`        | `true`        |\n *   | `new Date(NaN)`           | `false`       | `false`       |\n *   | `'2016-01-01'`            | `TypeError`   | `false`       |\n *   | `''`                      | `TypeError`   | `false`       |\n *   | `1488370835081`           | `TypeError`   | `true`        |\n *   | `NaN`                     | `TypeError`   | `false`       |\n *\n *   We introduce this change to make *date-fns* consistent with ECMAScript behavior\n *   that try to coerce arguments to the expected type\n *   (which is also the case with other *date-fns* functions).\n *\n * @param {*} date - the date to check\n * @returns {Boolean} the date is valid\n * @throws {TypeError} 1 argument required\n *\n * @example\n * // For the valid date:\n * var result = isValid(new Date(2014, 1, 31))\n * //=> true\n *\n * @example\n * // For the value, convertable into a date:\n * var result = isValid(1393804800000)\n * //=> true\n *\n * @example\n * // For the invalid date:\n * var result = isValid(new Date(''))\n * //=> false\n */\n\nfunction isValid(dirtyDate) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyDate);\n  return !isNaN(date);\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/isValid/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ buildFormatLongFn\n/* harmony export */ });\nfunction buildFormatLongFn(args) {\n  return function (dirtyOptions) {\n    var options = dirtyOptions || {};\n    var width = options.width ? String(options.width) : args.defaultWidth;\n    var format = args.formats[width] || args.formats[args.defaultWidth];\n    return format;\n  };\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ buildLocalizeFn\n/* harmony export */ });\nfunction buildLocalizeFn(args) {\n  return function (dirtyIndex, dirtyOptions) {\n    var options = dirtyOptions || {};\n    var context = options.context ? String(options.context) : 'standalone';\n    var valuesArray;\n\n    if (context === 'formatting' && args.formattingValues) {\n      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;\n      var width = options.width ? String(options.width) : defaultWidth;\n      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];\n    } else {\n      var _defaultWidth = args.defaultWidth;\n\n      var _width = options.width ? String(options.width) : args.defaultWidth;\n\n      valuesArray = args.values[_width] || args.values[_defaultWidth];\n    }\n\n    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;\n    return valuesArray[index];\n  };\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ buildMatchFn\n/* harmony export */ });\nfunction buildMatchFn(args) {\n  return function (dirtyString, dirtyOptions) {\n    var string = String(dirtyString);\n    var options = dirtyOptions || {};\n    var width = options.width;\n    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];\n    var matchResult = string.match(matchPattern);\n\n    if (!matchResult) {\n      return null;\n    }\n\n    var matchedString = matchResult[0];\n    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];\n    var value;\n\n    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {\n      value = findIndex(parsePatterns, function (pattern) {\n        return pattern.test(matchedString);\n      });\n    } else {\n      value = findKey(parsePatterns, function (pattern) {\n        return pattern.test(matchedString);\n      });\n    }\n\n    value = args.valueCallback ? args.valueCallback(value) : value;\n    value = options.valueCallback ? options.valueCallback(value) : value;\n    return {\n      value: value,\n      rest: string.slice(matchedString.length)\n    };\n  };\n}\n\nfunction findKey(object, predicate) {\n  for (var key in object) {\n    if (object.hasOwnProperty(key) && predicate(object[key])) {\n      return key;\n    }\n  }\n}\n\nfunction findIndex(array, predicate) {\n  for (var key = 0; key < array.length; key++) {\n    if (predicate(array[key])) {\n      return key;\n    }\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js":
/*!****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ buildMatchPatternFn\n/* harmony export */ });\nfunction buildMatchPatternFn(args) {\n  return function (dirtyString, dirtyOptions) {\n    var string = String(dirtyString);\n    var options = dirtyOptions || {};\n    var matchResult = string.match(args.matchPattern);\n\n    if (!matchResult) {\n      return null;\n    }\n\n    var matchedString = matchResult[0];\n    var parseResult = string.match(args.parsePattern);\n\n    if (!parseResult) {\n      return null;\n    }\n\n    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];\n    value = options.valueCallback ? options.valueCallback(value) : value;\n    return {\n      value: value,\n      rest: string.slice(matchedString.length)\n    };\n  };\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ formatDistance\n/* harmony export */ });\nvar formatDistanceLocale = {\n  lessThanXSeconds: {\n    one: 'less than a second',\n    other: 'less than {{count}} seconds'\n  },\n  xSeconds: {\n    one: '1 second',\n    other: '{{count}} seconds'\n  },\n  halfAMinute: 'half a minute',\n  lessThanXMinutes: {\n    one: 'less than a minute',\n    other: 'less than {{count}} minutes'\n  },\n  xMinutes: {\n    one: '1 minute',\n    other: '{{count}} minutes'\n  },\n  aboutXHours: {\n    one: 'about 1 hour',\n    other: 'about {{count}} hours'\n  },\n  xHours: {\n    one: '1 hour',\n    other: '{{count}} hours'\n  },\n  xDays: {\n    one: '1 day',\n    other: '{{count}} days'\n  },\n  aboutXWeeks: {\n    one: 'about 1 week',\n    other: 'about {{count}} weeks'\n  },\n  xWeeks: {\n    one: '1 week',\n    other: '{{count}} weeks'\n  },\n  aboutXMonths: {\n    one: 'about 1 month',\n    other: 'about {{count}} months'\n  },\n  xMonths: {\n    one: '1 month',\n    other: '{{count}} months'\n  },\n  aboutXYears: {\n    one: 'about 1 year',\n    other: 'about {{count}} years'\n  },\n  xYears: {\n    one: '1 year',\n    other: '{{count}} years'\n  },\n  overXYears: {\n    one: 'over 1 year',\n    other: 'over {{count}} years'\n  },\n  almostXYears: {\n    one: 'almost 1 year',\n    other: 'almost {{count}} years'\n  }\n};\nfunction formatDistance(token, count, options) {\n  options = options || {};\n  var result;\n\n  if (typeof formatDistanceLocale[token] === 'string') {\n    result = formatDistanceLocale[token];\n  } else if (count === 1) {\n    result = formatDistanceLocale[token].one;\n  } else {\n    result = formatDistanceLocale[token].other.replace('{{count}}', count);\n  }\n\n  if (options.addSuffix) {\n    if (options.comparison > 0) {\n      return 'in ' + result;\n    } else {\n      return result + ' ago';\n    }\n  }\n\n  return result;\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js":
/*!*************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildFormatLongFn/index.js */ \"./node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js\");\n\nvar dateFormats = {\n  full: 'EEEE, MMMM do, y',\n  long: 'MMMM do, y',\n  medium: 'MMM d, y',\n  short: 'MM/dd/yyyy'\n};\nvar timeFormats = {\n  full: 'h:mm:ss a zzzz',\n  long: 'h:mm:ss a z',\n  medium: 'h:mm:ss a',\n  short: 'h:mm a'\n};\nvar dateTimeFormats = {\n  full: \"{{date}} 'at' {{time}}\",\n  long: \"{{date}} 'at' {{time}}\",\n  medium: '{{date}}, {{time}}',\n  short: '{{date}}, {{time}}'\n};\nvar formatLong = {\n  date: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    formats: dateFormats,\n    defaultWidth: 'full'\n  }),\n  time: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    formats: timeFormats,\n    defaultWidth: 'full'\n  }),\n  dateTime: (0,_lib_buildFormatLongFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    formats: dateTimeFormats,\n    defaultWidth: 'full'\n  })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (formatLong);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ formatRelative\n/* harmony export */ });\nvar formatRelativeLocale = {\n  lastWeek: \"'last' eeee 'at' p\",\n  yesterday: \"'yesterday at' p\",\n  today: \"'today at' p\",\n  tomorrow: \"'tomorrow at' p\",\n  nextWeek: \"eeee 'at' p\",\n  other: 'P'\n};\nfunction formatRelative(token, _date, _baseDate, _options) {\n  return formatRelativeLocale[token];\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js":
/*!***********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildLocalizeFn/index.js */ \"./node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js\");\n\nvar eraValues = {\n  narrow: ['B', 'A'],\n  abbreviated: ['BC', 'AD'],\n  wide: ['Before Christ', 'Anno Domini']\n};\nvar quarterValues = {\n  narrow: ['1', '2', '3', '4'],\n  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],\n  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.\n  // If you are making a new locale based on this one, check if the same is true for the language you're working on.\n  // Generally, formatted dates should look like they are in the middle of a sentence,\n  // e.g. in Spanish language the weekdays and months should be in the lowercase.\n\n};\nvar monthValues = {\n  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],\n  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],\n  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']\n};\nvar dayValues = {\n  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],\n  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],\n  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],\n  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']\n};\nvar dayPeriodValues = {\n  narrow: {\n    am: 'a',\n    pm: 'p',\n    midnight: 'mi',\n    noon: 'n',\n    morning: 'morning',\n    afternoon: 'afternoon',\n    evening: 'evening',\n    night: 'night'\n  },\n  abbreviated: {\n    am: 'AM',\n    pm: 'PM',\n    midnight: 'midnight',\n    noon: 'noon',\n    morning: 'morning',\n    afternoon: 'afternoon',\n    evening: 'evening',\n    night: 'night'\n  },\n  wide: {\n    am: 'a.m.',\n    pm: 'p.m.',\n    midnight: 'midnight',\n    noon: 'noon',\n    morning: 'morning',\n    afternoon: 'afternoon',\n    evening: 'evening',\n    night: 'night'\n  }\n};\nvar formattingDayPeriodValues = {\n  narrow: {\n    am: 'a',\n    pm: 'p',\n    midnight: 'mi',\n    noon: 'n',\n    morning: 'in the morning',\n    afternoon: 'in the afternoon',\n    evening: 'in the evening',\n    night: 'at night'\n  },\n  abbreviated: {\n    am: 'AM',\n    pm: 'PM',\n    midnight: 'midnight',\n    noon: 'noon',\n    morning: 'in the morning',\n    afternoon: 'in the afternoon',\n    evening: 'in the evening',\n    night: 'at night'\n  },\n  wide: {\n    am: 'a.m.',\n    pm: 'p.m.',\n    midnight: 'midnight',\n    noon: 'noon',\n    morning: 'in the morning',\n    afternoon: 'in the afternoon',\n    evening: 'in the evening',\n    night: 'at night'\n  }\n};\n\nfunction ordinalNumber(dirtyNumber, _dirtyOptions) {\n  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,\n  // if they are different for different grammatical genders,\n  // use `options.unit`:\n  //\n  //   var options = dirtyOptions || {}\n  //   var unit = String(options.unit)\n  //\n  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',\n  // 'day', 'hour', 'minute', 'second'\n\n  var rem100 = number % 100;\n\n  if (rem100 > 20 || rem100 < 10) {\n    switch (rem100 % 10) {\n      case 1:\n        return number + 'st';\n\n      case 2:\n        return number + 'nd';\n\n      case 3:\n        return number + 'rd';\n    }\n  }\n\n  return number + 'th';\n}\n\nvar localize = {\n  ordinalNumber: ordinalNumber,\n  era: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    values: eraValues,\n    defaultWidth: 'wide'\n  }),\n  quarter: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    values: quarterValues,\n    defaultWidth: 'wide',\n    argumentCallback: function (quarter) {\n      return Number(quarter) - 1;\n    }\n  }),\n  month: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    values: monthValues,\n    defaultWidth: 'wide'\n  }),\n  day: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    values: dayValues,\n    defaultWidth: 'wide'\n  }),\n  dayPeriod: (0,_lib_buildLocalizeFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    values: dayPeriodValues,\n    defaultWidth: 'wide',\n    formattingValues: formattingDayPeriodValues,\n    defaultFormattingWidth: 'wide'\n  })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (localize);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../_lib/buildMatchPatternFn/index.js */ \"./node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js\");\n/* harmony import */ var _lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../_lib/buildMatchFn/index.js */ \"./node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js\");\n\n\nvar matchOrdinalNumberPattern = /^(\\d+)(th|st|nd|rd)?/i;\nvar parseOrdinalNumberPattern = /\\d+/i;\nvar matchEraPatterns = {\n  narrow: /^(b|a)/i,\n  abbreviated: /^(b\\.?\\s?c\\.?|b\\.?\\s?c\\.?\\s?e\\.?|a\\.?\\s?d\\.?|c\\.?\\s?e\\.?)/i,\n  wide: /^(before christ|before common era|anno domini|common era)/i\n};\nvar parseEraPatterns = {\n  any: [/^b/i, /^(a|c)/i]\n};\nvar matchQuarterPatterns = {\n  narrow: /^[1234]/i,\n  abbreviated: /^q[1234]/i,\n  wide: /^[1234](th|st|nd|rd)? quarter/i\n};\nvar parseQuarterPatterns = {\n  any: [/1/i, /2/i, /3/i, /4/i]\n};\nvar matchMonthPatterns = {\n  narrow: /^[jfmasond]/i,\n  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,\n  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i\n};\nvar parseMonthPatterns = {\n  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],\n  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]\n};\nvar matchDayPatterns = {\n  narrow: /^[smtwf]/i,\n  short: /^(su|mo|tu|we|th|fr|sa)/i,\n  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,\n  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i\n};\nvar parseDayPatterns = {\n  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],\n  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]\n};\nvar matchDayPeriodPatterns = {\n  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,\n  any: /^([ap]\\.?\\s?m\\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i\n};\nvar parseDayPeriodPatterns = {\n  any: {\n    am: /^a/i,\n    pm: /^p/i,\n    midnight: /^mi/i,\n    noon: /^no/i,\n    morning: /morning/i,\n    afternoon: /afternoon/i,\n    evening: /evening/i,\n    night: /night/i\n  }\n};\nvar match = {\n  ordinalNumber: (0,_lib_buildMatchPatternFn_index_js__WEBPACK_IMPORTED_MODULE_0__.default)({\n    matchPattern: matchOrdinalNumberPattern,\n    parsePattern: parseOrdinalNumberPattern,\n    valueCallback: function (value) {\n      return parseInt(value, 10);\n    }\n  }),\n  era: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({\n    matchPatterns: matchEraPatterns,\n    defaultMatchWidth: 'wide',\n    parsePatterns: parseEraPatterns,\n    defaultParseWidth: 'any'\n  }),\n  quarter: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({\n    matchPatterns: matchQuarterPatterns,\n    defaultMatchWidth: 'wide',\n    parsePatterns: parseQuarterPatterns,\n    defaultParseWidth: 'any',\n    valueCallback: function (index) {\n      return index + 1;\n    }\n  }),\n  month: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({\n    matchPatterns: matchMonthPatterns,\n    defaultMatchWidth: 'wide',\n    parsePatterns: parseMonthPatterns,\n    defaultParseWidth: 'any'\n  }),\n  day: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({\n    matchPatterns: matchDayPatterns,\n    defaultMatchWidth: 'wide',\n    parsePatterns: parseDayPatterns,\n    defaultParseWidth: 'any'\n  }),\n  dayPeriod: (0,_lib_buildMatchFn_index_js__WEBPACK_IMPORTED_MODULE_1__.default)({\n    matchPatterns: matchDayPeriodPatterns,\n    defaultMatchWidth: 'any',\n    parsePatterns: parseDayPeriodPatterns,\n    defaultParseWidth: 'any'\n  })\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (match);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/locale/en-US/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/date-fns/esm/locale/en-US/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_lib/formatDistance/index.js */ \"./node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js\");\n/* harmony import */ var _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_lib/formatLong/index.js */ \"./node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js\");\n/* harmony import */ var _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_lib/formatRelative/index.js */ \"./node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js\");\n/* harmony import */ var _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_lib/localize/index.js */ \"./node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js\");\n/* harmony import */ var _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_lib/match/index.js */ \"./node_modules/date-fns/esm/locale/en-US/_lib/match/index.js\");\n\n\n\n\n\n/**\n * @type {Locale}\n * @category Locales\n * @summary English locale (United States).\n * @language English\n * @iso-639-2 eng\n * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}\n * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}\n */\n\nvar locale = {\n  code: 'en-US',\n  formatDistance: _lib_formatDistance_index_js__WEBPACK_IMPORTED_MODULE_0__.default,\n  formatLong: _lib_formatLong_index_js__WEBPACK_IMPORTED_MODULE_1__.default,\n  formatRelative: _lib_formatRelative_index_js__WEBPACK_IMPORTED_MODULE_2__.default,\n  localize: _lib_localize_index_js__WEBPACK_IMPORTED_MODULE_3__.default,\n  match: _lib_match_index_js__WEBPACK_IMPORTED_MODULE_4__.default,\n  options: {\n    weekStartsOn: 0\n    /* Sunday */\n    ,\n    firstWeekContainsDate: 1\n  }\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (locale);\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/locale/en-US/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/subMilliseconds/index.js":
/*!************************************************************!*\
  !*** ./node_modules/date-fns/esm/subMilliseconds/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ subMilliseconds\n/* harmony export */ });\n/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ \"./node_modules/date-fns/esm/_lib/toInteger/index.js\");\n/* harmony import */ var _addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../addMilliseconds/index.js */ \"./node_modules/date-fns/esm/addMilliseconds/index.js\");\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n\n\n/**\n * @name subMilliseconds\n * @category Millisecond Helpers\n * @summary Subtract the specified number of milliseconds from the given date.\n *\n * @description\n * Subtract the specified number of milliseconds from the given date.\n *\n * ### v2.0.0 breaking changes:\n *\n * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).\n *\n * @param {Date|Number} date - the date to be changed\n * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.\n * @returns {Date} the new date with the milliseconds subtracted\n * @throws {TypeError} 2 arguments required\n *\n * @example\n * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:\n * var result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)\n * //=> Thu Jul 10 2014 12:45:29.250\n */\n\nfunction subMilliseconds(dirtyDate, dirtyAmount) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(2, arguments);\n  var amount = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_1__.default)(dirtyAmount);\n  return (0,_addMilliseconds_index_js__WEBPACK_IMPORTED_MODULE_2__.default)(dirtyDate, -amount);\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/subMilliseconds/index.js?");

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => /* binding */ toDate\n/* harmony export */ });\n/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ \"./node_modules/date-fns/esm/_lib/requiredArgs/index.js\");\n\n/**\n * @name toDate\n * @category Common Helpers\n * @summary Convert the given argument to an instance of Date.\n *\n * @description\n * Convert the given argument to an instance of Date.\n *\n * If the argument is an instance of Date, the function returns its clone.\n *\n * If the argument is a number, it is treated as a timestamp.\n *\n * If the argument is none of the above, the function returns Invalid Date.\n *\n * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.\n *\n * @param {Date|Number} argument - the value to convert\n * @returns {Date} the parsed date in the local time zone\n * @throws {TypeError} 1 argument required\n *\n * @example\n * // Clone the date:\n * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))\n * //=> Tue Feb 11 2014 11:30:30\n *\n * @example\n * // Convert the timestamp to date:\n * const result = toDate(1392098430000)\n * //=> Tue Feb 11 2014 11:30:30\n */\n\nfunction toDate(argument) {\n  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__.default)(1, arguments);\n  var argStr = Object.prototype.toString.call(argument); // Clone the date\n\n  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {\n    // Prevent the date to lose the milliseconds when passed to new Date() in IE10\n    return new Date(argument.getTime());\n  } else if (typeof argument === 'number' || argStr === '[object Number]') {\n    return new Date(argument);\n  } else {\n    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {\n      // eslint-disable-next-line no-console\n      console.warn(\"Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule\"); // eslint-disable-next-line no-console\n\n      console.warn(new Error().stack);\n    }\n\n    return new Date(NaN);\n  }\n}\n\n//# sourceURL=webpack://todo-list/./node_modules/date-fns/esm/toDate/index.js?");

/***/ }),

/***/ "./node_modules/normalize.css/normalize.css":
/*!**************************************************!*\
  !*** ./node_modules/normalize.css/normalize.css ***!
  \**************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!../sass-loader/dist/cjs.js!./normalize.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\nif (true) {\n  if (!_css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (isNamedExport && p === 'default') {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (isNamedExport && p === 'default') {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var oldLocals = _css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default.locals;\n\n    module.hot.accept(\n      /*! !!../css-loader/dist/cjs.js!../sass-loader/dist/cjs.js!./normalize.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css\",\n      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../css-loader/dist/cjs.js!../sass-loader/dist/cjs.js!./normalize.css */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./node_modules/normalize.css/normalize.css\");\n(function () {\n        if (!isEqualLocals(oldLocals, _css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default.locals, undefined)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = _css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default.locals;\n\n              update(_css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default);\n      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_sass_loader_dist_cjs_js_normalize_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://todo-list/./node_modules/normalize.css/normalize.css?");

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => __WEBPACK_DEFAULT_EXPORT__\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n\n            \n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);\n\n\nif (true) {\n  if (!_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || module.hot.invalidate) {\n    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {\n  if (!a && b || a && !b) {\n    return false;\n  }\n\n  var p;\n\n  for (p in a) {\n    if (isNamedExport && p === 'default') {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (a[p] !== b[p]) {\n      return false;\n    }\n  }\n\n  for (p in b) {\n    if (isNamedExport && p === 'default') {\n      // eslint-disable-next-line no-continue\n      continue;\n    }\n\n    if (!a[p]) {\n      return false;\n    }\n  }\n\n  return true;\n};\n    var oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals;\n\n    module.hot.accept(\n      /*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\",\n      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss\");\n(function () {\n        if (!isEqualLocals(oldLocals, _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals, undefined)) {\n                module.hot.invalidate();\n\n                return;\n              }\n\n              oldLocals = _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals;\n\n              update(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default);\n      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }\n    )\n  }\n\n  module.hot.dispose(function() {\n    update();\n  });\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});\n\n//# sourceURL=webpack://todo-list/./src/style.scss?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://todo-list/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 		__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 		module = execOptions.module;
/******/ 		execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => module['default'] :
/******/ 				() => module;
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => "main." + __webpack_require__.h() + ".hot-update.json";
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => "92ebe2a70f1f19a24037"
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "todo-list:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => fn(event));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			;
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises;
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		// eslint-disable-next-line no-unused-vars
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId) {
/******/ 				return trackBlockingPromise(require.e(chunkId));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: currentChildModule !== moduleId,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 					else hot._acceptedDependencies[dep] = callback || function () {};
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				//inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				registeredStatusHandlers[i].call(null, newStatus);
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 					blockingPromises.push(promise);
/******/ 					waitForBlockingPromises(function () {
/******/ 						setStatus("ready");
/******/ 					});
/******/ 					return promise;
/******/ 				case "prepare":
/******/ 					blockingPromises.push(promise);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises.length === 0) return fn();
/******/ 			var blocker = blockingPromises;
/******/ 			blockingPromises = [];
/******/ 			return Promise.all(blocker).then(function () {
/******/ 				return waitForBlockingPromises(fn);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			setStatus("check");
/******/ 			return __webpack_require__.hmrM().then(function (update) {
/******/ 				if (!update) {
/******/ 					setStatus(applyInvalidatedModules() ? "ready" : "idle");
/******/ 					return null;
/******/ 				}
/******/ 		
/******/ 				setStatus("prepare");
/******/ 		
/******/ 				var updatedModules = [];
/******/ 				blockingPromises = [];
/******/ 				currentUpdateApplyHandlers = [];
/******/ 		
/******/ 				return Promise.all(
/******/ 					Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 						promises,
/******/ 						key
/******/ 					) {
/******/ 						__webpack_require__.hmrC[key](
/******/ 							update.c,
/******/ 							update.r,
/******/ 							update.m,
/******/ 							promises,
/******/ 							currentUpdateApplyHandlers,
/******/ 							updatedModules
/******/ 						);
/******/ 						return promises;
/******/ 					},
/******/ 					[])
/******/ 				).then(function () {
/******/ 					return waitForBlockingPromises(function () {
/******/ 						if (applyOnUpdate) {
/******/ 							return internalApply(applyOnUpdate);
/******/ 						} else {
/******/ 							setStatus("ready");
/******/ 		
/******/ 							return updatedModules;
/******/ 						}
/******/ 					});
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error("apply() is only allowed in ready status");
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				setStatus("abort");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 			results.forEach(function (result) {
/******/ 				if (result.apply) {
/******/ 					var modules = result.apply(reportError);
/******/ 					if (modules) {
/******/ 						for (var i = 0; i < modules.length; i++) {
/******/ 							outdatedModules.push(modules[i]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		
/******/ 			// handle errors in accept handlers and self accepted module load
/******/ 			if (error) {
/******/ 				setStatus("fail");
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw error;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			if (queuedInvalidatedModules) {
/******/ 				return internalApply(options).then(function (list) {
/******/ 					outdatedModules.forEach(function (moduleId) {
/******/ 						if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 					});
/******/ 					return list;
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			setStatus("idle");
/******/ 			return Promise.resolve(outdatedModules);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// Promise = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId) {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatetodo_list"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					/** @type {TODO} */
/******/ 					var result;
/******/ 					if (newModuleFactory) {
/******/ 						result = getAffectedModuleEffects(moduleId);
/******/ 					} else {
/******/ 						result = {
/******/ 							type: "disposed",
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				if (
/******/ 					__webpack_require__.c[outdatedModuleId] &&
/******/ 					__webpack_require__.c[outdatedModuleId].hot._selfAccepted &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!__webpack_require__.c[outdatedModuleId].hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: __webpack_require__.c[outdatedModuleId].hot._requireSelf,
/******/ 						errorHandler: __webpack_require__.c[outdatedModuleId].hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									try {
/******/ 										callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "accept-errored",
/******/ 												moduleId: outdatedModuleId,
/******/ 												dependencyId: dependenciesForCallbacks[k],
/******/ 												error: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// Load self accepted modules
/******/ 					for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 						var item = outdatedSelfAcceptedModules[o];
/******/ 						var moduleId = item.module;
/******/ 						try {
/******/ 							item.require(moduleId);
/******/ 						} catch (err) {
/******/ 							if (typeof item.errorHandler === "function") {
/******/ 								try {
/******/ 									item.errorHandler(err);
/******/ 								} catch (err2) {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-error-handler-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err2,
/******/ 											originalError: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err2);
/******/ 									}
/******/ 									reportError(err);
/******/ 								}
/******/ 							} else {
/******/ 								if (options.onErrored) {
/******/ 									options.onErrored({
/******/ 										type: "self-accept-errored",
/******/ 										moduleId: moduleId,
/******/ 										error: err
/******/ 									});
/******/ 								}
/******/ 								if (!options.ignoreErrored) {
/******/ 									reportError(err);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					return outdatedModules;
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						!__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						__webpack_require__.o(installedChunks, chunkId) &&
/******/ 						installedChunks[chunkId] !== undefined
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no deferred startup
/******/ 		
/******/ 		// no jsonp function
/******/ 		
/******/ 		// no deferred startup
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ })()
;