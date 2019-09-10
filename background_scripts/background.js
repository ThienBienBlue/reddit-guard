'use strict';

const total_time = 25;  // In minutes.
const update_interval = 1000;  // One second.

var mins = 0;
var secs = 0;

var timer_active = false;
var registered = null;

async function register_script() {
    registered = await browser.contentScripts.register({
        matches: ["*://*.reddit.com/*"],
        js: [{
          code: "document.body.innerHTML = '<h1>Stop going on Reddit.<h1>'"
        }],
        runAt: "document_idle"
    });
}

function start_timer() 
    /* Starts a 25 min timer. */
{
    secs = total_time * 60;
    decrement();
}

function unregister_script() {
    if (registered) {
        registered.unregister();
        registered = null;
    }
}

function decrement()
    /* Decrements the timer. */
{
    browser.runtime.sendMessage({
        time_left: secs
    });
    if (secs > 0) {
        secs--;
        setTimeout(decrement, update_interval);
    }
    else {
        stop_timer();
    }
}

function stop_timer()
    /* Stops the timer early. */
{
    unregister_script();
    timer_active = false;
    secs = 0;
    browser.runtime.sendMessage({
        time_left: "00"
    });
}

browser.runtime.onMessage.addListener((message) => {
    if (message.call === "begin timer") {
        if (!timer_active) {
            start_timer();
            register_script();
        }
        timer_active = true;
    }
    else if (message.call === "stop timer") {
        stop_timer();
    }
});
