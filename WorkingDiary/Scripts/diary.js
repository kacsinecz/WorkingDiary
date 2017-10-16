var minYear;
var maxYear;
var activeYear;
var actualMonth;
var activeMonth;
var months = ["január", "február", "marec", "apríl", "máj", "jún", "júl", "august", "september", "október", "november", "december"];
var middleOpacity = 0.3;

function getDiaryData() {
    /*$.ajax({
        url: "/Diary/GetDiaryData/?year=" + activeYear.toString() + "&month=" + (activeMonth + 1).toString(),
        type: 'GET',
        success: updateDiaryTable,
        error: showError
    });*/

    $(function () {
        $('#diarydiv').load("/Diary/DiaryData/?year=" + activeYear.toString() + "&month=" + (activeMonth + 1).toString());
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

function initArrows() {

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
}

function updateDiaryTable(response) {

    var header = [
        { text: "Deň", width: "12%" },
        { text: "Projekt", width: "20%" },
        { text: "Popis", width: "46%" },
        { text: "Hodiny", width: "7%" },
        { text: "Editácia", width: "15%" }
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
        if (row == 0) {


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

                var td_div = document.createElement("div");
                td_div.style.height = "45px";

                var left_td_div = document.createElement("div");
                left_td_div.className += "left_td_div";


                var div1 = document.createElement("div");
                div1.appendChild(document.createTextNode(element.day));
                left_td_div.appendChild(div1);
                var div2 = document.createElement("div");
                div2.appendChild(document.createTextNode(element.nameOfDay));
                div2.style.fontSize = "12px";
                left_td_div.appendChild(div2);

                var right_td_div = document.createElement("div");
                right_td_div.className += " right_td_div";
                var img = document.createElement("img");
                img.src = "/images/Data-Add-Row-icon.png";
                img.alt = "Nový riadok";
                img.className += " newrowicon";
                img.id = "newrow" + element.day;
                img.addEventListener("click", addNewRow);

                right_td_div.appendChild(img);

                td_div.appendChild(left_td_div);
                td_div.appendChild(right_td_div);
                td1.appendChild(td_div);

                tr.appendChild(td1);
                td2 = document.createElement("td");
                tr.appendChild(td2);
                td3 = document.createElement("td");
                if (td3 != null) {
                    var div_activity = document.createElement("div");
                    div_activity.appendChild(document.createTextNode(element.activity));
                    td3.appendChild(div_activity);
                    td3.id = "td3" + element.day;

                    var input = document.createElement("input");
                    input.type = "text";
                    input.style.width = "120%";
                    input.style.margin = "auto";

                    var div_textbox = document.createElement("div");
                    div_textbox.style.border = "1px solid red";
                    //div_textbox.appendChild(input);
                    //div_textbox.innerHTML = "<input type='text' style='width:100%' >";
                    td3.appendChild(div_textbox);
                }
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
                td2.id = "td2" + element.day;
            }



            if (td4 != null) {
                var div_hours = document.createElement("div");
                div_hours.appendChild(document.createTextNode(element.hours));
                td4.appendChild(div_hours);
                td4.id = "td4" + element.day;
            }

            previous_day = element.day;
        }});
};

function showError(error) {
    $(this).remove();
    alert("Error: " + error.statusText);
};

function addNewRow(event) {
    var id = this.id;
    var day = id.substr(6, id.length - 6);

    var td2 = document.getElementById("td2" + day);
    if (td2 != null) { 
        var div_dropdown = document.createElement("div");
        div_dropdown.id = "div_project_" + day.toString() + "_" + id_in_days[day - 1];
        var dropdown_template = document.getElementById("dropdown_template").cloneNode(true);
        dropdown_template.style.display = "block";
        dropdown_template.id = "project_" + day.toString() + "_" + id_in_days[day-1];
        div_dropdown.appendChild(dropdown_template);
        td2.appendChild(div_dropdown);
    }

    var td3 = document.getElementById("td3" + day);
    if (td3 != null) {
        var div_textbox = document.createElement("div");
        div_textbox.id = "div_activity_day_" + day.toString() + "_" + id_in_days[day - 1];
        div_textbox.className += " control_div";
        var input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.id = "activity_day_" + day.toString() + "_" + id_in_days[day - 1];
        div_textbox.appendChild(input);
        td3.appendChild(div_textbox);
    }

    var td4 = document.getElementById("td4" + day);
    if (td4 != null) {
        var div_textbox = document.createElement("div");
        div_textbox.className += " control_div";
        div_textbox.id = "div_hours_" + day.toString() + "_" + id_in_days[day - 1];
        var input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.id = "hours_" + day.toString() + "_" + id_in_days[day - 1];
        div_textbox.appendChild(input);
        td4.appendChild(div_textbox);
    }

    var td5 = document.getElementById("td5" + day);
    if (td5 != null) {
        var div_img = document.createElement("div");
        div_img.className += " control_div";
        var img_edit = document.createElement("img");
        img_edit.alt = "Zmeniť riadok";
        img_edit.src = "/images/edit-icon.png";
        img_edit.title = "Editovať riadok";
        div_img.appendChild(img_edit);
        var img_delete = document.createElement("img");
        img_delete.alt = "Vymazať riadok";
        img_delete.src = "/images/Data-Delete-Row-icon.png";
        img_delete.title = "Vymazať riadok";
        div_img.appendChild(img_delete);
        var img_save = document.createElement("img");
        img_save.alt = "Uložiť riadok";
        img_save.src = "/images/Programming-Save-icon.png";
        img_save.title = "Uložiť riadok";
        img_save.id = "save_" + day.toString() + "_" + id_in_days[day - 1];
        img_save.addEventListener("click", SaveRow);
        
        div_img.appendChild(img_save);
        td5.appendChild(div_img);
    }
};

var activeBtn = null;

function changeDropdownBtn() {
    if (activeBtn != null) {
        activeBtn.innerHTML = event.target.innerHTML;
        activeBtn.dataContent = event.target.id;

        var elements = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = "none";
        }
    }
};

