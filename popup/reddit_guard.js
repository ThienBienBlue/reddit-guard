function listen_for_clicks() {
    document.addEventListener("click", (e) => {

        function begin_timer() 
            /* Starts the 25 minute timer. */
        {
            browser.runtime.sendMessage({
                call: "begin timer"
            });
        }

        function stop_timer()
            /* Stops the timer early. */
        {
            browser.runtime.sendMessage({
                call: "stop timer"
            });
        }

        if (e.target.classList.contains("guard")) {
            begin_timer();
        }
        else if (e.target.classList.contains("let_me_out")) {
            stop_timer();
        }
    });
}

browser.runtime.onMessage.addListener((message) => {
    if (message.time_left) {
        document.getElementById("minutes").textContent = message.time_left;
    }
});
listen_for_clicks();