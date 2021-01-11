import { format as formatDate} from 'date-fns';
import { parse as parseDate } from 'date-fns';

// Factory function that creates an object to interact with the DOM
const ViewController = (Todo) => {
    // Create an empty Todo as a template
    const templateTodo = Todo;

    const root = document.body;
    let formDiv;
    let backdropDiv;
    let todosDiv;
    let editTodoDiv;
    let formElements;

    // Initialize the display
    const renderInitial = () => {
        let header = document.createElement('header');

        let titleDiv = document.createElement('div');
        titleDiv.classList.add('title');
        let title = document.createElement('h1');
        title.textContent = 'Things'
        let description = document.createElement('h2');
        description.textContent = 'to do';
        titleDiv.appendChild(title);
        titleDiv.appendChild(description);
        header.appendChild(titleDiv);

        let newTodo = document.createElement('div');
        newTodo.id = 'new-todo';
        let newButton = document.createElement('button');
        newButton.innerHTML = '<i class="fas fa-plus"></i>';
        newButton.addEventListener('click', e => {
            e.preventDefault();
            renderForm();
            newTodo.classList.add('hide-new-todo-button');
        });
        newTodo.appendChild(newButton);
        header.appendChild(newTodo);

        root.appendChild(header);

        formDiv = document.createElement('form');
        formDiv.classList.add('form-div');
        root.appendChild(formDiv);

        backdropDiv = document.createElement('div');
        backdropDiv.classList.add('backdrop');
        root.appendChild(backdropDiv);

        todosDiv = document.createElement('div');
        todosDiv.classList.add('todos-div');
        root.appendChild(todosDiv);

        editTodoDiv = document.createElement('div');
        editTodoDiv.classList.add('edit-todo-div');
        root.appendChild(editTodoDiv);

    };

    // Render a form to add/edit Todos
    const renderForm = () => {
        formDiv.classList.toggle('show-form-div');
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

        // cancel button to clear form
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

    const _hideForm = () => {
        while (formDiv.firstChild) {
            formDiv.removeChild(formDiv.lastChild);
        };
        formElements = [];

        // Show button to create form again
        let newTodo = document.getElementById('new-todo');
        newTodo.classList.remove('hide-new-todo-button');

        formDiv.classList.toggle('show-form-div');
        backdropDiv.classList.remove('show-backdrop');
    };

    // Renders an array of Todos
    const renderTodos = (todos) => {
        backdropDiv.classList.remove('show-backdrop');

        formElements = [];

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

        // Sort Todos by id
        todos = todos.sort( (a, b) => b.id - a.id );

        todos.forEach(todo => {
            let todoDiv = _renderTodo(todo);
            todosDiv.appendChild(todoDiv);
        })

    };

    // Render a single Todo todo
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

        todoTitleDiv.addEventListener('click', () => {
            todoDiv.classList.toggle('expanded-todo');
        });
        
        //delete button
        let deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.classList.add('delete-todo');
        todoDiv.appendChild(deleteButton);

        //edit button
        let editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('edit-todo');
        todoDiv.appendChild(editButton);

        return todoDiv;
    };

    const renderEditTodo = (todo) => {
        editTodoDiv.classList.toggle('show-edit-div');
        backdropDiv.classList.add('show-backdrop');

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

        let saveEditButton = document.createElement('button');
        saveEditButton.textContent = 'Save Edit';
        saveEditButton.classList.add('save-todo-edit');
        saveEditButton.id = todo['id'];
        editTodoDiv.appendChild(saveEditButton);
        
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

    // Hides the Edit Todo div;
    const _hideEdit = () => {
        while (editTodoDiv.firstChild) {
            editTodoDiv.removeChild(editTodoDiv.lastChild);
        };
        editTodoDiv.classList.toggle('show-edit-div');
        backdropDiv.classList.remove('show-backdrop');
    };

    // returns the form input as a todo info todos
    const _getFormInput = () => {
        let inputObject = {};
        formElements.forEach(element => {
            if (element.name === 'due') {
                inputObject[element.name] = element.valueAsDate;
            } else {
                inputObject[element.name] = element.value;
            }
        });

        return inputObject;
    };

    // Bind methods: binds an event to a controller method

    // Form submission button sends the form input as an Object
    const bindRequestAddTodo = (controllerAction) => {
        formDiv.addEventListener('submit', e => {
            e.preventDefault();
            controllerAction( _getFormInput() );
            _hideForm();
        });
    };

    // Delete Todo buttons send the id of the Todo for deletion
    const bindRequestDeleteTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.classList.contains('fa-trash-alt')) {
                let id = e.target.parentElement.parentElement.id;
                controllerAction(id);
            };

        });

    };

    // Edit Todo buttons send the id of the Todo for edit
    const bindRequestEditTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.classList.contains('fa-edit')) {
                let id = e.target.parentElement.parentElement.id;
                controllerAction(id);
            };

        });

    };

    // Save Todo buttons send the editted Todo as an Object
    const bindRequestSaveTodo = (controllerAction) => {

        editTodoDiv.addEventListener('click', e => {

            if (e.target.classList.contains('save-todo-edit')) { 
                let id = e.target.id;
                controllerAction( _getFormInput(), id);
                _hideEdit();
            };

        });

    };

    const bindRequestCompleteTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {
            if (e.target.classList.contains('fa-check')) {
                let boolean = e.target.parentElement.getAttribute('data-complete');
                e.target.parentElement.setAttribute('data-complete', !boolean);
                let id = e.target.parentElement.parentElement.id;
                controllerAction(id);
            }

        })
    }

    return {
        renderInitial,
        renderTodos,
        renderEditTodo,

        bindRequestAddTodo,
        bindRequestDeleteTodo,
        bindRequestEditTodo,
        bindRequestSaveTodo,
        bindRequestCompleteTodo
    }
};

export { ViewController };