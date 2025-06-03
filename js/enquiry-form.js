//add html form so that we can have same form iin multiple places
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("enquiry-form-section");
  container.innerHTML = `
    <div class="enquiry-form">
        <div class="enquiry-form-container">
            <div class="cross-btn">
                <img src="images/cross.svg" alt="close">
            </div>
            <form id="enquiryForm" novalidate>
                <div class="row">
                    <div class="col-xl-12">
                        <h4 class="mb-30 font-weight-600">Submit Your
                            Enquiry</h4>
                    </div>
                    <div class="col-xl-12">
                        <div class="mb-30">
                            <input type="text" class="form-control" placeholder="Your Name*" name="name" id="inputName" required>
                             <div class="invalid-feedback">Please enter your full name</div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="mb-30">
                            <input type="text" class="form-control" placeholder=" Company Name" name="company_name"
                                id="companyName">
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="mb-30">
                            <input type="email" class="form-control" placeholder="Email*" name="email" id="Email" required>
                             <div class="invalid-feedback">Please enter valid email address</div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="mb-30">
                            <input type="text" class="form-control pincode" placeholder="Phone" name="phone" id="phone">
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="mb-30">
                            <textarea type="number" class="form-control" placeholder="Message" name="message"
                                id="message"></textarea>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <button type="submit" class="btn btn-primary basicbtn">Submit</button>
                    </div>
                </div>
            </form>
        </div>
        <div class="btn btn-primary enquiry-btn">
            <img src="images/cond.png" alt="enquiry">
        </div>
    </div>
  `;
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enquiryForm");

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
