import { LightningElement, api, track } from "lwc";

export default class BaseVisualPicker extends LightningElement {
  @track _items;
  @api
  set items(value) {
    // need a better clone method
    this._items = JSON.parse(JSON.stringify(value));
  }
  get items() {
    return this._items;
  }

  _itemStyles;
  @api
  set itemStyles(value) {
    this._itemStyles = "item " + value;
  }

  get itemStyles() {
    return this._itemStyles;
  }

  _wrapperStyles;
  @api
  set wrapperStyles(value) {
    this._wrapperStyles = value;
  }

  get wrapperStyles() {
    return this._wrapperStyles;
  }

  @api headerLabel;
  @api type;
  @api gridRows;
  @api gridCols;

  selectionComp;
  @api
  set name(value) {
    // dynamic import of component name
    import(value)
      .then(({ default: ctor }) => {
        this.selectionComp = ctor;
      })
      .catch((err) => console.error("Error importing component", err));
  }
  get name() {
    return this.selectionComp;
  }

  handleSelect(event) {
    // find which items were previously selected if applicable and turn them off
    if (this.type === "radio") {
      this._items.forEach((item) => {
        if (item.key === +event.target.value) {
          item.checked = !item.checked;
        } else if (item.checked === true) {
          item.checked = false;
        }
      });
    } else {
      this._items[+event.target.value].checked =
        !this._items[+event.target.value].checked;
    }
    let selectedItem = this._items.find((item) => item.checked === true);
    console.log("selectedItem on baseVisualPicker:", selectedItem);

    // send event to parent to let it know which item was selected
    this.dispatchEvent(
      new CustomEvent("selection", {
        bubbles: true,
        composed: true,
        detail: { selectedItem }
      })
    );
  }

  handleKeyboardSelect(event) {
    console.log(event.key);

    if (event.key === "Enter") {
      this.handleSelect(event);
    }
  }

  connectedCallback() {
    this.setCssProps();
  }

  setCssProps() {
    let css = this.template.host.style;
    if (this.gridCols) {
      css.setProperty(`--gridcols`, `${+this.gridCols}`);
    }
    if (this.gridRows) {
      css.setProperty(`--gridrows`, `${+this.gridRows}`);
    }
  }
}
