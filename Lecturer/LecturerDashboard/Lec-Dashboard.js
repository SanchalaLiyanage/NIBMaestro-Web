document.addEventListener('DOMContentLoaded', function(){
	notification();
});

const sideMenu = document.querySelector("#aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");
const themeToggler = document.querySelector(".theme-toggler");

//  Show Sidebar
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});


//  Hide Sidebar
closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

//change theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');

    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});





// Define an array to store events
let events = [];

// letiables to store event input fields and reminder list
let eventDateInput =
	document.getElementById("eventDate");
let eventTitleInput =
	document.getElementById("eventTitle");
let eventDescriptionInput =
	document.getElementById("eventDescription");
let reminderList =
	document.getElementById("reminderList");

// Counter to generate unique event IDs
let eventIdCounter = 1;

// Function to add events
function addEvent() {
	let date = eventDateInput.value;
	let title = eventTitleInput.value;
	let description = eventDescriptionInput.value;

	if (date && title) {
		// Create a unique event ID
		let eventId = eventIdCounter++;

		events.push(
			{
				id: eventId, date: date,
				title: title,
				description: description
			}
		);
		showCalendar(currentMonth, currentYear);
		eventDateInput.value = "";
		eventTitleInput.value = "";
		eventDescriptionInput.value = "";
		displayReminders();
	}
}

// Function to delete an event by ID
function deleteEvent(eventId) {
	// Find the index of the event with the given ID
	let eventIndex =
		events.findIndex((event) =>
			event.id === eventId);

	if (eventIndex !== -1) {
		// Remove the event from the events array
		events.splice(eventIndex, 1);
		showCalendar(currentMonth, currentYear);
		displayReminders();
	}
}

// Function to display reminders
function displayReminders() {
	// reminderList.innerHTML = "";
	for (let i = 0; i < events.length; i++) {
		let event = events[i];
		let eventDate = new Date(event.date);
		if (eventDate.getMonth() ===
			currentMonth &&
			eventDate.getFullYear() ===
			currentYear) {
			let listItem = document.createElement("li");
			listItem.innerHTML =
				`<strong>${event.title}</strong> - 
			${event.description} on 
			${eventDate.toLocaleDateString()}`;

			// Add a delete button for each reminder item
			let deleteButton =
				document.createElement("button");
			deleteButton.className = "delete-event";
			deleteButton.textContent = "Delete";
			deleteButton.onclick = function () {
				deleteEvent(event.id);
			};

			listItem.appendChild(deleteButton);
			reminderList.appendChild(listItem);
		}
	}
}

// Function to generate a range of 
// years for the year select input
function generate_year_range(start, end) {
	let years = "";
	for (let year = start; year <= end; year++) {
		years += "<option value='" +
			year + "'>" + year + "</option>";
	}
	return years;
}

// Initialize date-related letiables
today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();
selectYear = document.getElementById("year");
selectMonth = document.getElementById("month");

createYear = generate_year_range(1970, 2050);

document.getElementById("year").innerHTML = createYear;

let calendar = document.getElementById("calendar");

let months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December"
];
let days = [
	"Sun", "Mon", "Tue", "Wed",
	"Thu", "Fri", "Sat"];

$dataHead = "<tr>";
for (dhead in days) {
	$dataHead += "<th data-days='" +
		days[dhead] + "'>" +
		days[dhead] + "</th>";
}
$dataHead += "</tr>";

document.getElementById("thead-month").innerHTML = $dataHead;

monthAndYear =
	document.getElementById("monthAndYear");
showCalendar(currentMonth, currentYear);

// Function to navigate to the next month
function next() {
	currentYear = currentMonth === 11 ?
		currentYear + 1 : currentYear;
	currentMonth = (currentMonth + 1) % 12;
	showCalendar(currentMonth, currentYear);
}

// Function to navigate to the previous month
function previous() {
	currentYear = currentMonth === 0 ?
		currentYear - 1 : currentYear;
	currentMonth = currentMonth === 0 ?
		11 : currentMonth - 1;
	showCalendar(currentMonth, currentYear);
}

// Function to jump to a specific month and year
function jump() {
	currentYear = parseInt(selectYear.value);
	currentMonth = parseInt(selectMonth.value);
	showCalendar(currentMonth, currentYear);
}

// Function to display the calendar
function showCalendar(month, year) {
	let firstDay = new Date(year, month, 1).getDay();
	tbl = document.getElementById("calendar-body");
	tbl.innerHTML = "";
	monthAndYear.innerHTML = months[month] + " " + year;
	selectYear.value = year;
	selectMonth.value = month;

	let date = 1;
	for (let i = 0; i < 6; i++) {
		let row = document.createElement("tr");
		for (let j = 0; j < 7; j++) {
			if (i === 0 && j < firstDay) {
				cell = document.createElement("td");
				cellText = document.createTextNode("");
				cell.appendChild(cellText);
				row.appendChild(cell);
			} else if (date > daysInMonth(month, year)) {
				break;
			} else {
				cell = document.createElement("td");
				cell.setAttribute("data-date", date);
				cell.setAttribute("data-month", month + 1);
				cell.setAttribute("data-year", year);
				cell.setAttribute("data-month_name", months[month]);
				cell.className = "date-picker";
				cell.innerHTML = "<span>" + date + "</span";

				if (
					date === today.getDate() &&
					year === today.getFullYear() &&
					month === today.getMonth()
				) {
					cell.className = "date-picker selected";
				}

				// Check if there are events on this date
				if (hasEventOnDate(date, month, year)) {
					cell.classList.add("event-marker");
					cell.appendChild(
						createEventTooltip(date, month, year)
				);
				}

				row.appendChild(cell);
				date++;
			}
		}
		tbl.appendChild(row);
	}

	displayReminders();
}

