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

// Configuration page logic
$(document).ready(function() {
    // Load saved preferences or defaults
    let savedTheme = localStorage.getItem('ds_theme') || 'light';
    let savedNav = localStorage.getItem('ds_nav') || 'topbar';
    let currentTheme = savedTheme;
    let currentNav = savedNav;
    let pendingTheme = savedTheme;
    let pendingNav = savedNav;

    function applyThemeNav(theme, nav) {
        $('body').attr('data-theme', theme);
        $('body').attr('data-nav', nav);
        // Highlight selected options
        $('.theme-option').removeClass('selected');
        $('.theme-option[data-theme="' + theme + '"]').addClass('selected');
        $('.nav-option').removeClass('selected');
        $('.nav-option[data-nav="' + nav + '"]').addClass('selected');
    }

    // Initial apply
    applyThemeNav(currentTheme, currentNav);

    // Theme selection
    $('.theme-option').on('click keypress', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            pendingTheme = $(this).data('theme');
            applyThemeNav(pendingTheme, pendingNav);
        }
    });
    // Nav selection
    $('.nav-option').on('click keypress', function(e) {
        if (e.type === 'click' || e.key === 'Enter' || e.key === ' ') {
            pendingNav = $(this).data('nav');
            applyThemeNav(pendingTheme, pendingNav);
        }
    });
    // Discard button
    $('.discard-btn').on('click', function() {
        pendingTheme = currentTheme;
        pendingNav = currentNav;
        applyThemeNav(currentTheme, currentNav);
    });
    // Apply button
    $('.apply-btn').on('click', function() {
        currentTheme = pendingTheme;
        currentNav = pendingNav;
        localStorage.setItem('ds_theme', currentTheme);
        localStorage.setItem('ds_nav', currentNav);
        applyThemeNav(currentTheme, currentNav);
    });
    // On page load, always apply saved preferences
    applyThemeNav(currentTheme, currentNav);
});

// Wait for the DOM to be ready
$(document).ready(function() {
    // When the config card or its button is clicked, go to configuration.html
    $('#config-card .card-action-btn').on('click', function() {
        window.location.href = 'configuration.html';
    });
    $('#data-card').on('click', function() {
        window.location.href = 'datalist.html';
    });
});

// Extra style for error
$('<style>.input-error{border:2px solid #e53e3e !important;}</style>').appendTo('head'); 