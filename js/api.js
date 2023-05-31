// Validate
const formRegister = {
  fullName: document.querySelector("#name"),
  phoneNumber: document.querySelector("#phone"),
  email: document.querySelector("#email"),
  submit: document.querySelector("#signin-btn-submit")
}

const isRequired = value => value === '' ? false : true;
const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};
const isNumberValid = (phone) => {
  const re = /^\d+$/;
  return re.test(phone);
};
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const checkFullname = () => {

  let valid = false;

  const min = 1,
      max = 30;

  const username = formRegister.fullName.value.trim();

  if (!isRequired(username)) {
      showError(formRegister.fullName, 'Fullname cannot be blank.');
  } else if (!isBetween(username.length, min, max)) {
      showError(formRegister.fullName, `Username must be between ${min} and ${max} characters.`)
  } else {
      showSuccess(formRegister.fullName);
      valid = true;
  }
  return valid;
};

const checkEmail = () => {
  let valid = false;
  const email = formRegister.email.value.trim();
  if (!isRequired(email)) {
      showError(formRegister.email, 'Email cannot be blank.');
  } else if (!isEmailValid(email)) {
      showError(formRegister.email, 'Email is not valid.')
  } else {
      showSuccess(formRegister.email);
      valid = true;
  }
  return valid;
};

const checkPhone = () => {
  let valid = false;
  const phone = formRegister.phoneNumber.value.trim();
  if (!isRequired(phone)) {
      showError(formRegister.phoneNumber, 'Phone number cannot be blank.');
  } else if (!isNumberValid(phone)) {
      showError(formRegister.phoneNumber, 'Phone number is not valid.')
  } else {
      showSuccess(formRegister.phoneNumber);
      valid = true;
  }
  return valid;
};
const showError = (input, message) => {
  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove('success');
  formField.classList.add('error');

  // show the error message
  const error = formField.querySelector('small');
  error.textContent = message;
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove('error');
  formField.classList.add('success');

  // hide the error message
  const error = formField.querySelector('small');
  error.textContent = '';
}
// Api
var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let button = formRegister.submit.addEventListener("click", (e) => {
  e.preventDefault();
  const register = "https://test-cashback.vlinkmetamall.com/api/Event";
  const serectKey = formRegister.email.value + ','+'eb41fb96b15e';
  let isUsernameValid = checkFullname(),
        isEmailValid = checkEmail(),
        isNumberValid = checkPhone();

  let isFormValid = isUsernameValid &&
        isEmailValid &&
        isNumberValid;
    if (isFormValid) {
      fetch(register, {
        method: "POST",
        mode: 'cors',
        headers: myHeaders,
    
         
        body: JSON.stringify({
          fullName: formRegister.fullName.value,
          phoneNumber: formRegister.phoneNumber.value,
          email: formRegister.email.value,
          clientID: md5(serectKey)
        }),
      })
        .then((response) => {
          if(response.status == 200){
            console.log(serectKey)
            $('#successModal').modal('show');
            $("#register-form")[0].reset();
          }
          else if(response.status == 400){
            $('#errorModal').modal('show');
          }
          response.json()})
          .then(data => console.log(data))
        .catch((err) => {
          console.log(err);
        });
    }
 
});

