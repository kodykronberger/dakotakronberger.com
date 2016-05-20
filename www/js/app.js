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
        validateName(this);
    });
    $("#contact-email").on("blur", function(){
        validateEmail(this);
    });
    $("#contact-msg").on("blur", function(){
        validateMessage(this);
    });
}

function validateName( field ) {
    if(field.value.length > 30 || field.value.length < 1) {
            $(field).parent().addClass("has-error");
            $(field).next(".help-inline").fadeIn();
            errors.name = true;
        } else {
            $(field).parent().removeClass("has-error");
            $(field).next(".help-inline").fadeOut();
            errors.name = false;
        }
}

function validateEmail ( field ) {
    var reg = /\S+@\S+\.\S+/;
        if(!reg.test(field.value) || field.value.length < 1) {
            $(field).parent().addClass("has-error");
            $(field).next(".help-inline").fadeIn();
            errors.email = true;
        } else {
            $(field).parent().removeClass("has-error");
            $(field).next(".help-inline").fadeOut();
            errors.email = false;
        }
}

function validateMessage ( field ) {
    if(field.value.length > 500 || field.value.length < 1) {
            $(field).parent().addClass("has-error");
            $(field).next(".help-inline").fadeIn();
            errors.msg = true;
        } else {
            $(field).parent().removeClass("has-error");
            $(field).next(".help-inline").fadeOut();
            errors.msg = false;
        }
}