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
});



// Extra style for error
$('<style>.input-error{border:2px solid #e53e3e !important;}</style>').appendTo('head'); 