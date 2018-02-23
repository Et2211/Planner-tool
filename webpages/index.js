'use strict'

let data = "testTile"
function boot(){
  loadTitle();
}

function loadTitle() {

  document.getElementById('title').addEventListener('change', saveTitle);
  }


async function saveTitle() {
  const titletemp = document.getElementById('title').value;

  const url = '/api/planner?t=' +  encodeURIComponent(title);
  const response = await fetch(url, { method: 'POST' });

  console.log("here")
  if(response.ok) {
    //updateTitle(await response.json());
    console.log("done")
  }
  else {
    console.error('error getting', response.status, response.statusText);

  }
}




window.addEventListener("load", boot)
