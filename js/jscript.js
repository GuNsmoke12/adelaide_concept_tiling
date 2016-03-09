(function () {
    "use strict";
    /*globals $:false */

    var initShowcaseSlide = function () {
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
    
    var initOwlCarousel = function () {
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
    
    
    var loadFeed = function() {
        var postsData, imagesData, profileImage, id, i, x, y, imagesArray,
            postsUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g',
            imagesUrl = 'https://graph.facebook.com/v2.5/adelaideconcepttiling/posts?fields=attachments%7Bsubattachments%7Bmedia%7Bimage%7Bsrc%7D%7D%7D%7D&access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g',
            profilePicUrl = "https://graph.facebook.com/v2.5/adelaideconcepttiling?fields=picture&access_token=1703185049966389%7CnLQl9at6iYAmMzH85XQINKXbf8g";

        $.when(
            $.getJSON(postsUrl, function(data) {
                postsData = data;
            }),
            $.getJSON(imagesUrl, function(data) {
                imagesData = data;
            }),
            $.getJSON(profilePicUrl, function(data) {
                profileImage = data.picture.data.url;
            })
        ).then(function() {
            if (postsData && imagesData) {
                console.log('json loaded');
                for (i=0; i < postsData.data.length; i++) {
                    id = postsData.data[i].id;
                    if (!postsData.data[i].message) {
                        postsData.data[i].message = postsData.data[i].story;
                    }
                    
                    for (x=0; x < imagesData.data.length; x++) {
                        if ((id === imagesData.data[x].id) && imagesData.data[x].attachments) {
                            postsData.data[i].image = imagesData.data[x].attachments.data[0].subattachments.data[0].media.image.src;
                            
                        }
                    }
                }
            }
            console.log(postsData);
            printFeed(postsData, profileImage);
        });
    }
    
    var printFeed = function (postsData, profileImage) {
        var i, image, message, header, profilePic,
            feed = $('.feed');
        
        for (i=0; i < postsData.data.length; i++) {
            if (postsData.data[i].image) {
                image = '<div class="post_image grid-parent grid-40 tablet-grid-50"><img src="' + postsData.data[i].image + '"></div>';
            } else {
                image = '';
            }
            
            profilePic = '<img class="profile_pic" src="' + profileImage + '">';
            header = '<h6>Adelaide Concept Tiling</h6>';
            message = '<p>' + postsData.data[i].message + '</p>';
            
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
}());