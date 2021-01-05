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

/***/ "./src/eventhandler.js":
/*!*****************************!*\
  !*** ./src/eventhandler.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventHandler\": () => /* binding */ EventHandler\n/* harmony export */ });\n//object that handles events using pub/sub pattern\nvar EventHandler = function () {\n  var events = {};\n\n  var subscribe = function subscribe(eventName, fn) {\n    events[eventName] = events[eventName] || [];\n    events[eventName].push(fn);\n  };\n\n  var publish = function publish(eventName, data) {\n    if (events[eventName]) {\n      events[eventName].forEach(function (fn) {\n        (function (data) {\n          return fn;\n        });\n      });\n    }\n  };\n\n  return {\n    events: events,\n    subscribe: subscribe,\n    publish: publish\n  };\n}();\n\n\n\n//# sourceURL=webpack://todo-list/./src/eventhandler.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/model.js */ \"./src/model.js\");\n/* harmony import */ var _src_views_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/views.js */ \"./src/views.js\");\n\n\n\nvar App = function () {\n  var model = (0,_src_model_js__WEBPACK_IMPORTED_MODULE_0__.TodosModel)();\n  var views = (0,_src_views_js__WEBPACK_IMPORTED_MODULE_1__.ViewsController)();\n\n  var TodoListChanged = function TodoListChanged(todos) {\n    views.renderTodos(todos);\n  };\n\n  var startUp = function startUp() {\n    views.renderInitial();\n    TodoListChanged(model.getAllTodos());\n  };\n\n  return {\n    startUp: startUp\n  };\n}();\n\nApp.startUp();\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TodosModel\": () => /* binding */ TodosModel\n/* harmony export */ });\n/* harmony import */ var _src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/eventhandler.js */ \"./src/eventhandler.js\");\n //Manages the storage of the todo items\n\nvar TodosModel = function TodosModel() {\n  var projectList = {//'sample project': []\n  };\n  var todosCount = 0;\n  _src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__.EventHandler.subscribe('addTodo', addTodo); //takes info, makes a todo obj, adds an id to it and stores it the appropriate project\n\n  var addTodo = function addTodo(todoInfo, project) {\n    var todo = Todo(todoInfo);\n    todo.id = todosCount++;\n    projectList[project] = projectList[project] || [];\n    projectList[project].push(todo);\n    _src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__.EventHandler.publish('todoAdded', getAllTodos());\n  }; //get a todo from the projectList by key and specified value\n\n\n  var getTodo = function getTodo(key, value) {\n    var todo;\n    Object.keys(projectList).forEach(function (project) {\n      todo = projectList[project].filter(function (item) {\n        return item.key == value;\n      })[0] || false;\n    });\n    return todo;\n  }; //edits a todo item - by storing a new todo object with the same id\n\n\n  var editTodo = function editTodo(todo, id) {\n    Object.keys(projectList).forEach(function (project) {\n      projectList[project].forEach(function (item) {\n        if (item.id === +id) {\n          item = Object.assign(item, todo);\n        }\n      });\n    });\n  }; //delete a todo item\n\n\n  var deleteTodo = function deleteTodo(id) {\n    Object.keys(projectList).forEach(function (project) {\n      projectList[project] = projectList[project].filter(function (item) {\n        return item.id !== +id;\n      });\n    });\n  }; //create new project\n\n\n  var addProject = function addProject(name) {\n    if (projectList.hasOwnProperty(name)) {\n      return false;\n    }\n\n    ;\n    projectList[name] = [];\n  }; //delete project\n\n\n  var deleteProject = function deleteProject(name) {\n    delete projectList[name];\n  }; //return all todos as a flat array\n\n\n  var getAllTodos = function getAllTodos() {\n    var array = [];\n    Object.keys(projectList).forEach(function (project) {\n      projectList[project].forEach(function (item) {\n        return array.push(item);\n      });\n    });\n    return array;\n  };\n\n  return {\n    projectList: projectList,\n    addTodo: addTodo,\n    getTodo: getTodo,\n    deleteTodo: deleteTodo,\n    editTodo: editTodo,\n    addProject: addProject,\n    deleteProject: deleteProject,\n    getAllTodos: getAllTodos\n  };\n}; // creates a todo object from user input\n\n\nvar Todo = function Todo(title, description, due, notes) {\n  var completed = false;\n  return {\n    title: title,\n    description: description,\n    due: due,\n    notes: notes,\n    completed: completed\n  };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/model.js?");

