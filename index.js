const todoInput = document.querySelector("#todo-input")
const todoButton = document.querySelector(".add-btn")
const todoList = document.querySelector(".todo-list")

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)

function addTodo(e) {
  e.preventDefault()
  
  const todoDiv = document.createElement("div")
  todoDiv.classList.add('todo')
  
  const todo = document.createElement("li")
  todo.textContent = todoInput.value
  todoDiv.appendChild(todo)
  
  const deleteButton = document.createElement("button")
  deleteButton.classList.add("delete-btn")
  deleteButton.textContent = "V"
  todoDiv.appendChild(deleteButton)
  
  todoList.appendChild(todoDiv)
  
  todoInput.value = ""
}

function deleteTodo(e) {
  const item = e.target
  if (item.classList[0] === "delete-btn"){
    const parent = item.parentElement
    document.getElementById("com-list").appendChild(parent);
    item.remove();
  }
}




