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
    
    $(document).ready(function() {
        initShowcaseSlide();

        initOwlCarousel();
    });
}());