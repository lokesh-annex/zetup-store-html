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

  if (field.id === "phone" && field.value) {
    const cleanedPhone = field.value.replace(/\D/g, "");

    // Validate phone length (adjust as needed)
    if (cleanedPhone.length < 8 || cleanedPhone.length > 15) {
      field.classList.add("is-invalid");
      return false;
    }
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
async function submitForm(wherefrom, formId) {
  const form = document.getElementById(formId);
  console.log("line 63 ---------------> ", form)
  console.log("line 64 ---------------> ", form.querySelector("inputName"))
  const formData = {
    name: form.querySelector("#inputName").value,
    company_name: form.querySelector("#companyName")?.value,
    email: form.querySelector("#Email").value,
    phone: form.querySelector("#phone").value,
    message: form.querySelector("#message")?.value,
    store_url: form.querySelector("#storeUrl")?.value,
    where_from: wherefrom ?? "enquiry",
  };

  console.log("line 69 -------------> ", formData);

  try {
    const response = await fetch("https://dev.zetupstore.com/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    console.log("line 77 ------------> ", response);
    console.log("line 78 ------------> ", response.status);

    if (![200, 201].includes(response.status)) {
      throw new Error("Submission failed");
    }

    // alert("Thank you! Your enquiry has been submitted.");
  } catch (error) {
    console.error("Error:", error);
    alert("There was an error submitting your form. Please try again.");
  }
}
