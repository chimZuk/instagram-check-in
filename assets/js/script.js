var container = document.getElementById("container");
var loading = document.getElementById("loading");

function toggle_loading(state) {
    state ? loading.style.display = "block" : loading.style.display = "none";
}

function home_view() {
    return `
        <div class="card">
            <h1>Hey Bud! <span class="emoji">😉</span></h1>   
        </div>
        <div class="card">
            <h1>What's you see here <span class="emoji">😏</span>...</h1>   
        </div>
        <div class="card">
            <h1>And experiencing <span class="emoji">🤤</span>...</h1>   
        </div>
        <div class="card">
            <h1>Is in fact <span class="emoji">🤔</span>..</h1>   
        </div>
        <div class="card">
            <h1>Nothing that serious, LOL <span class="emoji">😅</span></h1>   
        </div>
        <div class="card">
            <h1>Just leave me some ideas for a "Swipe Up" page <span class="emoji">🤑</span></h1>   
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