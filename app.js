const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const emailSection = document.getElementById('emailSection')
const email =  document.getElementById('email')
const comment =  document.getElementById('comment')

const isSubscribed = document.getElementById('isSubscribed')
const submitButton = document.getElementById('submit')

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

firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
isSubscribed.addEventListener('input', toggleEmail)
