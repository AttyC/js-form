const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const emailSection = document.getElementById('emailSection')
const email =  document.getElementById('email')
let emailValid = false
const comment =  document.getElementById('comment')

const isSubscribed = document.getElementById('isSubscribed')
const submitButton = document.getElementById('submit')
const form = document.getElementById("form")
const url = document.getElementById("form").action
const successMessage = "Thanks for your submission, "
const errorMessage = "Something went wrong, please try again!"
const emailPrompt = "Please enter your email address in the correct format"

function validateSubmit() {
    const regex = new RegExp(/[A-Za-z]{1,}/)
    const firstNameValid = firstName.value && regex.test(firstName.value)
    const lastNameValid = lastName.value && regex.test(lastName.value)

    firstNameValid && lastNameValid && enableButton()
    !firstName.value || !lastName.value && disableButton()
}

function validateEmail(email) {

    emailValid = email?.value != ''
    //TODO regex for Safari on ios

    if(!emailValid) {
        showEmailPrompt()
        event.preventDefault()
    } else {
        hideEmailPrompt()
        form.submit()
    }
}

function enableButton() {
    submitButton.removeAttribute('disabled')
}

function disableButton() {
    submitButton.setAttribute('disabled', 'disabled')
}

function toggleEmailVisibility() {
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

function showEmailPrompt() {
    document.getElementById("email_prompt").innerHTML = emailPrompt 
}

function hideEmailPrompt() {
    document.getElementById("email_prompt").innerHTML = "" 
}

async function postData(url, data = {}) {
    const response = await fetch(url, {
      method: 'POST', 
      cache: 'no-cache', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data) 
    });

    response.status === 200 || 201 ? showSuccessMessage(data) : showerrorMessage()
    return response.json()
  }

firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
isSubscribed.addEventListener('input', toggleEmailVisibility)
submitButton.addEventListener("click", function(event){
    isSubscribed.checked && validateEmail(email)
  });
form.addEventListener("submit", function(event){
    event.preventDefault()
    const fields = {firstName, lastName, comment, isSubscribed, email,
        ...(isSubscribed.checked && emailValid && email)}
    postData(url, fields)
    .then(data => {
        console.log(data);
    });
})