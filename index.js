const todoInput = document.querySelector("#todo-input")
const todoButton = document.querySelector(".add-btn")
const todoList = document.querySelector(".todo-list")

let id,kegiatan,done;

fetch('https://api-todolist-faris.herokuapp.com/')
.then((res) => res.json())
.then((data) => {console.log(data)
  data.forEach(function(post){
    if (post.done == false){
      const todoDiv = document.createElement("div")
      todoDiv.classList.add('todo')

      const todo = document.createElement("li")
      todo.id = String(post._id)
      todo.textContent = post.kegiatan
      todoDiv.appendChild(todo)

      const deleteButton = document.createElement("button")
      deleteButton.classList.add("delete-btn")
      deleteButton.textContent = "V"
      todoDiv.appendChild(deleteButton)

      todoList.appendChild(todoDiv)

      todoInput.value = ""
    } 
    else {
      const todoDiv = document.createElement("div")
      todoDiv.classList.add('todo')

      const todo = document.createElement("li")
      todo.id = String(post._id)
      todo.textContent = post.kegiatan
      todoDiv.appendChild(todo)

      document.getElementById("com-list").appendChild(todoDiv);
    }
  })
})

function addTodo(e) {
  e.preventDefault()
  console.log(typeof todoInput.value)
  if (!(todoInput.value==="")){
    // post request
    fetch('https://api-todolist-faris.herokuapp.com/', {
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({kegiatan:todoInput.value, done:false})
    })
    .then((res) => res.json())
    .then((data) => {console.log(data)

      // ngubah dom dlu
      const todoDiv = document.createElement("div")
      todoDiv.classList.add('todo')
      
      const todo = document.createElement("li")
      todo.id = String(data._id)
      todo.textContent = todoInput.value
      todoDiv.appendChild(todo)
      
      const deleteButton = document.createElement("button")
      deleteButton.classList.add("delete-btn")
      deleteButton.textContent = "V"
      todoDiv.appendChild(deleteButton)
      
      todoList.appendChild(todoDiv)
      
      todoInput.value = ""
    })
  }
}

function deleteTodo(e) {
  // ngubah dom dlu
  const item = e.target
  if (item.classList[0] === "delete-btn"){
    const buangDB = item.parentElement.querySelector("li")
    const parent = item.parentElement
    document.getElementById("com-list").appendChild(parent);
    item.remove();

    // patch request
    fetch('https://api-todolist-faris.herokuapp.com/'+buangDB.id, {
    method: 'PATCH',
    body: JSON.stringify({
      kegiatan: buangDB.textContent,
      done: true
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {console.log(json)
    });
  }

}

todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteTodo)




