const regEmail =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regName = /^([a-zA-Z]+|[а-яА-ЯёЁ]+)$/;
const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validName = 'The name must contain only letters';
const validEmail = 'email should be like this alice.miller@yahoo.com'
const validPassword = 'The user password must contain at least 8 characters, uppercase and lowercase letters, and numbers'
const validConfirmPassword = 'Password mismatch';

const handleError = (field, valid) => {
  field.nextElementSibling.textContent = valid;
  field.style.color = "red";
  field.style.borderBottom = "1px solid red";;
} 

const form = document.querySelector("#form");
const send = document.querySelector("#send");

send.addEventListener("click", (event) => {
  event.preventDefault();

  const data = {
    name: "",
    lastName: "",
    nationality: "",
    email: "",
    gender: null,
    birth: {
      day: null,
      month: null,
      year: null,
    },
    password: null,
    confirmPassword: null,
  };

  if (!regName.test(form.elements.name.value)) {
    handleError(form.elements.name, validName)
  } else {
    data.name = form.elements.name.value;
    form.elements.name.nextElementSibling.textContent = '';
  }

  if (!regName.test(form.elements.lastName.value)) {
    handleError(form.elements.lastName, validName)
  } else {
    data.lastName = form.elements.lastName.value;
    form.elements.lastName.nextElementSibling.textContent = '';

  }

  if (!form.elements.nationality.value) {
    console.log("no nationality");
  } else {
    data.nationality = form.elements.nationality.value;

  }

  if (!form.elements.gender.value) {
    console.log("no gender");
  } else {
    data.gender = form.elements.gender.value;
  }

  if (!regEmail.test(form.elements.email.value)) {
    handleError(form.elements.email, validEmail)
  } else {
    data.email = form.elements.email.value;
    form.elements.email.nextElementSibling.textContent = '';
  }

  if (!form.elements.day.value) {
    console.log("no day");
  } else {
    data.birth.day = form.elements.day.value;
  }
  if (!form.elements.month.value) {
    console.log("no month");
  } else {
    data.birth.month = form.elements.month.value;
  }
  if (!form.elements.year.value) {
    console.log("no year");
  } else {
    data.birth.year = form.elements.year.value;
  }

  if (!regPassword.test(form.elements.password.value)) {
    handleError(form.elements.password, validPassword)
  } else {
    data.password = form.elements.password.value;
    form.elements.password.nextElementSibling.textContent = '';
  }

if (
    form.elements.password.value !== form.elements.confirmPassword.value
    ) {
      handleError(form.elements.password, validConfirmPassword)
  } else {
    data.confirmPassword = form.elements.confirmPassword.value;
    form.elements.confirmPassword.nextElementSibling.textContent = '';
  }

  console.log(data);
});
