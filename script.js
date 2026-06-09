let todos = [];

window.onload = function() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);

    for (let i = 0; i < todos.length; i++) {
      createTodoElement(todos[i]);
    }
  }
};

function handleKeyDown(event) {
  if (event.key === "Enter") {
    addTodo();
  }
}

function addTodo() {
  const input = document.getElementById("todoInput");
  const todoText = input.value;

  if (todoText === "") {
    alert("やることを入力してください");
    return;
  }

  const todo = {
    text: todoText,
    done: false
  };

  todos.push(todo);
  saveTodos();

  createTodoElement(todo);

  input.value = "";
}

function createTodoElement(todo) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = todo.text;

  if (todo.done === true) {
    span.classList.add("done");
  }

  li.onclick = function() {
    todo.done = !todo.done;
    span.classList.toggle("done");
    saveTodos();
  };

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "削除";

  deleteButton.onclick = function(event) {
    event.stopPropagation();

    li.remove();

    todos = todos.filter(function(item) {
      return item !== todo;
    });

    saveTodos();
  };

  li.appendChild(span);
  li.appendChild(deleteButton);
  document.getElementById("todoList").appendChild(li);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function clearTodos() {
  todos = [];
  saveTodos();

  document.getElementById("todoList").innerHTML = "";
}