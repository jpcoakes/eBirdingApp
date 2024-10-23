import { api } from "lwc";
import LightningModal from "lightning/modal";

const COMPONENT_MAPPING = {
  modalButton: () => import("c/modalButton"),
  baseVisualPicker: () => import("c/baseVisualPicker"),
  lightningCard: () => import("c/lightningCard"),
  locationSelection: () => import("c/locationSelection")
};
export default class MyModal extends LightningModal {
  headerCompParams;
  bodyCompParams;
  footerCompParams;
  _headerComp;
  _bodyComp;
  _footerComp;
  @api label;

  @api
  set headerComp(value) {
    // dynamic import of component name and render on modal header
    this.headerCompParams = value.params;
    COMPONENT_MAPPING[value.name]()
      .then(({ default: ctor }) => {
        this._headerComp = ctor;
      })
      .catch((err) => console.error("Error importing component", err));
  }
  get headerComp() {
    return this._headerComp;
  }
  @api
  set bodyComp(value) {
    this.bodyCompParams = value.params;
    COMPONENT_MAPPING[value.name]()
      .then(({ default: ctor }) => {
        this._bodyComp = ctor;
      })
      .catch((err) => console.error("Error importing component", err));
  }
  get bodyComp() {
    return this._bodyComp;
  }
  @api
  set footerComp(value) {
    this.footerCompParams = value.params;
    COMPONENT_MAPPING[value.name]()
      .then(({ default: ctor }) => {
        this._footerComp = ctor;
      })
      .catch((err) => console.error("Error importing component", err));
  }
  get footerComp() {
    return this._footerComp;
  }

  handleClose() {
    this.close();
  }
}
