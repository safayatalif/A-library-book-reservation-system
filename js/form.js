(function () {
  var form = document.getElementById("reservationForm");
  var successBox = document.getElementById("successBox");
  var summaryList = document.getElementById("summaryList");

  if (!form) {
    return;
  }

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phonePattern = /^01[3-9]\d{8}$/;

  function setError(name, message) {
    var field = form.querySelector('[data-field="' + name + '"]');
    var error = document.getElementById(name + "Error");
    if (field) {
      field.classList.add("error");
    }
    if (error) {
      error.textContent = message;
    }
  }

  function clearError(name) {
    var field = form.querySelector('[data-field="' + name + '"]');
    var error = document.getElementById(name + "Error");
    if (field) {
      field.classList.remove("error");
    }
    if (error) {
      error.textContent = "";
    }
  }

  function clearAllErrors() {
    form.querySelectorAll(".field").forEach(function (field) {
      field.classList.remove("error");
    });
    form.querySelectorAll(".error-text").forEach(function (el) {
      el.textContent = "";
    });
  }

  function validate() {
    clearAllErrors();
    var isValid = true;

    var fullName = form.fullName.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var studentId = form.studentId.value.trim();
    var bookTitle = form.bookTitle.value.trim();
    var copies = form.copies.value;
    var pickupDate = form.pickupDate.value;
    var returnDate = form.returnDate.value;
    var department = form.department.value;
    var memberType = form.querySelector('input[name="memberType"]:checked');
    var terms = form.terms.checked;

    if (!fullName) {
      setError("fullName", "Full name is required.");
      isValid = false;
    } else if (fullName.length < 3) {
      setError("fullName", "Name must be at least 3 characters.");
      isValid = false;
    }

    if (!email) {
      setError("email", "Email is required.");
      isValid = false;
    } else if (!emailPattern.test(email)) {
      setError("email", "Enter a valid email address.");
      isValid = false;
    }

    if (!phone) {
      setError("phone", "Phone number is required.");
      isValid = false;
    } else if (!phonePattern.test(phone)) {
      setError("phone", "Use BD format: 01XXXXXXXXX (11 digits).");
      isValid = false;
    }

    if (!studentId) {
      setError("studentId", "Student / Faculty ID is required.");
      isValid = false;
    }

    if (!bookTitle) {
      setError("bookTitle", "Book title is required.");
      isValid = false;
    }

    if (!copies) {
      setError("copies", "Number of copies is required.");
      isValid = false;
    } else if (Number(copies) < 1 || Number(copies) > 5) {
      setError("copies", "Copies must be between 1 and 5.");
      isValid = false;
    }

    if (!pickupDate) {
      setError("pickupDate", "Pickup date is required.");
      isValid = false;
    }

    if (!returnDate) {
      setError("returnDate", "Return date is required.");
      isValid = false;
    }

    if (pickupDate && returnDate && returnDate <= pickupDate) {
      setError("returnDate", "Return date must be after pickup date.");
      isValid = false;
    }

    if (!department) {
      setError("department", "Please select a department.");
      isValid = false;
    }

    if (!memberType) {
      setError("memberType", "Select your member type.");
      isValid = false;
    }

    if (!terms) {
      setError("terms", "You must agree to the library terms.");
      isValid = false;
    }

    return isValid;
  }

  function showSummary() {
    var memberType = form.querySelector('input[name="memberType"]:checked');
    var fileInput = form.idCard;
    var fileName = fileInput.files && fileInput.files[0] ? fileInput.files[0].name : "Not uploaded";

    var rows = [
      ["Full name", form.fullName.value.trim()],
      ["Email", form.email.value.trim()],
      ["Phone", form.phone.value.trim()],
      ["ID", form.studentId.value.trim()],
      ["Book title", form.bookTitle.value.trim()],
      ["Copies", form.copies.value],
      ["Pickup date", form.pickupDate.value],
      ["Return date", form.returnDate.value],
      ["Department", form.department.value],
      ["Member type", memberType ? memberType.value : ""],
      ["Notes", form.notes.value.trim() || "None"],
      ["ID card file", fileName]
    ];

    summaryList.innerHTML = "";
    rows.forEach(function (row) {
      var li = document.createElement("li");
      li.textContent = row[0] + ": " + row[1];
      summaryList.appendChild(li);
    });

    successBox.classList.add("show");
    successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    successBox.classList.remove("show");

    if (validate()) {
      showSummary();
    }
  });

  form.addEventListener("reset", function () {
    setTimeout(function () {
      clearAllErrors();
      successBox.classList.remove("show");
      summaryList.innerHTML = "";
    }, 0);
  });
})();
