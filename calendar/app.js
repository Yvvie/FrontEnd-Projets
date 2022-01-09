const title = document.getElementById("title");
const eventDate = document.getElementById("start");
const startTime = document.getElementById("start-time");
const endtTime = document.getElementById("end-time");
const eventType = document.getElementById("event-type");
const description = document.getElementById("description");

const addButton = document.querySelector(".task-add");
const eventList = document.querySelector(".event-list");
const eventItms = document.querySelector(".event-items");

let events = [];

//event listeners

document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  getEvents();
});
addButton.addEventListener("click", (e) => {
  saveLocalEvents(
    title.value,
    eventDate.value,
    startTime.value,
    endtTime.value,
    eventType.value,
    description.value
  );
});
eventItms.addEventListener("click", deleteTask);
document.getElementById("nextButton").addEventListener("click", () => {
  nav++;
  loadCalendar();
});
document.getElementById("backButton").addEventListener("click", () => {
  nav--;
  loadCalendar();
});

document.getElementById("addTask").addEventListener("click", openForm);
document.querySelector(".close").addEventListener("click", closeForm);

//functions

// CALENDAR SECTION

let nav = 0;
const calendar = document.getElementById("calendar");

const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function loadCalendar() {
  const dt = new Date();

  if (nav !== 0) {
    dt.setMonth(new Date().getMonth() + nav);
  }

  const day = dt.getDate() < 9 ? "0" + dt.getDate() : dt.getDate();
  const month2 = dt.getMonth() < 9 ? "0" + (dt.getMonth() + 1) : dt.getMonth();

  const month = dt.getMonth();
  const year = dt.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const lastMonthDays = weekdays.indexOf(dateString.split(", ")[0]);
  document.getElementById("monthDisplay").innerHTML = `${dt.toLocaleDateString(
    "en-GB",
    { month: "long" }
  )} ${year}`;

  calendar.innerHTML = "";

  let events;

  if (sessionStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(sessionStorage.getItem("events"));
  }

  // display calendar days

  for (let i = 1; i <= lastMonthDays + daysInMonth; i++) {
    const daySquere = document.createElement("div");
    daySquere.classList.add("day");
    daySquere.setAttribute("id", "sq-" + i);

    const dayEvent = document.createElement("span");
    dayEvent.classList.add("event");
    const n = i - lastMonthDays;
    const dayString = `${year}-${month2}-${n <= 9 ? "0" + n : n}`;

    if (i > lastMonthDays) {
      daySquere.innerText = i - lastMonthDays;

      events.forEach((element) => {
        if (element.date === dayString) {
          // set event color

          switch (element.type) {
            case "meeting":
              daySquere.style.background = "rgb(214, 87, 87)";
              break;
            case "call":
              daySquere.style.background = "rgb(52, 189, 52)";
              break;
            case "out_of_office":
              daySquere.style.background = "rgb(224, 224, 54)";
              break;
          }

          // add event title to calendar

          if (element.title) {
            dayEvent.innerText = element.title;
            daySquere.appendChild(dayEvent);
          }
          element.id = i;
        }
      });
    }

    calendar.appendChild(daySquere);
    document.getElementById("sq-" + i).addEventListener("click", () => {
      const element = events.find((element) => element.id === i);
      viewTask(element);
    });
  }
}

// task View

function viewTask(data) {
  event.preventDefault();

  var keyCount = Object.keys(data).length;

  const eventDiv = document.createElement("div");
  eventDiv.classList.add("event-div");

  // view delete button
  const deletekBtn = document.createElement("button");
  deletekBtn.classList.add("delete-button");
  deletekBtn.innerHTML = "Delete";

  // view cancel button
  const cancelBtn = document.createElement("button");
  cancelBtn.classList.add("check-button");
  cancelBtn.innerHTML = "Cancel";
  cancelBtn.addEventListener("click", () => {
    eventDiv.style.display = "none";
  });

  for (let i = 0; i < keyCount; i++) {
    const eventTitle = document.createElement("li");
    eventTitle.classList.add("event-item");
    eventTitle.innerText = data[Object.keys(data)[i]];
    eventDiv.appendChild(eventTitle);
  }
  eventItms.appendChild(eventDiv);
  eventDiv.appendChild(deletekBtn);
  eventDiv.appendChild(cancelBtn);
}

