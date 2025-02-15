const urlBase = 'http://localhost/LAMPAPI'
const extension = 'php';

// Popup functionality
const createUserBtn = document.getElementById('createUserBtn');
const createUserPopup = document.getElementById('createUserPopup');
const closeBtn = document.querySelector('.close-btn');
const createUserForm = document.getElementById('createUserForm');

//PHP ENDPOINTS
let createEndPoint = `${urlBase}/Create.${extension}`;

let userID = 0;
let firstName = "";
let lastName = "";

// Open popup
createUserBtn.addEventListener('click', () => {
    createUserPopup.style.display = 'block';
});

// Close popup
closeBtn.addEventListener('click', () => {
    createUserPopup.style.display = 'none';
});

// Close popup when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === createUserPopup) {
        createUserPopup.style.display = 'none';
    }
});

// Handle form submission
createUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
  
    firstName = document.getElementById('firstName').value;
    lastName = document.getElementById('lastName').value;
    let password = document.getElementById('confirmPassword').value;
    let login = document.getElementById('newUsername').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
  
    let reqData = {
      FirstName: firstName,
      LastName: lastName,
      Login: login,
      Email: email,
      Phone: phone,
      Password: password
    };
    
  
    console.log("Sending Request Data:", reqData);
  
    let jsonPayload = JSON.stringify(reqData);
    let xhr = new XMLHttpRequest();
    xhr.open("POST", createEndPoint, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    xhr.onreadystatechange = function(){
      if(this.readyState == 4 && this.status == 200){
        let jsonObject = JSON.parse(xhr.responseText);
        userID = jsonObject.userID;
        console.log("User created with ID:", userID);
      }
      else{
        console.error("Error: ", xhr.status, xhr.responseText);
      }
    }
    xhr.send(jsonPayload);
  
  });

// Handle login form submission
const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let xhr = new XMLHttpRequest();
    let url = urlBase + '/Login.' + extension;

    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            let response = JSON.parse(xhr.responseText);
            
            if (xhr.status === 200) {
                if (response.error) {
                    alert(response.error);
                } else {
                    alert('Login successful!');
                    // Redirect to another page or perform other actions
                }
            } else {
                alert('Error logging in. Please try again.');
                console.error(xhr.statusText);
            }
        }
    };

    let jsonPayload = JSON.stringify({
        Login: username,
        Password: password
    });
    console.log("Sending Request Data:", jsonPayload);

    xhr.send(jsonPayload);
});

function addContact() {
	// getting the input values 
    let contactFirstName = document.getElementById("contactFirstName").value;
	let contactLastName = document.getElementById("contactLastName").value;
    let contactPhone = document.getElementById("contactNum").value;
    let contactEmail = document.getElementById("contactEmail").value;
    document.getElementById('addContactResult').innerHTML=""; //clears contents so it resets for next UI action

	// making tmp object that has all those parameters
    let tmp = {firstname: contactFirstName, lastname: contactLastName,phone: contactPhone, email: contactEmail, userId: "testUser124"};

	// changing it to JSON string
    let jsonPayload = JSON.stringify( tmp );
    
	// setting up the endpoint
    let url = urlBase + '/AddContact.' + extension;

	// makes new request objet
    let xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	// shows that JSON data is being sent through the request header
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function() 
		{// 4 bc that means request is fully completed and 200 bc request was succesful
			if (this.readyState == 4 && this.status == 200) 
			{
				document.getElementById("addContactResult").innerHTML = "Contact has been added";
				
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)// if error happens then message displayed
	{
		document.getElementById("addContactResult").innerHTML = err.message;
	}
}