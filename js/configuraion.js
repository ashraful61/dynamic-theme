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