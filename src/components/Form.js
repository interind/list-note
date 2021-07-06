export class Form {// TODO: Добавить проверку на строки
  constructor(formName, inputSelector, submitSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this.form = document.forms[`${formName}`];
    this._inputList = Array.from(this.form.querySelectorAll(inputSelector));
    this._submit = this._submit.bind(this);
    this.buttonSubmit = this.form.querySelector(submitSelector);
  }
  _setEventListeners() {
    this.form.addEventListener('submit', this._submit);
  }

  _submit(evt) {
    evt.preventDefault();
    this._callbackSubmit(this._getInputValues());
    this.form.removeEventListener('submit', this._submit);
    this.form.reset();
  }

  _getInputValues() {
    let inputValues = {};
    this._inputList.forEach((input) => (inputValues[input.name] = input.value));
    return inputValues;
  }
}
