'use strict'

let data = "Webf1"
function boot(){

  loadTitles()
  loadData()
  listen()
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
    console.log(title.title);
    let opt = document.createElement("option");
    opt.textContent = title.title;
    sel.appendChild(opt);
  }
}



async function loadData() {

  let planTitle = document.getElementById("planSelector")
  let title = await (planSelector.options[ planSelector.selectedIndex ].value)
  const url = '/api/planner?title=' + encodeURIComponent(title);

  const response = await fetch(url);
  if (response.ok) {
     fillheaders(await response.json())
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




















function loadTitle() {

  document.getElementById('title').addEventListener('change', saveTitle);
  }


 async  function loadHeaders() {
    let plannerName = document.getElementById("title").value
    const url = '/api/planner?id=' + encodeURIComponent(plannerName);

    const response = await fetch(url);
    if (response.ok) {
      console.log("ok!") // carry on from here!!!!!!
    }
    else {
      console.error('error getting', response.status, response.statusText);

    }
  }



async function saveTitle() {
  const titletemp = document.getElementById('title').value;
  console.log(encodeURIComponent(titletemp));
  const url = '/api/planner?t=' +  encodeURIComponent(titletemp);
  const response = await fetch(url, { method: 'POST' });

  console.log("here")
  if(response.ok) {

    console.log("done")
  }
  else {
    console.error('error getting', response.status, response.statusText);

  }
}

window.addEventListener("load", boot);
