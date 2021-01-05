//Manages the storage of the todo items
const TodosModel = () => {
    let projectList = {
        //'sample project': []
    };
    let todosCount = 0;
    let todoListUpdated;


    //takes info, makes a todo obj, adds an id to it and stores it the appropriate project
    const addTodo = (newTodoInfo) => {
        let project = newTodoInfo[project];
        delete newTodoInfo[project];
        let todo = Todo(newTodoInfo);
        todo.id = todosCount++;
        projectList[project] = projectList[project] || [];
        projectList[project].push(todo);

        todoListUpdated( getAllTodos() );
    };

    //get a todo from the projectList by key and specified value
    const getTodo = function(key, value) {
        let todo;
        Object.keys(projectList).forEach(project => {
            todo = projectList[project].filter(item => item.key == value)[0] || false;
        });
        return todo;
    };

    //edits a todo item - by storing a new todo object with the same id
    const editTodo = (todo, id)  => {
        Object.keys(projectList).forEach(project => {
            projectList[project].forEach(item => {
                if (item.id === +id) {
                    item = Object.assign(item, todo);
                }
            })
        });
        todoListUpdated( getAllTodos() );
    };

    //delete a todo item
    const deleteTodo = (id) => {
        Object.keys(projectList).forEach(project => {
            projectList[project] = projectList[project].filter(item => item.id !== +id);
        });
        todoListUpdated( getAllTodos() );
    };

    //create new project
    const addProject = (name) => {
        if (projectList.hasOwnProperty(name)) {
            return false;
        };
        projectList[name] = [];
    };

    //delete project
    const deleteProject = (name) => {
        delete projectList[name];
    }

    //return all todos as a flat array
    const getAllTodos = () => {
        let array = [];
        Object.keys(projectList).forEach(project => {
            projectList[project].forEach(item => array.push(item));
        });
        return array;
    };

    const bindUpdateTodoList = (controllerAction) => {
        todoListUpdated = controllerAction;
    };



    return {
        projectList,
        addTodo,
        getTodo,
        deleteTodo,
        editTodo,
        addProject,
        deleteProject,
        getAllTodos,
        bindUpdateTodoList
    }
};

// creates a todo object from user input
const Todo = (title, description, due, notes) => {
    let completed = false;

    return {
        title,
        description,
        due,
        notes,
        completed
    }
};

export { TodosModel }