const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")

const email =  document.getElementById('email')
const emailSection = document.getElementById('email_section')
let emailValid = false
const comment =  document.getElementById('comment')

const isSubscribed = document.getElementById('is_subscribed')
const submitButton = document.getElementById('submitBtn')
const form = document.getElementById("form")
const url = document.getElementById("form").action

const successMessage = "Thanks for your submission, "
const errorMessage = "Something went wrong, please try again!"
const emailPrompt = "Please enter your email address in the correct format"

let submitMessage = document.createElement('p')
let emailMessage = document.createElement('p')

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
        email.focus()
        event.preventDefault()
    } else {
        hideEmailPrompt()
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

function hideSubmitMessage() {
    submitMessage.innerHTML = ""
}

function showSubmitMessage(data, status) {
    form.append(submitMessage)

    if(status === 200 || 201) {
        submitMessage.innerHTML = successMessage + data.firstName.value
        setTimeout(hideSubmitMessage, 2000 )
        form.reset()
    } else {
        submitMessage.innerHTML = errorMessage 
    }
 }

function showEmailPrompt() {
    emailSection.append(emailMessage)
    emailMessage.innerHTML = emailPrompt 
}

function hideEmailPrompt() {
    emailMessage.innerHTML = "" 
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

    showSubmitMessage(data, response.status)
    return response.json()
  }

firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
isSubscribed.addEventListener('input', toggleEmailVisibility)
submitButton.addEventListener('click', function(){
    isSubscribed.checked && validateEmail(email)
  });

form.addEventListener('submit', function(event){
    event.preventDefault()
    const fields = {firstName, lastName, comment, isSubscribed, email,
        ...(isSubscribed.checked && emailValid && email)}
    postData(url, fields)
    .then(data => {
        console.log(data);
    });
})