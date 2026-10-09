// Assignment 6: Register

window.onload = pageLoad;

function pageLoad() {
    const form = document.getElementById("myRegister");

    if (form) {
        form.onsubmit = validateForm;

        form.onreset = function () {
            document.getElementById("errormsg").textContent = "";
        };
    }
}

function validateForm(event) {
    event.preventDefault();

    const form = document.forms["myRegister"];
    const errorMsg = document.getElementById("errormsg");

    // ตรวจว่ากรอกข้อมูลครบทุกช่อง
    if (!form.checkValidity()) {
        errorMsg.textContent = "Please complete all required fields.";
        form.reportValidity();
        return false;
    }

    const firstname = form["firstname"].value.trim();
    const lastname = form["lastname"].value.trim();
    const gender = form["gender"].value;
    const bday = form["bday"].value;
    const email = form["email"].value.trim();
    const username = form["username"].value.trim();
    const password = form["password"].value;
    const retypePassword = form["retypePassword"].value;

    // ตรวจว่ารหัสผ่านกับช่องยืนยันรหัสผ่านตรงกัน
    if (password !== retypePassword) {
        errorMsg.textContent = "Password and Retype Password do not match.";
        form["retypePassword"].focus();
        return false;
    }

    // ตรวจ username ซ้ำกับข้อมูลเดิม
    const existingUsername = localStorage.getItem("username");
    if (existingUsername && existingUsername === username) {
        errorMsg.textContent = "This username is already registered.";
        form["username"].focus();
        return false;
    }

    errorMsg.textContent = "";

    // บันทึกข้อมูลที่ลงทะเบียนไว้ใน localStorage
    localStorage.setItem("firstname", firstname);
    localStorage.setItem("lastname", lastname);
    localStorage.setItem("gender", gender);
    localStorage.setItem("bday", bday);
    localStorage.setItem("email", email);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    alert("ลงทะเบียนสำเร็จ! ระบบบันทึกข้อมูลเรียบร้อย กำลังไปที่หน้า Login");
    window.location.href = "login.html";

    return true;
}
