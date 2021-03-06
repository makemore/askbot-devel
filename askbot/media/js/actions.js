$(function () {

    // using jQuery
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        // these HTTP methods do not require CSRF protection
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    $.ajaxSetup({
        beforeSend: function (xhr, settings) {
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });


    var get_todo_action_count = function () {
        $.ajax({
            url: "/api/v1/get-action-count/",
            method: "GET",
            cache: false,
            dataType: "text",
            success: function (response) {
                $(".action-count").text(response);
            },
            error: function (error, textStatus) {
                alert(textStatus);
            }
        });
    };

    get_todo_action_count();

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


    var getActions = function (state) {
        currentFilter = state;
        $.ajax({
            url: "/api/v1/get-action-list/?state=" + state,
            method: "GET",
            cache: false,
            dataType: "json",
            success: function (response) {
                $(".actions-list").html("");
                response.forEach(function (action) {
                    var source = document.getElementById("actions-row-template").innerHTML;
                    var template = Handlebars.compile(source);
                    var context = {text: action.text, id: action.id, link: action.link};
                    var html = template(context);
                    $(".actions-list").append(html);
                });
            },
            error: function (error, textStatus) {
                alert(textStatus);
            }
        })
    };

    var currentFilter = "all";

    $(document.body).on("click", "#action-filter-todo", function () {
        getActions("todo");
    });

    $(document.body).on("click", "#action-filter-done", function () {
        getActions("done");
    });

    $(document.body).on("click", "#action-filter-all", function () {
        getActions("all");
    });

    $(document.body).on("click", "#action-filter-irrelevant", function () {
        getActions("irrelevant");
    });

    $("#actions-button").on("click", function () {
        var source = document.getElementById("actions-container-template").innerHTML;
        var template = Handlebars.compile(source);
        var context = {title: "My New Post", body: "This is my first post!"};
        var html = template(context);
        $(this).parent().append(html);
        getActions("todo");
    });


    $(document.body).on("click", "#action-mark-as-irrelevant", function () {
        $.ajax({
            url: "/api/v1/change-action-state/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({actionId: $(this).parent().parent().data("id"), state: "irrelevant"}),
            success: function (response) {
                getActions(currentFilter);
                get_todo_action_count();
            },
            error: function (error, textStatus) {
                alert(textStatus);
            }
        });
    });

    $(document.body).on("click", "#action-mark-as-done", function () {
        $.ajax({
            url: "/api/v1/change-action-state/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({actionId: $(this).parent().parent().data("id"), state: "done"}),
            success: function (response) {
                getActions(currentFilter);
                get_todo_action_count();
            },
            error: function (error, textStatus) {
                alert(textStatus);
            }
        });
    });

    $(document.body).on("click", "#action-mark-as-todo", function () {
        $.ajax({
            url: "/api/v1/change-action-state/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({actionId: $(this).parent().parent().data("id"), state: "todo"}),
            success: function (response) {
                getActions(currentFilter);
                get_todo_action_count();
            },
            error: function (error, textStatus) {
                alert(textStatus);
            }
        });
    });


    // Add user to topic stuff


    var threadId = askbot['data']['questionId'];

    $("#add-email-to-topic-form").on("submit", function (e) {
        e.preventDefault();
        var val = $(this).find("#add-email-to-topic").val();
        $(this).find("#add-email-to-topic").val("");
        $.ajax({
            url: "/api/v1/add-email-to-topic/",
            type: "POST",
            dataType: "json",
            data: JSON.stringify({email: val, threadId: threadId}),
            success: function (response) {
                console.log("ok");
                var el = $("<div style='color:#4a757f;'>Email added</div>").appendTo($("#add-email-to-topic-form"));
                el.delay(3000).fadeOut(1000);
            },
            error: function (error, textStatus) {
                alert(textStatus);
            }
        });

        return false;    //<---- Add this line
    });


});
