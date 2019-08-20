
const inputElement = document.getElementById('input');
const ulElement = document.getElementById('list');


let todoList = [];
inputElement.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.keyCode === 13) && (inputElement.value)) {
        todoList.unshift({
            content: inputElement.value,
            done: false,
            selected: false,
        });
        inputElement.value = "";
        addNewLiElement();
    }
})

function addNewLiElement() {
    ulElement.innerHTML = '';
    for (let i = 0; i < todoList.length; i++) {

        const todoItem = todoList[i];

        const liElement = document.createElement('li');
        liElement.className = "list-group-item";
        ulElement.append(liElement);

        const divElement = document.createElement('div');
        divElement.className = "form-group form-check";
        liElement.append(divElement);

        const checkboxElement = document.createElement('input');
        divElement.append(checkboxElement);
        checkboxElement.type = "checkbox";
        checkboxElement.className = "form-check-input";
        checkboxElement.id = 'todoItem' + i;
        checkboxElement.checked = todoItem.selected;

        const labelElement = document.createElement('label');
        divElement.append(labelElement);
        labelElement.className = "form-check-label";
        if (todoItem.done) {
            labelElement.className += ' todoDone'
        }
        labelElement.setAttribute('for', 'todoItem' + i);
        labelElement.innerText = todoItem.content;

        const buttonRemoveElement = document.createElement('button');
        divElement.append(buttonRemoveElement);
        buttonRemoveElement.type = 'button';
        buttonRemoveElement.className = 'btn btn-outline-danger';
        buttonRemoveElement.innerHTML = "Remove";
        buttonRemoveElement.style = "float: right";

        const buttonDoneElement = document.createElement('button');
        divElement.append(buttonDoneElement);
        buttonDoneElement.type = 'button';
        buttonDoneElement.className = 'btn btn-outline-primary';
        buttonDoneElement.innerHTML = 'Done';
        buttonDoneElement.style = "float: right";



        buttonDoneElement.addEventListener('click', () => {
            todoItem.done = !todoItem.done;
            addNewLiElement();
        });

        checkboxElement.addEventListener('change', () => {
            todoItem.selected = checkboxElement.checked;
        });

        buttonRemoveElement.addEventListener('click', () => {
            const todoItemIndex = todoList.indexOf(todoItem);
            todoList.splice(0, todoItemIndex + 1);
            addNewLiElement();
        });
    }
}

const doneActionButton = document.getElementById('doneAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = true;
            todoItem.selected = false;
        }
    }
    addNewLiElement();
});

const restoreActionButton = document.getElementById('restoreAction').addEventListener('click', () => {
    for (const todoItem of todoList) {
        if (todoItem.selected) {
            todoItem.done = false;
            todoItem.selected = false;
        }
    }
    addNewLiElement();
});


const removeActionButton = document.getElementById('removeAction').addEventListener('click', () => {
    todoList = todoList.filter(todoItem => !todoItem.selected);
    addNewLiElement();
});

const selectAllButton = document.getElementById('select').addEventListener('click', () => {
    for (const todoItem of todoList) {
        todoItem.selected = true;
    }
    addNewLiElement();
})