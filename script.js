const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

const allBtn= document.getElementById("allBtn");
const completeBtn= document.getElementById("completedBtn");
const pendingBtn= document.getElementById("pendingBtn");

let tasks = []; // store tasks

//Load our saved task

window.addEventListener("DOMContentLoaded", function () {//when page loads

    const storedTasks = localStorage.getItem("tasks");//get item from local storage

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);//convert from string to array

        tasks.forEach(taskObj => createTask(taskObj));//for each loop to show each task
    }
});

//Function to create UI
function createTask(taskObj) {

    const li = document.createElement("li");//show task in UI(screen)

    const span = document.createElement("span");//creating span so that there is a gap b/w button and text
    span.textContent = taskObj.text;

    // apply completed style
    if (taskObj.completed) {
        span.classList.add("completed");
    }

    // toggle complete
    span.addEventListener("click", function () { //single click=toggle
        span.classList.toggle("completed");//update in UI

        // update data
        taskObj.completed = !taskObj.completed; //if true then now false,if false then now true

        localStorage.setItem("tasks", JSON.stringify(tasks));//save item in local storage
    });

    span.addEventListener("dblclick",function(){// edit task on double click
        const newTask=prompt("Edit your task",taskObj.text);//user have popup to edit

        if(newTask===null){// user press cancel
            return;
        }
        if(newTask.trim()===""){ //user puts spaces only, trim cuts jargon spaces
            alert("Task cannot be empty");
            return;
        }

        span.textContent=newTask;//update UI
        taskObj.text=newTask;//update data
        localStorage.setItem("tasks", JSON.stringify(tasks));//local storage saved whole task

    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "X";
    delBtn.classList.add("delBtn");

    delBtn.addEventListener("click", function () {

        li.remove();

        // remove from array
        tasks = tasks.filter(t => t !== taskObj);

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    li.appendChild(span);//put span and delBtn inside li
    li.appendChild(delBtn);

    list.appendChild(li);//put li inside task list
}

function renderTasks(taskArray){//this function filters tasks
//taskArray is a variable that stores all , completed and pending tasks according to situation
    list.innerHTML="";//clears UI
    taskArray.forEach(taskObj=>createTask(taskObj));//for each task create its UI
}
allBtn.addEventListener("click",function(){
    renderTasks(tasks);
});
completeBtn.addEventListener("click",function(){
    const completedTask=tasks.filter(t=>t.completed=== true);//t is each task object taken one by one from the array
    renderTasks(completedTask);
});
pendingBtn.addEventListener("click",function(){
    const pendingTask=tasks.filter(t=>t.completed=== false);
    renderTasks(pendingTask);
});

btn.addEventListener("click", function () {

    const task = input.value.trim();

    if (task === "") {
        alert("Enter task");
        return;
    }

    const newTask = {
        text: task,
        completed: false
    };

    tasks.push(newTask); // store in array

    createTask(newTask); // show on UI

    localStorage.setItem("tasks", JSON.stringify(tasks)); // 🔥 save

    input.value = "";
});