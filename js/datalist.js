// Table data array
const tableData = [
    {
        id: '#CM9801',
        avatar: 'avatar1.png',
        name: 'Ava Wright',
        email: 'ava@dependablesolutions.com',
        address: 'Meadow Lane Oakland, New York',
        date: 'Today, 19:40',
        status: 'in-progress',
        statusText: 'In Progress',
        selected: false,
    },
    {
        id: '#CM9802',
        avatar: 'avatar2.png',
        name: 'Koray Okumus',
        email: 'koray@dependablesolutions.com',
        address: 'Bagwell Avenue Ocala',
        date: 'Yesterday',
        status: 'completed',
        statusText: 'Completed',
        selected: false,
    },
    {
        id: '#CM9803',
        avatar: 'avatar3.png',
        name: 'Lana Steiner',
        email: 'lana@dependablesolutions.com',
        address: 'Washburn Baton Rouge',
        date: '19 Aug 24',
        status: 'pending',
        statusText: 'Pending',
        selected: true,
    },
    {
        id: '#CM9804',
        avatar: 'avatar4.png',
        name: 'Orlando Diggs',
        email: 'orlando@dependablesolutions.com',
        address: 'Larry San Francisco',
        date: '15 Aug 24',
        status: 'rejected',
        statusText: 'Rejected',
        selected: false,
    },
    {
        id: '#CM9804',
        avatar: 'avatar5.png',
        name: 'Natali Craig',
        email: 'craig@dependablesolutions.com',
        address: 'Nest Lane Olivetta',
        date: '18 Aug 23',
        status: 'completed',
        statusText: 'Completed',
        selected: false,
    }
];

// Status class mapping
const statusClassMap = {
    'in-progress': 'in-progress',
    'completed': 'completed',
    'pending': 'pending',
    'rejected': 'rejected'
};

// Render table rows
function renderTableRows() {
    const tbody = document.getElementById('data-table-body');
    tbody.innerHTML = '';
    tableData.forEach((row, idx) => {
        const tr = document.createElement('tr');
        if (row.selected) tr.classList.add('selected');
        tr.innerHTML = `
                <td><input type="checkbox"> &nbsp; ${row.id}</td>
                <td class="img-and-name"><img src="img/table-avatar.jpg" class="user-avatar"> ${row.name}</td>
                <td>${row.email}</td>
                <td>${row.address}</td>
                <td><span style="display:flex;align-items:center;gap:4px;"><img src='img/add-data-list/CalendarBlank.png' /> ${row.date}</span></td>
                <td><span class="status ${statusClassMap[row.status]}"><span class="status-dot ${statusClassMap[row.status]}"></span> ${row.statusText}</span></td>
                <td class="table-actions" style="position:relative;">
                    <img src="img/DownloadSimple.png" alt=""> &nbsp;
                    <img src="img/DotsThreeOutlineVertical2.png" alt="" class="dots-menu-btn" data-row="${idx}" style="cursor:pointer;">
                    <div class="popup-menu" id="popup-menu-${idx}" style="display:none; position:absolute; right:0; top:40px; min-width:140px; background:#fff; box-shadow:0 4px 24px rgba(0,0,0,0.10); border-radius:10px; z-index:10; padding:8px 0;">
                        <div class="popup-item" style="padding:10px 20px; display:flex; align-items:center; gap:10px; cursor:pointer; font-size:15px;"><span style='font-size:18px;'>&#128065;</span> View</div>
                        <div class="popup-item" style="padding:10px 20px; display:flex; align-items:center; gap:10px; cursor:pointer; font-size:15px;"><span style='font-size:18px;'>&#9998;</span> Edit</div>
                        <div class="popup-item" style="padding:10px 20px; display:flex; align-items:center; gap:10px; color:#dc2626; cursor:pointer; font-size:15px;"><span style='font-size:18px;'>&#128465;</span> Delete</div>
                    </div>
                </td>
            `;
        tbody.appendChild(tr);
    });
}

$(document).ready(function () {
    // Show search input and blue icon, hide search button
    $('.search-button').on('click', function (e) {
        e.preventDefault();
        $(this).hide();
        $('.search-input').addClass('active').show().focus();
        $('.focus-search').show();
    });
    // Hide search input and blue icon, show search button
    $('.focus-search').on('click', function (e) {
        e.preventDefault();
        $('.search-input').removeClass('active').hide();
        $(this).hide();
        $('.search-button').show();
    });
    renderTableRows(); // Render table rows on page load

    // Popup menu logic
    $(document).on('click', '.dots-menu-btn', function (e) {
        e.stopPropagation();
        const idx = $(this).data('row');
        const popup = $(`#popup-menu-${idx}`);
        const isVisible = popup.is(':visible');
        // Hide all popups first
        $('.popup-menu').hide();
        // Toggle this one
        if (!isVisible) {
            popup.show();
        }
    });
    // Hide popup when clicking outside
    $(document).on('click', function () {
        $('.popup-menu').hide();
    });
    // Prevent popup from closing when clicking inside
    $(document).on('click', '.popup-menu', function (e) {
        e.stopPropagation();
    });
});