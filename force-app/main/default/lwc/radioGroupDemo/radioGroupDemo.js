import { LightningElement, track } from "lwc";

export default class RadioGroupDemo extends LightningElement {
  value;
  arrJsonList = {
    items: [
      {
        label: "radioGroup1",
        items: [
          { label: "firstGroupFirstOption", name: "firstGroupFirstOption" },
          { label: "firstGroupSecondOption", name: "firstGroupSecondOption" }
        ]
      },
      {
        label: "radioGroup2",
        items: [
          { label: "secondGroupFirstOption", name: "secondGroupFirstOption" },
          { label: "secondGroupSecondOption", name: "secondGroupSecondOption" }
        ]
      }
    ]
  };
  @track radioButtonGroupArray = [];

  connectedCallback() {
    this.parseArrJsonList();
  }

  parseArrJsonList() {
    this.arrJsonList.items.forEach((items) => {
      let newRadioGroup = {};
      newRadioGroup.label = items.label;
      newRadioGroup.options = [];
      newRadioGroup.options = items.items.map((item) => {
        let newRadioButton = {};
        newRadioButton.label = item.label;
        newRadioButton.value = item.name;
        return newRadioButton;
      });
      this.radioButtonGroupArray.push(newRadioGroup);
    });
  }

  firstRadioButtonGroupSelection;

  handleRadioSelection(event) {
    console.log("Selection value: ", event.detail.value);
    console.log("Radio Group Label: ", event.target.label);
    console.log("Radio Group Name: ", event.target.name);
  }
}
