var postsData;

function initSmoothScrollSettings() {
    SmoothScroll({
        // Scrolling Core
        animationTime    : 500, // [ms]
        stepSize         : 40, // [px]

        // Acceleration
        accelerationDelta : 50,  // 50
        accelerationMax   : 3,   // 3

        // Keyboard Settings
        keyboardSupport   : true,  // option
        arrowScroll       : 50,    // [px]

        // Pulse (less tweakable)
        // ratio of "tail" to "acceleration"
        pulseAlgorithm   : true,
        pulseScale       : 4,
        pulseNormalize   : 1,

        // Other
        touchpadSupport   : false, // ignore touchpad by default
        fixedBackground   : true,
        excluded          : ''
    });
}

function initValidator() {
    generateCaptchaCode();

    jQuery.validator.addMethod('captchaCheck', function (value, element) {
        var captchaCode = $('.captcha_code').text(),
            inputCode = $('.captcha_input').val();

        if (captchaCode === inputCode) {
            return true;
        } else {
            return false;
        }
    }, "Your verification input is incorrect");

    // validate contact form
    $(function() {
        $('#contact_form').validate({
            invalidHandler: function(event, validator) {
                // 'this' refers to the form
                var errors = validator.numberOfInvalids();
                if (errors) {
                  $('.contact_success').hide();
                }
            },
            rules: {
                firstName: {
                    required: true
                },
                lastName: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                message: {
                    required: true
                },
                captcha: {
                    required: true,
                    captchaCheck: true
                }
            },
            messages: {
                firstName: {
                    required: "Please enter your first name"
                },
                lastName: {
                    required: "Please enter your last name"
                },
                email: {
                    required: "Please enter a valid email"
                },
                phone: {
                    required: "Please enter a phone number"
                },
                message: {
                    required: "Please include a message to send"
                },
                captcha: {
                    required: "Please complete the verification (It is case sensitive)"
                }
            },
            submitHandler: function(form) {
                $(form).ajaxSubmit({
                    type:"POST",
                    data: $(form).serialize(),
                    url:"process.php",
                    success: function() {
                        $('input, textarea').not('.submit').val('');
                        $('.contact_success').fadeIn();
                        generateCaptchaCode();
                    },
                    error: function() {
                        $('.contact_failed').fadeIn();
                    }
                });
            }
        });
    });
}

