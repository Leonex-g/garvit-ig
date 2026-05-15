// EmailJS contact form handler
// Keys here are public-facing client keys — not server secrets

const PUBLIC_KEY  = "5MdVGc-3mOrTAWQF4";
const SERVICE_ID  = "service_xznqhm3";
const TEMPLATE_ID = "template_go9fz2k";

// Wait for EmailJS SDK to be ready
window.addEventListener("load", () => {
  if (typeof emailjs === "undefined") {
    console.error("EmailJS failed to load.");
    return;
  }

  emailjs.init(PUBLIC_KEY);

  const form      = document.getElementById("contactForm");
  const submitBtn = document.getElementById("submitBtn");
  const formMsg   = document.getElementById("formMsg");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset message
    formMsg.className   = "form-msg";
    formMsg.textContent = "";

    const name    = document.getElementById("from_name").value.trim();
    const email   = document.getElementById("from_email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Basic validation
    if (!name || !email || !message) {
      formMsg.textContent = "Please fill in all fields.";
      formMsg.className   = "form-msg error";
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMsg.textContent = "Please enter a valid email address.";
      formMsg.className   = "form-msg error";
      return;
    }

    submitBtn.textContent = "Sending…";
    submitBtn.disabled    = true;

    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name:  name,
      from_email: email,
      message:    message,
      to_email:   "garvitt.creator@gmail.com"
    })
    .then(() => {
      formMsg.textContent = "🎉 Message sent! I'll get back to you soon.";
      formMsg.className   = "form-msg success";
      submitBtn.textContent = "Send Message ✉️";
      submitBtn.disabled    = false;
      form.reset();
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      formMsg.textContent = "❌ Something went wrong. Try emailing directly.";
      formMsg.className   = "form-msg error";
      submitBtn.textContent = "Send Message ✉️";
      submitBtn.disabled    = false;
    });
  });
});
