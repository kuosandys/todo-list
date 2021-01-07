// Factory function that creates a model to organize Todo's
const TodosModel = () => {
    let _todos = [];
    let _projectList = []
    let todosCount = 0;
    let todosChanged;
    let gotTodos;


    // Creates a Todo and adds it to the appropriate project array
    const addTodo = (infoObject, id) => {
        let todo = Todo(
            infoObject['title'],
            infoObject['description'],
            infoObject['due'],
            infoObject['notes'],
            infoObject['project'],
            id || todosCount++
            );
        _todos.push(todo);

        let project = todo['project'];
        if ( !_projectList.includes(project) ) _projectList.push(project);

        todosChanged(_todos);
    };

    // Delete a Todo by id
    const deleteTodo = (id) => {
        _todos = _todos.filter(todo => todo.id !== +id);

        todosChanged(_todos);
    };

    //edits a todo item - by storing a new todo object with the same id
    const editTodo = (todo, id)  => {
        let todoSelected = _todos.find(todo => todo['id'] == id);
        let todoNew = Object.assign(todoSelected, todo);

        _todos = _todos.filter(todo => todo.id !== +id);
        _todos.push(todoNew);

        let project = todo['project'];
        if ( !_projectList.includes(project) ) _projectList.push(project);

        todosChanged(_todos);
    };

    //get a todo from the _projectList by key and specified value
    const getTodos = function(key, value) {
        if (!key && !value) {
            gotTodos (_todos);
            // return _todos;
        } else {
            let todosFiltered = _todos.filter(todo => todo[key] == value);
            console.log(todosFiltered)
            gotTodos (todosFiltered);
            // return todosFiltered;
        };
    };

    const toggleTodoComplete = (id) => {
        let todoSelected = _todos.find(todo => todo['id'] === id);
        todoSelected['complete'] = !todoSelected['complete'];

        todosChanged(_todos);
        // let todoNew = Object.assign(todoSelected, todo);

        // _todos = _todos.filter(todo => todo.id !== +id);
        // _todos.push(todoNew);
    }

    // Bind a Controller action to todosChanged event
    const bindTodosChanged = (controllerAction) => {
        todosChanged = controllerAction;
    };

    // Bind a Controller action to gotTodo event
    const bindGotTodos = (controllerAction) => {
        gotTodos = controllerAction;
    }



    return {
        addTodo,
        deleteTodo,
        editTodo,
        getTodos,
        toggleTodoComplete,

        bindTodosChanged,
        bindGotTodos,
    }
};

// Function factory to create Todo objects
const Todo = (title, description, due, notes, project, id) => {
    let complete = false;

    return {
        title,
        description,
        due,
        notes,
        complete,
        project,
        id
    }
};

export { TodosModel, Todo}