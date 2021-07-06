export default class List {
  constructor({_id, body}) {
    this._id = _id;
    this.body = body;
  }

  generateList(bool) {
    const li = document.createElement('li');
    li.classList.add('two-container__item');
    li.setAttribute('data-task-id', _id);
    li.textContent = bool ? `#${_id} ${body}` : `ID${_id} длина: ${body.length}`;
    return li;
  }




}