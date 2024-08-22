import { LightningElement, track } from "lwc";

export default class ExampleAppV2 extends LightningElement {
  type = "radio";
  selectionComponentName = "c/lightningCard"; // component for selection card contents

  @track topCardParams = {
    key: 0,
    disabled: false,
    checked: false,
    params: {
      body: "test body for selectionCompTop",
      title: "test title for selectionCompTop",
      footer: "test footer for selectionCompTop"
    }
  };
  @track visualPickerList = [
    {
      key: 1,
      disabled: false,
      checked: false,
      params: {
        body: "test body for selectionComp1",
        title: "test title for selectionComp1",
        footer: "test footer for selectionComp1"
      }
    },
    {
      key: 2,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp2",
        title: "test title for selectionComp2",
        footer: "test footer for selectionComp2"
      }
    },
    {
      key: 3,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp3",
        title: "test title for selectionComp3",
        footer: "test footer for selectionComp3"
      }
    },
    {
      key: 4,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp4",
        title: "test title for selectionComp4",
        footer: "test footer for selectionComp4"
      }
    }
  ];

  renderedCallback() {
    console.log("rc");
  }

  handleSelect(event) {
    // find which items were previously selected if applicable and turn them off
    if (this.type === "radio") {
      this.visualPickerList.forEach((item) => {
        if (item.key === +event.target.value) {
          item.checked = !item.checked;
        } else if (item.checked === true) {
          item.checked = false;
        }
      });
    } else {
      this.visualPickerList[+event.target.value].checked =
        !this.visualPickerList[+event.target.value].checked;
    }
    // send event to parent to let it know which item was selected
  }

  handleKeyboardSelect(event) {
    console.log(event.key);

    if (event.key === "Enter") {
      this.handleSelect(event);
    }
  }
}