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

// Form submission function
async function submitForm(wherefrom) {
  const formData = {
    name: document.getElementById("inputName").value,
    company_name: document.getElementById("companyName").value,
    email: document.getElementById("Email").value,
    phone: document.getElementById("phone").value,
    message: document.getElementById("message").value,
    where_from: wherefrom ?? "enquiry",
  };

  try {
    const response = await fetch("https://dev.zetupstore.com/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Submission failed");

    // alert("Thank you! Your enquiry has been submitted.");
    form.reset();
    inputs.forEach((input) => {
      input.classList.remove("is-valid", "validate-me");
    });
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting your form. Please try again.");
  }
}

function handleContactForApi(form) {
  const inputs = getAllFormFields(form);
}