// EVENTS SECTION

// add task

function addTask(event) {
  event.preventDefault();

  // add to sessionStorage function call

  saveLocalEvents(
    title.value,
    eventDate.value,
    startTime.value,
    endtTime.value,
    eventType.value,
    description.value
  );

  //clear fields

  title.value = "";
  eventDate.value = "";
  startTime.value = "";
  endtTime.value = "";
  eventType.value = "";
  description.value = "";
}

// delete event

function reload() {
  reload = location.reload();
}

function deleteTask(e) {
  const item = e.target;

  if (item.classList[0] === "delete-button") {
    const tasks = item.parentElement;
    removeLocalEvents(tasks);
    tasks.remove();
    alert("task deleted");
    reload();
  }
}

// save events to sessionStorage

function saveLocalEvents(tasks) {
  const titleVal = title.value;
  const startTimeVal = startTime.value;
  const endtTimeVal = endtTime.value;
  let maxLenght = 50;

  let events;

  if (sessionStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(sessionStorage.getItem("events"));
  }

  // validation

  if (titleVal.length > maxLenght) {
    alert("title is too long. Must be less then 50 symbols");
  } else if (startTimeVal > endtTimeVal) {
    alert("time is invalid. End time bus be later than start");
  } else {
    events.push({
      title: title.value,
      date: eventDate.value,
      start: startTime.value,
      end: endtTime.value,
      type: eventType.value,
      description: description.value,
    });
    sessionStorage.setItem("events", JSON.stringify(events));
  }
}

// display Events

function getEvents() {
  let events;

  if (sessionStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(sessionStorage.getItem("events"));
  }

  events.forEach(function (event) {
    //create div
    const eventDiv = document.createElement("div");
    eventDiv.classList.add("event-div");

    //create title li
    const eventTitle = document.createElement("li");
    eventTitle.classList.add("event-item");
    eventTitle.innerText = title.value;
    eventDiv.appendChild(eventTitle);

    //create date li
    const eventsDate = document.createElement("li");
    eventsDate.classList.add("event-item");
    eventsDate.innerText = eventDate.value;
    eventDiv.appendChild(eventsDate);

    //create eventStart li
    const eventStart = document.createElement("li");
    eventStart.classList.add("event-item");
    eventStart.innerText = startTime.value;
    eventDiv.appendChild(eventStart);

    //create eventEnd li
    const eventEnd = document.createElement("li");
    eventEnd.classList.add("event-item");
    eventEnd.innerText = endtTime.value;
    eventDiv.appendChild(eventEnd);

    //create event type li
    const eventValue = document.createElement("li");
    eventValue.classList.add("event-item");
    eventValue.innerText = eventType.value;
    eventDiv.appendChild(eventValue);

    //create description li
    const eventDiscription = document.createElement("li");
    eventDiscription.classList.add("event-item");
    eventDiscription.innerText = description.value;
    eventDiv.appendChild(eventDiscription);
  });
}
// remove events from sessionStorage

function removeLocalEvents(tasks) {
  let events;

  if (sessionStorage.getItem("events") === null) {
    events = [];
  } else {
    events = JSON.parse(sessionStorage.getItem("events"));
  }

  const eventIndex = tasks.children[0].innerText;

  events.splice(events.indexOf(eventIndex), 1);
  sessionStorage.setItem("events", JSON.stringify(events));
}

// open event Form

function openForm() {
  document.querySelector("form").style.display = "flex";
}

// close event form

function closeForm() {
  document.querySelector("form").style.display = "none";
}

loadCalendar();
