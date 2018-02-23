'use strict'

let data = "testTile"
function boot(){
  loadTitle();
}

function loadTitle() {

  document.getElementById('title').addEventListener('change', saveTitle);
  }


async function saveTitle() {
  let titletemp = document.getElementById('title').value;
  let url = '/api/planner?t=' +  encodeURIComponent(title);
  const response = await fetch(url, { method: 'POST' });

  if(response.ok) {
    //updateTitle(await response.json());
    console.log("done")
  }
  else {
    console.error('error getting', response.status, response.statusText);

  }
}




window.addEventListener("load", boot)
