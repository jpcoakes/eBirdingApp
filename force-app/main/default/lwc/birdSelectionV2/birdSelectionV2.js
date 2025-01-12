import { LightningElement, track } from "lwc";
import MyModal from "c/myModal";
import { modalBodySetup } from "./birdSelectionV2Helper.js";
import formFactorPropertyName from "@salesforce/client/formFactor";

export default class BirdSelection extends LightningElement {
  _categoryOptions = [];
  _birdOptions = [];
  _fullBirdList;
  _fullCountryCityList;
  _fullCountryList = [];
  _selectedCityList = [];
  selectedBird;
  selectedBirdPill;
  selectedBirdCode;
  selectedCategory;
  selectedCategoryPill;
  selectedCountry;
  selectedCountryCode;
  selectedCountryPill;
  categoryText = "";
  birdCategoryRequired = true;
  birdRequired = true;
  birdText = "";
  countryText = "";
  cityText = "";
  selectedCityObj;
  selectedCity;
  selectedLatitude = 34.61;
  selectedLongitude = -86.75;
  selectedRadius = 25;
  selectedTime = 14;
  selectedMax = 3000;
  resultsMax = 3000;
  mapMarkers = [];
  noResultsMessage = false;
  birdDisabled = true;
  birdGridItemDisabled = false;
  searchCityDisabled = true;
  searchCityReadOnly = false;
  searchCityLoading = false;
  queryTerm;

  @track calloutOptions = [
    {
      text: "Recent nearby observations of a species",
      value: 1,
      id: 1,
      max: 10000,
      iconName: "standard:time_period",
      selectable: true,
      type: "option-inline",
      updateUrl(that) {
        this.url = `https://api.ebird.org/v2/data/obs/geo/recent/${that.selectedBird}?lat=${that.selectedLatitude}&lng=${that.selectedLongitude}&dist=${that.selectedRadius}&back=${that.selectedTime}&maxResults=${that.selectedMax}`;
        return this.url;
      }
    },
    {
      text: "Nearest observations of a species",
      value: 2,
      id: 2,
      max: 3000,
      iconName: "standard:location",
      selectable: true,
      type: "option-inline",
      updateUrl(that) {
        this.url = `https://api.ebird.org/v2/data/nearest/geo/recent/${that.selectedBird}?lat=${that.selectedLatitude}&lng=${that.selectedLongitude}&dist=${that.selectedRadius}&back=${that.selectedTime}&maxResults=${that.selectedMax}`;
        return this.url;
      }
    },
    {
      text: "Recent nearby notable observations",
      value: 3,
      id: 3,
      max: 10000,
      iconName: "standard:topic",
      selectable: true,
      type: "option-inline",
      updateUrl(that) {
        this.url = `https://api.ebird.org/v2/data/obs/geo/recent/notable?lat=${that.selectedLatitude}&lng=${that.selectedLongitude}&dist=${that.selectedRadius}&back=${that.selectedTime}&maxResults=${that.selectedMax}`;
        return this.url;
      }
    },
    {
      text: "Recent nearby observations",
      value: 4,
      id: 4,
      max: 10000,
      iconName: "standard:address",
      selectable: true,
      type: "option-inline",
      updateUrl(that) {
        this.url = `https://api.ebird.org/v2/data/obs/geo/recent/?lat=${that.selectedLatitude}&lng=${that.selectedLongitude}&dist=${that.selectedRadius}&back=${that.selectedTime}&maxResults=${that.selectedMax}`;
        return this.url;
      }
    }
  ];
  selectedCalloutTypePill;
  selectedCallout;
  searchDisabledHelpText = "Select a Search Type";

  get searchDisabled() {
    switch (this.selectedCallout?.id) {
      case 1: {
        this.searchDisabledHelpText =
          "Select a Bird Category, Bird, and Location to enable this button";
        return !this.selectedBird;
      }
      case 2: {
        this.searchDisabledHelpText =
          "Select a Bird Category, Bird, and Location to enable this button";
        return !this.selectedBird;
      }
      case 3: {
        this.searchDisabledHelpText = "Select a Location to enable this button";
        let locationInputEle = this.template.querySelector(
          "lightning-input-location"
        );
        return !locationInputEle.checkValidity();
      }
      case 4: {
        this.searchDisabledHelpText = "Select a Location to enable this button";
        let locationInputEle = this.template.querySelector(
          "lightning-input-location"
        );
        return !locationInputEle.checkValidity();
      }
      default:
        this.searchDisabledHelpText = "Select a Search Type";
        return true;
    }
  }

  get categoryOptions() {
    return this._categoryOptions;
  }

  set categoryOptions(value) {
    this._categoryOptions = value;
  }

  get birdOptions() {
    return this._birdOptions;
  }

  set birdOptions(value) {
    this._birdOptions = value;
  }

  get countryOptions() {
    return this._fullCountryList;
  }

  set countryOptions(value) {
    this._fullCountryList = value;
  }

  get cityOptions() {
    return this._selectedCityList;
  }

  set cityOptions(value) {
    this._selectedCityList = value;
  }

