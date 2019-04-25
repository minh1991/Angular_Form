const validator = require("validator");
const isEmpty = require("./isEmpty.validate");

module.exports = function validateProfileInput(data) {
  let errors = {};

  if (!isEmpty(data.fullname)) {
    data.fullname = data.fullname;
  } else {
    data.fullname = "";
  }
  if (!isEmpty(data.birthday)) {
    data.birthday = data.birthday;
  } else {
    data.birthday = "";
  }
  if (!isEmpty(data.address)) {
    data.address = data.address;
  } else {
    data.address = "";
  }
  if (!isEmpty(data.phone)) {
    data.phone = data.phone;
  } else {
    data.phone = "";
  }
  if (!isEmpty(data.degree)) {
    data.degree = data.degree;
  } else {
    data.degree = "";
  }
  if (!isEmpty(data.salary)) {
    data.salary = data.salary;
  } else {
    data.salary = "";
  }
  if (!isEmpty(data.skills)) {
    data.skills = data.skills;
  } else {
    data.skills = "";
  }
  if (!isEmpty(data.word)) {
    data.work = data.work;
  } else {
    data.work = "";
  }
  if (!isEmpty(data.status)) {
    data.status = data.status;
  } else {
    data.status = "";
  }

  // VALIDATE FULLNAME
  if (!validator.isLength(data.fullname, { min: 2, max: 30 })) {
    errors.fullname = "Fullname phải dài từ 2 ký tự đến 30 ký tự";
  }
  if (validator.isEmpty(data.fullname)) {
    errors.fullname = "Fullname không được bỏ trống";
  }

  // VALIDATE BIRTHDAY
  if (validator.isEmpty(data.birthday)) {
    errors.birthday = "Birthday không được bỏ trống";
  }

  // VALIDATE ADDRESS
  if (validator.isEmpty(data.address)) {
    errors.address = "Address không được bỏ trống";
  }

  // VALIDATE PHONE
  if (validator.isMobilePhone(data.phone["vi-VN"])) {
    errors.phone = "Phone sai đinh dạng di động Việt Nam";
  }

  if (validator.isEmpty(data.phone)) {
    errors.phone = "Phone không được bỏ trống";
  }

  // VALIDATE DEGREE
  if (validator.isEmpty(data.degree)) {
    errors.degree = "Trình độ không được bỏ trống";
  }

  // VALIDATE SALARY
  if (validator.isEmpty(data.salary)) {
    errors.salary = "Mức lương không được bỏ trống";
  }

  // VALIDATE SKILLS
  if (validator.isEmpty(data.skills)) {
    errors.skills = "Ngôn ngữ lập trình không được bỏ trống";
  }

  // VALIDATE WORK
  if (!validator.isLength(data.work, { min: 2, max: 30 })) {
    errors.work = "công việc gần nhất phải dài từ 2 ký tự đến 30 ký tự";
  }

  if (validator.isEmpty(data.work)) {
    errors.work = "công việc gần nhất không được bỏ trống";
  }

  // VALIDATE STATUS
  if (!validator.isLength(data.status, { min: 2, max: 1000 })) {
    errors.status = "Giới thiệu bản thân phải dài từ 2 ký tự đến 1000 ký tự";
  }

  if (validator.isEmpty(data.status)) {
    errors.status = "Giới thiệu bản thân không được bỏ trống";
  }

  // VALIDATE IMGULR
  if (!isEmpty(data.imgULR)) {
    if (!validator.isURL(data.imgULR)) {
      errors.imgULR = "Link ảnh sai cú pháp";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
