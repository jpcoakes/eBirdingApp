import { LightningElement, track } from "lwc";
import US_CITIES from "@salesforce/resourceUrl/CitiesList";

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
  categoryText = "";
  birdText = "";
  selectedLatitude = 34.61;
  selectedLongitude = -86.75;
  selectedRadius = 25;
  selectedTime = 14;
  mapMarkers = [];
  noResultsMessage = false;
  birdDisabled = true;
  searchDisabled = true;

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
    this.searchDisabled = false;
  }

  handleLocationChange(event) {
    let inputComp = this.template.querySelector("lightning-input-location");
    if (event.target.latitude.split(".")[1].length > 2) {
      inputComp.setCustomValidityForField(
        "Please enter a latitude with only 2 decimal places",
        "latitude"
      );
    } else {
      inputComp.setCustomValidityForField("", "latitude");
    }

    if (event.target.longitude.split(".")[1].length > 2) {
      inputComp.setCustomValidityForField(
        "Please enter a longitude with only 2 decimal places",
        "longitude"
      );
    } else {
      inputComp.setCustomValidityForField("", "longitude");
    }
    inputComp.reportValidity();
    this.selectedLatitude = +event.target.latitude.substring(
      0,
      event.target.latitude.indexOf(".") + 3
    );
    this.selectedLongitude = +event.target.longitude.substring(
      0,
      event.target.longitude.indexOf(".") + 3
    );
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
    this.searchDisabled = true;
  }

  handleCountryChange(event) {
    console.log("country changed", event);
    // event.detail.value has the country name
    // event.detail.id has the country code
    let countryCode = event.detail.value.id;
  }
  handleCityChange(event) {
    console.log("city changed");
  }
  handleCountryRemove(event) {
    console.log("country removed");
  }
  handleCityRemove(event) {
    console.log("city removed");
  }

  async recentSightings(bird) {
    const url = `https://api.ebird.org/v2/data/obs/geo/recent/${bird}?lat=${this.selectedLatitude}&lng=${this.selectedLongitude}&dist=${this.selectedRadius}&back=${this.selectedTime}`;
    console.log("url:", url);

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
        title: sighting.locName,
        description: `Date: ${new Date(sighting.obsDt).toLocaleDateString()} <br /> Time: ${new Date(sighting.obsDt).toLocaleTimeString()} <br/>
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
    // retrieve the list of taxonomy codes
    this.getBirdsData();
    // retrieve list of countries with cities
    this.getCitiesData();

    // let request = new XMLHttpRequest();
    // request.open("GET", US_CITIES, false);
    // request.send(null);

    // let usCities = JSON.parse(request.responseText);
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
    this._fullCountryList = countryList.map((country) => {
      return {
        text: country.country,
        value: country.iso3
      };
    });
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
  async handleClick() {
    this.recentSightings(this.selectedBird);
  }

  handleCategoryInput(event) {
    this.categoryText = event.detail.text;
  }
  handleBirdInput(event) {
    this.birdText = event.detail.text;
  }

  handleCategoryEndReached(event) {
    // console.log("handleCategoryEndReached");
    // this.categoryOptions.push({
    //   text: "More matches are available. Keep typing to narrow your search.",
    //   value: "empty",
    //   id: "empty",
    //   selectable: true,
    //   type: "option-inline"
    // });
    // console.log(this.categoryOptions);
  }
}