function setActiveBtn() {
    activeBtn = event.target;

    var elements = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "block";
    }
}; 

function outDropDown() {
    var elements = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.display = "none";
    }
}

var day;
var id_in_day;

function SaveRow() {
    var idents = this.id.split("_");
    day = idents[1];
    id_in_day = idents[2];
    var pr_id = 0;
    var act_text;

    var pr_div = document.getElementById("project_" + day.toString() + "_" + id_in_day.toString());
    if (pr_div == null) {
        return;
    }

    var elems = pr_div.getElementsByClassName("dropbtn");
    pr_id = elems[0].dataContent;
    
    

    var act = document.getElementById("activity_day_" + day.toString() + "_" + id_in_day.toString());
    if (act != null)
        act_text = act.value;

    var hour = document.getElementById("hours_" + day.toString() + "_" + id_in_day.toString());
    if (hour != null)
        hour_text = hour.value;

    $.ajax({
        url: "/Diary/SaveDiaryData/?year=" + activeYear.toString() + "&month=" + (activeMonth + 1).toString() +
        "&day=" + day.toString() + "&order=" + id_in_day.toString() + "&project_id=" + pr_id + "&activity=" + encodeURIComponent(act_text) +
        "&hours=" + hour_text,
        type: 'POST',
        success: makeRowUneditable,
        error: showError
    });
}

function makeRowUneditable() {

    var div1 = document.getElementById("div_project_" + day.toString() + "_" + id_in_day.toString());
    var elems = div1.getElementsByClassName("dropbtn");
    var project_text = elems[0].innerHTML;
    var project_text_node = document.createTextNode(project_text);
    div1.replaceChild(project_text_node, div1.getElementsByClassName("dropdown")[0]);
    
    var div2 = document.getElementById("div_activity_day_" + day.toString() + "_" + id_in_day.toString());
    var activity_text = (document.getElementById("activity_day_" + day.toString() + "_" + id_in_day.toString())).value;
    var activity_text_node = document.createTextNode(activity_text);
    div2.replaceChild(activity_text_node, div2.getElementsByTagName("input")[0]);

    var div3 = document.getElementById("div_hours_" + day.toString() + "_" + id_in_day.toString());
    var hours_text = (document.getElementById("hours_" + day.toString() + "_" + id_in_day.toString())).value;
    var hours_text_node = document.createTextNode(hours_text);
    div3.replaceChild(hours_text_node, div3.getElementsByTagName("input")[0]);


}






    