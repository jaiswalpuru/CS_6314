window.onload = function () {
  //there will be one span element for each input field
  // when the page is loaded, we create them and append them to corresponding input elements
  // they are initially empty and hidden

  //email
  var email = document.getElementById("email");
  var span1 = document.createElement("span");
  span1.style.display = "none"; //hide the span element
  email.parentNode.appendChild(span1);

  //password
  var password = document.getElementById("pwd");
  var span2 = document.createElement("span");
  span2.style.display = "none"; //hide the password span element
  password.parentNode.appendChild(span2);

  //confirm password
  var confirmPassword = document.getElementById("confirm");
  var span3 = document.createElement("span");
  span3.style.display = "none";
  confirmPassword.parentNode.appendChild(span3);

  function match_pwd_confirm_pwd(str1, str2) {
    if (str1 === str2) {
      return true;
    } else {
      return false;
    }
  }

  email.onfocus = function () {
    span3.innerHTML = "";
    span1.style.display = "";
    span1.innerHTML =
      ' \
    <div class="card bg-light text-dark"> \
        <div class="card-body"><p>Enter email as mentioned below.</p> \
        <p>prefix@dmain_part_one.domain_part_two</p>\
        </div> \
    </div>';
  };

  email.onblur = function () {
    span1.style.display = "none";
    span1.innerHTML = "";
  };

  password.onfocus = function () {
    span3.innerHTML = "";
    span3.style.display = "none";
    span2.style.display = "";
    span2.innerHTML =
      ' \
    <div class="card bg-light text-dark"> \
        <div class="card-body"><p>Password rules.</p> \
            <ul> \
                <li>At least 6 characters—the more characters, the better</li>\
                <li>A mixture of both uppercase and lowercase letters</li>\
                <li>A mixture of letters and numbers</li>\
                <li>Inclusion of at least one special character, e.g., ! @ # ? ]</li> \
            </ul>\
        </div> \
    </div>';
  };

  password.onblur = function () {
    span2.style.display = "none";
    span2.innerHTML = "";
  };

  confirmPassword.onfocus = function () {
    span3.style.display = "";
    span3.innerHTML = "";
  };

  confirmPassword.onblur = function () {};

  var form = document.getElementById("myForm");

  function validate_email(mail) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(form.email.value)
    ) {
      return true;
    }
    return false;
  }

  function check_password(pass_txt) {
    var passw = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    if (pass_txt.match(passw)) {
        return true;
    } else {
        return false;
    }
  }

  form.onsubmit = function (e) {
    span3.innerHTML = "";
    span2.style.display="";
    span3.style.display = "";
    em = email.value;
    pd = password.value;
    cd = confirmPassword.value;

    var valid_email = validate_email(em);
    if (valid_email === false) {
        span1.style.display = "";
        span1.innerHTML = '<p class="error">Please enter a valid email.</p>';
        e.preventDefault();
    }

    if (pd !== "" && cd !== "") {
        res = match_pwd_confirm_pwd(pd, cd);
        if (res === false) {
          span3.innerHTML = '<p class="error">Passowrd does not match.</p>';
          e.preventDefault();
        } else {
            var pd_check = check_password(pd);
            if (pd_check === false){
                span2.innerHTML = '<p class="error">Please enter correct format for password.</p>'; 
                e.preventDefault();
            }
        }
    }else{
        if (pd === ""){
            span2.innerHTML = '<p class="error">Please enter the password field.</p>';
            e.preventDefault();
        }else if (cd === ""){
            span3.innerHTML = '<p class="error">Please enter confirm password field.</p>'; 
            e.preventDefault();
        }
    }

  };
};
