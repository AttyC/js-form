const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const submitButton = document.getElementById('submit')

function validateSubmit() {
    firstName.value && lastName.value && enableButton()
    !firstName.value || !lastName.value && disableButton()
}

function enableButton() {
        submitButton.removeAttribute('disabled')
    }
function disableButton() {
    submitButton.setAttribute('disabled', 'disabled')
}
firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
