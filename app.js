document.getElementById('formTask').addEventListener('submit', saveTask);


function saveTask(e) {
    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;

    title = title.toUpperCase();
    description = description.toUpperCase();

    let task = {
        title, //ES6 ---- //title: title,
        description //ES6 ---- //description: description
    };

    if (localStorage.getItem('tasks') === null) {
        let tasks = [];
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    getTask();
    document.getElementById('tasks').reset();
    e.preventDefault();
}

function getTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = '';

    for (let i = 0; i < tasks.length; i++) {
        // console.log(tasks[i]);
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `
            <div class="card mb-3">
                <div class="card-body">
                    <span>${title} - ${description}</span><span>   </span>
                    <button type="button" class="btn btn-danger" onclick="deleteTask('${title}')">Delete</a>             
                </div>
            </div>      
        `;

    }
}

function deleteTask(title) {
    // console.log(title);
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].title == title) {
            tasks.splice(i, 1);
        }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();

}

getTask();