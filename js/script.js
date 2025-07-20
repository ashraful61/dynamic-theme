$(document).ready(function () {
    // Popup profile menu logic
    $(document).on('click', '.profile-menu-btn', function (e) {
        e.stopPropagation();
        const idx = $(this).data('row');
        const popup = $(`#profile-menu-open`);
        const isVisible = popup.is(':visible');
        // Hide all popups first
        $('.profile-menu').hide();
        // Toggle this one
        if (!isVisible) {
            popup.show();
        }
    });
    // Hide popup when clicking outside
    $(document).on('click', function () {
        $('.profile-menu').hide();
    });
    // Prevent popup from closing when clicking inside
    $(document).on('click', '.profile-menu', function (e) {
        e.stopPropagation();
    });

    // Hamburger menu logic for mobile
    $(document).on('click', '.hamburger-menu', function(e) {
        e.stopPropagation();
        $('body').toggleClass('menu-open');
    });
    // Hide menu when clicking outside (on mobile)
    $(document).on('click', function(e) {
        if ($('body').hasClass('menu-open')) {
            if (!$(e.target).closest('.navbar, .hamburger-menu').length) {
                $('body').removeClass('menu-open');
            }
        }
    });
});



// Extra style for error
$('<style>.input-error{border:2px solid #e53e3e !important;}</style>').appendTo('head'); 