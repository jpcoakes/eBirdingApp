export function modalBodySetup(
  modalBodyComponentName,
  selectionItemComponentName,
  cityResults
) {
  console.log(modalBodyComponentName, selectionItemComponentName, cityResults);

  let newResults = cityResults.map((city, index) => {
    return {
      key: index,
      params: {
        title: `${city.name}, ${city.state}`,
        latitude: city.latitude,
        longitude: city.longitude
      },
      disabled: false,
      checked: false,
      value: city.name
    };
  });

  let testBody = {
    name: modalBodyComponentName,
    params: {
      name: "c/locationSelection",
      type: "radio",
      itemStyles: "slds-visual-picker grid-picker",
      wrapperStyles: "slds-form-element__control slds-visual-picker_grid",
      items: [...newResults]
    }
  };

  return testBody;
}
