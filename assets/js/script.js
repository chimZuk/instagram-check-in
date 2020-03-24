var container = document.getElementById("container");
var loading = document.getElementById("loading");

function toggle_loading(state) {
    state ? loading.style.display = "block" : loading.style.display = "none";
}

function home_view() {
    return "<h3>Hey bud!</h3>";
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