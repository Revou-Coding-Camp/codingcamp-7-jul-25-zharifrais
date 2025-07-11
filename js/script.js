const input = document.getElementById("todo-input");
const date = document.getElementById("todo-date");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const completedList = document.getElementById("completed-list");

let todos = [];

addBtn.addEventListener("click", () => {
  const task = input.value.trim();
  const due = date.value;

  if (!task || !due) {
    alert("Please enter task and date.");
    return;
  }

  const todo = {
    id: Date.now(),
    task,
    date: due,
    completed: false
  };

  todos.push(todo);
  renderTodos(todos);
  input.value = "";
  date.value = "";
});

function renderTodos(data) {
  todoList.innerHTML = "";
  completedList.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement("li");
    const dateLabel = todo.date === new Date().toISOString().split('T')[0] ? "Due today" : todo.date;

    li.innerHTML = `
      <span>${todo.task}</span>
      <span style="font-size: 0.8rem; color: #888;">📅 ${dateLabel}</span>
      <div>
        <button onclick="toggleComplete(${todo.id})">✅</button>
        <button onclick="deleteTodo(${todo.id})">❌</button>
      </div>
    `;

    if (todo.completed) {
      completedList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
  });
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos(todos);
}

function toggleComplete(id) {
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  renderTodos(todos);
}

function filterTasks(type) {
  if (type === "today") {
    const today = new Date().toISOString().split("T")[0];
    const filtered = todos.filter(todo => todo.date === today);
    renderTodos(filtered);
  } else {
    renderTodos(todos);
  }
}
