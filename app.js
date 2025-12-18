let taskData = {};
const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
let dragElement = null;
const columns = [todo, progress, done];
const tasks = document.querySelectorAll(".task");

if (localStorage.getItem("tasks")) {
  const data = JSON.parse(localStorage.getItem("tasks"));
  console.log(data);

  for (const col in data) {
    const column = document.querySelector(`#${col}`);
    data[col].forEach((task) => {
      const div = document.createElement("div");
      div.classList.add("task");
      div.setAttribute("draggable", "true");

      div.innerHTML = `
    <h2>${task.title}</h2>
    <p>${task.desc}</p>
    <button>Delete</button>                
  `;
      column.appendChild(div);
      div.addEventListener('drag',()=>{
        dragElement = div
    })
    });

  }
}

tasks.forEach((tasks) => {
  tasks.addEventListener("drag", (e) => {
    dragElement = tasks;
  });
});

function addDragEventsOnColumn(column) {
  column.addEventListener("dragenter", (e) => {
    e.preventDefault();
    column.classList.add("hover-over");
  });
  column.addEventListener("dragleave", (e) => {
    e.preventDefault();
    column.classList.remove("hover-over");
  });
  column.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.appendChild(dragElement);
    column.classList.remove("hover-over");

    columns.forEach((col) => {
      const task = col.querySelectorAll(".task");
      const count = col.querySelector(".right");
      count.innerText = task.length;
    });
  });
}
addDragEventsOnColumn(todo);
addDragEventsOnColumn(progress);
addDragEventsOnColumn(done);

const toggleModal = document.querySelector("#toggle-modal");
const modal = document.querySelector(".modal");
const modalBg = document.querySelector(".modal .bg");
const addNewTask = document.querySelector("#add-new-task");

toggleModal.addEventListener("click", () => {
  modal.classList.toggle("active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("active");
});

addNewTask.addEventListener("click", () => {
  const taskTitleInp = document.querySelector("#task-title-inp").value;
  const taskDesInp = document.querySelector("#task-des-inp").value;
  const div = document.createElement("div");
  div.classList.add("task");
  div.setAttribute("draggable", "true");

  div.innerHTML = `
    <h2>${taskTitleInp}</h2>
    <p>${taskDesInp}</p>
    <button>Delete</button>                
  `;
  todo.appendChild(div);

  columns.forEach((col) => {
    const task = col.querySelectorAll(".task");
    const count = col.querySelector(".right");
    taskData[col.id] = Array.from(tasks).map((t) => {
      return {
        title: t.querySelector("h2").innerText,
        desc: t.querySelector("p").innerText,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(taskData));
    count.innerText = task.length;
  });

  div.addEventListener("drag", () => {
    dragElement = div;
  });

  modal.classList.remove("active");
});
