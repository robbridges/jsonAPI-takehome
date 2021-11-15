
const createContainer = () => {
  const html=`
  <div class=container>
    <div class="content"></div>
  </div>
  `
  document.body.insertAdjacentHTML("beforeend",html)
}

// simple html header with fake links that don't work
const createHeader = () => {
  const body = document.querySelector(".container");
  const html=`
  <div class="header">
    <a class="header-link" href=""> Create a blog | </a>
    <a class="header-link" href=""> Find friends | </a>
    <a class="header-link" href=""> Search By Category | </a>
    <a class="authentication-link" href=""> Sign In</a>
    <a class="authentication-link" href=""> Register </a>
  </div>`

  body.insertAdjacentHTML("afterbegin", html);
}

const createTable = () => {
  const container = document.querySelector(".content");
  const html =`
  <div class="tableContainer">
    <table class="table">
      <tr>
        <th> Users </th>
      </tr>
    </table>  
  </div>
  `;
  container.insertAdjacentHTML("afterbegin", html);
}

const fillTable = async () => {
  const userData = await generateData();
  const table = document.querySelector('.table');
  for (let i = 0; i < userData.length; i ++) {
  const index = i.toString();
  const html =`
  <tr>
    <td class="user">
      <button id="${index}" class="user-button">
        ${userData[i].name}
      </button>
    </td>
  </tr>
  
  ` 
    
  table.insertAdjacentHTML("beforeend", html);
    
    
    
  }
  // find all buttons with the class we've given them
  const buttons = document.getElementsByClassName("user-button");

  for (let i = 0; i < buttons.length; i++) {
    /* 
      we add event listeners to every button created above, and pass the button id to
      buildSentence, which reaches out to the API to get posts just from that user 
    */
    buttons[i].addEventListener("click", async (e) => {
      const sentence = await buildSentence(parseInt(e.target.id) + 1)
      setTextDisplay(sentence);
    })
  }
  
  
  
}

const createFooter = () => {
  const body = document.querySelector(".container");
  const html =`
  <div class="footer">
    <p> A fakeblog production  </p>
  </div>`
  body.insertAdjacentHTML("beforeend", html);
}
const generateTextArea = () => {
  const container = document.querySelector(".content");
  const html =`
  <div class="textContent">
  <p class="posts">Click on one of our users to see their content!</p>
  <div>
  `
  container.insertAdjacentHTML('beforeend', html);
}

// simple function that does nothing but generate our user data. We use this to build the table of user names
const generateData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}
/*
 I was going to have to use the array Filter method to find posts with the correct user ID. Thankfully this API allows 
 a user ID to be passed to the post endpoint as a query Parameter. Less work for me.
*/
const generatePostData = async (userId) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  const data = await response.json();
  return data;
}
// Simple function, sets the text content of our div that displays blog posts, this will receieve the string broken down from the array of posts.
const setTextDisplay = async (string) => {
  const postText = document.querySelector(".posts");
  postText.innerText = string;
}

// Get our data array, and build a string with only the posts that matches the user id, (we pass one as default, this is overruled when we pass the event id of the button)
const buildSentence = async (userId = 1) => {
  let unfiltered = await generatePostData(userId);
  let string = ''
  for (let post of unfiltered) {
    string += `title: ${post.title}
    
    ${post.body}
    ___________________________________________________________________________
    `;
    
    
  }
  return string;
}
// call all of our fuctions, no globals here!
createContainer();
createHeader();
createTable();
fillTable();
generateTextArea();
createFooter();
buildSentence();



