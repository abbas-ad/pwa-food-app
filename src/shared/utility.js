export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const addCommas = (nStr) => {
  nStr += "";
  var x = nStr.split(".");
  var x1 = x[0];
  var x2 = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + "," + "$2");
  }
  return x1 + x2;
};

export const convertToPersianDigitsCurrency = (text) =>
  text
    .toLocaleString("fa-IR", {
      style: "currency",
      currency: "IRR",
    })
    .replace("ریال", " ");


export const convertToJalaliDate = (date) => {
  const today = new Date(date);
  return today.toLocaleDateString('fa-IR');
}