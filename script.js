$(document).ready(function() {
    // Toggle password visibility
    $('.toggle-password').on('click keypress', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            const pwdInput = $('#password');
            const type = pwdInput.attr('type') === 'password' ? 'text' : 'password';
            pwdInput.attr('type', type);
            $(this).toggleClass('active');
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

    // Dashboard card hover/focus effect for accessibility
    $('.dashboard-card').on('mouseenter focusin', function() {
        $(this).addClass('hovered').siblings('.dashboard-card').removeClass('hovered');
    });
    $('.dashboard-card').on('mouseleave focusout', function() {
        $(this).removeClass('hovered');
    });
});

// Extra style for error
$('<style>.input-error{border:2px solid #e53e3e !important;}</style>').appendTo('head'); 