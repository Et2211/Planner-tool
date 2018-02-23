'use strict'

let data = "testTile"
function boot(){
  loadTitle();
}

function loadTitle() {

  document.getElementById('title').addEventListener('change', saveTitle);
  }


async function saveTitle() {
  const url = '/api/planner';
	//localStorage.title = document.getElementById('title').value;

  const response = await fetch(url);
  if(response.ok) {
    updateTitle(await response.json());
  } else {
    console.error('error getting', response.status, response.statusText);
    //document.querySelector('body > main').innerHTML = 'sorry, something went wrong...';
  }
}

function useResponse(table) {
  console.log(table);
  console.log("using resp");
  localStorage.title = document.getElementById('title').value;





  }
}

window.addEventListener("load", boot)
