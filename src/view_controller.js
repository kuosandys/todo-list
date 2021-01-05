//
const ViewController = () => {
    const root = document.getElementById('root');
    let newButton;
    let form = document.createElement('form');
    let todosDiv = document.createElement('div');

    //initializes the page display
    const renderInitial = () => {
        let header = document.createElement('header');
        let title = document.createElement('h1');
        title.textContent = 'Todo List!'
        header.appendChild(title);

        let newTodo = document.createElement('div');
        newTodo.id = 'new-todo';
        newButton = document.createElement('button');
        newButton.textContent = 'New Todo';
        newTodo.appendChild(newButton);

        root.appendChild(header);
        root.appendChild(newTodo);

        renderForm();

        // let mainDiv = document.createElement('div');
        // mainDiv.id = 'main';
        // root.appendChild(mainDiv);
    };

    //renders the form to add new todos
    const renderForm = () => {
        //todo title
        let todoTitle = document.createElement('input');
        todoTitle.type = 'text';
        todoTitle.name = 'title';

        //todo description
        let todoDescription = document.createElement('input');
        todoDescription.type = 'text';
        todoDescription.name = 'description';

        //todo duedate
        let todoDue = document.createElement('input');
        todoDue.type = 'date';
        todoDue.name = 'due';

        //todo notes
        let todoNotes = document.createElement('input');
        todoNotes.type = 'text';
        todoNotes.name = 'notes';

        //todo project
        let todoProject = document.createElement('input');
        todoProject.type = 'text';
        todoProject.name = 'project';

        //submit button
        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';

        //cancel button
        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        
        let formElements = [
            todoTitle,todoDescription, todoDue, todoNotes,
            todoProject, submitButton, cancelButton
        ];

        formElements.forEach(element => form.appendChild(element));
        
        root.appendChild(form);
    };

    //renders an array of todos as a todo items div
    const renderTodos = (array) => {
        //clear the todos div
        while (todosDiv.firstChild) {
            todosDiv.removeChild(todosDiv.lastChild);
        };

        //if there are no todos in the array
        if (!array || array.length == 0) {
            let p = document.createElement('p');
            todosDiv.append(p, 'nothing to do...');
            root.appendChild(todosDiv);
            return;
        };

        //for each todo
        array.forEach(item => {
            let todoDiv = document.createElement('div');
            todoDiv.id = item.id;

            //iterate through keys, exceptions for 'id' and 'completed'
            for (let key in item) {
                if (key == 'id') {
                    continue;
                } else if (key == 'complete') {
                    let checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.checked = item[key];
                    todoDiv.appendChild(checkbox)
                } else if (item.hasOwnProperty(key)) {
                    let p = document.createElement('p');
                    p.textContent = item[key];
                    p.class = key;
                    todoDiv.appendChild(p);
                }
            };

            //delete button
            let deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-todo';
            // deleteButton.addEventListener('click', //)
            todoDiv.appendChild(deleteButton);

            //edit button
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'edit-todo';
            // editButton.addEventListener('click', //)
            todoDiv.appendChild(editButton);

            todosDiv.appendChild(todoDiv);
        })

        root.appendChild(todosDiv);
    };

    // const bindAddEvent = (button, action, handler) => {
    //     button.addEventListener(action, event => {
    //         event.preventDefault();


    //     })
    // };

    //binds a controller action to the submit action on form
    const bindAddTodo = (controllerAction) => {
        form.addEventListener('submit', e => {
            e.preventDefault();
            let formInput = getFormInput();
            //code to verify form submission validity
            controllerAction(formInput);
            console.log("New todo added")
            //reset form
        })
    };

    //binds a controller action to the delete action on todos
    const bindDeleteTodo = (controllerAction) => {
        todosDiv.addEventListener('click', e => {
            if (e.target.className == 'delete-todo') {
                let id = e.target.parentElement.id;
                controllerAction(id);
                console.log("todo deleted")
            };
        });
    };

    // returns the form input as a todo info object
    const getFormInput = () => {
        let title = document.getElementsByName('title').value;
        let description = document.getElementsByName('description').value;
        let due = document.getElementsByName('due').value;
        let notes = document.getElementsByName('notes').value;
        let project = document.getElementsByName('project').value;
        return {title, description, due, notes, project};
    };

    // const resetFormInput = () => {

    // };

    return {
        renderInitial,
        renderTodos,
        bindAddTodo,
        bindDeleteTodo
    }
};

export { ViewController };