/***/ }),

/***/ "./src/views.js":
/*!**********************!*\
  !*** ./src/views.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ViewsController\": () => /* binding */ ViewsController\n/* harmony export */ });\n/* harmony import */ var _src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/eventhandler.js */ \"./src/eventhandler.js\");\n\n\nvar ViewsController = function ViewsController() {\n  var body = document.body;\n  _src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__.EventHandler.subscribe('todoAdded', renderTodos); //initializes the page display\n\n  var renderInitial = function renderInitial() {\n    //header element\n    var header = document.createElement('header');\n    var title = document.createElement('h1');\n    title.textContent = 'Todo List!';\n    header.appendChild(title);\n    body.appendChild(header);\n    renderForm();\n  };\n\n  var renderForm = function renderForm() {\n    var form = document.createElement('form'); //todo title\n\n    var todoTitle = document.createElement('input');\n    todoTitle.type = 'text';\n    todoTitle.name = 'title'; //todo description\n\n    var todoDescription = document.createElement('input');\n    todoDescription.type = 'text';\n    todoDescription.name = 'description'; //todo due\n\n    var todoDue = document.createElement('input');\n    todoDue.type = 'date';\n    todoDue.name = 'due'; //todo notes\n\n    var todoNotes = document.createElement('input');\n    todoNotes.type = 'text';\n    todoNotes.name = 'notes'; //submit button\n\n    var submitButton = document.createElement('button');\n    submitButton.textContent = 'Submit';\n    submitButton.addEventListener('click', function (event) {\n      event.preventDefault();\n      _src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__.EventHandler.publish('addTodo', getFormInput());\n      console.log(_src_eventhandler_js__WEBPACK_IMPORTED_MODULE_0__.EventHandler.events);\n    }); //cancel button\n\n    var cancelButton = document.createElement('button');\n    cancelButton.textContent = 'Cancel';\n    form.append(todoTitle, todoDescription, todoDue, todoNotes, submitButton, cancelButton);\n    body.appendChild(form);\n    var todosDiv = document.createElement('div');\n    todosDiv.id = 'todos';\n    body.appendChild(todosDiv);\n  }; //renders an array as todo items div and appends it\n\n\n  var renderTodos = function renderTodos(array) {\n    var todosDiv = document.getElementById('todos');\n\n    if (!array || array.length == 0) {\n      var p = document.createElement('p');\n      todosDiv.append(p, 'nothing to do...');\n      return;\n    }\n\n    ; //for each item\n\n    array.forEach(function (item) {\n      var todoDiv = document.createElement('div');\n      todoDiv.id = item.id; //iterate through keys, exceptions for 'id' and 'completed'\n\n      for (var key in item) {\n        if (key == 'id') {\n          continue;\n        } else if (key == 'complete') {\n          var checkbox = document.createElement('input');\n          checkbox.type = 'checkbox';\n          checkbox.checked = item[key];\n          todoDiv.appendChild(checkbox);\n        } else if (item.hasOwnProperty(key)) {\n          var _p = document.createElement('p');\n\n          _p.textContent = item[key];\n          _p[\"class\"] = key;\n          todoDiv.appendChild(_p);\n        }\n      }\n\n      ; //delete button\n\n      var deleteButton = document.createElement('button');\n      deleteButton.textContent = 'Delete'; //edit button\n\n      var editButton = document.createElement('button');\n      editButton.textContent = 'Edit';\n      todoDiv.append(deleteButton, editButton);\n      todosDiv.appendChild(todoDiv);\n    });\n  }; //takes the form input\n\n\n  var getFormInput = function getFormInput() {\n    var title = document.getElementsByName('title').value;\n    var description = document.getElementsByName('description').value;\n    var due = document.getElementsByName('due').value;\n    var notes = document.getElementsByName('notes').value;\n    return {\n      title: title,\n      description: description,\n      due: due,\n      notes: notes\n    };\n  };\n\n  return {\n    renderInitial: renderInitial,\n    renderTodos: renderTodos,\n    getFormInput: getFormInput\n  };\n};\n\n\n\n//# sourceURL=webpack://todo-list/./src/views.js?");

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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/index.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;