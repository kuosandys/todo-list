import { format as formatDate} from 'date-fns';
import { Todo } from './todos_model.js';

// Factory function that creates an object to interact with the DOM
const ViewController = () => {
    const root = document.body;
    let formDiv;
    let todosDiv;
    let editTodoDiv;
    let formElements = [];

    // Initialize the display
    const renderInitial = () => {
        let header = document.createElement('header');
        let title = document.createElement('h1');
        title.textContent = 'Todo List!'
        header.appendChild(title);
        root.appendChild(header);

        let newTodo = document.createElement('div');
        newTodo.id = 'new-todo';
        let newButton = document.createElement('button');
        newButton.textContent = 'New Todo';
        newButton.addEventListener('click', e => {
            e.preventDefault();
            renderForm();
        });
        newTodo.appendChild(newButton);
        root.appendChild(newTodo);

        formDiv = document.createElement('form');
        root.appendChild(formDiv);

        todosDiv = document.createElement('div');
        root.appendChild(todosDiv);

        editTodoDiv = document.createElement('div');
        root.appendChild(editTodoDiv);

    };

    // Render a form to add/edit Todos
    const renderForm = () => {
        // Create an empty Todo as a template
        let templateTodo = Todo();
        
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
            };

            newInput.name = key;

            formDiv.appendChild(newInput);
            formElements.push(newInput)

        });

        // formElements.forEach(element => {

        //     if (element.name === 'due') {
        //         element.value = formatDate(new Date(), 'yyyy-MM-dd');
        //     } else if (element.name === 'project') {
        //         element.value = 'Default Project';
        //     } else {
        //         element.value = '';
        //     };

        //     formDiv.appendChild(element)
        // });

        // formElements.forEach(element => formDiv.appendChild(element));

        // // todo title
        // let todoTitle = document.createElement('input');
        // todoTitle.type = 'text';
        // todoTitle.name = 'title';

        // // todo description
        // let todoDescription = document.createElement('input');
        // todoDescription.type = 'text';
        // todoDescription.name = 'description';

        // // todo due date
        // let todoDue = document.createElement('input');
        // todoDue.type = 'date';
        // todoDue.name = 'due';

        // // todo notes
        // let todoNotes = document.createElement('input');
        // todoNotes.type = 'text';
        // todoNotes.name = 'notes';

        // // todo project
        // let todoProject = document.createElement('input');
        // todoProject.type = 'text';
        // todoProject.name = 'project';

        // formElements = [
        //     todoTitle, todoDescription, todoDue, todoNotes,
        //     todoProject
        // ];

        // submit button to add new todo
        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Add';
        formDiv.appendChild(submitButton);

        // cancel button to clear form
        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.type = 'reset';
        cancelButton.id = 'cancel';
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
    };

    // const _resetForm = () => {
    //     // formElements = [title, description, due, notes, project]
    //     formElements.forEach(element => {
    //         if (element.name === 'due') {
    //             element.value = formatDate(new Date(), 'yyyy-MM-dd');
    //         } else if (element.name === 'project') {
    //             element.value = 'Default Project';
    //         } else {
    //             element.value = '';
    //         };
    //     });
    // };

    // Renders an array of Todos
    const renderTodos = (todos) => {
        // Delete all elements from the editTodoDiv;
        while (editTodoDiv.firstChild) {
            editTodoDiv.removeChild(editTodoDiv.lastChild);
        };

        // Delete all elements from the Todos div
        while (todosDiv.firstChild) {
            todosDiv.removeChild(todosDiv.lastChild);
        };

        // If there are no Todo's, display a message
        if (!todos || todos.length === 0) {
            let p = document.createElement('p');
            todosDiv.append(p, 'nothing to do...');
            return;
        };

        // Sort Todos by id
        todos = todos.sort( (a, b) => a.id - b.id );

        todos.forEach(todo => {
            let todoDiv = _renderTodo(todo);
            todosDiv.appendChild(todoDiv);
        })

    };

    // Render a single Todo todo
    const _renderTodo = (todo) => {
        // Create a div for each todo todo
        let todoDiv = document.createElement('div');

        let todoInfoDiv = document.createElement('div');

        // Iterate through the keys of the todo
        for (let key in todo) {

            if (key === 'id') {
                todoDiv.id = todo[key];
            } else if (key === 'complete') {
                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.className = key;
                checkbox.checked = todo[key];
                todoInfoDiv.appendChild(checkbox)
            } else if (todo.hasOwnProperty(key)) {
                let p = document.createElement('p');
                p.textContent = todo[key];
                p.className = key;
                todoInfoDiv.appendChild(p);
            };

        };

        todoDiv.appendChild(todoInfoDiv);

        //delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-todo';
        todoDiv.appendChild(deleteButton);

        //edit button
        let editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-todo';
        todoDiv.appendChild(editButton);

        return todoDiv;
    };

    const renderEditTodo = (todo) => {
        // let todoInfoDiv = document.createElement('div');
        // todoInfoDiv.id = 'edit-todo-info';

        // // Iterate through the keys of the todo
        // for (let key in todo) {

        //     if (key === 'id') {
        //         continue;
        //     } else if (key === 'complete') {
        //         let checkbox = document.createElement('input');
        //         checkbox.type = 'checkbox';
        //         checkbox.className = key;
        //         checkbox.checked = todo[key];
        //         todoInfoDiv.appendChild(checkbox)
        //     } else if (todo.hasOwnProperty(key)) {
        //         let p = document.createElement('p');
        //         p.textContent = todo[key];
        //         p.className = key;
        //         p.contentEditable = true;
        //         todoInfoDiv.appendChild(p);
        //     };

        // };

        Object.keys(todo).forEach(key => {

            if (key === 'id' || key === 'complete') {
                return;
            };

            let newInput = document.createElement('input');

            if (key === 'due') {
                newInput.type = 'date';
            } else {
                newInput.type = 'text';
            };

            newInput.name = key;
            newInput.value = todo[key];
            formElements.push(newInput);

            editTodoDiv.appendChild(newInput);

        });

        // editTodoDiv.appendChild(todoInfoDiv);


        let saveEditButton = document.createElement('button');
        saveEditButton.textContent = 'Save Edit';
        saveEditButton.className = 'save-todo-edit';
        saveEditButton.id = todo['id'];
        editTodoDiv.appendChild(saveEditButton);
    };

    // returns the form input as a todo info todos
    const _getFormInput = () => {
        let inputObject = {};
        formElements.forEach(element => {
            inputObject[element.name] = element.value;
        });

        return inputObject;
    };

    // const _getTodoEdits = () => {
    //     let editsObject = {};
    //     let editInfo = Array.from( document.getElementById('edit-todo-info').childNodes );
    //     editInfo.forEach(element => {
    //         if (element.type == 'checkbox') {
    //             editsObject[element.className] = element.checked;
    //         } else {
    //             editsObject[element.className] = element.textContent;
    //         }
    //     });

    //     console.log(editsObject)
    //     return editsObject;
    // };

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

            if (e.target.className === 'delete-todo') {
                let id = e.target.parentElement.id;
                controllerAction(id);
            };

        });

    };

    // Edit Todo buttons send the id of the Todo for edit
    const bindRequestEditTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.className === 'edit-todo') {
                let id = e.target.parentElement.id;
                controllerAction(id);
            };

        });

    };

    // Save Todo buttons send the editted Todo as an Object
    const bindRequestSaveTodo = (controllerAction) => {

        editTodoDiv.addEventListener('click', e => {

            if (e.target.className === 'save-todo-edit') { 
                let id = e.target.id;
                controllerAction( _getFormInput(), id);
            };

        });

    };

    const bindRequestCompleteTodo = (controllerAction) => {

        todosDiv.addEventListener('click', e => {

            if (e.target.className === 'complete') {
                e.target.value = !e.target.value
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