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
let currMonthDate = getCurrMonthDate();
let nextMonthStart = getNextMonth();

window.onload = function() {
    displayCalendar(currMonth, currYear);
    $("#next").bind("click", toNextMonth);
    $("#previous").bind("click", toPrevMonth);
};

// function setPrevMonth() {
//     return new Date(currYear, currMonth - 1);
// }

function getNextMonth(){
    return new Date(currYear, currMonth + 1);
}

function getCurrMonthDate() {
    return new Date(currYear, currMonth);
}

let toNextMonth = function(){
    changeCurrMonth(1);
    currMonthDate = getCurrMonthDate();
    nextMonthStart = getNextMonth();
    // setPrevMonth();
    displayCalendar(currMonth, currYear);
};

function changeCurrMonth(monthsFromCurr) {
    currMonthDate = new Date(currYear, currMonth + monthsFromCurr);
    currMonth = currMonthDate.getMonth();
    currYear = currMonthDate.getFullYear();
    console.log("new curr month: " + currMonth + " " + currYear);
}

let toPrevMonth = function(){
    changeCurrMonth(-1);
    currMonthDate = getCurrMonthDate();
    nextMonthStart = getNextMonth();
    // setPrevMonth();
    displayCalendar(currMonth, currYear);
};

function displayCalendar(selectedMonth, selectedYear){
    let nextMonthYear = nextMonthStart.getFullYear();
    let nextMonth = nextMonthStart.getMonth();
    console.log("next month and year display: " + currMonth + " " + currYear);

    let selectMonthMaxDays = new Date(nextMonthYear, nextMonth, 0).getDate();
    //console.log("max days: " + selectMonthMaxDays);
    let selectMonthFirstDay = currMonthDate.getDay();
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
    //console.log("formatted: " + formattedCurrDate);
    let splitDateString = formattedCurrDate.split(" ");
    //console.log("formatted date: " + splitDateString[0] + " " + splitDateString[1] );
    $("#month-year").text(splitDateString[0] + " " + splitDateString[1]);
}

function appendPreviousMonthDay(currRow, selectedMonth, selectedYear, currMonthFirstDay, currWeekDay) {
    let prevMonthMaxDays = new Date(selectedYear, selectedMonth, 0).getDate();
    //console.log("prev max: " + prevMonthMaxDays);
    let numDaysFromPrevMax = currMonthFirstDay - currWeekDay - 1;
    let cellDate = prevMonthMaxDays - numDaysFromPrevMax;
    let cellNode = document.createElement("td");
    cellNode.className = "not-this-month";
    let cellText = document.createTextNode(cellDate);
    cellNode.appendChild(cellText);
    currRow.appendChild(cellNode);
}

function appendNextMonthDay(currRow, numDaysCount, currMonthMaxDays) {
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
    // console.log("formatted date: " + formattedDate)
    return currMonthDate.toLocaleDateString("en-US", options);
}