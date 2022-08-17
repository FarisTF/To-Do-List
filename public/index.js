const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector(".todo-list")
const comList = document.querySelector(".com-list")

const todoButton = document.querySelector(".add-btn")
const completeButton = document.querySelector('.complete-btn')
const removeButton = document.querySelector('.remove-btn')

let id,kegiatan,done;

fetch('https://todolistfaris.herokuapp.com/api')
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
      deleteButton.classList.add("complete-btn")
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

      const removeButton = document.createElement("button")
      removeButton.classList.add("remove-btn")
      removeButton.textContent = "X"
      todoDiv.appendChild(removeButton)

      document.querySelector(".com-list").appendChild(todoDiv);
    }
  })
})

function addTodo(e) {
  e.preventDefault()
  if (!(todoInput.value==="")){
    // post request
    fetch('https://todolistfaris.herokuapp.com/api', {
      method:'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-type':'application/json'
      },
      body:JSON.stringify({kegiatan:todoInput.value, done:false})
    })
    .then((res) => res.json())
    .then((data) => {console.log(data)

      // ngubah dom
      const todoDiv = document.createElement("div")
      todoDiv.classList.add('todo')
      
      const todo = document.createElement("li")
      todo.id = String(data._id)
      todo.textContent = todoInput.value
      todoDiv.appendChild(todo)
      
      const deleteButton = document.createElement("button")
      deleteButton.classList.add("complete-btn")
      deleteButton.textContent = "V"
      todoDiv.appendChild(deleteButton)
      
      todoList.appendChild(todoDiv)
      
      todoInput.value = ""
    })
  }
}

function completeTodo(e) {
  // ngubah dom dlu
  const item = e.target
  if (item.classList[0] === "complete-btn"){
    const buangDB = item.parentElement.querySelector("li")
    const parent = item.parentElement
    const removeButton = document.createElement("button")
    removeButton.classList.add("remove-btn")
    removeButton.textContent = "X"
    parent.appendChild(removeButton)
    
    document.querySelector(".com-list").appendChild(parent);
    item.remove();

    // patch request
    fetch('https://todolistfaris.herokuapp.com/api/'+buangDB.id, {
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

function removeTodo(e) {
  const item = e.target
  if (item.classList[0] === "remove-btn"){    
    const buangDB = item.parentElement.querySelector("li")

    // delete request
    fetch('https://todolistfaris.herokuapp.com/api/'+buangDB.id, {
    method: 'DELETE'
  })
    .then((response) => response)
    .then((HTML) => {console.log(HTML)
    });
    
    const parent = item.parentElement
    parent.remove();
  }
}
 
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', completeTodo)
comList.addEventListener('click', removeTodo)




