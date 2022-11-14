// tüm elemanları seçme
const form = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo")
const todoList = document.querySelector(".list-group")
const firstcardbody = document.querySelectorAll(".card-body")[0];
const seceondCardbody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")
eventListeners();

function eventListeners() {
    // tüm event listenerler
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI)
    seceondCardbody.addEventListener("click", deleteTodo)
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos)

}

function clearAllTodos(e) {
    // arayüzden temizleme
    if (confirm("tümünü silmek istediğinize emin misiniz")) {
        // todoList.innerHTML = ""; // yavaş yöntem
        while (todoList.firstElementChild != null) {
            todoList.removeChild(todoInput.firstElementChild)
        }
        localStorage.removeItem("todos")
    }

}

function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deletetodoFromStorge(e.target.parentElement.parentElement.textContent)
        showAlert("success", "Not başarıyla silindi")
    }

}

function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item")
    listItems.forEach(function(listItem) {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterValue) === -1) {
            listItem.setAttribute("style", "display:none !important")
        } else {
            listItem.setAttribute("style", "display :block ")
        }
    })
}

function deletetodoFromStorge(deletetodo) {
    let todos = getTodosFromStroge();
    todos.forEach(function(todo, index) {
        if (todo === deletetodo) {
            todos.splice(index, 1)
        }
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

function loadAllTodosToUI() {
    let todos = getTodosFromStroge();
    todos.forEach(function(todo) {
        addTodoToUI(todo);
    })
}

function addTodo(e) {
    const newTodo = todoInput.value.trim(); //boşlukları silme
    if (newTodo === "") {
        showAlert("danger", "Lütfen bir Not girin");
    } else {

        addTodoToUI(newTodo)
        addTodotoStroge(newTodo)
    }

    e.preventDefault();
}

function getTodosFromStroge() { // storagedan todolar döner
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodotoStroge(newTodo) {
    let todos = getTodosFromStroge();
    todos.push(newTodo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function showAlert(type, message) {
    const alert = document.createElement("div")
    alert.className = `alert alert-${type} text-center`
    alert.textContent = message
    firstcardbody.appendChild(alert)
        // setTimeout
    setTimeout(function() {
        alert.remove();
    }, 1000);
}

function addTodoToUI(newTodo) {
    // string değerini list item olarak UI ye eklicek
    const listItem = document.createElement("li") // yeni element
        // link oluşturma
    const linnk = document.createElement("a");
    linnk.href = '#';
    linnk.className = "delete-item"
    linnk.innerHTML = "<i class ='fa fa-remove'><i/>"

    listItem.className = "list-group-item d-flex justify-content-between"
        // text node
    listItem.appendChild(document.createTextNode(newTodo))
    listItem.appendChild(linnk)

    // Todo list e list item ekleme
    todoList.appendChild(listItem)
        // inputu silme
    todoInput.value = "";
}