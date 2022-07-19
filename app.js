const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
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
firstName.addEventListener('input', validateSubmit)
lastName.addEventListener('input', validateSubmit)
