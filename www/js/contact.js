$("document").ready(function () {
    $('#contact-form').submit(function () {
        // Prevent page from refreshing
        event.preventDefault();

        // Get form fields
        var name = $("#contact-name");
        var email = $("#contact-email");
        var message = $("#contact-msg");

        // Check if all fields are filled out.
        name.blur()
        email.blur()
        message.blur()
        if (errors.email || errors.name || errors.msg) {
            return false;
        }

        // Disable submit button to pseudo-prevent spam
        $("#contact-form button[type='submit']").prop("disabled", true).html("Sending..");

        // Submit form
        $.ajax({
            type: 'POST',
            url: './contact',
            data: {
                name: name.val(),
                email: email.val(),
                message: message.val()
            },
            success: function () {
                // Set name of sender
                $("#formUser").html($("#contact-name").val());

                // Show modal
                $("#formSuccessDialog").modal("show");

                // Disable button and inputs
                $("#contact-form .form-control").each(function () {
                    $(this).prop("disabled", true);
                });

                $("#contact-form button[type='submit']").html("Message was sent!");
            },
            error: function (err) {
                console.log(err);
            }
        });
        return false;
    });
});