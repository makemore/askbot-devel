$(function () {
    $.ajax({
        url: "/api/v1/get-action-count/",
        method: "GET",
        cache: false,
        dataType: "text",
        success: function (response) {
            $(".action-count").text(response);
        },
        error: function (error) {
            alert(error);
        }
    });

    var closeActions = function () {
        $(".actions-container").remove();
    };

    $(document.body).on('click', ".actions-close", function () {
        closeActions();
    });

    $(document.body).on('click', ".action-row-menu-handle", function () {
        $(".action-row-menu").hide();
        $(this).parent().find(".action-row-menu").show();
    });

    $(document.body).on('mouseover', ".action-row", function () {
        $(this).find(".action-row-menu-handle").show();
    });

    $(document.body).on('mouseout', ".action-row", function () {
        $(this).find(".action-row-menu-handle").hide();
    });

    var getAllActions = function () {
        $.ajax({
            url: "/api/v1/get-action-list/",
            method: "GET",
            cache: false,
            dataType: "json",
            success: function (response) {
                response.forEach(function (action) {
                    var source = document.getElementById("actions-row-template").innerHTML;
                    var template = Handlebars.compile(source);
                    var context = {text: action.text, body: "This is my first post!"};
                    var html = template(context);
                    $(".actions-list").append(html);
                });
            },
            error: function (error) {
                alert(error);
            }
        })
    };


    $("#actions-button").on("click", function () {
        var source = document.getElementById("actions-container-template").innerHTML;
        var template = Handlebars.compile(source);
        var context = {title: "My New Post", body: "This is my first post!"};
        var html = template(context);
        $(this).parent().append(html);
        getAllActions();
    })


    // Add user to topic stuff


    var threadId = askbot['data']['questionId'];
    $("#add-email-to-topic").keypress(function (e) {
        if (e.which == 13) {
            var val = $(this).val();
            $(this).val("");

            $.ajax({
                url: "/api/v1/add-email-to-topic/",
                type: "POST",
                dataType: "json",
                data: JSON.stringify({email: val, threadId: threadId}),
                success: function (response) {
                    console.log("ok");
                },
                error: function (error) {
                    alert(error);
                }
            });

            return false;    //<---- Add this line
        }
    });


});
