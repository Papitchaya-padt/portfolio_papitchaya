// Assignment 6: Login

window.onload = loginLoad;

function loginLoad() {
    const form = document.getElementById("myLogin");

    if (form) {
        form.onsubmit = checkLogin;
    }
}

function checkLogin(event) {
    event.preventDefault();

    // ดึงข้อมูลที่ลงทะเบียนจาก localStorage
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");

    // เก็บข้อมูลผู้ใช้เป็น Array of Objects
    const users = [
        { username: "admin", password: "123456" }
    ];

    if (storedUsername && storedPassword) {
        users.push({
            username: storedUsername,
            password: storedPassword
        });
    }

    const form = document.forms["myLogin"];
    const username = form["username"].value.trim();
    const password = form["password"].value;

    // ใช้ for loop ตรวจสอบ username และ password
    let isLoginSuccess = false;

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            isLoginSuccess = true;
            break;
        }
    }

    if (isLoginSuccess) {
        alert("Login success! ยินดีต้อนรับเข้าสู่ระบบ");
        return true;
    } else {
        alert("Username หรือ password ไม่ถูกต้อง");
        return false;
    }
}
