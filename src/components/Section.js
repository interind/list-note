export default class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  }

  addItem(element, bool) {
    if(bool){
      this._container.prepend(element);
    }
    else{
      this._container.append(element);
    }
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }
}