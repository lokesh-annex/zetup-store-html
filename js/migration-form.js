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
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="email"
                      class="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="tel"
                      class="form-control"
                      placeholder="Your Phone"
                    />
                  </div>
                  <div class="col-md-6">
                    <input
                      type="text"
                      class="form-control"
                      placeholder=" Company Name"
                      name="company_name"
                      id="companyName"
                    />
                  </div>
                  <div class="col-md-12">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Your Store URL"
                      
                    />
                  </div>
                  <div class="col-12">
                    <textarea
                      class="form-control"
                      rows="4"
                      placeholder="Additional Information"
                    ></textarea>
                  </div>
                  <div class="col-4">
                    <button type="submit" class="btn btn-primary w-100">
                      Start Migration
                    </button>
                  </div>
                </div>
              </form>
            </div>
  `;
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("migrationForm");

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
