var container = document.getElementById("container");
var loading = document.getElementById("loading");

var progress_percentage = 0;
var current_data = {
    nickname: "",
    incognito: false,
    content: ""
}

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

    progress_percentage = document.getElementById("container").scrollTop / (document.getElementById("container").scrollHeight - document.getElementById("container").clientHeight);
    document.getElementById("progress").style.right = (document.getElementById("container").scrollWidth - (document.getElementById("container").scrollWidth * progress_percentage)) + "px";
}

function switch_incognito(value) {
    document.getElementById("nickname-input").disabled = value;
    document.getElementById("nickname-input").value = "";
    current_data.incognito = value;
}

function update_field(field, value) {
    current_data[field] = value;
}

function form_submission() {

}

function submission_view() {
    return `
        <div class="card">
            <h1>Thank you for Your feedback!</h1>
            <p class="emoji">😉</p>
        </div>
    `;
}

function home_view() {
    return `
        <div class="card">
            <h1>Bring it on! 🙃</h1>
            <form class="form-element">
                <div class="input-block">
                    <span class="placeholder-element">@</span>
                    <input class="input-element stylish" id="nickname-input" type="text" name="nickname" placeholder="nickname" onchange="update_field('nickname', this.value)"></input>
                </div>
                <div class="input-block" style="margin-top: 5px;">
                    <input class="sub-margin" type="checkbox" id="anon-check" name="anonymous" onchange="switch_incognito(this.checked)">
                    <label for="anon-check" style="user-select: none; cursor: pointer;">Lemme stay Incognito 😎</label>
                </div>
                <div class="input-block margin">
                    <textarea class="input-element" id="ideas-input" name="ideas" placeholder="whatever you'd like to say" onchange="update_field('content', this.value)"></textarea>
                </div>
                <div class="input-block flex margin">
                    <button class="button-element" id="submit-form">Give it a shot🧐</button>
                </div>
            </form>
        </div>
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
            <h1>Or any thoughts and stuff that is on your mind right now!<br>(you can just say hello to me)</h1>
            <p class="emoji">🥰</p>
        </div>
        <div class="card">
            <h1>I will review submissions and make some of them live!</h1>
            <p class="emoji">🎤</p>
        </div>
        <div class="card">
            <h1>As well as feature all ideas in my Instagram Stories!</h1>
            <p class="emoji">🤩</p>
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