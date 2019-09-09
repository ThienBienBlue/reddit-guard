const total_time = 25
const update_interval = 1000

var mins = 0
var secs = 0

function listen_for_clicks() {
    document.addEventListener("click", (e) => {

        function begin_timer() 
            /* Starts the 25 minute timer. */
        {
            minutes = document.getElementById("minutes")
            secs = total_time * 60
            minutes.textContent = secs
            decrement()
        }

        function decrement()
            /* Decrements the timer. */
        {
            minutes = document.getElementById("minutes")
            if (secs > 0) {
                minutes.textContent = secs
                secs--
                setTimeout(decrement, update_interval)
            }
            else {
                alert("Time's Up!")
                minutes.textContent = 00
            }
        }

        function stop_timer()
            /* Stops the timer early. */
        {
            minutes = document.getElementById("minutes")
            secs = 0
            minutes.textContent = 00
        }

        if (e.target.classList.contains("guard")) {
            console.log("DAYMAN")
            begin_timer()
        }
        else if (e.target.classList.contains("let_me_out")) {
            stop_timer()
        }
    })
}

listen_for_clicks()