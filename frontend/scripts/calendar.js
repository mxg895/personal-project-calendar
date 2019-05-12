/* When the user presses the "Add Event" button, the event will be added to the specific day(s) on the calendar*/

// Access the "Add Event" button & set up an onclick event handler for it
// var button = document.getElementById("addEvent");
//
// button.onclick = addEventToCalendar();
//
// function addEventToCalendar() {
//     return function (p1: MouseEvent) {
//     };
// }
let today = new Date();
let currMonth = today.getMonth();
let currYear = today.getFullYear();
let nextMonthStart = findNextMonth();

window.onload = function() {
    displayCalendar(currMonth, currYear);
};

function findNextMonth(){
    return new Date(currYear, currMonth + 1);
}

function findPrevMonth() {
    return new Date(currYear, currMonth - 1);
}
function displayCalendar(selectedMonth, selectedYear){
    let nextMonthYear = nextMonthStart.getFullYear();
    let nextMonth = nextMonthStart.getMonth();

    let selectMonthMaxDays = new Date(nextMonthYear, nextMonth, 0).getDate();
    let selectMonthFirstDay = new Date(selectedYear, selectedMonth).getDay();
    console.log("max days: " + selectMonthMaxDays);
    let calendarTable = document.getElementById("calendar-cells");
    calendarTable.innerHTML = "";
    let numDaysCount = 1;

    for (let row = 0; row <= 5; row++){
        let newRow = document.createElement("tr");
        for (let dayOfWeek = 0; dayOfWeek <= 6; dayOfWeek++){
            if (row === 0 && dayOfWeek < selectMonthFirstDay){
                appendPreviousMonthDay(newRow, selectedMonth, selectedYear, selectMonthFirstDay, dayOfWeek);
            } else if (numDaysCount > selectMonthMaxDays){
                appendNextMonthDay(newRow, numDaysCount, selectMonthMaxDays);
                numDaysCount++;
            } else{
                appendCurrMonthDay(newRow, numDaysCount);
                numDaysCount++;
            }
        }
        calendarTable.appendChild(newRow);
    }
    let formattedCurrDate = formatDate();
    let splitDateString = formattedCurrDate.split(" ");
    $("#month-year").text(splitDateString[0] + " " + splitDateString[1]);
}

function appendPreviousMonthDay(currRow, selectedMonth, selectedYear, currMonthFirstDay, currWeekDay) {
    let prevMonthMaxDays = new Date(selectedYear, selectedMonth, 0).getDate();
    let numDaysFromCurrMonth = currMonthFirstDay - currWeekDay;
    let cellDate = prevMonthMaxDays - numDaysFromCurrMonth;
    let cellNode = document.createElement("td");
    cellNode.className = "not-this-month";
    let cellText = document.createTextNode(cellDate);
    cellNode.appendChild(cellText);
    currRow.appendChild(cellNode);
}

function appendNextMonthDay(currRow, numDaysCount, currMonthMaxDays) {
    console.log("daysCount & maxDays: ");
    let cellDate = numDaysCount - currMonthMaxDays;
    let cellNode = document.createElement("td");
    cellNode.className = "not-this-month";
    let cellText = document.createTextNode(cellDate);
    cellNode.appendChild(cellText);
    currRow.appendChild(cellNode);
}

function appendCurrMonthDay(currRow, currDate) {
    let cellNode = document.createElement("td");
    cellNode.className = "this-Month";
    let cellText = document.createTextNode(currDate);
    cellNode.appendChild(cellText);
    currRow.appendChild(cellNode);
}

function formatDate() {
    let options = {
        year: "numeric",
        month: "long"
    };
    return today.toLocaleDateString("en-US", options);
}