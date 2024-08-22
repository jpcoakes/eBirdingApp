import { LightningElement, track, api } from "lwc";

export default class Combobox extends LightningElement {
  @track combobox = {
    label: "",
    labelforId: "combobox-label-for-id-13",
    labelId: "combobox-label-id-13",
    value: "",
    placeholder: "",
    options: [],
    controlsId: "combobox-controls-id-13",
    inputId: "combobox-input-id-13"
  };
  @api
  get value() {
    return this.combobox.value;
  }

  set value(val) {
    this.combobox.value = val;
    console.log(val);
  }

  @api
  get label() {
    return this.combobox.label;
  }

  set label(value) {
    this.combobox.label = value;
  }

  @api
  get placeholder() {
    return this.combobox.placeholder;
  }
  set placeholder(value) {
    this.combobox.placeholder = value;
  }

  @api
  get options() {
    return this.combobox.options;
  }

  set options(value) {
    this.combobox.options = value;
  }

  ignoreKeys = ["Shift", "Alt", "Control", "Meta", "Tab", "CapsLock"];
  handleKeyUp(event) {
    // look in an array of predefined strings for Shift, Alt, etc. to see if event.key is in the array
    // if (this.ignoreKeys.includes(event.key)) {
    //   return;
    // }
    // // if event.key === 'Backspace', then subtract from the combobox.value
    // if (event.key === "Backspace") {
    //   this.combobox.value -= event.key;
    // } else {
    //   // otherwise add the key to the combobox.value
    //   this.combobox.value += event.key;
    //   console.log(this.combobox.value);
    // }
  }

  handleInputChange(event) {
    console.log(event.target.value);

    // console.log(event);
    // if (event.inputType === "insertText") {
    //   this.combobox.value += event.data;
    // } else if (event.inputType === "deleteContentBackward") {
    //   this.combobox.value = this.combobox.value.slice(0, -1);
    // }
    // console.log(this.combobox.value);
  }

  handleKeyDown(event) {
    // console.log("handleKeyDown:", event);
    // console.log(this.combobox.value);
    //     switch (event.key) {
    //       case "Backspace": {
    //         this.combobox.value = this.combobox.value.slice(0, -1);
    //         break;
    //       }
    //       case "Enter": {
    //         // search array based on this.combobox.value;
    //         break;
    //       }
    //       case "Shift": {
    //         break;
    //       }
    //       case "alt": {
    //         break;
    //       }
    //       default: {
    //         this.combobox.value += event.key;
    //       }
    //     }
  }
}