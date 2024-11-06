// A $( document ).ready() block.
$(document).ready(function (event) {
  $(".cad-menu-bar").click(function (event) {
    event.stopPropagation(); // Prevents this click from triggering the document click
    $(".cad-mobile-nav").toggleClass("active");
  });
  $(".cad-mobile-menu-item").click(function (event) {
    $(".cad-mobile-nav").removeClass("active");
  });
  // Close .cad-mobile-nav if clicking outside of it or .cad-menu-bar
  $(document).click(function (event) {
    if (!$(event.target).closest(".cad-menu-bar, .cad-mobile-nav").length) {
      $(".cad-mobile-nav").removeClass("active");
    }
  });
  $(".cad-item-carousel-container").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  function handleDropdownClick(dropdown) {
    const $dropdown = $(dropdown);
    const $activeDropdowns = $dropdown.parent().find(".active");

    // Toggle 'active' class on the clicked dropdown before removing it from others
    $dropdown.toggleClass("active");

    // Remove 'active' class from all other active dropdowns in the same wrapper
    $activeDropdowns.not($dropdown).removeClass("active");
  }

  $(".dropdown-wrapper .dropdown").on("click", function () {
    handleDropdownClick(this);
  });

  // Get all sections that have an ID defined
  const sections = $("section[id]");

  // Add an event listener for scroll
  $(window).on("scroll", function () {
    navHighlighter();
  });

  function navHighlighter() {
    // Get current scroll position
    let scrollY = $(window).scrollTop();

    // Loop through sections to get height, top, and ID values for each
    sections.each(function () {
      const sectionHeight = $(this).outerHeight();
      const sectionTop = $(this).offset().top - 50;
      const sectionId = $(this).attr("id");

      /*
    - If the current scroll position enters the space where the current section is visible, add .active class to corresponding navigation link, else remove it
    - We use sectionId as a selector to find the link needing the .active class
    */
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        $(".cad-main-nav a[href*='" + sectionId + "']").addClass("active");
      } else {
        $(".cad-main-nav a[href*='" + sectionId + "']").removeClass("active");
      }
    });
  }
});
