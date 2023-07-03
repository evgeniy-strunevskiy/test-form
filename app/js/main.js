const regEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regName = /^([a-zA-Z]+|[а-яА-ЯёЁ]+)$/;
const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

const validName = "The name must contain only letters";
const validLastName = "The last name must contain only letters";
const validEmail = "email should be like this alice.miller@yahoo.com";
const validPassword =
  "The user password must contain at least 8 characters, uppercase and lowercase letters, and numbers";
const validConfirmPassword = "Password mismatch";
const validBirth = "Fill in the date of birth";
const validGender = "select gender";
const validNationality = "select nationality";

const form = document.querySelector("#form");
const send = document.querySelector("#send");

const formComponent = document.querySelector(".form");
const successComponent = document.querySelector(".success");

send.addEventListener("click", (event) => {
  event.preventDefault();

  let valid = true;

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

  const handleError = (field, validText) => {
    console.log(field.name)
    valid = false;
      field.nextElementSibling.textContent = validText;
      field.style.color = "red";
      field.style.borderBottom = "1px solid red";
  };

  const handleField = (field) => {
    data[field.name] = field.value;
    if (field.tagName === "INPUT") {
      field.nextElementSibling.textContent = "";
      field.style.borderBottom = "1px solid black";
    }
  };

  if (!regName.test(form.elements.name.value)) {
    handleError(form.elements.name, validName);
  } else {
    handleField(form.elements.name);
  }

  if (!regName.test(form.elements.lastName.value)) {
    handleError(form.elements.lastName, validLastName);
  } else {
    handleField(form.elements.lastName);
  }

  if (form.elements.nationality.value) {
    handleField(form.elements.nationality);
  }

  if (form.elements.gender.value) {
    handleField(form.elements.gender);
  }

  if (!regEmail.test(form.elements.email.value)) {
    handleError(form.elements.email, validEmail);
  } else {
    handleField(form.elements.email);
  }

  if (form.elements.day.value) {
    handleField(form.elements.day);
  }

  if (form.elements.month.value) {
    handleField(form.elements.month);
  }

  if (form.elements.year.value) {
    handleField(form.elements.year);
  }

  if (!regPassword.test(form.elements.password.value)) {
    handleError(form.elements.password, validPassword);
  } else {
    handleField(form.elements.password);
  }

  const passwordComparison = form.elements.password.value !== form.elements.confirmPassword.value

  if (!regPassword.test(form.elements.password.value) || passwordComparison) {
    handleError(form.elements.confirmPassword, validConfirmPassword);
  } else {
    handleField(form.elements.confirmPassword);
  }

  async function sendData() {
    try {
      let response = await fetch("http://localhost:3001/point", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        send.classList.add('reject')
        console.log(send)
        throw new Error("Ошибка при отправке данных");
      }

      formComponent.style.display = 'none';
      successComponent.style.display = 'block';

    } catch (error) {
      console.error("Произошла ошибка:", error);
    }
  }

  if (valid) {
    sendData();
    form.reset();
  }

});
