/**
* contact: Validates all text fields and inputs on the Contact Me page
*
* Project: Website Project
* Author: Courtney VanCaeyzeele
* Date Created: 4.19.2016
* Last Modified: 4.21.2016
*/

/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str)
{
    // Uses a regex to remove spaces from a string.
    return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Checks if a text field has input
 *
 * param textFieldElement		A text field input element object
 * return 	true if the field has input, false otherwise
 */
function formFieldHasInput(textFieldElement) {
    // Check if a text field is empty
    if (textFieldElement.value == null || trim(textFieldElement.value) == "") {
        return false;
    }

    return true;
}

/*
 * Handles the submit event of the contact form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {
    // Hide all errors on page
    hideErrors();

    // Check if form has any errors
    if (errorCheck()) {
        // Prevent form submission if errors are found
        e.preventDefault();

        // Prevents form from submitting by returning false
        return false;
    }

    // Allow form submission if no errors are found
    return true;
}

/*
 * Handles the reset event of the contact form
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
    // Confirm that the user wants to reset the form.
    if ( confirm('Reset form?') )
    {
        // Ensure all error fields are hidden
        hideErrors();

        // Set focus to the first text field on the page
        document.getElementById("name").focus();

        // When using onReset="resetForm()" in markup, returning true will allow
        // the form to reset
        return true;
    }

    // Prevents the form from resetting
    e.preventDefault();

    // When using onReset="resetForm()" in markup, returning false would prevent
    // the form from resetting
    return false;
}

/*
 * Hides all of the error messages
 */
function hideErrors() {
    // get all error messages by class name and put in an array
    var errorFields = document.getElementsByClassName("error");

    // loop through all error messages and set display style of each to "none"
    for (var i = 0; i < errorFields.length; i++) {
        errorFields[i].style.display = "none";
    }
}

/*
 * Checks all fields of the contact form for errors
 *
 * Returns true if an error was found; false if not
 */
function errorCheck() {
    var hasErrors = false;
    var requiredFields = ["name", "phone", "email", "comments"];

    for (var i = 0; i < requiredFields.length; i++) {
        var textField = document.getElementById(requiredFields[i]);

        // Verify that all text fields are filled
        if (!formFieldHasInput(textField)) {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";

            if (!hasErrors) {
                textField.focus();
                textField.select();
            }

            hasErrors = true;
            textField.className += " errorField";
        }
        // Verify that phone number is valid
        else if (textField.type == "tel" && formFieldHasInput(textField)) {

            // Check if phone number is ten digits
            if (textField.value.length != 10) {
                document.getElementById(requiredFields[i] + "_lengtherror").style.display = "block";

                if (!hasErrors) {
                    textField.focus();
                    textField.select();
                }

                hasErrors = true;
                textField.className += " errorField";
            }
            // ????
            // Check if phone number is numeric
            else if (!isNaN(phone)) {
                document.getElementById(requiredFields[i] + "_formaterror").style.display = "none";

                if (!hasErrors) {
                    textField.focus();
                    textField.select();
                }

                hasErrors = true;
                textField.className += " errorField";
            }
        }
        // Verify that email address is valid
        else if (textField.type == "email" && formFieldHasInput(textField)) {
            var emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
            var email = trim(textField.value);

            if (!emailRegex.test(email)) {
                document.getElementById(requiredFields[i] + "_formaterror").style.display = "block";

                if (!hasErrors) {
                    textField.focus();
                }

                hasErrors = true;
                textField.className += " errorField";
            }
        }
    }

    return hasErrors;
}

/*
 * Hides all of the error elements.
 */
function hideErrors(){
    // get all error messages by class name and put in an array
    var errorFields = document.getElementsByClassName("error");

    // loop through all error messages and set display style of each to "none"
    for (var i = 0; i < errorFields.length; i++) {
        errorFields[i].style.display = "none";
    }
}

/*
 * Handles the load event of the document
 */
function onLoad() {
    // Hide errors when page loads
    hideErrors();

    // Create an eventListener to validate form when submit button is clicked
    document.getElementById("contactform").addEventListener("submit", validate, false);

    // Reset the form
    document.getElementById("contactform").reset();

    // Create an event listener to call resetForm method when form is reset
    document.getElementById("contactform").addEventListener("reset", resetForm, false);
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", onLoad, false);
