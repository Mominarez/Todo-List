const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Load tasks from local storage
window.onload = () => {
  const tasks = JSON.parse(localStorage.getItem('catTasks')) || [];
  tasks.forEach(task => addTaskToDOM(task.text, task.done));
};

// Add task button
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    saveTask(taskText, false);
    taskInput.value = '';
  }
});

// Add task to the DOM 
function addTaskToDOM(text, done = false) {
  const li = document.createElement('li');
  li.className = `bg-pink-100 p-3 rounded-lg flex justify-between items-center text-lg shadow-sm ${
    done ? 'line-through opacity-60 bg-gray-100' : ''
  }`;

  li.innerHTML = `
    <span class="flex-1">${text}</span>
    <div class="flex gap-2">
      <button class="toggle text-pink-500">✔</button>
      <button class="delete text-pink-500">✘</button>
    </div>
  `;

  li.querySelector('.toggle').addEventListener('click', () => {
    li.classList.toggle('line-through');
    li.classList.toggle('opacity-40');
    li.classList.toggle('bg-gray-100');
    updateLocalStorage();
  });

  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    updateLocalStorage();
  });

  taskList.appendChild(li);
}

//Save task to local storage
function saveTask(text, done) {
  const tasks = JSON.parse(localStorage.getItem('catTasks')) || [];
  tasks.push({ text, done });
  localStorage.setItem('catTasks', JSON.stringify(tasks));
}

// Update all tasks in local storage
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(item => {
    tasks.push({
      text: item.querySelector('span').textContent,
      done: item.classList.contains('line-through')
    });
  });
  localStorage.setItem('catTasks', JSON.stringify(tasks));
}

//Applied key concepts of DOM manipulation, local storage, and event listeners.

//Think about user authentication, categories (to add priority levels like work, study, or personal life)
//Ability to reorder tasks by drag and drop
//Due dates and or reminders
//think outside of local storage, in a real database