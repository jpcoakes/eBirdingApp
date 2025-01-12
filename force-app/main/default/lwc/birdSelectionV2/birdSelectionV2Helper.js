export function modalBodySetup(
  modalBodyComponentName,
  selectionItemComponentName,
  formFactor,
  cityResults
) {
  let gridCols = 0;
  console.log(modalBodyComponentName, selectionItemComponentName, cityResults);
  if (formFactor === 'Small') {
    gridCols = 1;
  } else {
    gridCols = cityResults.length === 1 ? 1 : 2;
  }

  let newResults = cityResults.map((city, index) => {
    return {
      key: index,
      params: {
        title: `${city.name}, ${city.state}`,
        latitude: city.latitude
          .toString()
          .substring(0, city.latitude.toString().indexOf(".") + 3),
        longitude: city.longitude
          .toString()
          .substring(0, city.longitude.toString().indexOf(".") + 3)
      },
      disabled: false,
      checked: false,
      value: city.name
    };
  });

  let testBody = {
    name: modalBodyComponentName,
    params: {
      name: selectionItemComponentName,
      type: "radio",
      itemStyles: "slds-visual-picker grid-picker",
      wrapperStyles: "slds-form-element__control slds-visual-picker_grid",
      gridCols: gridCols,
      items: [...newResults]
    }
  };

  return testBody;
}