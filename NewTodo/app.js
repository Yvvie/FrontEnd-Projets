const listInput = document.querySelector('.input');
const addButton = document.querySelector('.task-add');
const todoList = document.querySelector('.todos-list');
const todoItms = document.querySelector('.todos-items')
const filterItems = document.querySelector('.sections')

//event listeners

document.addEventListener('DOMContentLoaded', getTodos)
addButton.addEventListener('click', addTask);
todoItms.addEventListener('click', deleteTask);
filterItems.addEventListener('click', filterTodo);

//funstions

function addTask(event){
    event.preventDefault();


    //create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo-div');

    //create li
    const newtodo = document.createElement('li');
    newtodo.classList.add('todo-item')
    newtodo.innerText = listInput.value;
    todoDiv.appendChild(newtodo)

    //add to local storage

    saveLocalTodos(listInput.value);

    //create complete button
    const checkBtn = document.createElement('button')
    checkBtn.classList.add('check-button')
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkBtn)

    //create delete button
    const deletekBtn = document.createElement('button')
    deletekBtn.classList.add('delete-button')
    deletekBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deletekBtn)

    //append to div
    todoItms.appendChild(todoDiv)

    //clear
    listInput.value = '';
}

function deleteTask(e){

    const item = e.target;

    if (item.classList[0] === 'delete-button') {
        const todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
        
    }
    
    if (item.classList[0] === 'check-button') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event) {
    const todo = todoItms.childNodes;
    todo.forEach(function (todo){
        switch (event.target.value) {
            case 'All':
                todo.style.display = 'flex'
                break;
            case 'Completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
            case 'Uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex'
                } else {
                    todo.style.display = 'none'
                }
                break;
        }

    })
}

function saveLocalTodos(todo){

    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

function getTodos(){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    todos.forEach(function(todo){
            //create div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo-div');

    //create li
    const newtodo = document.createElement('li');
    newtodo.classList.add('todo-item')
    newtodo.innerText = todo;
    todoDiv.appendChild(newtodo)

    //add to local storage

    //create go button
    const checkBtn = document.createElement('button')
    checkBtn.classList.add('check-button')
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(checkBtn)

    //create done button
    const deletekBtn = document.createElement('button')
    deletekBtn.classList.add('delete-button')
    deletekBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deletekBtn)

    //append to div
    todoItms.appendChild(todoDiv)
    })
};

function removeLocalTodos(todo){
    let todos;

    if (localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    };

    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex)

    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem('todos', JSON.stringify(todos));
}

