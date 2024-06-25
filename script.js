// grabbing all the required elements

const productImgEl = document.getElementById("product-img");
const containerEl = document.getElementById("container");
const loaderEl = document.getElementById("loader");
const uploadLoderEl = document.getElementById("upload-loader");
const uploadIconEl = document.getElementById("upload-icon");
const uploadLabelEl = document.getElementById("upload-label");
const uploadTitleEl = document.getElementById("file-head");
const logoImgEl = document.getElementById("logo-img");
const logoUploadEl = document.getElementById("logo-upload-img");
let color = "Blue";

// checking whether the user uploaded a logo or not
let checkImg = false;

// color object to get the color styling right
const colorObj = {
  Blue: "#e3f5fb",
  Pink: "#fdf1f7",
  Yellow: "#fffbef",
  Blueborder: "7px solid #adddf6",
  Pinkborder: "7px solid #f3a4c7 ",
  Yellowborder: "7px solid #ffe08a ",
  Blueloader: "#0095e4 ",
  Pinkloader: "#e11a72",
  Yellowloader: "#ffcc3c",
};

// change Product image function triggers when user click on change color
function changeProductImage(val) {
  color = val;
  clearTimeout(newTimeout);

  //   removing border from every color spans
  const spanId = document.querySelectorAll("span");
  for (let i = 0; i < spanId.length; i++) {
    spanId[i].style.border = "none";
  }

  productImgEl.style.display = "none";
  uploadIconEl.style.display = "none";
  logoUploadEl.style.display = "none";

  loaderStyle(true, val);

  //   setting border to the clicked color span
  if (val == "Blue") {
    document.getElementById(val).style.border = `${colorObj.Blueborder}`;
  } else if (val == "Pink") {
    document.getElementById(val).style.border = `${colorObj.Pinkborder} `;
  } else if (val == "Yellow") {
    document.getElementById(val).style.border = `${colorObj.Yellowborder} `;
  }

  var newTimeout = setTimeout(() => {
    loaderStyle(false);
    productImgEl.src = `./images/umbrella-images/${val}umbrella.png`;
    productImgEl.style.display = "block";
    uploadIconEl.style.display = "block";

    // checking if user uploaded a image or not
    if (checkImg) {
      logoUploadEl.style.display = "inline-block";
    }
  }, 1000);
  containerEl.style.backgroundColor = `${colorObj[val]}`;
}

// loader styling function
function loaderStyle(val, col = "#fff") {
  if (val) {
    loaderEl.style.display = "block";
    uploadLabelEl.style.backgroundColor = `${colorObj[col + "loader"]}`;
    loaderEl.setAttribute("fill", `${colorObj[col + "loader"]}`);
    uploadLoderEl.style.display = "block";
  } else {
    loaderEl.style.display = "none";
    uploadLoderEl.style.display = "none";
  }
}

// Upload Img Event

logoImgEl.addEventListener("change", function (event) {
  if (event.target.files[0].size > 5242880) {
    alert("File is too big! The limit is 5MB");
  } else {
    checkImg = true;
    productImgEl.style.display = "none";
    uploadIconEl.style.display = "none";
    loaderStyle(true, color);
    setTimeout(() => {
      loaderStyle(false);
      let inputImage = document.querySelector("input[type=file]").files[0];
      uploadTitleEl.innerText = inputImage.name.substring(0, 25);
      logoUploadEl.src = URL.createObjectURL(event.target.files[0]);
      productImgEl.style.display = "block";
      uploadIconEl.style.display = "block";
      logoUploadEl.style.display = "inline-block";
    }, 2500);
    logoUploadEl.onload = function () {
      URL.revokeObjectURL(logoUploadEl.src);
    };
  }
});