  handleBirdChange(event) {
    this.selectedBird = event.detail.value;

    let selectedBirdCode = this.birdOptions.find(
      (bird) => bird.id === this.selectedBird
    );
    let newPill = {
      text: selectedBirdCode.text,
      value: selectedBirdCode.value,
      id: selectedBirdCode.value,
      iconName: "",
      label: selectedBirdCode.text
    };
    this.selectedBirdPill = newPill;
  }

  handleLocationChange(event) {
    let inputComp = this.template.querySelector("lightning-input-location");
    if (
      event.target.latitude &&
      event.target.latitude.split(".")[1]?.length > 2
    ) {
      this.selectedLatitude = event.target.latitude.substring(
        0,
        event.target.latitude.indexOf(".") + 3
      );
      inputComp.setCustomValidityForField(
        "Please enter a latitude with only 2 decimal places",
        "latitude"
      );
    } else {
      this.selectedLatitude = event.target.latitude;
      inputComp.setCustomValidityForField("", "latitude");
    }

    if (
      event.target.longitude &&
      event.target.longitude.split(".")[1]?.length > 2
    ) {
      this.selectedLongitude = event.target.longitude.substring(
        0,
        event.target.longitude.indexOf(".") + 3
      );
      inputComp.setCustomValidityForField(
        "Please enter a longitude with only 2 decimal places",
        "longitude"
      );
    } else {
      this.selectedLongitude = event.target.longitude;
      inputComp.setCustomValidityForField("", "longitude");
    }
    inputComp.reportValidity();
  }

  handleCategoryRemove() {
    this.selectedCategory = "";
    this.selectedCategoryPill = {};
    this.categoryText = "";
    this.birdDisabled = true;
  }

  handleBirdRemove() {
    this.selectedBird = "";
    this.selectedBirdPill = {};
    this.birdText = "";
    this.birdDisabled = false;
  }

  handleCountryChange(event) {
    this.selectedCountry = event.detail.value;
    let selectedCountryObject = this.countryOptions.find(
      (country) => country.value === this.selectedCountry
    );
    this.selectedCountryCode = selectedCountryObject.id;

    let newPill = {
      text: selectedCountryObject.text,
      value: selectedCountryObject.value,
      id: selectedCountryObject.id,
      iconName: "",
      label: selectedCountryObject.text
    };
    this.selectedCountryPill = newPill;
    this.searchCityDisabled = false;
  }
  handleCityChange(event) {
    console.log("city changed");
  }
  handleCountryRemove(event) {
    this.selectedCountry = "";
    this.selectedCountryPill = {};
    this.countryText = "";
    this.searchCityDisabled = true;
  }
  handleCityRemove(event) {
    console.log("city removed");
  }

  async recentSightings(bird) {
    let url = this.selectedCallout.updateUrl(this);
    // console.log("url:", url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-ebirdapitoken": "stvbo0scnmac"
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log("json:", json);
      this.updateMapMarkers(json);
      if (json.length === 0) {
        this.noResultsMessage = true;
      } else {
        this.noResultsMessage = false;
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  updateMapMarkers(json) {
    this.mapMarkers = [];
    json.forEach((sighting) => {
      this.mapMarkers.push({
        location: {
          Latitude: sighting.lat,
          Longitude: sighting.lng
        },
        title: sighting?.comName,
        description: `Location: ${sighting.locName} <br /> Date: ${new Date(sighting.obsDt).toLocaleDateString()} <br /> Time: ${new Date(sighting.obsDt).toLocaleTimeString()} <br/>
          Birds Seen: ${sighting.howMany ? sighting.howMany : "Not reported."}`
      });
    });
  }

  handleCategoryChange(event) {
    this.selectedCategory = event.detail.value;
    let selectedCatCode = this.categoryOptions.find(
      (cat) => cat.id === this.selectedCategory
    );
    let filteredList = this._fullBirdList.filter(
      (bird) => bird.familyCode === selectedCatCode.value
    );
    let newBirdOptions = [];
    filteredList.forEach((bird) => {
      let newBird = {};
      newBird.text = bird.comName;
      newBird.value = bird.speciesCode;
      newBird.id = bird.speciesCode;
      newBird.variant = "label-inline";
      newBird.selectable = true;
      newBird.type = "option-inline";
      newBirdOptions.push(newBird);
    });
    this._birdOptions = newBirdOptions;
    this.birdDisabled = false;
    let newPill = {
      text: selectedCatCode.text,
      value: selectedCatCode.value,
      id: selectedCatCode.value,
      iconName: "",
      label: selectedCatCode.text
    };
    this.selectedCategoryPill = newPill;
  }

  async connectedCallback() {
    // set up css for device type
    if (formFactorPropertyName === 'Small') {
      // set up for Phone
      this.containerStyle = 'grid-small-device';
    } else {
      this.containerStyle = 'grid-large-device';
    }

    // retrieve the list of taxonomy codes
    this.getBirdsData();
    // retrieve list of countries with cities
    this.getCitiesData();
  }

  async getCitiesData() {
    const url = "https://countriesnow.space/api/v0.1/countries";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      this._fullCountryCityList = json.data;
      this.parseCountries(this._fullCountryCityList);
    } catch (error) {
      console.error(error.message);
    }
  }

  parseCountries(countryList) {
    let countryListTemp = [];
    countryList.forEach((country) => {
      {
        let newCountry = {};
        newCountry.text = country.country;
        newCountry.value = country.country;
        newCountry.id = country.iso2;
        newCountry.selectable = true;
        newCountry.type = "option-inline";
        countryListTemp.push(newCountry);
      }
    });
    this._fullCountryList = countryListTemp;
  }

  async getBirdsData() {
    const url = "https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-ebirdapitoken": "stvbo0scnmac"
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      this.parseBirdCategories(json);
      this._fullBirdList = json;
    } catch (error) {
      console.error(error.message);
    }
  }

