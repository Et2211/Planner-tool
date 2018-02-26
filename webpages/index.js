'use strict'

let data = "testTile"
function boot(){
  loadTitle();
  loadHeaders();
}

function loadTitle() {

  document.getElementById('title').addEventListener('change', saveTitle);
  }



 async  function loadHeaders() {
    plannerName = document.getElementById("title").value
    const url = '/api/planner?id=' + encodeURIComponent(plannerName);

    const response = await fetch(url);
    if (response.ok) {
      console.log("ok!") // carry on from here!!!!!!
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