function generateCaptchaCode() {
    var i,
        code = "",
        possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (i=0; i < 5; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    $('.captcha_code').text(code);
}

function initShowcaseSlide () {
    var duration = 300;

    $('.showcase-popup').hide();

    if ('ontouchstart' in document.documentElement) {
        $('.showcase-item').click( function() {
            $(this).find('.showcase-popup').stop().fadeToggle(duration);
        });
    } else {
        $('.showcase-item').click( function() {
            $(this).find('.showcase-popup').stop().fadeToggle(duration);
        });

        $('.showcase-item').mouseenter( function() {
            $(this).find('.showcase-popup').stop().fadeIn(duration);
        }).mouseleave( function() {
            $(this).find('.showcase-popup').stop().fadeOut(duration);
        });
    }

    $('.showcase-item').children().click( function (e) {
        e.preventDefault();
    })
}

function initOwlCarousel () {
    var loopSpeed = 6000,
        transitionSpeed = 300,
        itemsCount = $('.owl-carousel').children().length,
        index = 1;

    $("#owl-carousel").owlCarousel({
            // Most important owl features
        items : itemsCount,
        itemsCustom : false,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        singleItem : true,
        itemsScaleUp : true,

        //Basic Speeds
        slideSpeed : transitionSpeed,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        //Autoplay
        autoPlay : loopSpeed,
        stopOnHover : false,

        // Navigation
        navigation : false,
        navigationText : ["prev","next"],
        rewindNav : true,
        scrollPerPage : false,

        //Pagination
        pagination : false,
        paginationNumbers: false,

        // Responsive
        responsive: true,
        responsiveRefreshRate : 200,
        responsiveBaseWidth: window,

        // CSS Styles
        baseClass : "owl-carousel",
        theme : "owl-theme",

        //Lazy load
        lazyLoad : false,
        lazyFollow : true,
        lazyEffect : "fade",

        //Auto height
        autoHeight : false,

        //JSON
        jsonPath : false,
        jsonSuccess : false,

        //Mouse Events
        dragBeforeAnimFinish : true,
        mouseDrag : false,
        touchDrag : false,

        //Transitions
        transitionStyle : "fade",

        // Other
        addClassActive : false,

        //Callbacks
        beforeUpdate : false,
        afterUpdate : false,
        beforeInit: false,
        afterInit: displayHeadlinerText,
        beforeMove: false,
        afterMove: displayHeadlinerText,
        afterAction: false,
        startDragging : false,
        afterLazyLoad : false

    })

    /* Owl Carousel's info object has been deprectiated, so I have to create my own item index counter,
       to track what slide we are up to. */

    function displayHeadlinerText() {
        var slide = $('.headliner').find("[data-overlayindex='" + index + "']"),
            timeout = loopSpeed - (transitionSpeed*2),
            fadeSpeed = 800,
            delay = 600,
            delayer = 600,
            ele;

        slide.children().each( function() {
            element = $(this);

            // Fade in
            (function(element) {
                setTimeout( function() {
                    element.show().animate({ opacity: 1, top: "-100px" }, fadeSpeed, "easeOutQuint");
                }, delay);
            }(element));
            delay += delayer;

            // fade out
            (function(element) {
                setTimeout( function() {
                    element.fadeOut(function() {
                        element.css({opacity: 0, top: "0px"});
                    })
                }, timeout);
            }(element));
        });

        index = (index >= itemsCount) ? 1 : index+1;
    }
}

function adjustHeadlinerHeight() {
    var windowHeight = $(window).height();

    $('.headliner').css({'height':windowHeight+'px'});
}

function loadFeed () {
    var imagesData, likesData, id, i, x, y, imagesArray,
        postsUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g',
        imagesUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?fields=attachments%7Bsubattachments%7Bmedia%7Bimage%7Bsrc%7D%7D%7D%7D&access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g',
        likesCommentsUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?fields=link%2Ccomments.limit(1).summary(true)%2Clikes.limit(1).summary(true)&access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g'

    $.when(
        $.getJSON(postsUrl, function(data) {
            postsData = data.data;
        }),
        $.getJSON(imagesUrl, function(data) {
            imagesData = data.data;
        }),
        $.getJSON(likesCommentsUrl, function(data) {
            extraDetailsData = data.data;
        })
    ).then(function() {
        for (i=0; i < postsData.length; i++) {
            id = postsData[i].id;
            if (!postsData[i].message) {
                postsData[i].message = postsData[i].story;
            }

            for (x=0; x < imagesData.length; x++) {
                if ((id === imagesData[x].id) && imagesData[x].attachments) {
                    postsData[i].image = imagesData[x].attachments.data[0].subattachments.data[0].media.image.src;
                }
            }

            for (x=0; x < extraDetailsData.length; x++) {
              if (id === extraDetailsData[x].id) {
                  postsData[i].likes = extraDetailsData[x].likes.summary.total_count;
                  postsData[i].comments = extraDetailsData[x].comments.summary.total_count;
                  postsData[i].link = extraDetailsData[x].link || ('https://www.facebook.com/' + postsData[i].id);
              }
            }
        }

        printFeed(postsData);
    });
}

function printFeed (postsData) {
    var i, message, comments, likes, createdTime, link, hideOnSmallScreen,
        feed = $('.feed'),
        postsShowLimit = 15;
        mobileSizeShowLimit = 9;

    for (i=0; i < postsShowLimit; i++) {
        if (postsData[i].image) {
            image = '<img src="' + postsData[i].image + '" />';
        } else {
            image = '';
        }

        hideOnSmallScreen = i > mobileSizeShowLimit ? 'hideOnSmallScreen':'';
        message = '<p>' + postsData[i].message + '</p>';
        createdTime = '<span class="post_date">' + new Date(postsData[i].created_time).toDateString() + '</span>';
        comments = '<span class="post_count"><i class="fa fa-comments"></i>' + postsData[i].comments + '</span>';
        likes = '<span class="post_count"><i class="fa fa-thumbs-up"></i>' + postsData[i].likes + '</span>';
        link = '<a class="post_link" href="'+ postsData[i].link +'" target="_blank">view on Facebook <i class="fa fa-facebook"></i></a>'

        feed.append(
          '<div class="post_wrapper grid-item ' + hideOnSmallScreen + '">' +
              '<div class="post_image">' +
                  image +
              '</div>' +
              '<div class="post_message">' +
                  message +
                  createdTime +
              '</div>' +
              '<div class="post_footer">' +
                  comments +
                  likes +
                  link +
              '</div>' +
          '</div>'
        );
    }

    initMasonryGrid();
}

function initMasonryGrid() {
    // init Masonry
    var $grid = $('.grid').masonry({
      columnWidth: '.grid-sizer',
      gutter: '.gutter-sizer',
      itemSelector: '.grid-item',
      percentPosition: true
    });
    // layout Masonry after each image loads
    $grid.imagesLoaded().progress( function() {
      $grid.masonry('layout');
    });
}

// Adding easing function to JQuery for use in animations
(function() {
    $.extend(jQuery.easing,{easeOutQuint:function(x,t,b,c,d) {
        t /= d;
    	t--;
    	return c*(t*t*t*t*t + 1) + b;
    }})
}());

function initLinkSmoothScroll() {
    $('a[href^="#"]').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
            $target = $(target),
            distance = Math.abs($(window).scrollTop() - $target.offset().top),
            timeperpixel = 0.92,
            time = Math.pow(distance, timeperpixel);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, time, 'swing');

        toggleMobileNav("up");
	});
}