  parseBirdCategories(birds) {
    let categoryList = [];
    let uniqueCategoryList = [];
    birds.forEach((bird) => {
      if (
        !uniqueCategoryList.includes(bird.familyComName) &&
        bird.familyComName !== undefined
      ) {
        let newCategory = {};
        newCategory.text = bird.familyComName;
        newCategory.value = bird.familyCode;
        newCategory.id = bird.familyCode;
        newCategory.selectable = true;
        newCategory.type = "option-inline";
        categoryList.push(newCategory);
        uniqueCategoryList.push(bird.familyComName);
      }
    });
    this._categoryOptions = categoryList;
  }
  async handleSearch() {
    this.recentSightings(this.selectedBird);
  }

  handleCategoryInput(event) {
    this.categoryText = event.detail.text;
  }

  handleBirdInput(event) {
    this.birdText = event.detail.text;
  }

  handleCountryInput(event) {
    this.countryText = event.detail.text;
  }

  handleCategoryEndReached(event) {}

  handleCalloutTypeChange(event) {
    this.mapMarkers = [];
    let selection = this.calloutOptions.find(
      (opt) => opt.value === +event.detail.value
    );
    if (selection.id === 3) {
      this.birdCategoryDisabled = true;
      this.birdCategoryRequired = false;
      this.birdRequired = false;
    } else {
      this.birdCategoryDisabled = false;
      this.birdCategoryRequired = true;
      this.birdRequired = true;
    }
    let newPill = {
      text: selection.text,
      value: selection.text,
      id: selection.id,
      iconName: "",
      label: selection.text
    };
    this.selectedCalloutTypePill = newPill;
    this.selectedCallout = selection;
    this.resultsMax = this.selectedCallout.max;
  }

  handleCalloutTypeRemove(event) {
    this.selectedCalloutTypePill = null;
    this.selectedCallout = null;
    this.birdCategoryDisabled = false;
    this.birdCategoryRequired = true;
    this.birdRequired = true;
  }

  handleSelectedMaxChange(event) {
    this.selectedMax = event.detail.value;
  }

  handleSelectedRadiusChange(event) {
    this.selectedRadius = event.detail.value;
  }

  handleSelectedTimeChange(event) {
    this.selectedTime = event.detail.value;
  }

  async searchCityCallout(string, countryCode) {
    // https://api.api-ninjas.com/v1/geocoding?city=Crawfordsville&country=US
    const url = `https://api.api-ninjas.com/v1/geocoding?city=${string}&country=${countryCode}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-Api-Key": "JUSr6Pi7xpD+zxnbg8lnmA==hkbhL9IO6ygo5SD5"
        }
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async handleSearchCity(evt) {
    const isEnterKey = evt.keyCode === 13;
    if (isEnterKey) {
      this.searchCityLoading = true;
      this.queryTerm = evt.target.value;
      // call the city search API and wait for results 2 digit country code
      let results = await this.searchCityCallout(
        this.queryTerm,
        this.selectedCountryCode
      );
      this.searchCityLoading = false;

      // parse the results and build modalBody, send modalBodyComponentName, selectionItemComponentName, cityResults
      let testBody = modalBodySetup(
        "baseVisualPicker",
        "locationSelection",
        formFactorPropertyName,
        results
      );

      // set up the modal body (make a method that takes a list of cities from the response and populates this array)
      let testFooter = {
        name: "modalButton",
        params: {
          variant: "brand",
          label: "Submit",
          title: "Submit"
        }
      };
      // call the modal open
      MyModal.open({
        label: "Select the correct city",
        size: "small",
        bodyComp: testBody,
        footerComp: testFooter,
        onselect: (e) => {
          this.handleSelect(e);
        },
        onselection: (e) => {
          this.handleSelection(e);
        }
      });
    }
  }

  handleSelect(e) {
    this.selectedCity = this.selectedCityObj.title;
    this.selectedLatitude = +this.selectedCityObj.latitude;
    this.selectedLongitude = +this.selectedCityObj.longitude;
    this.searchCityLoading = false;
    // let searchInput = this.template.querySelector("lightning-input");
    this.cityText = this.selectedCityObj.title;
    this.searchCityReadOnly = true;
  }
  handleSelection(e) {
    this.selectedCityObj = { ...e.detail.selectedItem.params };
  }
}