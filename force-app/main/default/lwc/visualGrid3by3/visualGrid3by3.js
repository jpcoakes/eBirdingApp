import { LightningElement } from "lwc";

export default class ExampleApp extends LightningElement {
  picklistHeader = "Select an option (3x3 grid example)";
  selectionComponentName = "c/lightningCard"; // component for selection card contents
  selectionList = [
    {
      key: 0,
      disabled: true,
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
      checked: false,
      params: {
        body: "test body for selectionComp2",
        title: "test title for selectionComp2",
        footer: "test footer for selectionComp2"
      }
    },
    {
      key: 2,
      disabled: false,
      checked: false,
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
    },
    {
      key: 4,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp5",
        title: "test title for selectionComp5",
        footer: "test footer for selectionComp5"
      }
    },
    {
      key: 5,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp6",
        title: "test title for selectionComp6",
        footer: "test footer for selectionComp6"
      }
    },
    {
      key: 6,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp7",
        title: "test title for selectionComp7",
        footer: "test footer for selectionComp7"
      }
    },
    {
      key: 7,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp8",
        title: "test title for selectionComp8",
        footer: "test footer for selectionComp8"
      }
    },
    {
      key: 8,
      disabled: false,
      checked: true,
      params: {
        body: "test body for selectionComp9",
        title: "test title for selectionComp9",
        footer: "test footer for selectionComp9"
      }
    }
  ];

  handleButtonClick(event) {
    console.log("got the button click on grandparent:", event.detail);
  }
}