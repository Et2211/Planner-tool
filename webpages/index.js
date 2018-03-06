'use strict'

let currentPlan;
function boot(){

  loadTitles();
  let timeout = window.setTimeout(loadData, 500); // Allows time for loadTitles() to fetch titles, else results in error
  //listen();
}


 function listen() {
     document.getElementById('planSelector').addEventListener('change', loadData);
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

  let sel = document.getElementById("planSelector");

  for (let title of titlesArray){

    let opt = document.createElement("option");
    opt.textContent = title.planName;
    sel.appendChild(opt);
    currentPlan = title.planName;
  }
}



async function loadData() {

  let planTitle = document.getElementById("planSelector");
  let planWeek = document.getElementById("topic")

  let title = planTitle.options[planTitle.selectedIndex].value;
  let week = planWeek.options[planWeek.selectedIndex].value;


  const url = '/api/planner?title=' + encodeURIComponent(title) + '&week=' + encodeURIComponent(week);

  const response = await fetch(url);
  if (response.ok) {
      let temp = await response.json())
      console.log(temp);
      fillheaders(temp);
  }
  else {
    console.error('error getting', response.status, response.statusText);
  }
}


function fillheaders(headers) {

   for (let head of headers) {

     let title = (head.title);

    let newHeader1 = (head.coloumn1);
    let newHeader2 = (head.coloumn2);
    let newHeader3 = (head.coloumn3);

    let header1 = document.getElementById("header1");
    let header2 = document.getElementById("header2");
    let header3 = document.getElementById("header3");

    header1.value = newHeader1
    header2.value = newHeader2
    header3.value = newHeader3



  }


}


window.addEventListener("load", boot);
