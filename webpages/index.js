'use strict'

let data = "testTile"
function boot(){
  loadTitle();
}

function loadTitle() {

  document.getElementById('title').addEventListener('change', saveTitle);
  document.getElementById('title').value = localStorage.title || '';

}






async function saveTitle() {

	localStorage.title = document.getElementById('title').value;
	
	}
}
window.addEventListener("load", boot)
