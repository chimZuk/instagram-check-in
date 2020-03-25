var container = document.getElementById("container");
var loading = document.getElementById("loading");

function toggle_loading(state) {
    state ? loading.style.display = "block" : loading.style.display = "none";
}

function on_container_scroll() {
    var container_boundaries = document.getElementById("container").getBoundingClientRect();
    var container_height = container_boundaries.bottom - container_boundaries.top;
    var cards = document.getElementsByClassName("card");

    for (var i = 0; i < cards.length; i++) {
        var temp_boundaries = cards[i].getBoundingClientRect();
        var diff = container_boundaries.top - temp_boundaries.top;
        var diff_percentage = diff / container_height;
        var percentage = (diff_percentage < -0.20 || diff_percentage > 0.20) ? (0.2 / diff_percentage) : 1;
        cards[i].style.opacity = Math.abs(percentage);
    }
}

function home_view() {
    return `
        <div class="card">
            <h1>Hey Bud!</h1>
            <p class="emoji">😉</p>
        </div>
        <div class="card">
            <h1>I've made up 10k followers for my profile.</h1>
            <p class="emoji">👨‍💻</p>
        </div>
        <div class="card">
            <h1>So now...</h1>
            <p class="emoji">👐</p>
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
        <div class="card">
            <h1>I will review submissions and make some of them live!</h1>
            <p class="emoji">🎤</p>
        </div>
        <div class="card">
            <h1>As well as feature all ideas in my Instagram Stories!</h1>
            <p class="emoji">🤩</p>
        </div>
        <div class="card">
            <h1>Bring it on! 🙃</h1>
            <form>
                <div class="input-block">
                    <span class="at-element">@</span>
                    <input type="text" name="nickname" placeholder="nickname"></input>
                </div
            </form>
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