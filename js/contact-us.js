import {
  getAllFormFields,
  submitForm,
  validateField,
} from "./form-validations.js";

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  const inputs = getAllFormFields(form);

  // Form submission
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();

    // Validate all fields
    let isValid = true;
    inputs.forEach((input) => {
      input.classList.add("validate-me");
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      const success = document.getElementById("contact-us-thank-you-message");

      try {
        await submitForm("contact-us");
        success.classList.add("d-block");
        form.classList.add("d-none");
      } catch (err) {
        console.error("contact us failed. ", err);
      } finally {
        setTimeout(() => {
          success.classList.add("d-none");
          form.classList.remove("d-none");
          form.reset();
          inputs.forEach((input) => {
            input.classList.remove("is-valid", "validate-me");
          });
        }, 2000);
      }
    } else {
      form.classList.add("was-validated");
    }
  });
});
