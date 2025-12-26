document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const status = document.getElementById("status");

  if (!form || !status) {
    console.error("Form or status element not found");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    status.textContent = "Sending...";
    status.className = "status sending";

    const formData = new FormData(form);

    try {
      const response = await fetch(
        "https://nulleinstech-api.onrender.com/contact",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Submission failed");
      }

      status.textContent =
        "Thank you! Your message has been received. We will contact you shortly.";
      status.className = "status success";
      form.reset();
    } catch (error) {
      console.error(error);
      status.textContent =
        error.message || "Something went wrong. Please try again later.";
      status.className = "status error";
    }
  });
});

