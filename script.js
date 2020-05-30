let countdown;
//select displays
const displayLeft = document.querySelector(".display__time-left");
const displayEnd = document.querySelector(".display__end-time");
//select preset buttons, add event listeners
const buttons = document.querySelectorAll("[data-time]");
buttons.forEach((button) => button.addEventListener("click", handleClick));
//select audio
const audio = document.querySelector(".timer_sound");
//select form for custom input
const form = document.customForm; //nice trick for selecting elements with name="xy"
form.addEventListener("submit", handleSubmit);

function timer(seconds) {
  clearInterval(countdown); //clear previous intervals if multiple timer() functions run
  const now = Date.now(); //returns time in miliseconds
  const end = now + seconds * 1000;
  const endTime = new Date();
  endTime.setSeconds(endTime.getSeconds() + seconds);

  //display end time
  displayEnd.innerHTML = `Time will be up at ${("0" + endTime.getHours()).slice(
    -2
  )}:${("0" + endTime.getMinutes()).slice(-2)}:${(
    "0" + endTime.getSeconds()
  ).slice(-2)}`;
  //display countdown start
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    //setInterval = run function every xy miliseconds starting from xy miliseconds
    let secondsLeft;
    secondsLeft = Math.round((end - Date.now()) / 1000);
    displayTimeLeft(secondsLeft);
    if (secondsLeft === 0) {
      //stop condition, note using variable countdown to stop it, that is the only way atm
      clearInterval(countdown);
      displayEnd.innerHTML = "<strong>TIME'S UP!</strong>"; //clear end time when count is done
      audio.currentTime = 0;
      audio.play();
      return;
    }
  }, 1000);
}

function displayTimeLeft(seconds) {
  let hours = Math.floor(seconds / 3600);
  hours = "0" + hours;
  seconds = seconds % 3600;
  let minutes = Math.floor(seconds / 60);
  minutes = "0" + minutes;
  seconds = seconds % 60;
  seconds = "0" + seconds;
  const display = `${hours.slice(-2)}:${minutes.slice(-2)}:${seconds.slice(
    -2
  )}`;

  displayLeft.innerHTML = display;
  document.title = display;
}

function handleClick() {
  timer(parseInt(this.dataset.time));
}

function handleSubmit(e) {
  e.preventDefault(); //submitting refreshes the page by default
  const minutes = parseFloat(this.minutes.value);
  const seconds = Math.round(minutes * 60);
  timer(seconds);
  this.reset();
}
