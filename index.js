// Vite exposes environment variables prefixed with VITE_
const API_URL = import.meta.env.VITE_BACKEND_URL;
console.log(API_URL)
const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

// Fetch and render todos
async function fetchTodos() {
  try {
    const response = await fetch(`${API_URL}/todos`);
    const todos = await response.json();
    renderTodos(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
}

// Render todos to DOM
function renderTodos(todos) {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");

    if (todo.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = todo.title;
    span.addEventListener("click", () => toggleTodo(todo.id));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(span);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  });
}

// Add new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = todoInput.value.trim();
  if (!title) return;

  try {
    await fetch(`${API_URL}/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    todoInput.value = "";
    fetchTodos();
  } catch (error) {
    console.error("Error adding todo:", error);
  }
});

// Toggle todo
async function toggleTodo(id) {
  try {
    await fetch(`${API_URL}/todos/${id}/toggle`, {
      method: "PUT",
    });

    fetchTodos();
  } catch (error) {
    console.error("Error toggling todo:", error);
  }
}

// Delete todo
async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    });

    fetchTodos();
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
}

// Initial load
fetchTodos();
