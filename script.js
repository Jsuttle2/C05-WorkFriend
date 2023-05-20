
$(function () {
  // Display the current day at the top of the calendar
  var currentDay = dayjs().format("dddd, MMMM D, YYYY");
  $("#currentDay").text(currentDay);

  // Load any saved events from local storage
  loadEvents();

  // Apply color-coding to the time blocks
  updateTimeBlocks();

  // Save button click event
  $(".saveBtn").on("click", function () {
    var timeBlockId = $(this).closest(".time-block").attr("id");
    var eventText = $(this).siblings(".description").val().trim();
    saveEvent(timeBlockId, eventText);
  });

  function loadEvents() {
    // Load events from local storage
    // For each time block, retrieve the corresponding event from local storage and set the value of the textarea
    $(".time-block").each(function () {
      var timeBlockId = $(this).attr("id");
      var eventText = localStorage.getItem(timeBlockId);
      $(this).find(".description").val(eventText);
    });
  }

  function saveEvent(timeBlockId, eventText) {
    // Save the event to local storage using the time block id as the key
    localStorage.setItem(timeBlockId, eventText);
  }

  function updateTimeBlocks() {
    // Get the current hour
    var currentHour = dayjs().format("H");

    // Iterate over each time block and apply the appropriate color class
    $(".time-block").each(function () {
      var timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      if (timeBlockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (timeBlockHour > currentHour) {
        $(this).removeClass("past present").addClass("future");
      } else {
        $(this).removeClass("past future").addClass("present");
      }
    });
  }
});