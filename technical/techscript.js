"use strict";

/////////////////////////
const status = document.querySelector(".status");
const start_date = document.querySelector(".start-date");
const end_date = document.querySelector(".end-date");
const duration = document.querySelector(".time");
const author = document.querySelector(".author");
const cards = document.querySelector(".cards");
const gridBox = document.querySelector(".grid");
let event_name = document.querySelector(".event-name");
const organiser = document.querySelector(".organiser");
const past = document.querySelector(".Past");
const upcoming = document.querySelector(".Upcoming");

const this_month = document.querySelector(".This-Month");
// API INTEGERATION

const showContest = async function () {
  try {
    const res = await fetch("https://kontests.net/api/v1/all");
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    data.forEach((d) => {
      if (d.duration < 120000) generateMarkup(d);
    });

    // event_name.textContent = data[10].name;
    console.log(data);
  } catch (err) {
    alert(err);
  }
};

showContest();

/////////////////////////////////

// Generate markup for html

const generateMarkup = function (data) {
  let html = "";
  const date = new Date();
  const current_month = date.getMonth() + 1;
  const contest_month = data.start_time.slice(6, 7);

  html += `
  <div class="card">
    <div class="front-details">
    <h2 class="event-name">${data.name}</h2>
    <img src="card-img-bg.jpg" alt="background image of cards" />
    </div>
    <div class="event-timings">
      <span class="start_time">Starts on: ${data.start_time.slice(0, 10)}</span>
      <span class="end_time">Ends at: ${data.end_time.slice(0, 10)}</span>
      <button class="site-link"><a href="${data.url}" target="_blank">${data.site}</a>
      </button>
    </div>
  </div>`;
  // gridBox.insertAdjacentHTML("beforeend", html);

  if (contest_month < current_month) {
    past.insertAdjacentHTML("beforeend", html);
  } else if (contest_month == current_month) {
    this_month.insertAdjacentHTML("beforeend", html);
  } else {
    upcoming.insertAdjacentHTML("beforeend", html);
  }
};

// HANDLING CATEGORIES OF EVENTS ACCORDING TO TIME

const past_tab = document.querySelector(".list-item-past");
const upcoming_tab = document.querySelector(".list-item-upcoming");
const this_month_tab = document.querySelector(".list-item-this-month");
const lists = document.querySelector(".lists");

const selectItem = function (e) {
  if (e.target.classList.contains("list-item")) {
    const clicked = e.target;
    const siblings = clicked.closest(".lists").querySelectorAll(".list-item");

    siblings.forEach((el) => {
      el.classList.remove("active-tab");
    });

    clicked.classList.add("active-tab");
    console.log(clicked.textContent);

    const className = clicked.textContent;
    const clickedDiv = document.querySelector(`.${className}`);
    clickedDiv
    .closest(".cards")
    .querySelectorAll(".grid")
    .forEach((box) => box.classList.remove("active-contest"));
    
    console.log(clickedDiv);
    clickedDiv.classList.add("active-contest");
  }
};

lists.addEventListener("click",selectItem);