function initGoogleMaps() {
    var myLatLng = {lat: -34.864970, lng: 138.645419};
    var image = 'images/map_marker.png';

    var map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 13
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        title: 'Windsor Gardens',
        icon: image
    });

    var styles = [
      {
        "stylers": [
          { "saturation": -100 },
          { "gamma": 0.66 },
          { "lightness": -61 }
        ]
      }
    ];

    map.setOptions({styles: styles});
}

function toggleMobileNav(slideFunction) {
    if ($('.header_mobile').css('display') !== "none") {
        switch (slideFunction) {
            case "up":
                $('.header').slideUp();
                break;
            case "toggle":
            default:
            $('.header').slideToggle();
            break;
        }
    }
}

function mobileNavChanges() {
    if ($(window).width() <= 767) {
        $('.header_logo h1').html('Connect With Us');
        $('.header_logo a').attr('href', '#social_wrapper');
        $('.header').css('display','none');
    } else {
        $('.header_logo h1').html('Adelaide <br />Concept Tiling');
        $('.header_logo a').attr('href', '#headliner_wrapper');
        $('.header').css('display','block');
    }
}

$(document).ready(function() {
    var resizeTimer, mobileNavTimer,
        headerFixedPos = false;

    initShowcaseSlide();

    initOwlCarousel();

    adjustHeadlinerHeight();

    initValidator();

    loadFeed();

    mobileNavChanges();

    $(window).resize( function() {
        clearTimeout(resizeTimer);
        mobileNavChanges();
        resizeTimer = setTimeout(adjustHeadlinerHeight, 10);
    });

    initSmoothScrollSettings();

    initLinkSmoothScroll();

    $(document).scroll(function() {
        if ($('.header_mobile').css('display') == "none") {
            if ($(document).scrollTop() > $('.headliner_wrapper').height() - 10 && headerFixedPos == false) {
                $('.header_wrapper').hide().addClass('header_fixed').fadeIn();
                headerFixedPos = true;
            } else if ($(document).scrollTop() < $('.headliner_wrapper').height() - 10 && headerFixedPos == true) {
                $('.header_wrapper').fadeOut( function() {
                    $(this).removeClass('header_fixed').show();
                });
                headerFixedPos = false;
            }
        }
    });

    $('.hamburger').click( function() {
        toggleMobileNav("toggle");
    });
});
