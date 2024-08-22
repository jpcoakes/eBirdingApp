import { LightningElement } from "lwc";

export default class ExampleApp extends LightningElement {
  /*
  <c-base-vertical-picker
    items={selectionList} // array of objects with key, disabled, checked, and params for each object
            params is an object that has the necessary properties for the dynamic component which is the guts of each vertical picker

    variant = "vertical" Options are small, medium, large, vertical, and grid
    ** if using grid , grid-cols and grid-rows can be defined, otherwise it will default to 2 columns
    grid-cols="2" // number of columns ()
    grid-rows="2" // number of rows
    type="radio"   Options are "radio" if single selection only is desired. Or "checkbox" if multi selection is desired.
    name={selectionComponentName} // the custom component name of the dynamic lwc (which is the guts of each vertical picker)
    header-label={picklistHeader} // The top of the vertical picker modal
    onbuttonclick={handleButtonClick} // listeners for buttons clicked on the dynamic lwc
  ></c-base-vertical-picker>
  */
  picklistHeader = "Select an option (default 2 columns grid example)";
  selectionComponentName = "c/lightningCard"; // component for selection card contents
  selectionList = [
    {
      key: 0,
      disabled: false,
      checked: false,
      params: {
        body: "test body for selectionComp1",
        title: "test title for selectionComp1",
        footer: "test footer for selectionComp1"
      }
    },
    {
      key: 1,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp2",
        title: "test title for selectionComp2",
        footer: "test footer for selectionComp2"
      }
    },
    {
      key: 2,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp3",
        title: "test title for selectionComp3",
        footer: "test footer for selectionComp3"
      }
    },
    {
      key: 3,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp4",
        title: "test title for selectionComp4",
        footer: "test footer for selectionComp4"
      }
    }
  ];

  handleButtonClick(event) {
    console.log("got the button click on grandparent:", event.detail);
  }
}