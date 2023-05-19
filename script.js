// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  const saveBtn = $(".saveBtn");
  saveBtn.on("click", function (event) {
    const currentSaveBtn = $(event.target);
    const parent = currentSaveBtn.parent(".time-block");

    const parentId = parent.attr("id");
    const sibling = currentSaveBtn.siblings(".description");

    const textBox = sibling.val();
    localStorage.setItem(parentId, textBox);
  });

  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  const timeBlocks = $(".time-block");
  // for (let i = 0; i < timeBlocks.length; i++){
  //   const timeBlock = timeBlocks[i]
  // }

  timeBlocks.each(function (i, timeBlock) {
    // timeBlock.classList.add('timeBlock')
    const blockTime = parseInt($(timeBlock).attr("id").split("-")[1]);
    const currentTime = parseInt(dayjs().format("H"));
    console.log(blockTime, currentTime);
    if (blockTime < currentTime) {
      $(timeBlock).addClass("past");
    } else if (blockTime > currentTime) {
      $(timeBlock).addClass("future");
    }  else {
      $(timeBlock).addClass("present");
    }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  const timeIds = ['hour-9', 'hour-10', 'hour-11', 'hour-12', 'hour-13', 'hour-14', 'hour-15', 'hour-16', 'hour-17']
  timeIds.forEach(function(time) {
   const getLocal = localStorage.getItem(time);
   $(`#${time}`).children('.description').val(getLocal)
  })

  //
  // TODO: Add code to display the current date in the header of the page.
  const currentDay = $("#currentDay");
  currentDay.text(dayjs().format("MM/DD/YYYY"));
});
