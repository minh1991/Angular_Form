module.exports = function InputProfileFields(inputs, userId) {
  const inputFields = {};

  inputFields.user = userId;

  if (inputs.fullname) {
    inputFields.fullname = inputs.fullname;
  }
  if (inputs.gender) {
    inputFields.gender = inputs.gender;
  }
  if (inputs.birthday) {
    inputFields.birthday = inputs.birthday;
  }
  if (inputs.address) {
    inputFields.address = inputs.address;
  }
  if (inputs.phone) {
    inputFields.phone = inputs.phone;
  }

  if (inputs.degree) {
    inputFields.degree = inputs.degree;
  }

  if (inputs.salary) {
    inputFields.salary = inputs.salary;
  }
  if (inputs.skills) {
    inputFields.skills = inputs.skills;
  }
  if (inputs.worked) {
    inputFields.worked = inputs.worked;
  }
  if (inputs.status) {
    inputFields.status = inputs.status;
  }
  if (inputs.imgULR) {
    inputFields.imgULR = inputs.imgULR;
  }

  return inputFields;
};
