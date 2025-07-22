$(document).ready(function () {
    const $monthYear = $("#monthYear");
    const $calendarGrid = $("#calendarGrid");
    const $prev = $("#prev");
    const $next = $("#next");

    let selectedDate = null;
    let currentDate = new Date(2025, 3); // April

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Set header
        $monthYear.text(
            date.toLocaleString("default", {
                month: "short",
                year: "numeric",
            })
        );

        // Get first day of the month
        const firstDay = new Date(year, month, 1).getDay();

        // Get total days in the month
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        // Clear calendar
        $calendarGrid.empty();

        // Add blank days before first day
        for (let i = 0; i < firstDay; i++) {
            $("<div></div>").appendTo($calendarGrid);
        }

        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
            const $dayDiv = $("<div></div>").text(day);

            if (
                selectedDate &&
                selectedDate.getDate() === day &&
                selectedDate.getMonth() === month &&
                selectedDate.getFullYear() === year
            ) {
                $dayDiv.addClass("selected");
            }

            $dayDiv.on("click", function () {
                selectedDate = new Date(year, month, day);
                renderCalendar(currentDate); // Re-render to reflect selection
            });

            $calendarGrid.append($dayDiv);
        }
    }

    $prev.on("click", function (e) {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    $next.on("click", function (e) {
        e.stopPropagation();
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    renderCalendar(currentDate);
});
