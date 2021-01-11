// Factory function that creates a model to organize Todo's
const TodosModel = () => {
    let _todos = JSON.parse(localStorage.getItem('todos')) || [];
    let _projectList = JSON.parse(localStorage.getItem('projects')) || [];

    let todosCount = (() => {
        let max = 1;
        _todos.forEach(todo => {
            max = (todo.id > max) ? todo.id : max;
        });
        return max + 1;
    })();

    let todosChanged;
    let gotTodos;

    // Creates a Todo and adds it to the appropriate project array
    const addTodo = (infoObject, id) => {
        let todo = Todo(
            infoObject['title'],
            infoObject['description'],
            infoObject['due'],
            infoObject['project'],
            id || todosCount++
            );
        _todos.push(todo);

        let project = todo['project'];
        if ( !_projectList.includes(project) ) _projectList.push(project);

        _saveChanges();
    };

    // Delete a Todo by id
    const deleteTodo = (id) => {
        _todos = _todos.filter(todo => todo.id !== +id);

        _saveChanges();
    };

    //edits a todo item - by storing a new todo object with the same id
    const editTodo = (todo, id)  => {
        let todoSelected = _todos.find(todo => todo['id'] == id);
        let todoNew = Object.assign(todoSelected, todo);

        _todos = _todos.filter(todo => todo.id !== +id);
        _todos.push(todoNew);

        let project = todo['project'];
        if ( !_projectList.includes(project) ) _projectList.push(project);

        _saveChanges();
    };

    //get a todo from the _projectList by key and specified value
    const getTodos = (key, value) => {
        if (!key && !value) {
            _saveChanges();
            return _todos;
        } else {
            let todosFiltered = _todos.filter(todo => todo[key] == value);
            gotTodos (todosFiltered);
            // return todosFiltered;
        };
    };

    // Get the list of projects
    const getProjects = () => {
        return _projectList;
    };

    const toggleTodoComplete = (id) => {
        let todoSelected = _todos.find(todo => todo['id'] === id);
        todoSelected['complete'] = !todoSelected['complete'];

        _saveChanges();
    }

    // Bind a Controller action to todosChanged event
    const bindTodosChanged = (controllerAction) => {
        todosChanged = controllerAction;
    };

    // Bind a Controller action to gotTodo event
    const bindGotTodos = (controllerAction) => {
        gotTodos = controllerAction;
    }

    const _saveChanges = () => {
        todosChanged(_todos, _projectList);
        localStorage.setItem('todos', JSON.stringify(_todos));
        localStorage.setItem('projects', JSON.stringify(_projectList));
    };



    return {
        addTodo,
        deleteTodo,
        editTodo,
        getTodos,
        getProjects,
        toggleTodoComplete,

        bindTodosChanged,
        bindGotTodos,
    }
};

// Function factory to create Todo objects
const Todo = (title, description, due, project, id) => {
    let complete = false;

    return {
        title,
        description,
        due,
        complete,
        project,
        id
    }
};

export { TodosModel, Todo}