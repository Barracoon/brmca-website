const GOOGLE_FORM_CONFIG = {
  formId: "1FAIpQLSdWXn_9CepsCROv0bBnemOghpiqH2D5zFQHuAnVLquNj8G60Q",
  viewUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdWXn_9CepsCROv0bBnemOghpiqH2D5zFQHuAnVLquNj8G60Q/viewform?usp=dialog",
  submitUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdWXn_9CepsCROv0bBnemOghpiqH2D5zFQHuAnVLquNj8G60Q/formResponse",
  fields: {
    firstName: "entry.2084308338",
    lastName: "entry.532441241",
    email: "entry.34853409",
  },
  successMessage: "Thank you for joining the Blue Rock Manor community distribution list.",
};

document.addEventListener("DOMContentLoaded", () => {
  const siteHeader = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.getElementById("mainNav");
  const signupButtons = document.querySelectorAll("#signupBtn, .js-signup-trigger");
  const modal = document.getElementById("signupModal");
  const close = document.getElementById("closeModal");
  const cancel = document.getElementById("cancel");
  const forms = document.querySelectorAll("#signupForm, #modalSignupForm");

  const openModal = () => {
    if (modal) modal.setAttribute("aria-hidden", "false");
  };

  const closeModal = () => {
    if (modal) modal.setAttribute("aria-hidden", "true");
  };

  const setFormMessage = (form, message, type = "success") => {
    let messageEl = form.parentElement.querySelector(".form-message");
    if (!messageEl) {
      messageEl = document.createElement("p");
      messageEl.className = "form-message";
      messageEl.setAttribute("role", "status");
      form.insertAdjacentElement("afterend", messageEl);
    }

    messageEl.textContent = message;
    messageEl.dataset.type = type;
  };

  const submitSignup = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const submitButton = form.querySelector('button[type="submit"]');
    const fd = new FormData(form);
    const payload = new URLSearchParams();

    payload.append(GOOGLE_FORM_CONFIG.fields.firstName, fd.get("first") || "");
    payload.append(GOOGLE_FORM_CONFIG.fields.lastName, fd.get("last") || "");
    payload.append(GOOGLE_FORM_CONFIG.fields.email, fd.get("email") || "");

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;
      submitButton.textContent = "Submitting...";
    }

    try {
      await fetch(GOOGLE_FORM_CONFIG.submitUrl, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
      });

      form.reset();
      setFormMessage(form, GOOGLE_FORM_CONFIG.successMessage);
    } catch (error) {
      setFormMessage(form, "We could not submit your signup. Please try again.", "error");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = submitButton.dataset.originalText || "Submit";
      }
    }
  };

  if (siteHeader) {
    const updateHeaderState = () => {
      siteHeader.classList.toggle("has-scrolled", window.scrollY > 8);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  if (navToggle && mainNav) {
    const closeNav = ({ returnFocus = false } = {}) => {
      navToggle.setAttribute("aria-expanded", "false");
      mainNav.classList.remove("is-open");
      if (returnFocus) navToggle.focus();
    };

    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) {
        closeNav();
      } else {
        navToggle.setAttribute("aria-expanded", "true");
        mainNav.classList.add("is-open");
      }
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeNav());
    });

    document.addEventListener("click", (event) => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (!expanded) return;
      if (navToggle.contains(event.target) || mainNav.contains(event.target)) return;
      closeNav();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      if (expanded) closeNav({ returnFocus: true });
    });
  }

  signupButtons.forEach((button) => button.addEventListener("click", openModal));
  if (close) close.addEventListener("click", closeModal);
  if (cancel) cancel.addEventListener("click", closeModal);
  forms.forEach((form) => form.addEventListener("submit", submitSignup));
});
