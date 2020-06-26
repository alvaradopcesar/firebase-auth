// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const inputTextField = document.querySelector('#latestHotDogStatus');
const saveButton = document.querySelector('#saveButton');
const loadButton = document.querySelector('#loadButton');

const docRef = firestore.doc("samples/panConPollo");

saveButton.addEventListener("click",function(){
  const textsave = inputTextField.value; 
  console.log("voy a grabar est valor " + textsave + " en firebase");
  docRef.set({
    hotDogStatus: textsave 
  }).then(function(){
    console.log("grabado en Firebase");
  }).catch(function(error){
    console.log(error);
  })
})


loadButton.addEventListener("click",function(){
  console.log("click to load button");
  docRef.get().then(function(doc){
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log(" load manual " + myData.hotDogStatus)
      // console.log(myData)
      // console.log(myData.hotDogStatus)
    }
  }).catch(function(error){
    console.log(error);
  })  
})

getRealTimeUpdates = function() {
  docRef.onSnapshot(function( doc ){
    if (doc && doc.exists) {
      const myData = doc.data();
      console.log(" load automatico " + myData.hotDogStatus)
      // console.log(myData)
      // console.log(myData.hotDogStatus)
    }    
  })
}

getRealTimeUpdates();


const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<h5 class="center-align">Login to view guides</h5>';
  }
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});