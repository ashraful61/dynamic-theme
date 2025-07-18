$(document).ready(function() {
    
    // Toggle password visibility   
    $('.toggle-password').on('click keypress', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            const pwdInput = $('#password');
            const type = pwdInput.attr('type') === 'password' ? 'text' : 'password';
            pwdInput.attr('type', type);

            // Toggle the icon
            const eyeIcon = $(this).find('img');
            if (type === 'text') {
                eyeIcon.attr('src', 'img/login/Eye.png'); // Show eye
            } else {
                eyeIcon.attr('src', 'img/login/EyeSlash.png'); // Show blind eye
            }
        }
    });

    // Basic front-end validation
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();
        let email = $('#email').val().trim();
        let password = $('#password').val().trim();
        let valid = true;
        $('.input-group input').removeClass('input-error');

        if (!email) {
            $('#email').addClass('input-error');
            valid = false;
        }
        if (!password) {
            $('#password').addClass('input-error');
            valid = false;
        }
        if (!valid) return;

        // Simulate successful login
        window.location.href = 'welcome.html';
    });

    // Input focus effect (for accessibility)
    $('.input-group input').on('focus', function() {
        $(this).closest('.input-group').addClass('focused');
    }).on('blur', function() {
        $(this).closest('.input-group').removeClass('focused');
    });
});