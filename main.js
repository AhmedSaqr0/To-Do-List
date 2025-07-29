let weekDay = document.querySelector(".week-day")
let day = document.querySelector(".day")
let counter = document.querySelector(".counter");
let month = document.querySelector(".month");
let addTaskBtn = document.querySelector(".add-task")
let taskList = document.querySelector(".task-list");


// Setting date 
let now = new Date();
month.textContent = now.toLocaleString("default", { month: "long" })
weekDay.textContent = now.toLocaleString("default", { weekday: "long" });
day.textContent = now.getDate()


let taskCounter = 0;
counter.textContent = taskCounter;



getLocalStorage()

function taskInfo() {
    let overLay = document.createElement("div")
    overLay.className = "over-lay"
    let formContainer = document.createElement("div")
    formContainer.className = "form-container"
    let form = document.createElement("form")
    form.className = "form"
    let input = document.createElement("input")
    input.type = "text"
    input.placeholder = "Enter your task"
    input.className = "task-input"
    let submitBtn = document.createElement("button")
    submitBtn.type = "submit"
    submitBtn.className = "submit-btn"
    submitBtn.textContent = "Add Task"
    // Create a close button
    let closeBtn = document.createElement("button")
    closeBtn.type = "button"
    closeBtn.className = "close-btn"
    closeBtn.textContent = "X"
    closeBtn.addEventListener("click", function () {
        // Remove the overlay and form container when close button is clicked
        document.body.removeChild(overLay);
        document.body.removeChild(formContainer);
    })


    //appending elements to the form
    form.appendChild(input)
    form.appendChild(submitBtn)
    form.appendChild(closeBtn)

    //appending form to the form container
    formContainer.appendChild(form)
    document.body.appendChild(overLay)
    document.body.appendChild(formContainer)

    submitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (input.value.trim() !== "") {
            addTask(input.value.trim()); // Call addTask with the input value
            // Remove the overlay and form container after adding the task
            document.body.removeChild(overLay);
            document.body.removeChild(formContainer);

            input.value = ""; // Clear the input field after adding the task
        }

    })

}
// Add event listener to delete task when delete button is clicked
taskList.addEventListener("click", function (e) {
    if (e.target.closest(".delete-task")) {
        e.target.closest(".task").remove();
        taskCounter--;
        counter.textContent = taskCounter;
        setLocalStorage()
    }
})
function addTask(taskTextValue , taskTime , checked = false) {
    let taskDiv = document.createElement("div")
    taskDiv.className = "task"

    let taskText = document.createElement("label")
    taskText.className = "task-name"

    let inputCheck = document.createElement("input")
    inputCheck.type = "checkbox"
    inputCheck.checked = checked;

    inputCheck.addEventListener("change" , setLocalStorage)

    let span = document.createElement("span")
    span.className = "text"
    span.textContent = taskTextValue;

    let timeSpan = document.createElement("span")
    timeSpan.className = "time"
    timeSpan.textContent = taskTime || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    let deleteBtn = document.createElement("button")
    deleteBtn.className = "delete-task"
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'

    //appending elements to the task div
    taskText.appendChild(inputCheck)
    taskText.appendChild(span)
    taskDiv.appendChild(taskText)
    taskDiv.appendChild(timeSpan)
    taskDiv.appendChild(deleteBtn)
    taskList.appendChild(taskDiv)
    taskCounter++
    counter.textContent = taskCounter;
    setLocalStorage();

}
addTaskBtn.addEventListener("click", taskInfo);


function setLocalStorage() {
    let tasks = [];
    document.querySelectorAll(".task").forEach((task) => {
        let taskTextValue = task.querySelector(".text").textContent;
        let taskTimeValue = task.querySelector(".time").textContent;
        let checked = task.querySelector('input[type="checkbox"]').checked;
        tasks.push(
            { text: taskTextValue, time: taskTimeValue, checked: checked }
        )
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getLocalStorage() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task) => {
        addTask(task.text , task.time, task.checked);
    })
}






