let todos = [];

window.onload = function() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos !== null) {
    todos = JSON.parse(savedTodos);
    sortTodos();
    renderTodos();
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
  const dateInput = document.getElementById("dateInput");
  const todoDate = dateInput.value;

  if (todoText === "") {
    alert("やることを入力してください");
    return;
  }

  const todo = {
    text: todoText,
    done: false,
    date: todoDate
  };

  todos.push(todo);
  sortTodos();
  saveTodos();
  renderTodos();

  input.value = "";
  dateInput.value = "";
}

function createTodoElement(todo) {
  const li = document.createElement("li");

  const span = document.createElement("span");

  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;

  const dateSpan = document.createElement("small");

  if (todo.date) {
    dateSpan.textContent = todo.date;
  } else {
    dateSpan.textContent = "日付なし";
  }

  dateSpan.className = "todo-date";

  span.appendChild(textSpan);
  span.appendChild(dateSpan);

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

    todos = todos.filter(function(item) {
      return item !== todo;
    });

    saveTodos();
    renderTodos();
  };

  li.appendChild(span);
  li.appendChild(deleteButton);
  document.getElementById("todoList").appendChild(li);
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function sortTodos() {
  todos.sort(function(a, b) {
    if (!a.date) return 1;
    if (!b.date) return -1;

    return new Date(a.date) - new Date(b.date);
  });
}

function renderTodos() {
  document.getElementById("todoList").innerHTML = "";

  for (let i = 0; i < todos.length; i++) {
    createTodoElement(todos[i]);
  }
}

function clearTodos() {
  todos = [];
  saveTodos();

  document.getElementById("todoList").innerHTML = "";
}
