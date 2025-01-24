function onSubmit(event) {
    event.preventDefault(); // Prevent form submission for validation

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;
    const error = document.getElementById('error');
    const errorMessage = [];
    error.innerText = ''; // Clear previous errors
    
    
    const nameRegex = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ]+$/;
    if (!nameRegex.test(name)) {
        errorMessage.push("Ім'я має містити лише букви");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMessage.push("Введіть дійсну електронну адресу.");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.push("Пароль повинен містити принаймні 8 символів");
    }
    if (password !== password2) {
        errorMessage.push("Паролі не співпадають.");
    }
    if (errorMessage.length > 0) {
        error.innerText = errorMessage.join('\n');
    }

    event.target.submit();
}

