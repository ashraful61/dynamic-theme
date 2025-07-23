$(document).ready(function () {
    function initCalendar({
      monthYearId,
      calendarGridId,
      prevBtnId,
      nextBtnId,
      selectedValueId,
    }) {
      const $monthYear = $(`#${monthYearId}`);
      const $calendarGrid = $(`#${calendarGridId}`);
      const $prev = $(`#${prevBtnId}`);
      const $next = $(`#${nextBtnId}`);
      const $selectedValue = $(`#${selectedValueId}`);
  
      let selectedDate = new Date(); // Default to today
      let currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth());
  
      function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
  
        // Set header
        $monthYear.text(
          date.toLocaleString("default", { month: "short", year: "numeric" })
        );
  
        // Clear grid
        $calendarGrid.empty();
  
        // Add blank days
        for (let i = 0; i < firstDay; i++) {
          $("<div></div>").appendTo($calendarGrid);
        }
  
        // Add actual days
        for (let day = 1; day <= daysInMonth; day++) {
          const $dayDiv = $("<div></div>").text(day);
  
          if (
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === month &&
            selectedDate.getFullYear() === year
          ) {
            $dayDiv.addClass("selected");
          }
  
          $dayDiv.on("click", function () {
            selectedDate = new Date(year, month, day);
            $selectedValue.text(
              selectedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })
            );
            renderCalendar(currentDate);
          });
  
          $calendarGrid.append($dayDiv);
        }
  
        // Show selected value
        $selectedValue.text(
          selectedDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })
        );
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
    }
  
    // 🔁 Initialize multiple calendars
    initCalendar({
      monthYearId: "monthYear",
      calendarGridId: "calendarGrid",
      prevBtnId: "prev",
      nextBtnId: "next",
      selectedValueId: "selectedValue",
    });
  
    initCalendar({
      monthYearId: "monthYearfromDate",
      calendarGridId: "calendarGridfromDate",
      prevBtnId: "prevfromDate",
      nextBtnId: "nextfromDate",
      selectedValueId: "selectedValuefromDate",
    });
  
    initCalendar({
      monthYearId: "monthYeartoDate",
      calendarGridId: "calendarGridtoDate",
      prevBtnId: "prevtoDate",
      nextBtnId: "nexttoDate",
      selectedValueId: "selectedValuetoDate",
    });


    initCalendar({
      monthYearId: "monthYearmodalToDate",
      calendarGridId: "calendarGridmodalToDate",
      prevBtnId: "prevmodalToDate",
      nextBtnId: "nextmodalToDate",
      selectedValueId: "selectedValuemodalToDate",
    });
    

  });
  