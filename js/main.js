(function () {
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  if (!toggle || !menu) {
    return;
  }

  toggle.addEventListener("click", function () {
    var isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  menu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
})();
