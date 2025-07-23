$(document).ready(function () {
    // Tab switching logic
    document.getElementById('form-tab').onclick = function () {
        this.classList.remove('inactive');
        document.getElementById('nested-tab').classList.add('inactive');
        document.getElementById('main-form').style.display = '';
        document.getElementById('nested-table-section').style.display = 'none';
    };
    document.getElementById('nested-tab').onclick = function () {
        this.classList.remove('inactive');
        document.getElementById('form-tab').classList.add('inactive');
        document.getElementById('main-form').style.display = 'none';
        document.getElementById('nested-table-section').style.display = 'block';
    };
    // Sample data for nested table
    const nestedTableData = [
        { name: 'DRM UI/UX Design', role: 'UI/UX Designer', start: '19 Aug 24', end: '01 Jan 25', status: 'Completed' },
        { name: 'Web Development', role: 'Front-end Developer', start: '19 Aug 24', end: 'N/A', status: 'In Progress' },
        { name: 'DRM Mobile App Development', role: 'Backend Developer', start: '19 Aug 24', end: '01 Jan 25', status: 'Completed' },
        { name: 'DSI Web Application', role: 'UI Designer', start: '19 Aug 24', end: 'N/A', status: 'In Progress' },
        { name: 'Mobile Game', role: 'Graphic Designer', start: '18 Aug 24', end: '01 Jan 25', status: 'Completed' }
    ];
    const statusMap = {
        'Completed': '<span style="color:#16a34a;font-weight:500;"><span style="display:inline-block;width:8px;height:8px;background:#16a34a;border-radius:50%;margin-right:6px;"></span>Completed</span>',
        'In Progress': '<span style="color:#2563eb;font-weight:500;"><span style="display:inline-block;width:8px;height:8px;background:#2563eb;border-radius:50%;margin-right:6px;"></span>In Progress</span>'
    };
    // Sorting logic
    let currentSort = { key: null, direction: 'ascending' };
    function sortTableData(key) {
        if (currentSort.key === key) {
            currentSort.direction = currentSort.direction === 'ascending' ? 'descending' : 'ascending';
        } else {
            currentSort.key = key;
            currentSort.direction = 'ascending';
        }
        nestedTableData.sort((a, b) => {
            let valA = a[key] || '';
            let valB = b[key] || '';
            if (key === 'start' || key === 'end') {
                // Try to parse as date, fallback to string
                let dateA = Date.parse(valA);
                let dateB = Date.parse(valB);
                if (!isNaN(dateA) && !isNaN(dateB)) {
                    valA = dateA;
                    valB = dateB;
                }
            }
            if (valA < valB) return currentSort.direction === 'ascending' ? -1 : 1;
            if (valA > valB) return currentSort.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }
    function updateSortIcons() {
        document.querySelectorAll('.sortable').forEach(th => {
            th.setAttribute('aria-sort', 'none');
        });
        if (currentSort.key) {
            const th = document.querySelector('.sortable[data-sort="' + currentSort.key + '"]');
            if (th) th.setAttribute('aria-sort', currentSort.direction);
        }
    }
    document.querySelectorAll('.sortable').forEach(th => {
        th.addEventListener('click', function () {
            const key = this.getAttribute('data-sort');
            sortTableData(key);
            renderNestedTable();
            updateSortIcons();
        });
        th.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    // Update renderNestedTable to call updateSortIcons after rendering
    function renderNestedTable() {
        const tbody = document.getElementById('nested-table-body');
        tbody.innerHTML = '';
        nestedTableData.forEach((row, idx) => {
            const tr = document.createElement('tr');
            if (idx % 2 === 1) tr.style.background = '#f9fbfd';
            tr.innerHTML = `
            <td style='padding:16px 12px;'>${row.name}</td>
            <td style='padding:16px 12px;'>${row.role}</td>
            <td style='padding:16px 12px;'><span style='display:flex;align-items:center;gap:4px;'><img src='img/add-data-list/CalendarBlank.png' /> ${row.start}</span></td>
            <td style='padding:16px 12px;'><span style='display:flex;align-items:center;gap:4px;'><img src='img/add-data-list/CalendarBlank.png' /> ${row.end}</span></td>
            <td style='padding:16px 12px; display:flex;justify-content:space-between'>
            ${statusMap[row.status] || ''}
            <span>
              <img src='img/add-data-list/rename.png' /> &nbsp;
                <img src='img/add-data-list/delete.png' /> 
            </span>
            </td>
     

        `;
            tbody.appendChild(tr);
        });
        updateSortIcons();
    }
    renderNestedTable();

    // Modal logic
    const modalOverlay = document.getElementById('project-modal-overlay');
    document.getElementById('create-project-btn').onclick = function () {
        modalOverlay.style.display = 'flex';
    };

    // Close modal when clicking the X icon
    document.querySelector('.cancel-icon-modal').onclick = function () {
        modalOverlay.style.display = 'none';
    };

    var closeBtn = document.getElementById('close-project-modal');
    if (closeBtn) {
        closeBtn.onclick = function () {
            modalOverlay.style.display = 'none';
        };
    }
    document.getElementById('cancel-project-btn').onclick = function (e) {
        e.preventDefault();
        modalOverlay.style.display = 'none';
    };
    // Optional: prevent modal close on click inside
    // document.getElementById('project-modal').onclick = function (e) {
    //     e.stopPropagation();
    // };
    // modalOverlay.onclick = function () {
    //     modalOverlay.style.display = 'none';
    // };

    // Skills tag toggle logic
    $(document).on('click', '.skill-tag', function () {
        var $btn = $(this);
        if ($btn.hasClass('selected')) {
            $btn.removeClass('selected');
            $btn.find('.checkmark').remove();
            if ($btn.find('.plus').length === 0) {
                $btn.append('<span class="plus">+</span>');
            }
        } else {
            $btn.addClass('selected');
            $btn.find('.plus').remove();
            if ($btn.find('.checkmark').length === 0) {
                $btn.append('<span class="checkmark">&#10003;</span>');
            }
        }
    });


    function initCalendarPopup({
        toggleSelector,
        popupSelector,
        containerSelector,
        applyBtnSelector,
        cancelBtnSelector
    }) {
        // Toggle calendar
        $(document).on('click', toggleSelector, function (e) {
            e.stopPropagation();
            const popup = $(popupSelector);
            const isVisible = popup.is(':visible');

            // Hide all other calendars of the same type
            $(containerSelector).hide();

            // Show only this one if not visible
            if (!isVisible) {
                popup.show();
            }
        });

        // Prevent calendar from closing when clicking inside
        $(document).on('click', popupSelector, function (e) {
            e.stopPropagation();
        });

        // Apply button hides calendar
        $(document).on('click', applyBtnSelector, function (e) {
            e.stopPropagation();
            $(containerSelector).hide();
        });

        // Cancel button hides calendar
        $(document).on('click', cancelBtnSelector, function (e) {
            e.stopPropagation();
            $(containerSelector).hide();
        });
    }




    initCalendarPopup({
        toggleSelector: '.toggle-calendar-icon',
        popupSelector: '#joinedDate',
        containerSelector: '.joined-date',
        applyBtnSelector: '.apply-btn',
        cancelBtnSelector: '.cancel-btnc'
    });

    initCalendarPopup({
        toggleSelector: '.toggle-calendar-icon-fromDate',
        popupSelector: '#fromDate',
        containerSelector: '.from-date',
        applyBtnSelector: '.apply-btn-fromDate',
        cancelBtnSelector: '.cancel-btn-fromDate'
    });

    initCalendarPopup({
        toggleSelector: '.toggle-calendar-icon-toDate',
        popupSelector: '#toDate',
        containerSelector: '.to-date',
        applyBtnSelector: '.apply-btn-toDate',
        cancelBtnSelector: '.cancel-btn-toDate'
    });

    initCalendarPopup({
        toggleSelector: '.toggle-calendar-icon-modalFromDate',
        popupSelector: '#modalFromDate',
        containerSelector: '.modal-from-date',
        applyBtnSelector: '.apply-btn-modalFromDate',
        cancelBtnSelector: '.cancel-btn-modalFromDate'
    });

    initCalendarPopup({
        toggleSelector: '.toggle-calendar-icon-modalToDate',
        popupSelector: '#modalToDate',
        containerSelector: '.modal-to-date',
        applyBtnSelector: '.apply-btn-modalToDate',
        cancelBtnSelector: '.cancel-btn-modalToDate'
    });

    $(document).on('click', function () {
        $('.joined-date, .from-date, .to-date, .modal-from-date, .modal-to-date').hide();
    });



});