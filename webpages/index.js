'use strict'

let currentPlan;
function init(){

  loadTitles();
  let timeout = window.setTimeout(loadPlan, 500); // Allows time for loadTitles() to fetch titles, else results in error
  listen();
}

 function listen() {
     document.getElementById('planSelector').addEventListener('change', loadPlan);
     document.getElementById('topic').addEventListener('change', loadData);
     document.getElementById("header1").addEventListener('change', saveData);
     document.getElementById("header2").addEventListener('change', saveData);
     document.getElementById("header3").addEventListener('change', saveData);
     document.getElementById("main1").addEventListener('change', saveData);
     document.getElementById("main2").addEventListener('change', saveData);
     document.getElementById("main3").addEventListener('change', saveData);
     document.getElementById("newPlan").addEventListener('click', newPlan);
     document.getElementById("deletePlan").addEventListener('click', deletePlan);
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
  let el = document.getElementById("planSelector");
  for (let title of titlesArray){

    let opt = document.createElement("option");
    opt.textContent = title.planName;
    el.appendChild(opt);
    currentPlan = title.planName;
  }
}

async function loadPlan() {

  let planTitle = document.getElementById("planSelector");
  let title = planTitle.options[planTitle.selectedIndex].value;
  const url = '/api/planner/new?title=' + encodeURIComponent(title)
  const response = await fetch(url);
  if (response.ok) {
      fillWeeks(await response.json())
  }
  else {
    console.error('error getting', response.status, response.statusText);
  }
}

function fillWeeks(weeks){

    let container = document.getElementById("topic")
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let temp2 = weeks[0]
    let numOfWeeks = temp2["count(*)"]

    for (let i = 1; i < (numOfWeeks + 1); i++) {

      let el = document.createElement("option")
      el.textContent = "Week " + i
      container.appendChild(el)
      loadData()
    }
}

async function loadData() {

  let planTitle = document.getElementById("planSelector");
  let planWeek = document.getElementById("topic")
  let title = planTitle.value;
  let week = planWeek.value;

  const url = '/api/planner?title=' + encodeURIComponent(title) + '&week=' + encodeURIComponent(week);

  const response = await fetch(url);
  if (response.ok) {
      fillheaders(await response.json());
  }
  else {
    console.error('error getting', response.status, response.statusText);
  }
}

async function saveData(e) {

  let planTitle = document.getElementById("planSelector");
  let planWeek = document.getElementById("topic")
  let title = planTitle.value;
  let week = planWeek.value;

  if (planTitle.value == undefined || planTitle.value == ''){
    simplePopup(0, 'No plan to save to. Create a new plan')
    console.log(e.target)
    e.target.textContent = ''
  }

  let url = '/api/planner/saveData?id=' + encodeURIComponent(e.target.id) + '&data=' + encodeURIComponent(e.target.value);

  url += '&data=' + encodeURIComponent(e.target.value);
  url += '&title=' + encodeURIComponent(title);
  url += '&week=' + encodeURIComponent(week);

  const response = await fetch(url, { method: 'PATCH' });
  if (response.ok) {
     console.log(await response.json());
 }
 else {
   console.error('error getting', response.status, response.statusText);
 }
}

async function newPlan() {

  let newPlanName = await simplePopup(2, 'Please enter name for this plan', '')
  if (newPlanName == null || newPlanName == ''){
    simplePopup(0, 'Plan must have a name',)
  }
  else {
    let numOfWeeks = await simplePopup(2, 'How many weeks will this plan have?', '')
    console.log(newPlanName + numOfWeeks)

    if (!isNaN(numOfWeeks)) {
      numOfWeeks = (parseFloat(numOfWeeks) + 1);
    }

    if (Number.isInteger(numOfWeeks)) {

      const url = '/api/planner/new?name=' + encodeURIComponent(newPlanName) + "&weeks=" + encodeURIComponent(numOfWeeks);
      const response = await fetch(url, { method: 'POST' });
      if (response.ok) {
        console.log(await response.json());
        addTitle(newPlanName)
      }
      else {
        console.error('error getting', response.status, response.statusText);
        }
      }
      else {
        simplePopup(0, 'Number of weeks must be an integer')
      }
    }
}

async function deletePlan() {

  let planTitle = document.getElementById("planSelector");
  let title = planTitle.options[planTitle.selectedIndex].value;
  console.log(title)
  window.location.reload(true);
  const url = '/api/planner/delete?title=' + encodeURIComponent(title)
  const response = await fetch(url, { method: 'DELETE' });
  if (response.ok) {
    console.log(await response.json());

  }

  else {
    console.error('error getting', response.status, response.statusText);
  }

}


function addTitle(name){
  let planTitle = document.getElementById("planSelector");
  let el = document.createElement("option");
  el.textContent = name;
  planTitle.appendChild(el);
  loadPlan()
}

function fillheaders(headers) {

   for (let head of headers) {
     let title = (head.title);

     let header1 = document.getElementById("header1");
     let header2 = document.getElementById("header2");
     let header3 = document.getElementById("header3");

     let main1 = document.getElementById("main1");
     let main2 = document.getElementById("main2");
     let main3 = document.getElementById("main3");

     header1.value = head.header1;
     header2.value = head.header2;
     header3.value = head.header3;

     main1.value = head.main1;
     main2.value = head.main2;
     main3.value = head.main3;
  }
}
window.addEventListener("load", init);

/**
* None of the following code is my own. The following code is from a gitHub repository called Simple-Popup be Dabeng.
* The intention of this code is to remove the need for default javascript prompt boxes, which often frustrate users because of their intrusiveness
* https://github.com/dabeng/Simple-Popup
*/

