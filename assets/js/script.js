var container = document.getElementById("container");
var loading = document.getElementById("loading");
var progress = document.getElementById("progress");

var error_max = "Error: 300 characters max 😈";
var error_min = "Error: at least 3 characters 😈";

var progress_percentage = 0;
var current_submissions = [];
var current_data = {
    nickname: "",
    incognito: false,
    content: ""
}
var is_submitting = false;
var is_submitted = false;

function toggle_loading(state) {
    state ? loading.style.display = "block" : loading.style.display = "none";
}

function set_error(error = null) {
    var form_error = document.getElementById("form-error");

    if (error != null) {
        form_error.innerHTML = error;
        form_error.style.display = "block";
    } else {
        form_error.innerHTML = "";
        form_error.style.display = "none";
    }
}

function on_container_scroll() {
    var container_boundaries = container.getBoundingClientRect();
    var container_height = container_boundaries.bottom - container_boundaries.top;
    var cards = document.getElementsByClassName("card");

    for (var i = 0; i < cards.length; i++) {
        var temp_boundaries = cards[i].getBoundingClientRect();
        var diff = container_boundaries.top - temp_boundaries.top;
        var diff_percentage = diff / container_height;
        var percentage = (diff_percentage < -0.20 || diff_percentage > 0.20) ? (0.2 / diff_percentage) : 1;
        cards[i].style.opacity = Math.abs(percentage);
    }
    setPercentage();
}

function setPercentage(val = null) {
    if (val == null) {
        progress_percentage = container.scrollTop / (container.scrollHeight - container.clientHeight);
        progress.style.right = (container.scrollWidth - (container.scrollWidth * progress_percentage)) + "px";
    } else {
        progress_percentage = val;
        progress.style.right = (container.scrollWidth - (container.scrollWidth * progress_percentage)) + "px";
    }
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
    if (current_data.content.length >= 3 && current_data.content.length <= 300) {
        toggle_loading(true);

        if (current_data.nickname == "") {
            current_data.incognito = true;
        }

        var data = current_data;

        const http = new XMLHttpRequest();
        const url = 'https://photos.chimzuk.com/api/feedback.submit';

        http.open("POST", url, true);
        http.setRequestHeader("Content-type", "application/json");
        http.send(JSON.stringify(data));

        http.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(http.responseText);
                current_submissions = result.data;
                toggle_loading(false);
                router("submissions", true);
            }
        }
        return false;
    } else {
        current_data.content.length < 3 ? set_error(error_min) : set_error(error_max + ` (${current_data.content.length})`);
    }

}

function get_submissions() {
    toggle_loading(true);

    var data = {};

    const http = new XMLHttpRequest();
    const url = 'https://photos.chimzuk.com/api/feedback.get';

    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send(JSON.stringify(data));

    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(http.responseText);
            current_submissions = result.data;
            toggle_loading(false);
            setPercentage(0);
            container.scrollTop = 0;
            container.innerHTML = submissions_view();
        }
    }
    return false;
}

function open_insta(nick) {
    window.open(`https://instagram.com/${nick}`);
}

function submissions_view() {
    var result = is_submitted ? `
        <div class="card">
            <h1>Thank you for Your feedback!<br>Scroll down to see other thoughts!</h1>
            <p class="emoji">😉</p>
        </div>
    ` : ``;
    for (var i = current_submissions.length - 1; i > -1; i--) {
        result += `
            <div class="card">
                <h1 class="feed-nick" ${!current_submissions[i].incognito ? `onclick="open_insta('${current_submissions[i].nickname}')" style="cursor: pointer;"` : ""}>@${current_submissions[i].nickname} ${current_submissions[i].incognito ? "🕵️‍♂️" : "🥰"}</h1>
                <p class="feed-date">${current_submissions[i].date}</p>
                <p class="feed-content">${current_submissions[i].content}</p>
                <a onclick="router('home', true)" style="margin-top: 20px; cursor: pointer; font-size: 20px; font-weight: bold; letter-spacing: 1px;">Leave a feedback 😁</a>
            </div>
        `;
    }
    return result;
}

function home_view() {
    result = !is_submitting ? `
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
        ` : ``;

    result += `
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
                <p class="error" id="form-error"></p>
                <div class="input-block flex margin">
                    <button class="button-element" type="button" id="submit-form" onclick="form_submission();">Give it a shot🧐</button>
                </div>
            </form>
            <a onclick="router('submissions', false)" style="margin-top: 10px; cursor: pointer; font-size: 20px; font-weight: bold; letter-spacing: 1px;">See feedback of other's 🤭</a>
        </div>
    `;

    return result;
}

function router(name, sup_data = null) {
    switch (name) {
        case "home": {
            is_submitting = sup_data;
            setPercentage(0);
            container.scrollTop = 0;
            container.innerHTML = home_view();
            break;
        }
        case "submissions": {
            is_submitted = sup_data;
            get_submissions();
            break;
        }
    }
}

router("home", false);