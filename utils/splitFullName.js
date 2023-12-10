function splitFullName(fullName) {
  let firstName, lastName;
  let fullNameArray = fullName.split(" ");

  if (fullName && fullNameArray.length > 1) {
    const [firstNameArray, ...lastNameArray] = fullNameArray;
    firstName = firstNameArray;
    lastName = lastNameArray.join("");
  } else {
    if (fullName == null) {
      firstName = null;
      lastName = null;
    } else {
      firstName = fullName;
      lastName = null;
    }
  }

  return { firstName, lastName };
}

module.exports = { splitFullName };
