const botonLogin = document.querySelector('#botonLogin');
const emailInput = document.querySelector('#campoEmail');
const contrasenaInput = document.querySelector('#campoContrasena');

function loginFront() {
    const email = emailInput.value;
    const contrasena = contrasenaInput.value;

    if (!email || !contrasena) {
        alert('Verifique que las credenciales hayan sido ingresadas correctamente.');
        return;
    }

    axios.post('/usuarios/login', {
        email,
        contrasena
    })
        .then(response => {
            if (response.data.ok) {
                window.location.href = "/usuarios/dashboard";
            } else {
                alert(response.data.error || 'Error al iniciar sesión');
            }
        })
        .catch(error => {
            console.error('Error:', error.response?.data || error.message);
            alert(error.response?.data || 'Error al iniciar sesión');
        });
}

botonLogin.addEventListener('click', loginFront);

contrasenaInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        loginFront();
    }
});