const REGISTER_URL = '/api/auth/register/';
const LOGIN_URL = '/login';

$(document).ready(function () {
    const statusMessage = $('#register-status');
    const registrationForm = $('#registrationForm');
    const registerButton = $('#registerButton');

    function setStatus(msg, isError = true) {
        statusMessage.text(msg).removeClass('text-success text-danger');
        statusMessage.addClass(isError ? 'text-danger' : 'text-success');
    }

    registrationForm.on('submit', function (e) {
        e.preventDefault();
        statusMessage.text('');

        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const password2 = $('#password2').val();

        if (password !== password2) {
            setStatus("Passwords don't match.", true);
            return;
        }

        registerButton.prop('disabled', true).text('Registering...');

        $.ajax({
            url: REGISTER_URL,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                email: email,
                password: password,
                password2: password2
            })
        }).done(function (resp) {
            setStatus('Registration successful!', false);
            setTimeout(() => window.location.href = LOGIN_URL, 1000);

        }).fail(function (xhr) {
            let errMsg = 'Registration error. Please try again later.';

            try {
                const resp = JSON.parse(xhr.responseText);

                if (xhr.status === 400) {
                    const errors = Object.values(resp).map(v => Array.isArray(v) ? v.join(', ') : String(v));
                    errMsg = errors.join(' | ');
                } else if (resp.detail) {
                    errMsg = resp.detail;
                }
            } catch (e) {
                if (xhr.status === 0) {
                    errMsg = 'Network error. Please check your connection.';
                } else {
                    errMsg = `Error: ${xhr.status} ${xhr.statusText}`;
                }
            }

            setStatus(errMsg, true);
        }).always(function () {
            registerButton.prop('disabled', false).text('Register');
        });
    });
});
