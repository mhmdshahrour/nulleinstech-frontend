const form = document.querySelector("#contact-form");
const submitBtn = document.querySelector("#submit-btn");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const formData = new FormData();

  formData.append("full_name", document.querySelector("#full_name").value);
  formData.append("email", document.querySelector("#email").value);
  formData.append("phone", document.querySelector("#phone").value);
  formData.append("company", document.querySelector("#company").value);
  formData.append("subject", document.querySelector("#subject").value);
  formData.append("message", document.querySelector("#message").value);

  const preferred = document.querySelector(
    'input[name="preferred_contact"]:checked'
  );
  formData.append("preferred_contact", preferred ? preferred.value : "email");

  const fileInput = document.querySelector("#file");
  if (fileInput && fileInput.files.length > 0) {
    formData.append("file", fileInput.files[0]);
  }

  try {
    const response = await fetch(
      "https://nulleinstech-api.onrender.com/contact",
      {
        method: "POST",
        body: formData, // ❗ NO headers
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || "Submission failed");
    }

    alert("Thank you! We received your message.");
    form.reset();
  } catch (error) {
    console.error(error);
    alert("Something went wrong. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});
