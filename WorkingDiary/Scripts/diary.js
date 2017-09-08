var minYear;
var maxYear;
var activeYear;
var actualMonth;
var activeMonth;
var months = ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"];
var middleOpacity = 0.3;

function initYearControl(minyear, maxyear) {

    minYear = minyear;
    maxYear = maxyear;

    var yearcontrol = document.getElementById("ycontrol");
    
    for (year = minYear; year <= maxYear; year++) {
        var span = document.createElement("span");
        var textNode = document.createTextNode(year.toString());
        span.appendChild(textNode);
        span.id = year.toString();
        span.className += " year";
        if (year === maxYear) {
            span.style.left = "50%";
            span.style.opacity = 1;
            activeYear = year;
        }
        else if (year === maxYear - 1) {
            span.style.left = "25%";
            span.style.opacity = middleOpacity;
        }
        else {
            span.style.left = "12%"
            span.style.opacity = 0;
        }
        yearcontrol.appendChild(span);
    }
}

function initMonthControl(actualmonth) {

    actualMonth = actualmonth - 1;

    var yearcontrol = document.getElementById("mcontrol");

    for (month = 0; month <= 11; month++) {
        var span = document.createElement("span");
        var textNode = document.createTextNode(months[month]);
        span.appendChild(textNode);
        span.id = month.toString();
        span.className += " month";
        if (month === actualMonth) {
            span.style.left = "50%";
            span.style.opacity = 1;
            activeMonth = month;
        }
        else if (month === actualMonth - 1) {
            span.style.left = "25%";
            span.style.opacity = middleOpacity;
        }
        else if (month === actualMonth + 1) {
            span.style.left = "75%";
            span.style.opacity = middleOpacity;
        }
        else if (month > actualMonth + 1) {
            span.style.left = "88%"
            span.style.opacity = 0;
        }
        else {
            span.style.left = "12%"
            span.style.opacity = 0;
        } 
        yearcontrol.appendChild(span);
    }
}

document.getElementById("yleft").addEventListener("click", function () {
    if (activeYear !== maxYear) {
        var new_act_span = document.getElementById((activeYear + 1).toString());
        new_act_span.style.left = "50%";
        new_act_span.style.opacity = 1;
        var old_act_span = document.getElementById((activeYear).toString());
        old_act_span.style.left = "25%";
        old_act_span.style.opacity = middleOpacity;
        if (activeYear !== minYear) {
            var last_vis_span = document.getElementById((activeYear - 1).toString());
            last_vis_span.style.left = "12%";
            last_vis_span.style.opacity = 0;
        }
        if (activeYear + 2 <= maxYear) {
            var first_vis_span = document.getElementById((activeYear + 2).toString());
            first_vis_span.style.left = "75%";
            first_vis_span.style.opacity = middleOpacity;
        }

        activeYear = activeYear + 1;
    }
});

document.getElementById("yright").addEventListener("click", function () {
    if (activeYear !== minYear) {
        var new_act_span = document.getElementById((activeYear - 1).toString());
        new_act_span.style.left = "50%";
        new_act_span.style.opacity = 1;
        var old_act_span = document.getElementById((activeYear).toString());
        old_act_span.style.left = "75%";
        old_act_span.style.opacity = middleOpacity;
        if (activeYear !== maxYear) {
            var last_vis_span = document.getElementById((activeYear + 1).toString());
            last_vis_span.style.left = "88%";
            last_vis_span.style.opacity = 0;
        }
        if (activeYear - 2 >= minYear) {
            var first_vis_span = document.getElementById((activeYear - 2).toString());
            first_vis_span.style.left = "25%";
            first_vis_span.style.opacity = middleOpacity;
        }
        
        activeYear = activeYear - 1;
    }
});

document.getElementById("mleft").addEventListener("click", function () {
    if (!((activeMonth === 11) || (activeMonth === actualMonth && activeYear === maxYear))) {
        var new_act_span = document.getElementById((activeMonth + 1).toString());
        new_act_span.style.left = "50%";
        new_act_span.style.opacity = 1;
        var old_act_span = document.getElementById((activeMonth).toString());
        old_act_span.style.left = "25%";
        old_act_span.style.opacity = middleOpacity;
        if (activeMonth !== 0) {
            var last_vis_span = document.getElementById((activeMonth - 1).toString());
            last_vis_span.style.left = "12%";
            last_vis_span.style.opacity = 0;
        }
        if (activeMonth + 2 <= 11) {
            var first_vis_span = document.getElementById((activeMonth + 2).toString());
            first_vis_span.style.left = "75%";
            first_vis_span.style.opacity = middleOpacity;
        }

        activeMonth = activeMonth + 1;
    }
});

document.getElementById("mright").addEventListener("click", function () {
    if (activeMonth !== 0) {
        var new_act_span = document.getElementById((activeMonth - 1).toString());
        new_act_span.style.left = "50%";
        new_act_span.style.opacity = 1;
        var old_act_span = document.getElementById((activeMonth).toString());
        old_act_span.style.left = "75%";
        old_act_span.style.opacity = middleOpacity;
        if (activeMonth !== 11) {
            var last_vis_span = document.getElementById((activeMonth + 1).toString());
            last_vis_span.style.left = "85%";
            last_vis_span.style.opacity = 0;
        }
        if (activeMonth - 2 >= 0) {
            var first_vis_span = document.getElementById((activeMonth - 2).toString());
            first_vis_span.style.left = "25%";
            first_vis_span.style.opacity = middleOpacity;
        }

        activeMonth = activeMonth - 1;
    }
});




    