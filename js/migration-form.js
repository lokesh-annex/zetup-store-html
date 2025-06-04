//add html form so that we can have same form iin multiple places
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("migration-form-section");
  container.innerHTML = `
    <div class="contact-form-card">
              <h2 class="text-center mb-4">Start Your Migration Journey</h2>
              <form id="migrationForm" noValidate>
                <div class="row g-3">
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Name"
                      id="inputName"
                      name="name"
                      required
                    />
                     <div class="invalid-feedback">Please enter your name</div>
                  </div>
                  <div class="col-md-6">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Your Email"
                      id="Email"
                      name="email"
                      required
                    />
                     <div class="invalid-feedback">Please enter valid Email</div>
                  </div>
                  <div class="col-md-6">
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="Your Phone"
                      name="phone" id="phone"
                      required
                    />
                     <div class="invalid-feedback">Please enter valid Phone no.</div>
                  </div>
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Company Name"
                      name="company_name"
                      id="companyName"
                    />
                  </div>
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Store URL"
                      name="store_url"
                      id="storeUrl"
                    />
                  </div>
                  <div class="col-12">
                    <textarea
                      class="form-control"
                      rows="4"
                      placeholder="Message"
                      name="message"
                      id="message"
                    ></textarea>
                  </div>
                  <div class="col-4">
                    <button type="submit" class="btn btn-primary w-100">
                      Start Migration
                    </button>
                  </div>
                </div>
              </form>
               <div class="d-none thank-you-container" id="migration-thank-you-message">
         <div class="thank-you-content">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
            <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
        </svg>
        <h3 class="thank-you-title">Thank You!</h3>
        <p class="thank-you-text">We've received your enquiry and will get back to you shortly.</p>
        </div>
      </div>
            </div>
  `;
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("migrationForm");

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
      const success = document.getElementById("migration-thank-you-message");
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Submitting...";
           await submitForm("migration");
        success.classList.remove("d-none");
        success.classList.add("d-block");
        form.classList.add("d-none");
      } catch (err) {
        console.error("migration failed.");
      } finally {
         form.reset();
          form.classList.remove("was-validated");
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        setTimeout(() => {
          success.classList.add("d-none");
          form.classList.remove("d-none");
         
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
