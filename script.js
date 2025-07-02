// Tạo user admin mặc định nếu chưa có
if (!localStorage.getItem("users")) {
  const defaultUsers = {
    "thanhhien231": {
      password: "mth231",
      balance: 999999,
      tools: ["md5", "go88", "sunwin"]
    }
  };
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

let isLoginMode = true;

function submitForm() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  if (!username || !password) {
    error.innerText = "❗ Vui lòng nhập đủ thông tin.";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users"));

  if (isLoginMode) {
    // Đăng nhập
    if (users[username] && users[username].password === password) {
      localStorage.setItem("currentUser", username);
      window.location.href = "home.html";
    } else {
      error.innerText = "❌ Sai tài khoản hoặc mật khẩu.";
    }
  } else {
    // Đăng ký
    if (users[username]) {
      error.innerText = "❌ Tài khoản đã tồn tại.";
    } else {
      users[username] = {
        password: password,
        balance: 0,
        tools: []
      };
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", username);
      window.location.href = "home.html";
    }
  }
}

function toggleForm() {
  isLoginMode = !isLoginMode;
  document.getElementById("form-title").innerText = isLoginMode ? "Đăng nhập" : "Đăng ký";
  document.querySelector("button").innerText = isLoginMode ? "Đăng nhập" : "Đăng ký";
  document.getElementById("switch-mode").innerHTML = isLoginMode
    ? `Chưa có tài khoản? <a onclick="toggleForm()">Đăng ký</a>`
    : `Đã có tài khoản? <a onclick="toggleForm()">Đăng nhập</a>`;
  document.getElementById("login-error").innerText = "";
}