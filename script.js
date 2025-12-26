document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (!form || !submitBtn) {
    console.error("Form or submit button not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://nulleinstech-api.onrender.com/contact",
        {
          method: "POST",
          body: formData
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
});

