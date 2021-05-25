
const popup = document.querySelector('.popup');
const buttonPopup = document.querySelector('.header__button');

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

const tasks = [
  {
    _id: '03d40b3',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
  },
  {
    _id: '94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
  },
  {
    _id: '532496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
  },
  {
    _id: '4788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  const listContainer = document.querySelector('.container-list');
  const convertContainer = document.querySelector('.container-list-req');
  const form = document.forms['add-task'];
  const { body: inputBody } = form.elements;

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

  function listItemTemplate({_id, body}, bool) {
    const li = document.createElement('li');
    li.classList.add('container-list__item');
    li.setAttribute('data-task-id', _id);
    li.textContent = bool ? `#${_id} ${body}` : `Длина строки #${_id}: ${body.length}`;
    return li;
  }

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
      complited: false,
      _id: `-${Math.random()}`,
    };
    objOfTasks[newTask._id] = newTask; // добавление объекта в объект задач

    return { ...newTask };
  }
})(tasks);
