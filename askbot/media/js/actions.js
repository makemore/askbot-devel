$(function () {

    $.ajax({
        url: "http://localhost:8000/api/v1/get-action-count/",
        method: "GET",
        cache: false,
        dataType: "text",
        success: function (response) {
            alert(response);
            console.log(response)
        },
        error: function (error) {
            alert(error);
        }
    });

    $("#actions-button").on("click", function () {
        alert("hi!");
    })
});
