
// Declare global variables
var isMessageClearing = false;
var clearingMessageCode = 0;

// Moment.js for date and time in the header
$("#currentDay").text(moment().format('LLLL'));

// Main function to track time for different time-block colors
function timeTracker() {

  //Get current hour of the day
  var currentTime = moment().hour();

  // This loop will first iterate over the time blocks then will compare the time blocks with the current time,
  // Gives user a colored time-block for past, present and futrure plan of the day to better clarify their schedules
  $(".time-block").each(function () {
    var blockTime = parseInt($(this).attr("id").split("hour")[1]);

    if (blockTime < currentTime) {
      $(this).addClass("past");
    } else if (blockTime === currentTime) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  })

}

// Add a click event to save user input and set them to local storage
$(".saveBtn").on("click", function () {

  var time = $(this).parent().attr("id");
  var text = $(this).siblings(".description").val();

  localStorage.setItem(time, text);

  // Add a temporary message called "Added to local storage" on top of HTML each time user adds a plan
  if (!isMessageClearing) {
    var container = $(".container");
    container.prepend("<p>Appointment added to localStorage ✅</p>");
    container.children().eq(0).css({ "color": "darkred", "text-align": "center", "font-weight": "bold" });
    clearNotify();
  }
})

// Clear the prepended HTML message "Added to local storage" after 3 seconds
function clearNotify() {
  var container = $(".container");
  isMessageClearing = true;
  clearingMessageCode = setTimeout(function () {
    container.children().eq(0).remove();
    isMessageClearing = false;
  }, 3000);
}

// Retrieve items from local storage and set them into the proper time blocks
for (var i = 9; i <= 17; i++) {
  $('#hour' + i + ' .description').val(localStorage.getItem('hour' + i));
}

// Call the timeTracker function
timeTracker();

// Reload page every hour so that the time block function is called continuously throughout the day
setInterval(function () {
  window.location.reload();
}, 3600000);

