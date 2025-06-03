// Field validation function
function validateField(field) {
  if (field.hasAttribute("required") && !field.value.trim()) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }

  if (
    field.type === "email" &&
    field.value &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)
  ) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }

  if (field.id === "phone" && field.value && !/^\d{10}$/.test(field.value)) {
    field.classList.add("is-invalid");
    field.classList.remove("is-valid");
    return false;
  }

  if (field.value) {
    field.classList.add("is-valid");
    field.classList.remove("is-invalid");
  } else {
    field.classList.remove("is-valid");
    field.classList.remove("is-invalid");
  }

  return field.checkValidity();
}

function getAllFormFields(form) {
  // Enable real-time validation on blur
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      input.classList.add("validate-me");
      validateField(input);
    });

    // Clear validation when user starts typing
    input.addEventListener("input", () => {
      if (input.classList.contains("validate-me")) {
        validateField(input);
      }
    });
  });

  return inputs;
}
