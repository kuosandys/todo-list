import { format as formatDate} from 'date-fns';

// Factory function that creates an object to interact with the DOM
const ViewController = (Todo) => {
    // Create an empty Todo as a template
    const templateTodo = Todo;

    const root = document.body;

    let newTodo;
    let viewProjects;

    let formDiv;
    let backdropDiv;
    let todosDiv;
    let editTodoDiv;
    let projectsDiv;

    let formElements = [];
    let projectList = [];

    // Initialize the display
    const renderInitial = () => {
        // Header
        let header = document.createElement('header');

        // Title
        let titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        let title = document.createElement('h1');
        title.textContent = 'Things'
        let description = document.createElement('h2');
        description.textContent = 'to do';
        titleDiv.appendChild(title);
        titleDiv.appendChild(description);
        header.appendChild(titleDiv);

        // Add New Todo button
        newTodo = document.createElement('div');
        newTodo.classList.add('new-todo');

        let newButton = document.createElement('button');
        newButton.innerHTML = '<i class="fas fa-plus"></i>';
        newButton.addEventListener('click', e => {
            renderForm();
            newTodo.classList.add('hide-new-todo-button');
            viewProjects.classList.remove('show-projects-button');
        });

        newTodo.appendChild(newButton);
        header.appendChild(newTodo);

        // View project list button
        viewProjects = document.createElement('div');
        viewProjects.classList.add('projects-button');
        viewProjects.classList.add('show-projects-button');

        let viewProjectsButton = document.createElement('button');
        viewProjectsButton.innerHTML = '<i class="far fa-folder"></i>';
        viewProjects.addEventListener('click', () => {
            projectsDiv.classList.toggle('show-projects-div');
            backdropDiv.classList.remove('show-backdrop');
            newTodo.classList.toggle('hide-new-todo-button');
        });

        viewProjects.appendChild(viewProjectsButton);
        header.appendChild(viewProjects);

        root.appendChild(header);

        // Form div
        formDiv = document.createElement('form');
        formDiv.classList.add('form-div');
        root.appendChild(formDiv);

        // Backdrop div - used to grey out background
        backdropDiv = document.createElement('div');
        backdropDiv.classList.add('backdrop');
        root.appendChild(backdropDiv);

        // Todos div
        todosDiv = document.createElement('div');
        todosDiv.classList.add('todos-div');
        root.appendChild(todosDiv);

        // Edit Todos div
        editTodoDiv = document.createElement('div');
        editTodoDiv.classList.add('edit-todo-div');
        root.appendChild(editTodoDiv);

        // Projects view div
        projectsDiv = document.createElement('div');
        projectsDiv.classList.add('projects-div');
        root.appendChild(projectsDiv);

    };

    // Render a form to add Todos from the templateTodo
    const renderForm = () => {
        formDiv.classList.add('show-form-div');
        backdropDiv.classList.add('show-backdrop');

        let title = document.createElement('p');
        title.textContent = 'Remember to...';
        formDiv.appendChild(title);
        
        Object.keys(templateTodo).forEach(key => {

            if (key === 'id' || key === 'complete') {
                return;
            };

            let newInput = document.createElement('input');

            if (key === 'due') {
                newInput.type = 'date';
                newInput.value = formatDate(new Date(), 'yyyy-MM-dd');
            } else {
                newInput.type = 'text';
                newInput.value = (key === 'project') ? 'New Project' : '';
                newInput.placeholder = (key === 'title')
                    ? 'Task e.g. go to Diagon Alley'
                    : (key === 'description')
                        ? 'Notes e.g. don\'t use floo powder' : '';
            };

            newInput.name = key;

            formDiv.appendChild(newInput);
            formElements.push(newInput);

        });

        // submit button to add new todo
        let submitButton = document.createElement('button');
        submitButton.classList.add('submit-form');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add';
        formDiv.appendChild(submitButton);

        // cancel button to clear and hide form
        let cancelButton = document.createElement('button');
        cancelButton.id = 'cancel-form';
        cancelButton.classList.add('cancel-button');
        cancelButton.innerHTML = '<i class="fas fa-times"></i>';
        cancelButton.type = 'reset';
        cancelButton.addEventListener('click', e => {
            e.preventDefault();
            _hideForm();
        });
        formDiv.appendChild(cancelButton);

    };

    // Clear and hide the form
    const _hideForm = () => {
        while (formDiv.firstChild) {
            formDiv.removeChild(formDiv.lastChild);
        };
        formElements = [];

        // Show button to create form again
        newTodo.classList.remove('hide-new-todo-button');

        // Show button for project view again
        viewProjects.classList.add('show-projects-button');

        formDiv.classList.remove('show-form-div');
        backdropDiv.classList.remove('show-backdrop');

    };

    // Render an array of Todos
    const renderTodos = (todos) => {
        backdropDiv.classList.remove('show-backdrop');
        newTodo.classList.remove('hide-new-todo-button');
        projectsDiv.classList.remove('show-projects-div');

        // Delete all elements from the Todos div
        while (todosDiv.firstChild) {
            todosDiv.removeChild(todosDiv.lastChild);
        };

        // If there are no Todo's, display a message
        if (!todos || todos.length === 0) {
            let p = document.createElement('p');
            p.classList.add('no-todo-placeholder-text');
            p.textContent = 'Nothing to do yet...';
            todosDiv.appendChild(p)
            return;
        };

        // Sort Todos by id descending to show latest add on top
        todos = todos.sort( (a, b) => b.id - a.id );

        todos.forEach(todo => {
            let todoDiv = _renderTodo(todo);
            todosDiv.appendChild(todoDiv);
        })

    };

    // Render a single Todo
    const _renderTodo = (todo) => {
        // Create a div for each todo todo
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo-div');

        let todoTitleDiv = document.createElement('div');
        todoTitleDiv.classList.add('todo-title-div');

        // Iterate through the keys of the todo
        for (let key in todo) {

            if (key === 'id') {
                todoDiv.id = todo[key];
            } else if (todo.hasOwnProperty(key)) {

                let p = document.createElement('p');

                if (key === 'complete') {
                    p.innerHTML = '<i class="fas fa-check"></i>';
                    p.setAttribute('data-complete', todo[key]);

                    if (todo[key] === true) {
                        p.classList.add('completed');
                        todoDiv.classList.add('completed-todo');
                    };

                } else if (key === 'due') {
                    p.textContent = formatDate(new Date(todo[key]), 'dd MMM, yyyy');
                } else if (key === 'description' && todo[key] === '') {
                    p.textContent = 'No notes yet.'
                    p.classList.add('todo-placeholder-text');
                } else {
                    p.textContent = todo[key];
                };

                p.classList.add(`todo-${key}`);

                if (key === 'title') {
                    todoTitleDiv.appendChild(p);
                    todoDiv.appendChild(todoTitleDiv);
                } else {
                    todoDiv.appendChild(p);
                };

            };

        };

        // click on title to expand Todo
        todoTitleDiv.addEventListener('click', () => {
            todoDiv.classList.toggle('expanded-todo');
        });
        
        // delete button
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        deleteButton.classList.add('delete-todo');
        todoDiv.appendChild(deleteButton);

        // edit button
        let editButton = document.createElement('button');
        editButton.innerHTML = '<i class="far fa-edit"></i>';
        editButton.classList.add('edit-todo');
        todoDiv.appendChild(editButton);

        return todoDiv;
    };

    const renderProjects = (projects) => {
        while (projectsDiv.firstChild) {
            projectsDiv.removeChild(projectsDiv.lastChild);
        };

        let div = document.createElement('div');
        div.classList.add('project-div');

        let p = document.createElement('p');
        p.textContent = 'View All Todos';
        div.appendChild(p);

        projectsDiv.appendChild(div);

        projectList = [];

        projects.forEach(project => {
            let div = document.createElement('div');
            div.classList.add('project-div');

            let p = document.createElement('p');
            p.textContent = project;
            p.classList.add('project-name');
            div.appendChild(p);
            
            projectList.push(p);

            projectsDiv.appendChild(div);
        });

    };

    // Render a form to edit Todo
    const renderEditTodo = (todo) => {
        editTodoDiv.classList.add('show-edit-div');
        backdropDiv.classList.add('show-backdrop');
        viewProjects.classList.remove('show-projects-button');

        let title = document.createElement('p');
        title.textContent = 'On second thought...';
        editTodoDiv.appendChild(title);

        Object.keys(todo).forEach(key => {

            if (key === 'id' || key === 'complete') {
                return;
            };

            let newInput = document.createElement('input');

            if (key === 'due') {
                newInput.type = 'date';
                newInput.value = formatDate(new Date(todo[key]), 'yyyy-MM-dd');
            } else {
                newInput.type = 'text';
                newInput.value = todo[key];
            };

            newInput.name = key;
            formElements.push(newInput);

            editTodoDiv.appendChild(newInput);

        });

        // save edit button
        let saveEditButton = document.createElement('button');
        saveEditButton.textContent = 'Save Edit';
        saveEditButton.classList.add('save-todo-edit');
        saveEditButton.id = todo['id'];
        editTodoDiv.appendChild(saveEditButton);
        
        // cancel edit button
        let cancelButton = document.createElement('button');
        cancelButton.innerHTML = '<i class="fas fa-times"></i>';
        cancelButton.id = 'cancel-todo-edit';
        cancelButton.classList.add('cancel-button');
        cancelButton.addEventListener('click', e => {
            e.preventDefault();
            _hideEdit();
        });
        editTodoDiv.appendChild(cancelButton);

    };

    // Hide the Edit Todo div
    const _hideEdit = () => {
        while (editTodoDiv.firstChild) {
            editTodoDiv.removeChild(editTodoDiv.lastChild);
        };

        formElements = [];

        editTodoDiv.classList.remove('show-edit-div');
        backdropDiv.classList.remove('show-backdrop');
        viewProjects.classList.add('show-projects-button');
        let newTodo = document.getElementsByClassName('new-todo')[0];
        newTodo.classList.remove('hide-new-todo-button');

    };

    // Return form input if valid, else false
    const _getFormInput = () => {
        
        let inputObject = {};
        formElements.forEach(element => {
            if (element.name === 'due') {
                inputObject[element.name] = element.valueAsDate;
            } else {
                inputObject[element.name] = element.value;
            }
        });

        return _verifyFormInput(inputObject);
    };

    // Verify the form input
    const _verifyFormInput = (inputObject) => {

        if (inputObject.title === '') {

            alert ('Please add the name of your task!')
            return false;

        } else if (inputObject.project === '') {
            
            inputObject.project = 'Untitled Project';
            return inputObject;

        } else {
            return inputObject;
        };

    };

    // Bind methods: binds an event to a controller method

    // Form submission button to send the form input
    const bindRequestAddTodo = (controllerAction) => {

        formDiv.addEventListener('submit', e => {

            e.preventDefault();
            let inputObject = _getFormInput();

            if (inputObject) {
                controllerAction(inputObject);
                _hideForm();
            } else {
                return;
            };

        });

    };

    // Delete Todo buttons send the id of the Todo for deletion
    const bindRequestDeleteTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.classList.contains('fa-trash-alt')) {
                // confirm the delete
                let confirmation = confirm('Are you sure you want to delete this task?');
                if (confirmation) {
                    let id = e.target.parentElement.parentElement.id;
                    controllerAction(id);
                } else {
                    return;
                }
            };

        });

    };

    // Edit Todo buttons send the id of the Todo for edit
    const bindRequestEditTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.classList.contains('fa-edit')) {
                let id = e.target.parentElement.parentElement.id;
                controllerAction('id', +id);
            };

        });

    };

    // Save Todo buttons send the editted Todo and its id
    const bindRequestSaveTodo = (controllerAction) => {

        editTodoDiv.addEventListener('click', e => {

            if (e.target.classList.contains('save-todo-edit')) { 

                let id = e.target.id;
                let inputObject = _getFormInput();

                if (inputObject) {
                    controllerAction(inputObject, id);
                    _hideEdit();
                } else {
                    return;
                };

            };

        });

    };

    // Toggle Complete status of Todos
    const bindRequestCompleteTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.classList.contains('fa-check')) {

                let boolean = e.target.parentElement.getAttribute('data-complete');
                e.target.parentElement.setAttribute('data-complete', !boolean);
                let id = e.target.parentElement.parentElement.id;
                controllerAction(id);

            }

        })
    };

    const bindRequestByProject = (controllerAction) => {
        projectsDiv.addEventListener('click', e => {
            
            if (e.target.classList.contains('project-name')) {
                controllerAction('project', e.target.textContent);
            } else {
                controllerAction();
            }

        });
    };


    return {
        renderInitial,
        renderTodos,
        renderProjects,
        renderEditTodo,

        bindRequestAddTodo,
        bindRequestDeleteTodo,
        bindRequestEditTodo,
        bindRequestSaveTodo,
        bindRequestCompleteTodo,
        bindRequestByProject
    }
};

export { ViewController };