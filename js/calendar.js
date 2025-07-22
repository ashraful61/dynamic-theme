$(document).ready(function () {
    const monthYear = document.getElementById("monthYear");
    const calendarGrid = document.getElementById("calendarGrid");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");

    let selectedDate = null;
    let currentDate = new Date(2025, 3); // April is month index 3

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Set header
        monthYear.textContent = date.toLocaleString("default", {
            month: "short",
            year: "numeric",
        });

        // Get first day of the month
        const firstDay = new Date(year, month, 1).getDay();

        // Get total days in month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Clear grid
        calendarGrid.innerHTML = "";

        // Add blanks before start
        for (let i = 0; i < firstDay; i++) {
            const blank = document.createElement("div");
            calendarGrid.appendChild(blank);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;

            if (
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
            ) {
                dayDiv.classList.add("selected");
            }

            dayDiv.addEventListener("click", () => {
                selectedDate = new Date(year, month, day);
                renderCalendar(currentDate); // re-render to update selection
            });

            calendarGrid.appendChild(dayDiv);
        }
    }

    prev.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    next.addEventListener("click", () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);

    const toggleButton = document.querySelector(".open-calendar-modal");
    const calendarMain = document.querySelector(".calendar-main");
    const cancelBtn = document.querySelector(".cancel-btn");
    const applyBtn = document.querySelector(".apply-btn");

    // Hide calendar initially
    calendarMain.style.display = "none";

    // Show calendar on image click
    toggleButton.addEventListener("click", () => {
        calendarMain.style.display = "block";
    });

    // Hide calendar on Cancel or Apply
    cancelBtn.addEventListener("click", () => {
        calendarMain.style.display = "none";
    });

    applyBtn.addEventListener("click", () => {
        calendarMain.style.display = "none";
    });
});
