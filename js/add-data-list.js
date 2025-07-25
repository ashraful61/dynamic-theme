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

    $(document).on('click', '.toggle-calendar-icon', function (e) {
        e.stopPropagation();
        const popup = $(`#joinedDate`);
        const isVisible = popup.is(':visible');
        // Hide all popups first
        $('.joined-date').hide();
        // Toggle this one
        if (!isVisible) {
            popup.show();
        }
    });

    $(document).on('click', '.joined-date', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.cancel-btnc', function (e) {
        e.stopPropagation();
        $('.joined-date').hide();
    });
    $(document).on('click', '.apply-btn', function (e) {
        e.stopPropagation();
        $('.joined-date').hide();
    });


    $(document).on('click', '.toggle-calendar-icon-fromDate', function (e) {
        e.stopPropagation();
        const popup = $(`#fromDate`);
        const isVisible = popup.is(':visible');
        // Hide all popups first
        $('.from-date').hide();
        // Toggle this one
        if (!isVisible) {
            popup.show();
        }
    });

    $(document).on('click', '.from-date', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.cancel-btn-fromDate', function (e) {
        e.stopPropagation();
        $('.from-date').hide();
    });
    $(document).on('click', '.apply-btn-fromDate', function (e) {
        e.stopPropagation();
        $('.from-date').hide();
    });

    $(document).on('click', '.toggle-calendar-icon-toDate', function (e) {
        e.stopPropagation();
        const popup = $(`#toDate`);
        const isVisible = popup.is(':visible');
        // Hide all popups first
        $('.to-date').hide();
        // Toggle this one
        if (!isVisible) {
            popup.show();
        }
    });
    $(document).on('click', '.to-date', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.cancel-btn-toDate', function (e) {
        e.stopPropagation();
        $('.to-date').hide();
    });
    $(document).on('click', '.apply-btn-toDate', function (e) {
        e.stopPropagation();
        $('.to-date').hide();
    });


    $(document).on('click', '.toggle-calendar-icon-modalToDate', function (e) {
        e.stopPropagation();
        const popup = $('#modalToDate');
        const isVisible = popup.is(':visible');
        $('.modal-to-date').hide(); // Hide other calendar popups
        if (!isVisible) {
            popup.show();
        }
    });
    
    $(document).on('click', '#modalToDate', function (e) {
        e.stopPropagation();
    });
    
    $(document).on('click', '.cancel-btn-modalToDate', function (e) {
        e.stopPropagation();
        $('#modalToDate').hide();
    });
    
    $(document).on('click', '.apply-btn-modalToDate', function (e) {
        e.stopPropagation();
        $('#modalToDate').hide();
    });
    



 
    



});