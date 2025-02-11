import { LightningElement } from "lwc";
import auburn from "@salesforce/resourceUrl/auburnLogo";
import purdue from "@salesforce/resourceUrl/purdueLogo";
import cca from "@salesforce/resourceUrl/ccaLogo";
import memphis from "@salesforce/resourceUrl/memphisLogo";

export default class EducationJourney extends LightningElement {
  auburnUrl = auburn;
  purdueUrl = purdue;
  ccaUrl = cca;
  memphisUrl = memphis;
}
