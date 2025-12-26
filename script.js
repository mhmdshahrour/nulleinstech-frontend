const form = document.getElementById("contactForm");
const statusEl = document.getElementById("status");

// ✅ LIVE BACKEND URL
const API_URL = "https://nulleinstech-api.onrender.com/contact";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  statusEl.textContent = "Sending...";

  const formData = new FormData(form);

  // ✅ IMPORTANT FIX:
  // Remove empty file field so backend doesn't reject it
  const fileInput = document.getElementById("file");
  if (fileInput && fileInput.files.length === 0) {
    formData.delete("file");
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || "Submission failed");
    }

    statusEl.textContent =
      "Thank you! Your message has been received. The NullEinsTech team will contact you shortly.";
    form.reset();
  } catch (err) {
    console.error(err);
    statusEl.textContent =
      err.message || "Something went wrong. Please try again later.";
  }
});
