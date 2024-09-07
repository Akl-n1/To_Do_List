let add_tasks = document.querySelector(".add_tasks");
let addele = document.querySelector(".add-task");
let form = document.querySelector("form");
let inputText = document.querySelector(".input");
let mood = "create";
let temp;
// لتحديد التاريخ والوقت
function getCurrentDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let hours = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  hours = hours % 12 || 12;
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  let ampm = currentDate.getHours() >= 12 ? "مساء" : "صباحا";
  return `${day}/${month}/${year} __ ${hours}:${minutes} ${ampm}`;
}
// تعريف مصفوفة global لتخزين المهام
let tasks = loadTasksFromLocalStorage();
// تحزين localStorage
function loadTasksFromLocalStorage() {
  return localStorage.Element ? JSON.parse(localStorage.Element) : [];
}
// لاظهار input
function display() {
  form.style.display = "block";
}
addele.onclick = function focus() {
  form.style.display = "block";
  inputText.focus();
};
// إخفاء input
function hideForm() {
  form.style.display = "none";
}
// حفظ المهام في localStorage
function saveTasksToLocalStorage() {
  localStorage.setItem("Element", JSON.stringify(tasks));
}
if (tasks.length > 0) {
  hideForm();
} else {
  display();
}
form.addEventListener("submit", function submit(e) {
  e.preventDefault();
  let newPro = {
    inputText: inputText.value.trim(),
    data: getCurrentDate(),
    completed: false,
  };
  if (mood == "create") {
    tasks.push(newPro);
  } else {
    tasks[temp] = newPro;
    mood = "create";
  }

  inputText.value = "";
  hideForm();
  saveTasksToLocalStorage();
  showdata();
});
function showdata() {
  add_tasks.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    let completedClass = tasks[i].completed ? "done" : "";
    let addElement = `
    <div class="task-item ${completedClass}" id="row-${i}">
          <div class="task-content">
                  <h3>${tasks[i].inputText}</h3>
                  <div class="task-date">
                          <span>${tasks[i].data}</span>
                  </div>
          </div>
          <div class="task-actions">
                  <button class="delete-task" onclick="delete_item(${i})"><i class="fas fa-trash-alt"></i></button>
                  ${
                    tasks[i].completed
                      ? `
                  <button class="complete-task" id="done-${i}" onclick="done(${i})"><i class="fas fa-check"></i></button>
                    `
                      : `
                  <button class="examination" id="done-${i}" onclick="done(${i})"><i class="fas fa-exclamation"></i></button>
                    `
                  }
                  <button class="edit-task" onclick="update(${i})"><i class="fas fa-edit"></i></button>
          </div>
    </div>`;
    add_tasks.innerHTML += addElement;
    let complete_task = document.querySelector(`#row-${i} .complete-task`);
    let examination = document.querySelector(`#row-${i} .examination`);
    if (examination) {
      examination.addEventListener("mouseover", function () {
        this.classList.add("active");
      });
      examination.addEventListener("mouseout", function () {
        this.classList.remove("active");
      });
    } else {
      complete_task.addEventListener("mouseover", function () {
        this.classList.add("active");
      });
      complete_task.addEventListener("mouseout", function () {
        this.classList.remove("active");
      });
    }
  }
}
showdata();

function delete_item(i) {
  tasks.splice(i, 1);
  saveTasksToLocalStorage();
  if (tasks.length <= 0) {
    display();
  }
  inputText.value = "";
  showdata();
}
function done(i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasksToLocalStorage();
  showdata();
}
function update(i) {
  display();
  inputText.value = tasks[i].inputText;
  mood = "update";
  temp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
