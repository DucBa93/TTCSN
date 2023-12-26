const after = document.querySelector('.after')
const listUser = document.querySelector('.listUser')
const form = document.querySelector('.form')
let apiUser = "https://zfjyk6-3000.csb.app/user"
const formPopup = document.querySelector(".form-popup")
const hidePopupBtn = document.querySelector(".form-popup .close-btn")
const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a")
const showPopupBtn = document.querySelector('.dang_nhap')




const username = document.querySelector('.login_userName')
const password = document.querySelector('.login_password')
const bntLogin = document.querySelector('.submit')

const signUserName = document.querySelector('.sign_username')
const signPassword = document.querySelector('.sign_password')
const bntSignup = document.querySelector('.signUp')


showPopupBtn.addEventListener("click", () => {
    document.body.classList.toggle("show-popup")
})


hidePopupBtn.addEventListener("click", () => showPopupBtn.click())


loginSignupLink.forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault()
        formPopup.classList[link.id === "signup-link" ? 'add' : 'remove']("show-signup")
    })
})


// dang nhappppp

const getUser = async () => {
    const response = await fetch(apiUser);
    const data = await response.json();
    return data;
};

// login
bntLogin.addEventListener("click", (e) => {
    e.preventDefault();
    if (username.value == "" || password.value == "") {
        alert("Please enter your username and password");
    } else {
        getUser().then((data) => {
            const user = data.find(
                (user) =>
                    user.username == username.value && user.password == password.value
            );
            if (user) {
                alert("Login success");
                window.location.href = "index.html";
            } else {
                alert("Login failed");
            }
        });
    }
});


bntSignup.addEventListener("click", (e) => {
    e.preventDefault();
    if (signUserName.value == "" || signPassword.value == "") {
        alert("Please enter your username and password");
    } else {
        const user = {
            username: signUserName.value,
            password: signPassword.value,
        };
        fetch(apiUser, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    }
});