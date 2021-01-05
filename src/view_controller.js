//
const ViewController = () => {
    const body = document.body;

    //initializes the page display
    const renderInitial = () => {
        //header element
        let header = document.createElement('header');
        let title = document.createElement('h1');
        title.textContent = 'Todo List!'
        header.appendChild(title);

        body.appendChild(header);

        renderForm();
    };

    const renderForm = () => {
        let form = document.createElement('form');
        //todo title
        let todoTitle = document.createElement('input');
        todoTitle.type = 'text';
        todoTitle.name = 'title';
        //todo description
        let todoDescription = document.createElement('input');
        todoDescription.type = 'text';
        todoDescription.name = 'description';
        //todo due
        let todoDue = document.createElement('input');
        todoDue.type = 'date';
        todoDue.name = 'due';
        //todo notes
        let todoNotes = document.createElement('input');
        todoNotes.type = 'text';
        todoNotes.name = 'notes';
        //submit button
        let submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.addEventListener('click', event => {
            event.preventDefault();
        })
        //cancel button
        let cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        
        form.append(
            todoTitle,todoDescription, todoDue, todoNotes,
            submitButton, cancelButton
            );
        
        body.appendChild(form);

        let todosDiv = document.createElement('div');
        todosDiv.id = 'todos';

        body.appendChild(todosDiv);
    }

    //renders an array as todo items div and appends it
    const renderTodos = (array) => {
        let todosDiv = document.getElementById('todos');

        if (!array || array.length == 0) {
            let p = document.createElement('p');
            todosDiv.append(p, 'nothing to do...');
            return;
        };

        //for each item
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

            //edit button
            let editButton = document.createElement('button');
            editButton.textContent = 'Edit';

            todoDiv.append(deleteButton, editButton);

            todosDiv.appendChild(todoDiv);
        })
    };

    //takes the form input
    const getFormInput = () => {
        let title = document.getElementsByName('title').value;
        let description = document.getElementsByName('description').value;
        let due = document.getElementsByName('due').value;
        let notes = document.getElementsByName('notes').value;
        return {title, description, due, notes};
    };



    return {
        renderInitial,
        renderTodos,
        getFormInput
    }
};

export { ViewController };