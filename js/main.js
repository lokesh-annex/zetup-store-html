 $(document).ready(function() {
     setTimeout(function() {
         $('#loading').hide();
     }, 500);
     new WOW().init();
     $(".down-arrow").click(function() {
         $('html, body').animate({
             scrollTop: $(".section-second").offset().top
         }, 300);
     });
     $(".enquiry-form .btn.enquiry-btn,.cross-btn").click(function() {
         $('.enquiry-form').toggleClass('active')
         if ($(".enquiry-form").hasClass("active")) {
             $('body').append('<div class="black-overlay"></div>');
         } else {
             $('.black-overlay').remove();
         }
     });
     $('body').on("click", function(e) {
         var container = $(".enquiry-form");
         if (!container.is(e.target) && container.has(e.target).length === 0) {
             $('.enquiry-form').removeClass('active')
             $('.black-overlay').remove();
         }
     });
     $('.contactinfo-item').hover(function() {
         $('.contactinfo-item').removeClass('active');
         $(this).addClass('active');
     });
     $('.price-sec .owl-carousel').owlCarousel({
         loop: true,
         margin: 10,
         nav: false,
         responsive: {
             0: {
                 items: 1
             },
             600: {
                 items: 3
             },
             1000: {
                 items: 3
             }
         }
     })
     $('.section-second .owl-carousel').owlCarousel({
         loop: true,
         margin: 10,
         autoplay: 2000,
         nav: false,
         items: 1
        
     })
     $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();
        var svgOffsetTop = $('.scroll-animation').offset().top;
        var svgHeight = $('.scroll-animation svg').height();
        if (scrollPosition > svgOffsetTop - $(window).height() && scrollPosition < svgOffsetTop + svgHeight) {
            $('.animated-svg').addClass('animate');
        }
    });
    gsap.registerPlugin(ScrollTrigger);

  // Start all cards centered
  gsap.set(".testimonials_card-main", {
    x: 0,
    opacity: 1,
    position: "relative",
    zIndex: 1
  });

  // Move LEFT card to the left on scroll
  gsap.to(".testimonials_card-main.first", {
    x: "-60px",
    scrollTrigger: {
      trigger: ".testimonials-global",
      start: "top center",
      
      scrub: 1
    }
  });

  // CENTER card (can stay as-is or add effects)
  // Optional: fade in or scale if desired

  // Move RIGHT card to the right on scroll
  gsap.to(".testimonials_card-main.third", {
    x: "60px",
    scrollTrigger: {
      trigger: ".testimonials-global",
      start: "top center",
     
      scrub: 1
    }
  });
 });