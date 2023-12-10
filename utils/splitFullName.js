function splitFullName(fullName) {
  let firstName, lastName;
  let fullNameArray = fullName.split(" ");

  if (fullName && fullNameArray.length > 1) {
    const [firstNameArray, ...lastNameArray] = fullNameArray;
    firstName = firstNameArray;
    lastName = lastNameArray.join(" ");
  } else {
    firstName = fullName || null;
    lastName = null;
  }

  return { firstName, lastName };
}

module.exports = { splitFullName };
