// Signup validation
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  const name = document.getElementById("name");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const strengthBar = document.getElementById("strengthBar");
  const strengthText = document.getElementById("strengthText");

  // Password strength checker
  password.addEventListener("input", () => {
    const val = password.value;
    let strength = 0;

    if (val.length >= 6) strength++;
    if (val.match(/[A-Z]/)) strength++;
    if (val.match(/[0-9]/)) strength++;
    if (val.match(/[^a-zA-Z0-9]/)) strength++;

    const colors = ["#e94560", "#e94560", "#f39c12", "#27ae60", "#27ae60"];
    const labels = ["", "Weak", "Fair", "Good", "Strong"];

    strengthBar.style.width = (strength * 25) + "%";
    strengthBar.style.background = colors[strength];
    strengthText.textContent = labels[strength];
  });

  signupForm.addEventListener("submit", (e) => {
    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".field-error").forEach(el => el.remove());

    if (name.value.trim() === "") {
      showError(name, "Name is required");
      valid = false;
    }

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError(email, "Enter a valid email address");
      valid = false;
    }

    if (password.value.length < 6) {
      showError(password, "Password must be at least 6 characters");
      valid = false;
    }

    if (confirmPassword.value !== password.value) {
      showError(confirmPassword, "Passwords do not match");
      valid = false;
    }

    if (!valid) e.preventDefault();
  });
}

// Login validation
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    document.querySelectorAll(".field-error").forEach(el => el.remove());
    let valid = true;

    const email = document.getElementById("loginEmail");
    const password = document.getElementById("loginPassword");

    if (!email.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      showError(email, "Enter a valid email address");
      valid = false;
    }

    if (password.value.trim() === "") {
      showError(password, "Password is required");
      valid = false;
    }

    if (!valid) e.preventDefault();
  });
}

// Helper function
function showError(input, message) {
  const error = document.createElement("small");
  error.className = "field-error";
  error.style.color = "#e94560";
  error.style.display = "block";
  error.style.marginTop = "0.3rem";
  error.textContent = message;
  input.parentElement.appendChild(error);
  input.style.borderColor = "#e94560";
}