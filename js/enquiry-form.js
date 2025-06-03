const enquiryFormHtml = `
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
                            <input type="text" class="form-control" placeholder="Company Name" name="company_name"
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
                            <input type="text" class="form-control pincode" placeholder="Phone" name="phone" id="phone" required>
                            <div class="invalid-feedback">Please enter valid Phone no.</div>
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
           <div class="d-none thank-you-container" id="thank-you-message">
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
        <div class="btn btn-primary enquiry-btn">
            <img src="images/cond.png" alt="enquiry">
        </div>
    </div>
   
  `;

//add html form so that we can have same form iin multiple places
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("enquiry-form-section");
  container.innerHTML = enquiryFormHtml;
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("enquiryForm");

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
      const success = document.getElementById("thank-you-message");
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Submitting...";

        await submitForm("enquiry");
        success.classList.remove("d-none");
        success.classList.add("d-block");
        form.classList.add("d-none");
      } catch (err) {
        console.error("Enquiry failed.");
      } finally {
         form.reset();
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
