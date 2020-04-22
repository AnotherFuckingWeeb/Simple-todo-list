//Selectors
const taskInput = document.getElementById('task-input');
const taskButton = document.getElementById('task-button');
const taskList = document.getElementById('tasks-list')
const taskFilter = document.getElementById('cmbFilter');


//Events


taskButton.addEventListener('click', AddTask)
taskList.addEventListener('click', TaskAction)
taskFilter.addEventListener('click', FiltTaskByTag)


//functions

function AddTask(event) {
    //Prevent default submit effect
    event.preventDefault();

    if (taskInput.value !== '') {
        
        //create task layout
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        //create task name
        const taskName = document.createElement('li');
        taskName.innerText = taskInput.value;
        taskName.classList.add('task-item');

        //save tasks locally
        SaveTasksLocally(taskInput.value)

        //append the task name to the taks layout
        taskDiv.appendChild(taskName); 

        //buttons
        const isDoneBtn = document.createElement('button');
        isDoneBtn.innerHTML = '<i class="fas fa-check"></i>';
        isDoneBtn.classList.add('completed-btn');

        taskDiv.appendChild(isDoneBtn);

        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
        removeBtn.classList.add('remove-btn');

        taskDiv.appendChild(removeBtn);

        taskList.appendChild(taskDiv);

        taskInput.value = '';
    }
}

function TaskAction(e) {
    
    const item = e.target

    if (item.classList[0] === 'remove-btn') {
        item.parentElement.classList.add('deleted');
        RemoveStorageTask(item.parentElement)
        item.parentElement.addEventListener('transitionend', () => {
            taskList.removeChild(item.parentElement);
        });
    }

    if (item.classList[0] === 'completed-btn') {
        item.parentElement.classList.toggle('completed');
    }
}

function FiltTaskByTag(event) {

    const tasks = taskList.childNodes;
    tasks.forEach((task) => {
        
        switch (event.target.value) {
            case 'all':
                task.style.display = 'flex';
                break;
        
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex'
                }

                else {
                    task.style.display = 'none'
                }
                break;
           
            case 'uncompleted':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'flex'
                }

                else {
                    task.style.display = 'none'
                }
                break;
        }
    })
}

function SaveTasksLocally(task) {
    
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }
    
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function GetTasks() {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }
    
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    tasks.forEach((task) => {
                //create task layout
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
        
                //create task name
                const taskName = document.createElement('li');
                taskName.innerText = task;
                taskName.classList.add('task-item');

                //append the task name to the taks layout
                taskDiv.appendChild(taskName); 
        
                //buttons
                const isDoneBtn = document.createElement('button');
                isDoneBtn.innerHTML = '<i class="fas fa-check"></i>';
                isDoneBtn.classList.add('completed-btn');
        
                taskDiv.appendChild(isDoneBtn);
        
                const removeBtn = document.createElement('button');
                removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                removeBtn.classList.add('remove-btn');
        
                taskDiv.appendChild(removeBtn);
        
                taskList.appendChild(taskDiv);
    })
}

function RemoveStorageTask(task) {
    let tasks;

    if (localStorage.getItem('tasks') === null) {
        tasks = []
    }

    else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }

    const taskIndex = task.children[0].innerText;

    tasks.splice(tasks.indexOf(taskIndex), 1);

    localStorage.setItem('tasks', JSON.stringify(tasks))
}