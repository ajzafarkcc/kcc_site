var last; // record which field was last edited, so a date change modifies the expected field

function weeks_left(d) {
    let sem_end = new Date(2021,11,17);
    let one_week = 1000 * 60 * 60 * 24 * 7;
    document.getElementById("weeksleft").value = Math.ceil((sem_end - new Date(d)) / one_week);
}

function wkhrs_updated() {
    last = wkhrs_updated;
    document.getElementById("credit").value = (document.getElementById("wkhrs").value * document.getElementById("weeksleft").value / 24).toFixed(2);
}

function credit_updated() {
    last = credit_updated;
    document.getElementById("wkhrs").value = (document.getElementById("credit").value * 24 / document.getElementById("weeksleft").value).toFixed(2);
}

last = wkhrs_updated
window.onload = function() {
    let start = document.getElementById("daystart");
    let n = new Date();
    start.value = n.getFullYear() + "-" +
        ("0" + (n.getMonth() + 1)).slice(-2) + "-" +
        n.getDate();
    start.addEventListener("change", function() { weeks_left(start.value); last(); });
    document.getElementById("wkhrs").addEventListener("change", wkhrs_updated);
    document.getElementById("credit").addEventListener("change", credit_updated);
    weeks_left(start.value);
};