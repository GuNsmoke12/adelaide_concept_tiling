var postsData;

function initShowcaseSlide () {
    var duration = 300;

    $('.showcase-popup').css('display','none');

    $('.showcase-item').children().click( function (e) {
        e.preventDefault();
        $(this).parent().find('.showcase-popup').stop().fadeToggle(duration);
    })

    $('.showcase-item').mouseenter( function () {
        $(this).find('.showcase-popup').stop().fadeIn(duration);
    }).mouseleave( function () {
        $(this).find('.showcase-popup').stop().fadeOut(duration);
    });
}

function initOwlCarousel () {
    $("#owl-carousel").owlCarousel({

            // Most important owl features
        items : 5,
        itemsCustom : false,
        itemsDesktop : [1199,4],
        itemsDesktopSmall : [980,3],
        itemsTablet: [768,2],
        itemsTabletSmall: false,
        itemsMobile : [479,1],
        singleItem : true,
        itemsScaleUp : true,

        //Basic Speeds
        slideSpeed : 200,
        paginationSpeed : 800,
        rewindSpeed : 1000,

        //Autoplay
        autoPlay : true,
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
        afterInit: false, 
        beforeMove: false, 
        afterMove: false,
        afterAction: false,
        startDragging : false,
        afterLazyLoad : false

    })
}


function loadFeed () {
    var imagesData, profileImage, id, i, x, y, imagesArray,
        postsUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g',
        imagesUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?fields=attachments%7Bsubattachments%7Bmedia%7Bimage%7Bsrc%7D%7D%7D%7D&access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g',
        profilePicUrl = "https://graph.facebook.com/v2.5/adelaideconcepttiling?fields=picture&access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g";

    $.when(
        $.getJSON(postsUrl, function(data) {
            postsData = data.data;
        }),
        $.getJSON(imagesUrl, function(data) {
            imagesData = data.data;
        }),
        $.getJSON(profilePicUrl, function(data) {
            profileImage = data.picture.data.url;
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
        }

        printFeed(postsData, profileImage);
    });
}

function printFeed (postsData, profileImage) {
    var i, image, message, header, profilePic,
        feed = $('.feed');

    for (i=0; i < postsData.length; i++) {
        if (postsData[i].image) {
            image = '<div class="post_image grid-parent grid-40 tablet-grid-50"><img src="' + postsData[i].image + '"></div>';
        } else {
            image = '';
        }

        profilePic = '<img class="profile_pic" src="' + profileImage + '">';
        header = '<h6>Adelaide Concept Tiling</h6>';
        message = '<p>' + postsData[i].message + '</p>';

        feed.append('<div class="post">' +
                        image +
                        '<div class="post_message">' +
                            profilePic +
                            header +
                            message +
                        '</div>' +
                    '</div>'
        )

        $('.post').has('img').find('.post_message').addClass('grid-parent grid-60 tablet-grid-50');
    }
}

$(document).ready(function() {
    initShowcaseSlide();

    initOwlCarousel();

    loadFeed();
});
