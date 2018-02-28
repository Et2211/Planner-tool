'use strict'

let data = "Webf1"
function boot(){
  //loadTitle();
  //loadHeaders();
  loadData()
  //let temp = document.createElement("option")
  //temp.
}



async function loadData() {

  let planTitle = document.getElementById("planSelector")
  let title = (planSelector.options[ planSelector.selectedIndex ].value)


  const url = '/api/planner?title=' + encodeURIComponent(title);

  const response = await fetch(url);
  if (response.ok) {
    console.log(await response.json()) // carry on from here!!!!!!
    console.log(await response.["0"].coloumn1
  }
  else {
    console.error('error getting', response.status, response.statusText);

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
