import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
// import 'flatpickr/dist/themes/dark.css';
let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const validDate = selectedDates[0] - new Date() > 0;
    if (!validDate) {
      window.alert('Please choose a date in the future');
      btnElem.setAttribute('disabled', 'true');
    } else {
      btnElem.addEventListener(
        'click',
        e => {
          btnElem.setAttribute('disabled', 'true');
          inputElem.setAttribute('disabled', 'true');
          userSelectedDate = setInterval(() => {
            const ms = selectedDates[0] - new Date();
            markup(convertMs(ms));
            setTimeout(() => {
              clearInterval(userSelectedDate);
              inputElem.removeAttribute('disabled');
              //   secondsElem.textContent = '0';
            }, ms - 1000);
          });
        },
        1000
      );

      btnElem.removeAttribute('disabled');
    }
  },
};
const inputElem = document.querySelector('#datetime-picker');
const btnElem = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');
btnElem.setAttribute('disabled', 'true');
flatpickr(inputElem, options);

function markup({ days, hours, minutes, seconds }) {
  //   if (daysElem.textContent !== days) {
  //     daysElem.textContent = days;
  //   }
  //   if (hoursElem.textContent !== hours) {
  //     hoursElem.textContent = hours;
  //   }
  //   if (minutesElem.textContent !== minutes) {
  //     minutesElem.textContent = minutes;
  //   }
  //   if (secondsElem.textContent !== seconds) {
  //     secondsElem.textContent = seconds;
  //   }
  daysElem.textContent = days.toString().padStart(2, 0);
  hoursElem.textContent = hours.toString().padStart(2, 0);
  minutesElem.textContent = minutes.toString().padStart(2, 0);
  secondsElem.textContent = seconds.toString().padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
