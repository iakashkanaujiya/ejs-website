// Reponsive Mobile menu
$('.hamburger').click(function (e) {
  $(".header-container-bottom .navbar ul.menu").addClass("active");
  $(".header-container-bottom .hamburger").addClass("deactive");
  $(".header-container-bottom .times-icon").addClass("active");
});

$(".times-icon").click(function (e) {
  $(".header-container-bottom .navbar ul.menu").removeClass("active");
  $(".header-container-bottom .times-icon").removeClass("active");
  $(".header-container-bottom .hamburger").removeClass("deactive");
});

//Sticky header & Liquid progress bar
// Add the event listner globally to listen the user scroll 
$(window).on("scroll", function () {
  // Make the header sticky when user scoll the page
  if (window.pageYOffset > 5) {
    $(".header-container-top").addClass("hide");
    $(".header-container-bottom").addClass("sticky");
  } else {
    $(".header-container-top").removeClass("hide");
    $(".header-container-bottom").removeClass("sticky");
  }
  // Liquid progress bar
  // Get the element position from top
  var elementYPosition = $("#presentation").offset().top;
  // According to the Device width, trigger the animation
  if (window.screen.width < 768) {
    // Once user reached the element, Move the liquid progress bar using css
    if (window.pageYOffset > elementYPosition) {
      $("#presentation .progress-bar-inner").addClass("move");
      $("#presentation .progress-bar-outer1").addClass("move");
      $("#presentation .progress-bar-outer2").addClass("move");
      $("#presentation .progress-bar-outer3").addClass("move");
      $("#presentation .progress-bar-outer4").addClass("move");
    }
  } else {
    if (window.pageYOffset + 200 > elementYPosition) {
      $("#presentation .progress-bar-inner").addClass("move");
      $("#presentation .progress-bar-outer1").addClass("move");
      $("#presentation .progress-bar-outer2").addClass("move");
      $("#presentation .progress-bar-outer3").addClass("move");
      $("#presentation .progress-bar-outer4").addClass("move");
    }
  }
});

// Contact Box input fields animation using CSS

// Name Input Box
$("#contact .panel .panel-column-1 .inputfield > input[name=fullname]").on("focus", function (e) {
  $("#contact .panel .panel-column-1 .inputfield > label[for=fullname]").addClass("active");
});

$("#contact .panel .panel-column-1 .inputfield > input[name=fullname]").on("blur", function (e) {
  $("#contact .panel .panel-column-1 .inputfield > label[for=fullname]").removeClass("active");
});

$("#contact .panel .panel-column-1 .inputfield > input[name=fullname]").on("change", function (e) {
  if ($("#contact .panel .panel-column-1 .inputfield > input[name=fullname]").val().length != 0) {
    $("#contact .panel .panel-column-1 .inputfield > input[name=fullname]").off("blur");
  } else {
    $("#contact .panel .panel-column-1 .inputfield > input[name=fullname]").on("blur", function (e) {
      $("#contact .panel .panel-column-1 .inputfield > label[for=fullname]").removeClass("active");
    });
  }
});

// Email Input Box
$("#contact .panel .panel-column-1 .inputfield > input[name=email]").on("focus", function (e) {
  $("#contact .panel .panel-column-1 .inputfield > label[for=email]").addClass("active");
});

$("#contact .panel .panel-column-1 .inputfield > input[name=email]").on("blur", function (e) {
  $("#contact .panel .panel-column-1 .inputfield > label[for=email]").removeClass("active");
});

$("#contact .panel .panel-column-1 .inputfield > input[name=email]").on("change", function (e) {
  if ($("#contact .panel .panel-column-1 .inputfield > input[name=email]").val().length != 0) {
    $("#contact .panel .panel-column-1 .inputfield > input[name=email]").off("blur");
  } else {
    $("#contact .panel .panel-column-1 .inputfield > input[name=email]").on("blur", function (e) {
      $("#contact .panel .panel-column-1 .inputfield > label[for=email]").removeClass("active");
    });
  }
});

// Message Input Box
$("#contact .panel .panel-column-1 .inputfield > textarea[name=message]").on("focus", function (e) {
  $("#contact .panel .panel-column-1 .inputfield > label[for=message]").addClass("active");
});

$("#contact .panel .panel-column-1 .inputfield > textarea[name=message]").on("blur", function (e) {
  $("#contact .panel .panel-column-1 .inputfield > label[for=message]").removeClass("active");
});

