// * HTML Elements
var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var submitBtn = document.querySelector("#submitBtn");
var rowsContainer = document.querySelector("#rowsContainer");

// * App Variables
var counter = 0;
if (localStorage.getItem("websites") != null) {
  var webList = JSON.parse(localStorage.getItem("websites"));
  displayAll();
} else {
  var webList = [];
}

// * Functions
function validateUrl(url) {
  var regex =
    /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+)\.([a-zA-Z]{2,})(\/[^\s]*)?$/;
  return regex.test(url);
}

function createRow() {
  var website = {
    name: siteName.value,
    url: siteUrl.value,
  };

  // Validate Name
  if (siteName.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Site Name Is Required ",
    });
    return;
  }

  if (siteName.value.length < 4) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Site Name Must Be More Than 4 Characters ",
    });
    return;
  }

  // Validate and format URL
  if (siteUrl.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Site URL is required!",
    });
    return;
  }

  if (!/^https?:\/\//.test(website.url)) {
    website.url = "https://" + website.url;
  }

  if (!validateUrl(website.url)) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Enter Valid URL ",
    });
    return;
  }

  webList.push(website);
  localStorage.setItem("websites", JSON.stringify(webList));
  displayRow(webList.length - 1);
  clearInputs();
}

function displayRow(index) {
  var rowHTML = `
    <tr>
      <td class="line-height">${++counter}</td>
      <td class="line-height">${webList[index].name}</td>
      <td>
        <button class="btn visit">
          <a href="${webList[index].url}" target="_blank">
            <i class="fa-solid fa-eye"></i> Visit
          </a>
        </button>
      </td>
      <td>
        <button class="btn delete" onclick="deleteRow(${index})">
          <i class="fa-solid fa-trash"></i> Delete
        </button>
      </td>
    </tr>
  `;
  rowsContainer.innerHTML += rowHTML;
}

function displayAll() {
  for (var i = 0; i < webList.length; i++) {
    displayRow(i);
  }
}

function clearInputs() {
  siteName.value = "";
  siteUrl.value = "";
}

function deleteRow(index) {
  webList.splice(index, 1);
  localStorage.setItem("websites", JSON.stringify(webList));
  rowsContainer.innerHTML = "";
  counter = 0;
  displayAll();
}

// * Add Events
submitBtn.addEventListener("click", createRow);
