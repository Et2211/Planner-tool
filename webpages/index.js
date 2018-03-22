'use strict'

let currentPlan;
function boot(){

  loadTitles();
  let timeout = window.setTimeout(loadData, 500); // Allows time for loadTitles() to fetch titles, else results in error
  listen();
}


 function listen() {
     document.getElementById('planSelector').addEventListener('change', loadData);
     document.getElementById('topic').addEventListener('change', loadData);
     document.getElementById("header1").addEventListener('change', saveData);
     document.getElementById("header2").addEventListener('change', saveData);
     document.getElementById("header3").addEventListener('change', saveData);
     document.getElementById("main1").addEventListener('change', saveData);
     document.getElementById("main2").addEventListener('change', saveData);
     document.getElementById("main3").addEventListener('change', saveData);
     document.getElementById("newPlan").addEventListener('click', newPlan);


 }


async function loadTitles() {
    const url = '/api/planner/title';
    const response = await fetch(url);
    if (response.ok) {
      fillTitles(await response.json());
    }
    else {
      console.error('error getting', response.status, response.statusText);
    }
  }


function fillTitles(titlesArray){

  let el = document.getElementById("planSelector");

  for (let title of titlesArray){

    let opt = document.createElement("option");
    opt.textContent = title.planName;
    el.appendChild(opt);
    currentPlan = title.planName;
  }
}



async function loadData() {

  let planTitle = document.getElementById("planSelector");
  let planWeek = document.getElementById("topic")

  let title = planTitle.options[planTitle.selectedIndex].value;
  let week = planWeek.options[planWeek.selectedIndex].value;

  console.log(title)

  const url = '/api/planner?title=' + encodeURIComponent(title) + '&week=' + encodeURIComponent(week);

  const response = await fetch(url);
  if (response.ok) {
      let temp = await response.json()
      console.log(temp);
      fillheaders(temp);
  }
  else {
    console.error('error getting', response.status, response.statusText);
  }
}


async function saveData(e) {

  console.log('run');
  let planTitle = document.getElementById("planSelector");
  let planWeek = document.getElementById("topic")
  let title = planTitle.options[planTitle.selectedIndex].value;
  let week = planWeek.options[planWeek.selectedIndex].value;

  let url = '/api/planner/saveData?id=' + encodeURIComponent(e.target.id) + '&data=' + encodeURIComponent(e.target.value);

  url += '&data=' + encodeURIComponent(e.target.value);
  url += '&title=' + encodeURIComponent(title);
  url += '&week=' + encodeURIComponent(week);

  console.log(url);
  const response = await fetch(url, { method: 'PATCH' });
  if (response.ok) {
     console.log(await response.json());

 }
 else {
   console.error('error getting', response.status, response.statusText);
 }
}


async function newPlan() {

  let newPlanName = window.prompt("Enter the name of your new plan");
  let numOfWeeks = window.prompt("Enter the number of weeks for this unit");
  console.log(numOfWeeks)
  if (Number.isInteger(numOfWeeks)) {

    const url = '/api/planner/new?name=' + encodeURIComponent(newPlanName) + "&weeks=" + encodeURIComponent(numOfWeeks);
    console.log(url);
    const response = await fetch(url, { method: 'POST' });
    if (response.ok) {
      console.log(await response.json());
    }
    else {
      console.error('error getting', response.status, response.statusText);
      }

  }
  else {
    alert("Number of weeks must be an integer")
  }
}



function fillheaders(headers) {

   for (let head of headers) {

     let title = (head.title);

     let header1 = document.getElementById("header1");
     let header2 = document.getElementById("header2");
     let header3 = document.getElementById("header3");

     let main1 = document.getElementById("main1");
     let main2 = document.getElementById("main2");
     let main3 = document.getElementById("main3");

     header1.value = head.header1;
     header2.value = head.header2;
     header3.value = head.header3;

     main1.value = head.main1;
     main2.value = head.main2;
     main3.value = head.main3;
  }


}


window.addEventListener("load", boot);
