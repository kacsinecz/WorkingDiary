var minYear;
var maxYear;
var activeYear;
var actualMonth;
var activeMonth;
var months = ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"];
var middleOpacity = 0.3;

function getDiaryData() {
    $.ajax({
        url: "/Diary/GetDiaryData/?year=" + activeYear.toString() + "&month=" + (activeMonth + 1).toString(),
        type: 'GET',
        success: updateDiaryTable,
        error: showError
    });
}

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

        getDiaryData();
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

        getDiaryData();
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

        getDiaryData();
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

        getDiaryData();
    }
});

function updateDiaryTable(response) {

    var header = [
        { text: "Deň", width: "8%" },
        { text: "Projekt", width: "20%" },
        { text: "Popis", width: "48%" },
        { text: "Hodiny", width: "7%" },
        { text: "Editácia", width: "19%" }
    ];
    var table = document.getElementById("diarytable");
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    var tr = document.createElement("tr");
    table.appendChild(tr);
    header.forEach(function (element) {
        var th = document.createElement("th");
        th.appendChild(document.createTextNode(element.text));
        th.style.width = element.width;
        tr.appendChild(th);
    });

    var row = 0;
    var previous_day = 0;
    var td2 = null;
    var td3 = null;
    var td4 = null;

    response.forEach(function (element) {
        if (previous_day != element.day) {
            var tr = document.createElement("tr");
            switch (element.projectId) {
                case 1001:
                    tr.className += " dov";
                    break;
                case 1002:
                    tr.className += " sluz";
                    break;
                case 1003:
                    tr.className += " pn";
                    break;
                case 1004:
                    tr.className += " nepl";
                    break;
                default:
                    if (row % 2 !== 0) {
                        tr.className += " oddrow";
                    }
            };

            table.appendChild(tr);
            var td1 = document.createElement("td");
            if (element.holiday === true) {
                td1.style.color = "red";
            }
            var div1 = document.createElement("div");
            div1.appendChild(document.createTextNode(element.day));
            td1.appendChild(div1);
            var div2 = document.createElement("div");
            div2.appendChild(document.createTextNode(element.nameOfDay));
            div2.style.fontSize = "12px";
            td1.appendChild(div2);
            tr.appendChild(td1);
            td2 = document.createElement("td");
            tr.appendChild(td2);
            td3 = document.createElement("td");
            tr.appendChild(td3);
            td4 = document.createElement("td");
            tr.appendChild(td4);
            var td5 = document.createElement("td");
            td5.appendChild(document.createTextNode(""));
            tr.appendChild(td5);
            row++;
        }

        if (td2 != null) {
            var div_prname = document.createElement("div");
            div_prname.appendChild(document.createTextNode(element.projectName));
            td2.appendChild(div_prname);
        }

        if (td3 != null) {
            var div_activity = document.createElement("div");
            div_activity.appendChild(document.createTextNode(element.activity));
            td3.appendChild(div_activity);
        }
        
        if (td4 != null) {
            var div_hours = document.createElement("div");
            div_hours.appendChild(document.createTextNode(element.hours));
            td4.appendChild(div_hours);
        }
        
        previous_day = element.day;
    });
};

function showError(error) {
    $(this).remove();
    alert("Error: " + error.statusText);
};






    