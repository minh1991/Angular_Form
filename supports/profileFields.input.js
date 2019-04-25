module.exports = function InputProfileFields() {
  const inputFields = {};

  inputFields.user = req.user.id;

  if (req.body.fullname) {
    inputFields.fullname = req.body.fullname;
  }

  return inputFields;
};