(function(){

  window.simplePopup = function(type, message, defaultText) {
    var promise = new Promise(function(resolve, reject) {
      var appendSimplePopup = function() {
        document.body.insertAdjacentHTML('beforeend',
          '<div id="popup-overlay">' +
            '<div class="simple-popup">' +
              '<span class="popup-icon"></span>' +
              '<p class="popup-message"></p>' +
              '<div class="popup-buttons"></div>' +
            '</div>' +
          '</div>');
      };
      var cleanupSimplePopup = function() {
        var overlay = document.querySelector('#popup-overlay');
        var btns = overlay.querySelector('.popup-buttons');
        while (btns.firstChild) {
          btns.removeChild(btns.firstChild);
        }
        var input = overlay.querySelector('.popup-input');
        if (input) {
          input.parentNode.removeChild(input);
        }
      };
      var appendPopupInput = function() {
        document.querySelector('#popup-overlay').querySelector('.popup-message')
          .insertAdjacentHTML('afterend', '<input type="text" class="popup-input"/>');
      };
      var appendPopupButtons = function(type) {
        var popupButtons = document.querySelector('#popup-overlay').querySelector('.popup-buttons');
        if (type === 0) {
          popupButtons.insertAdjacentHTML('beforeend', '<button type="button" class="btn-ok">OK</button>');
        } else {
          popupButtons.insertAdjacentHTML('beforeend', '<button type="button" class="btn-ok">OK</button>' +
            '<button type="button" class="btn-cancel">Cancel</button>');
        }
      };
      var appendDisableScrollbar = function() {
        var body = document.body;
        if (body.scrollHeight > window.screen.availHeight) {
          var topOffset = Math.max(window.pageYOffset, document.documentElement.scrollTop, body.scrollTop);
          body.classList.add('disable-scrollbar');
          body.style.top = -topOffset + 'px';
          body.dataset.scrolltop = topOffset;
        }
      };
      var recoverOriginalScrollbar = function() {
        var body = document.body;
        if (body.dataset.scrolltop) {
          body.classList.remove('disable-scrollbar');
          body.style.top = '';
          body.scrollTop = body.dataset.scrolltop;
          document.documentElement.scrollTop = body.dataset.scrolltop;
          body.dataset.scrolltop = '';
        }
      };
      var bindButtonHandler = function(type) {
        var overlay = document.querySelector('#popup-overlay');
        var btns = overlay.querySelector('.popup-buttons');
        if (type === 0) {
          btns.querySelector('.btn-ok').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            resolve();
          }, false);
        } else if (type === 1) {
          btns.querySelector('.btn-ok').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            resolve(true);
          }, false);
          btns.querySelector('.btn-cancel').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            resolve(false);
          }, false);
        } else {
          overlay.querySelector('.popup-input').addEventListener('keyup', function(event) {
            if (event.keyCode === 13) {
              recoverOriginalScrollbar();
              var value = event.target.value.trim();
              overlay.classList.remove('show-popup');
              overlay.querySelector('.popup-input').value = defaultText;
              resolve(value);
            }
          });
          btns.querySelector('.btn-ok').addEventListener('click', function() {
            recoverOriginalScrollbar();
            var value = overlay.querySelector('.popup-input').value.trim();
            overlay.classList.remove('show-popup');
            overlay.querySelector('.popup-input').value = defaultText;
            resolve(value);
          }, false);
          btns.querySelector('.btn-cancel').addEventListener('click', function() {
            recoverOriginalScrollbar();
            overlay.classList.remove('show-popup');
            overlay.querySelector('.popup-input').value = defaultText;
            resolve('');
          }, false);
        }
      };

      // With the help of the following function, we enfore browser to repaint in order to
      // fire up the first time transition of alert icon.
      var startIconTransition = function() {
        var overlay = document.querySelector('#popup-overlay');
        overlay.style.offsetWidth = overlay.offsetWidth;
        overlay.classList.add('show-popup');
      };

      var overlay = null;
      if (type === 0) { // alert box
        if (!document.querySelector('.simple-popup')) {
          appendSimplePopup();
          appendPopupButtons(0);
          bindButtonHandler(0);
          startIconTransition();
        } else {
          cleanupSimplePopup();
          appendPopupButtons(0);
          bindButtonHandler(0);
        }
        overlay = document.querySelector('#popup-overlay');
        overlay.querySelector('.simple-popup').setAttribute('class', 'simple-popup alert-box');
        overlay.querySelector('.popup-icon').textContent = '!';
      } else if (type === 1) { // confirm box
        if (!document.querySelector('.simple-popup')) {
          appendSimplePopup();
          appendPopupButtons(1);
          bindButtonHandler(1);
          startIconTransition();
        } else {
          cleanupSimplePopup();
          appendPopupButtons(1);
          bindButtonHandler(1);
        }
        overlay = document.querySelector('#popup-overlay');
        overlay.querySelector('.simple-popup').setAttribute('class', 'simple-popup confirm-box');
        overlay.querySelector('.popup-icon').textContent = '?';
      } else { // prompt box
        if (!document.querySelector('.simple-popup')) {
          appendSimplePopup();
          appendPopupInput();
          appendPopupButtons(2);
          bindButtonHandler(2);
          startIconTransition();
        } else {
          cleanupSimplePopup();
          appendPopupInput();
          appendPopupButtons(2);
          bindButtonHandler(2);
        }
        overlay = document.querySelector('#popup-overlay');
        overlay.querySelector('.simple-popup').setAttribute('class', 'simple-popup prompt-box');
        overlay.querySelector('.popup-icon').textContent = '📚';
        overlay.querySelector('.popup-input').value = defaultText;
        overlay.querySelector('.popup-input').select();
      }
      appendDisableScrollbar();
      overlay.classList.add('show-popup');
      overlay.querySelector('.popup-message').textContent = message;
    });

    return promise;
  };

})();
