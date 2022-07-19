const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const emailSection = document.getElementById('emailSection')
const confirmSubscribe = document.getElementById('confirmSubscribe')
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

firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
confirmSubscribe.addEventListener('input', toggleEmail)
