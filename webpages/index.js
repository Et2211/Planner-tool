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
  let url = '/api/planner';
  url += '?t=' +  encodeURIComponent(title)

  const response = await fetch(url);

  if(response.ok) {
    updateTitle(await response.json());
    console.log("done")
  }
  else {
    console.error('error getting', response.status, response.statusText);
    console.log("error");
  }
}

function useResponse(table) {
  console.log(table);
  console.log("using resp");
  localStorage.title = document.getElementById('title').value;

  }


window.addEventListener("load", boot)
