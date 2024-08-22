import { LightningElement, api } from "lwc";

export default class LightningCard extends LightningElement {
  @api title;
  @api body;
  @api footer;

  handleClick(event) {
    // dispatch custom event to let the parent component know that the button was clicked
    this.dispatchEvent(
      new CustomEvent("buttonclick", {
        bubbles: true,
        composed: true,
        detail: `${this.title} and ${this.body}`
      })
    );
  }
}