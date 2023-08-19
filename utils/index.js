function excludeProperty(object, propertyToExclude) {
  const newObject = {};
  for (const key in object) {
    if (key !== propertyToExclude) {
      newObject[key] = object[key];
    }
  } 
  return newObject;
}

module.exports = {
  excludeProperty,
};
