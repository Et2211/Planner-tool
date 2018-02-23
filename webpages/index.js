'use strict'

let data = {
  "name":"max",
  "surname":"tune"
}

function boot(){

  document.getElementById('title').addEventListener('change', saveTitle);
  document.getElementById('title').value = localStorage.title || '';

}






async function saveTitle() {

	localStorage.title = document.getElementById('title').value;
	const url = '/api/planner?t=' + localStorage.title

	if(!responce.ok) {

	console.error('error getting stories', response.status, response.statusText);
	}
}
window.addEventListener("load", boot)
