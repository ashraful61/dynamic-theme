// Wait for the DOM to be ready
$(document).ready(function () {
    // Dashboard card hover/focus effect for accessibility
    $('.dashboard-card').on('mouseenter focusin', function () {
        $(this).addClass('hovered').siblings('.dashboard-card').removeClass('hovered');
    });
    $('.dashboard-card').on('mouseleave focusout', function () {
        $(this).removeClass('hovered');
    });
    // When the config card or its button is clicked, go to configuration.html
    $('#config-card').on('click', function () {
        window.location.href = 'configuration.html';
    });
    $('#data-card').on('click', function () {
        window.location.href = 'datalist.html';
    });


});