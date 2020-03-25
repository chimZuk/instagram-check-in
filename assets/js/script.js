var container = document.getElementById("container");
var loading = document.getElementById("loading");

function toggle_loading(state) {
    state ? loading.style.display = "block" : loading.style.display = "none";
}

function on_container_scroll() {
    var container_boundaries = document.getElementById("container").getBoundingClientRect();
    var container_height = container_boundaries.bottom - container_boundaries.top;
    var card_boundaries_percentage_string = "";
    var cards = document.getElementsByClassName("card");

    for (var i = 0; i < cards.length; i++) {
        var temp_boundaries = cards[i].getBoundingClientRect();
        var diff = container_boundaries.top - temp_boundaries.top;
        var diff_percentage = diff / container_height;
        var percentage = (diff_percentage < -0.30 || diff_percentage > 0.30) ? (0.3 / diff_percentage) : 1;
        card_boundaries_percentage_string += percentage + "\n";
        cards[i].style.opacity = Math.abs(percentage);
    }

    console.log(card_boundaries_percentage_string)
}

function home_view() {
    return `
        <div class="card">
            <h1>Hey Bud!</h1>
            <p class="emoji">😉</p>
        </div>
        <div class="card">
            <h1>What you see here...</h1>
            <p class="emoji">😏</p>
        </div>
        <div class="card">
            <h1>And experiencing...</h1>
            <p class="emoji">🤤</p>
        </div>
        <div class="card">
            <h1>Is in fact...</h1>
            <p class="emoji">🤔</p>
        </div>
        <div class="card">
            <h1>Nothing that serious.</h1>
            <p class="emoji">😅</p>
        </div>
        <div class="card">
            <h1>Just leave me some ideas for a "Swipe Up" page!</h1>
            <p class="emoji">🤑</p>
        </div>
    `;
}

function router(name, sup_data = null) {
    switch (name) {
        case "home": {
            container.innerHTML = home_view();
            break;
        }
    }
}

router("home");