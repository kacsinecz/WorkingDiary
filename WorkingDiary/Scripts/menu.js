function setActive(viewname) {
    var active_item = document.getElementById(viewname);
    active_item.className = "active";
    return viewname;
};

$("#logout").click(function () {
    $.ajax({
        url: "/Account/LogOff",
        type: 'POST',
        success: function (response) {
            //alert(response);
        },
        error: function (err) {
            //alert(err);
        }
    });
});