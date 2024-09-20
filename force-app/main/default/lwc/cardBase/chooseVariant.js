export function chooseVariant(variantType) {
  let variantHeader = "";
  let variantBody = "";
  if (variantType === "B") {
    variantHeader = "variant-grey-header";
    variantBody = "variant-white-body";
  } else if (variantType === "C") {
    variantBody = "variant-grey-body";
  }

  return {
    variantHeader,
    variantBody
  };
}

export function initializeSeparator(variantType, showSeparator) {
  let separatorData = {};

  if (variantType === "A") {
    separatorData.showSeparator = showSeparator !== "false";
  } else if (showSeparator !== undefined) {
    separatorData.showSeparator = showSeparator === "true" || showSeparator === true;
  }

  return separatorData;
}
