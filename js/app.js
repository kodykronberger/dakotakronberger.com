var errors = {
    "name": false,
    "email": false,
    "msg": false
};

// Initial function
$(document).ready(function(){
    initializeNavbarLinks();
    initializePagerArrows();
    initializeValidateContact()
    $('[data-toggle="tooltip"]').tooltip()
});

// Creates scrolling events on all navbar links
function initializeNavbarLinks() {
    $("#navbar ul li a").each(function(){
        $(this).click(function(){
            removeAllActiveClassesFromNav();
            $(this).parent().addClass("active");
            if($(this).attr("data-scrollTo") == "top") {
                $('html, body').animate({
                    scrollTop: 0
                }, 700);
            } else if($(this).attr("data-scrollTo") != null) {
                $('html, body').animate({
                    scrollTop: $($(this).attr("data-scrollTo")).offset().top - 40
                }, 700);
            }
        });
    });
    
    $(".navbar-brand").click(function(){
        removeAllActiveClassesFromNav();
    });
}

// Removes all active states from the navbar
function removeAllActiveClassesFromNav(){
    $("#navbar li").each(function(){
        $(this).removeClass("active");
    });
}

// Effects when using pager
function initializePagerArrows() {
    $("li.next a").on("mouseover", function(){
        
    }).on("mouseout", function(){
        
    });
    $("li.prev a").on("mouseover", function(){
        
    }).on("mouseout", function(){
        
    });
}

// Validates input fields on text boxes
function initializeValidateContact() {
    $("#contact-name").on("blur", function(){
        if(this.value.length > 30) {
            $(this).parent().addClass("has-error");
            $(this).next(".help-inline").fadeIn();
            errors.name = true;
        } else {
            $(this).parent().removeClass("has-error");
            $(this).next(".help-inline").fadeOut();
            errors.name = false;
        }
    });
    $("#contact-email").on("blur", function(){
        var reg = /\S+@\S+\.\S+/;
        if(!reg.test(this.value) && this.value.length > 0) {
            $(this).parent().addClass("has-error");
            $(this).next(".help-inline").fadeIn();
            errors.email = true;
        } else {
            $(this).parent().removeClass("has-error");
            $(this).next(".help-inline").fadeOut();
            errors.email = false;
        }
    });
    $("#contact-msg").on("blur", function(){
        if(this.value.length > 500) {
            $(this).parent().addClass("has-error");
            $(this).next(".help-inline").fadeIn();
            errors.msg = true;
        } else {
            $(this).parent().removeClass("has-error");
            $(this).next(".help-inline").fadeOut();
            errors.msg = false;
        }
    });
}