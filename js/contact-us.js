document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  const inputs = getAllFormFields(form);

  // Form submission
  form.addEventListener("submit", function (event) {
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
      submitForm();
    } else {
      form.classList.add("was-validated");
    }
  });
});
