
import './index.css';
import {
    convertContainer,
    listContainer,
    popup,
    tasks,
    form,
    buttonPopup,
    inputBody,
    inputKey
} from '../utils/constants';

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});



  renderOfTasks(objOfTasks);

  // Events
  form.addEventListener('submit', onFormSubmitHandler);
  buttonPopup.addEventListener('mouseup', openPopup, false);
  window.addEventListener('mouseup', (evt) => {
  if(!evt.target.classList.contains('popup') && popup.classList.contains('popup_opened')) {
    closePopup();
  }
}, true);

window.addEventListener('keyup', (evt) => {
  if(evt.key === 'Escape') {
    closePopup();
  }
});

  //Functions
  function renderOfTasks(tasksList) {
    if(!tasksList) return alert('Напишите сообщение');
    const fragment = document.createDocumentFragment();
    const fragmentRequest = document.createDocumentFragment();

    Object.values(tasksList).forEach((task) => {
      fragment.appendChild(listItemTemplate(task, true));
      fragmentRequest.appendChild(listItemTemplate(task, false));
    });
    listContainer.appendChild(fragment);
    convertContainer.appendChild(fragmentRequest);
  }

  // function listItemTemplate({_id, body}, bool) {
  //   const li = document.createElement('li');
  //   li.classList.add('two-container__item');
  //   li.setAttribute('data-task-id', _id);
  //   li.textContent = bool ? `#${_id} ${body}` : `ID${_id} длина: ${body.length}`;
  //   return li;
  // }

  function onFormSubmitHandler(evt) {
    evt.preventDefault();
    if (!inputBody.value) {
      return;
    }
    const task = createNewTask(inputBody.value);
    listContainer.insertAdjacentElement('afterbegin', listItemTemplate(task, true));
    convertContainer.insertAdjacentElement('afterbegin', listItemTemplate(task, false));
    form.reset();
  }
  function createNewTask(body) {
    const newTask = {
      body,
      completed: false,
      _id: `-${Math.random()}`,
    };
    objOfTasks[newTask._id] = newTask; // добавление объекта в объект задач

    return { ...newTask };
  }
})(tasks);