$("#contact .panel .panel-column-1 .inputfield > textarea[name=message]").on("change", function (e) {
  if ($("#contact .panel .panel-column-1 .inputfield > textarea[name=message]").val().length != 0) {
    $("#contact .panel .panel-column-1 .inputfield > textarea[name=message]").off("blur");
  } else {
    $("#contact .panel .panel-column-1 .inputfield > textarea[name=message]").on("blur", function (e) {
      $("#contact .panel .panel-column-1 .inputfield > label[for=message]").removeClass("active");
    });
  }
});

// Modal PopUp box for products information

// Use Ajax request to receive the data from the server 

var xhttp = new XMLHttpRequest();

function loadmodalDocs(productType, productName, callback) {
  xhttp.open("GET", `/textfiles/${productType}/${productName}`, true);
  xhttp.responseType = "json";
  xhttp.send();

  xhttp.onload = function () {
    if (this.readyState === 4 && this.status === 200 && this.response != null) {
      callback(this.response);
    } else {
      callback({ "productName": "Data not found", "productProperties": ["Not found"], "productDescription": "Not found", "productCharacteristics": ["Not found"] });
    }
  }
}

function modalBox(productType, productName) {
  $(".modal-box").addClass("active");
  $("#spinner.loader").addClass("active");
  loadmodalDocs(productType, productName, function (productDocs) {
    $(".modal-box .modal-popup .product-title > h2").text(productDocs.productName);
    var productPropertiesArray = [];
    productDocs.productProperties.forEach(property => {
      productPropertiesArray.push(`<li>${property}</li>`);
    });
    $(".modal-box .modal-popup .product-title > h2 + ul").html(productPropertiesArray);
    $(".modal-box .modal-popup .product-des > h3 + p").text(productDocs.productDescription);
    var productCharacteristicsArray = [];
    productDocs.productCharacteristics.forEach(characteristic => {
      productCharacteristicsArray.push(`<li>${characteristic}</li>`)
    });
    $(".modal-box .modal-popup .product-des > h3 + ul").html(productCharacteristicsArray);
    setTimeout(() => {
      $(".modal-box .modal-popup").addClass("active");
      $("#spinner.loader").removeClass("active");
    }, 500);
  });
}

function modalBoxClose() {
  $("#spinner.loader").removeClass("active");
  $(".modal-box .modal-popup").removeClass("active");
  $(".modal-box").removeClass("active");
}

// Post Contact Form data to the server
function formSumit(pageName) {
  xhttp.open("POST", "/sumit-form", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  if (pageName === "home") {
    var inputData = {
      fname: document.forms["myForm"]["fname"].value,
      lname: fname = document.forms["myForm"]["lname"].value,
      email: document.forms["myForm"]["email"].value,
      message: document.forms["myForm"]["message"].value
    };

    xhttp.send(`fname=${inputData.fname}&lname=${inputData.lname}&email=${inputData.email}&message=${inputData.message}`);

    xhttp.onprogress = function () {
      $("#home-contact-spinner.loader").addClass("active");
    }

    xhttp.onload = function () {
      if (this.responseText === "OK" && this.readyState === 4) {
        setTimeout(function () {
          $("#home-contact-spinner.loader").removeClass("active");
          $(".contact-box-wrap .contact-box .contact-field.submit button[type='submit']").text("Your response has been submitted!").animate({ width: "250px" }, 500);
        }, 2000);
      } else {
        $("#home-contact-spinner.loader").removeClass("active");
        $(".contact-box-wrap .contact-box .contact-field.submit button[type='submit']").text("Try again!");
      }
    }
  } else if (pageName === "contact") {
    var inputData = {
      fullName: document.forms["myForm"]["fullname"].value,
      email: document.forms["myForm"]["email"].value,
      message: document.forms["myForm"]["message"].value
    };

    xhttp.send(`fullname=${inputData.fullName}&email=${inputData.email}&message=${inputData.message}`);

    xhttp.onprogress = function () {
      $("#contact-page-spinner.loader").addClass("active");
    }

    xhttp.onload = function () {
      if (this.responseText === "OK" && this.readyState === 4) {
        setTimeout(function () {
          $("#contact-page-spinner.loader").removeClass("active");
          $("#contact .panel .panel-column-1 .submit-button button").text("Sucess!");
        }, 2000);
      } else {
        $("#contact-page-spinner.loader").removeClass("active");
        $("#contact .panel .panel-column-1 .submit-button button").text("Try again!");
      }
    }
  }
}

