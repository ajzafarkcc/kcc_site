// initialize variables
var sem_map = {
    "Fall 2021" : ["2021-08-30", "2021-12-17"],
    "Spring 2022" : ["2022-01-18", "2022-05-09"],
    "Summer 2022" : ["2022-05-16", "2022-08-04"]
}
var cur_sem = "21fa";
// record which field was last edited,
// so a date change modifies the expected field
var last_updated_field;

// Determine which semester the given date is in
function find_sem(date_in) {
    let d = new Date(date_in);
    for (const [sem, dates] of Object.entries(sem_map)) {
        if (d < new Date(dates[1])) {
            cur_sem = sem;
            break;
        } else if (sem == Object.entries(sem_map).pop()[0]) {
            cur_sem = "future";
        }
    }
    document.getElementById("sem").textContent = cur_sem;
    if (cur_sem != "future") {
        document.getElementById("sem_start").textContent = sem_map[cur_sem][0];
        document.getElementById("sem_end").textContent = sem_map[cur_sem][1];
    } else {
        document.getElementById("sem_start").textContent = "unknown";
        document.getElementById("sem_end").textContent = "unknown";
    }
}

function weeks_left(d) {
    if (cur_sem == "future") {
        document.getElementById("weeksleft").value = 0;
    } else {
        let sem_st = new Date(sem_map[cur_sem][0]);
        const one_week = 1000 * 60 * 60 * 24 * 7;
        d = new Date(d);
        // If the given date is before the start of the semestr, use the
        // semester start date instead of the given date
        document.getElementById("weeksleft").value =
            Math.ceil((new Date(sem_map[cur_sem][1]) -
                       (d < st ? st : d)) / one_week);
    }
}

// credit = hours_per_week * weeks_left / 24
function wkhrs_updated() {
    last_updated_field = wkhrs_updated;
    document.getElementById("credit").value =
        (document.getElementById("wkhrs").value *
            document.getElementById("weeksleft").value / 24).toFixed(2);
}

// hours per week = credit * 24 / weeks_left
function credit_updated() {
    last_updated_field = credit_updated;
    let wleft = document.getElementById("weeksleft").value;
    // weeks left is 0 for future semesters, so avoid dividing by 0
    if (wleft) {
        document.getElementById("wkhrs").value =
            (document.getElementById("credit").value * 24 / wleft).toFixed(2);
    } else {
        document.getElementById("wkhrs").value = 0;
    }
}

last_updated_field = wkhrs_updated
window.addEventListener("load", function() {
    var start = document.getElementById("daystart");
    // by default start with today
    let n = new Date();
    start.value = n.getFullYear() + "-" +
        ("0" + (n.getMonth() + 1)).slice(-2) + "-" +
        n.getDate();
    find_sem(n);
    start.addEventListener("change", function() {
        find_sem(start.value);
        weeks_left(start.value);
        last_updated_field();
    });
    document.getElementById("wkhrs").addEventListener("change", wkhrs_updated);
    document.getElementById("credit").addEventListener("change", credit_updated);
    weeks_left(start.value);
    wkhrs_updated();
});
