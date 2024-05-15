let data = fetch(" https://dog.ceo/api/breeds/list/all");
data
  .then((r) => r.json())
  .then((res) => {
    //console.log("hi", res);
    displayBreeds(res);
  })
  .catch((e) => console.log(e));
let navlist = document.getElementById("navlist");
let subnav = document.getElementById("subnav");
subnav.style.minHeight = "400px";

function displayBreeds(data) {
  //  console.log(data.message);
  let breeds = Object.keys(data.message).filter(
    (b) => data.message[b].length > 2
  );
  // console.log(breeds);

  for (let breed of breeds) {
    navlist.innerHTML += `<li onclick="displaySubBreeds(event,'${breed}')" >${breed}</li>`;
  }
  console.log(navlist.children[0]);
  navlist.children[0].className = "active";
  //console.log(breeds[0]);
  displaySubBreeds(null, breeds[0]);
}

function displaySubBreeds(event, breed) {
  if (event) {
    console.log(event.target);
    document.querySelector(".nav-list .active").className = "";
    event.target.className = "active";
  }
  subnav.innerHTML = "";
  getSubBreeds(breed)
    .then((subbreeds) => {
      console.log("subbreeds=", subbreeds);
      let count = 1;
      for (let sb of subbreeds) {
        subnav.innerHTML += `<li onclick="displayImages(event,'${breed}','${sb}')">${sb}</li>`;
        if (count++ == 6) break;
      }
      subnav.children[0].className = "active";
      displayImages(null, breed, subbreeds[0]);
    })
    .catch((error) => {
      console.error("Error fetching subbreeds:", error);
    });
}

function getSubBreeds(breed) {
  return fetch("https://dog.ceo/api/breed/" + breed + "/list")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //  console.log("Data received:", data);
      return data.message; // Extracting the subbreeds from the response
    });
}

function displayImages(event, breed, subbreed) {
  if (event) {
    // console.log(event.target);
    document.querySelector(".sub-nav .active").className = "";
    event.target.className = "active";
  }
  fetch(`https://dog.ceo/api/breed/${breed}/${subbreed}/images/random/6`)
    .then((res) => res.json())
    .then((data) => {
      console.log("response", data);
      let images = data.message;
      let div = document.getElementById("images");
      div.innerHTML = `<h1>${breed} - ${subbreed}</h1>`;

      let flex = document.createElement("div");
      flex.className = "images";

      div.append(flex);
      for (let i of images) {
        let img = document.createElement("img");
        img.setAttribute("src", i);
        flex.append(img);
      }
    })
    .catch((e) => console.log("Err:", e));
}

/********************************* 



function displaySubBreeds(event, breed) {
  let subnav = document.getElementById("subnav");
  subnav.innerHTML = "";
  getSubBreeds(breed)
    .then(subbreeds => {
      console.log(subbreeds);
      subnav.innerHTML += `<li>${breed}</li>`;
    })
    .catch(error => {
      console.error('Error fetching subbreeds:', error);
    });
}
function getSubBreeds(breed) {
  return fetch("https://dog.ceo/api/breed/" + breed + "/list")
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log("Data received:", data);
      return data.message; // Extract the subbreeds from the response
    })
  
  }

  */
