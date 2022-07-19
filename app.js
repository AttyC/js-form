const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const emailSection = document.getElementById('emailSection')
const email =  document.getElementById('email')
const comment =  document.getElementById('comment')

const isSubscribed = document.getElementById('isSubscribed')
const submitButton = document.getElementById('submit')

const url = document.getElementById("form").action

const successMessage = "Thanks for your submission, "
const errorMessage = "Something went wrong, please try again!"

function validateSubmit() {
    const regex = new RegExp(/[A-Za-z]{1,}/)
    const firstNameValid = firstName.value && regex.test(firstName.value)
    const lastNameValid = lastName.value && regex.test(lastName.value)

    firstNameValid && lastNameValid && enableButton()
    !firstName.value || !lastName.value && disableButton()
}

function enableButton() {
    submitButton.removeAttribute('disabled')
}

function disableButton() {
    submitButton.setAttribute('disabled', 'disabled')
}

function toggleEmail() {
    emailSection.style.visibility === ('visible') ? 
    emailSection.style.visibility = ('hidden') :
    emailSection.style.visibility = ('visible')
}

function sendData() {
    document.getElementById("form").action = path;
    document.getElementById("form").submit();
}

function showSuccessMessage(data) {
    emailSection.append(successMessage + data.firstName.value)
}

async function postData(url, data = {}) {
    console.log('data', data)
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    response.status === 200 || 201 ? showSuccessMessage(data) : showerrorMessage()
    return response.json()
  }

firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
isSubscribed.addEventListener('input', toggleEmail)
submitButton.addEventListener("click", function(event){
    event.preventDefault()
debugger
    const fields = {firstName, lastName, comment, isSubscribed, email,
        ...(isSubscribed.checked && email)}
        
    postData(url, fields)
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
  });