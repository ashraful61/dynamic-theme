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
    function renderNestedTable() {
        const tbody = document.getElementById('nested-table-body');
        tbody.innerHTML = '';
        nestedTableData.forEach((row, idx) => {
            const tr = document.createElement('tr');
            if (idx % 2 === 1) tr.style.background = '#f9fbfd';
            tr.innerHTML = `
            <td style='padding:16px 12px;'>${row.name}</td>
            <td style='padding:16px 12px;'>${row.role}</td>
            <td style='padding:16px 12px;'><span style='display:flex;align-items:center;gap:4px;'>&#128197; ${row.start}</span></td>
            <td style='padding:16px 12px;'><span style='display:flex;align-items:center;gap:4px;'>&#128197; ${row.end}</span></td>
            <td style='padding:16px 12px;'>${statusMap[row.status] || ''}</td>
            <td style='padding:16px 12px;'><span style='color:#64748b;cursor:pointer;font-size:18px;margin-right:10px;'>&#9998;</span><span style='color:#dc2626;cursor:pointer;font-size:18px;'>&#128465;</span></td>
        `;
            tbody.appendChild(tr);
        });
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
    
    document.getElementById('close-project-modal').onclick = function () {
        modalOverlay.style.display = 'none';
    };
    document.getElementById('cancel-project-btn').onclick = function (e) {
        e.preventDefault();
        modalOverlay.style.display = 'none';
    };
    // Optional: prevent modal close on click inside
    document.getElementById('project-modal').onclick = function (e) {
        e.stopPropagation();
    };
    modalOverlay.onclick = function () {
        modalOverlay.style.display = 'none';
    };

    // Skills tag toggle logic
    $(document).on('click', '.skill-tag', function() {
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
});