// Function to create an event tooltip
function createEventTooltip(date, month, year) {
	let tooltip = document.createElement("div");
	tooltip.className = "event-tooltip";
	let eventsOnDate = getEventsOnDate(date, month, year);
	for (let i = 0; i < eventsOnDate.length; i++) {
		let event = eventsOnDate[i];
		let eventDate = new Date(event.date);
		let eventText = `<strong>${event.title}</strong> - 
			${event.description} on 
			${eventDate.toLocaleDateString()}`;
		let eventElement = document.createElement("p");
		eventElement.innerHTML = eventText;
		tooltip.appendChild(eventElement);
	}
	return tooltip;
}

// Function to get events on a specific date
function getEventsOnDate(date, month, year) {
	return events.filter(function (event) {
		let eventDate = new Date(event.date);
		return (
			eventDate.getDate() === date &&
			eventDate.getMonth() === month &&
			eventDate.getFullYear() === year
		);
	});
}

// Function to check if there are events on a specific date
function hasEventOnDate(date, month, year) {
	return getEventsOnDate(date, month, year).length > 0;
}

// Function to get the number of days in a month
function daysInMonth(iMonth, iYear) {
	return 32 - new Date(iYear, iMonth, 32).getDate();
}

// Call the showCalendar function initially to display the calendar
showCalendar(currentMonth, currentYear);


function notification()
{
	console.log("Notification");
	$.ajax({
        url: 'lecdash.php',
        method: 'POST',
        data: {
            functionName: 'loadDescription'
        },
        dataType: 'json',
        success: function(response){
            console.log("success");
            // console.log( response.textdata);
            console.log(response);
           if(response.status == "success"){
            
             
			 if(response.notif==1){
			 var i=0;
			 response.data.forEach(item1 => {
			 var des=item1.Description;
			 var course=item1.Course;
			 var batch=item1.Batch;
			 var rid=item1.R_ID;
			 
			 console.log(i);
			 console.log(des);
			 console.log(course);
			 console.log(batch);

				createnotification(des,course,batch,i,rid);
				i++;
			 });
			//  notification(response.data);

			}
           
        }
        else{
            
            console.log("error");
            console.error(error);
        }
        
            
        },
        error: function(error){
            console.error(error);
        }
    });
}

function createnotification(des,course,batch,i,rid){
	console.log("create notification");

	
// Create Course and Batch table
var courseTable = document.createElement('table');
var courseRow = document.createElement('tr');

var courseHeaderCell = document.createElement('td');
courseHeaderCell.classList.add('m1', 'c1');
courseHeaderCell.innerHTML = '<h2>Course :</h2>';
courseRow.appendChild(courseHeaderCell);

var courseDataCell = document.createElement('td');
courseDataCell.classList.add('c2');
courseDataCell.innerHTML = '<h3 class="course"></h3>';
courseRow.appendChild(courseDataCell);

var batchHeaderCell = document.createElement('td');
batchHeaderCell.classList.add('m1', 'c1');
batchHeaderCell.innerHTML = '<h2>Batch :</h2>';
courseRow.appendChild(batchHeaderCell);

var batchDataCell = document.createElement('td');
batchDataCell.classList.add('c2');
batchDataCell.innerHTML = '<h3 class="batch"></h3>';
courseRow.appendChild(batchDataCell);

courseTable.appendChild(courseRow);

// Create Title table
var titleTable = document.createElement('table');
var titleRow = document.createElement('tr');

var titleHeaderCell = document.createElement('td');
titleHeaderCell.classList.add('m1');
titleHeaderCell.innerHTML = '<h2>Title :</h2>';
titleRow.appendChild(titleHeaderCell);

var titleDataCell = document.createElement('td');
titleDataCell.classList.add('cd1');
titleDataCell.innerHTML = '<h3 class="title"></h3>';
titleRow.appendChild(titleDataCell);

titleTable.appendChild(titleRow);

var moddiv=document.createElement('div');
moddiv.classList.add('moddiv');
moddiv.id='moddiv'+i;
var maindiv=document.getElementsByClassName('teamupdate');
// console.log(maindiv);
// console.log(des,course,batch);
moddiv.appendChild(courseTable);
moddiv.appendChild(titleTable);
maindiv[0].appendChild(moddiv);
// moddiv.style.backgroundColor = 'red';

document.getElementsByClassName('title')[i].textContent = des;
                document.getElementsByClassName('course')[i].textContent =course;
                document.getElementsByClassName('batch')[i].textContent = batch;
moddiv.addEventListener('click', function(){
	console.log("click");
	$.ajax({
		url: 'lecdash.php',
		method: 'POST',
		data: {
			functionName: 'session',
			rid:rid
		},
		dataType: 'json',
		success: function(response){
			console.log("success");
			console.log(response);
			if(response.status == "success"){
				
				console.log("success");
				window.location.href = "../LecturerReply/lecreply.html";
			}
			else{
				console.log("error");
				console.error(error);
			}
		},
		error: function(error){
			console.error(error);
		}

	});

});

// Append the container to the document body




}
