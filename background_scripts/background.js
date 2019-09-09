const total_time = 25;
const update_interval = 1000;

var mins = 0;
var secs = 0;

var timer_active = false;

function start_timer() 
    /* Starts a 25 min timer. */
{
    secs = total_time * 60;
    decrement();
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
    timer_active = false;
    secs = 0;
    browser.runtime.sendMessage({
        time_left: "00"
    })
}

browser.runtime.onMessage.addListener((message) => {
    if (message.call === "begin timer") {
        if (!timer_active) {
            start_timer();
        }
        timer_active = true;
    }
    else if (message.call === "stop timer") {
        stop_timer();
    }
});
