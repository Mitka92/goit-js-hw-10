import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
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
      btnElem.disabled = true;
    } else {
      btnElem.addEventListener(
        'click',
        e => {
          btnElem.disabled = true;
          inputElem.disabled = true;
          userSelectedDate = setInterval(() => {
            const ms = selectedDates[0] - new Date();
            if (ms <= 1000) {
              clearInterval(userSelectedDate);
              inputElem.disabled = false;
            }
            markup(convertMs(ms));
          });
        },
        1000
      );

      btnElem.disabled = false;
    }
  },
};
const inputElem = document.querySelector('#datetime-picker');
const btnElem = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');
btnElem.disabled = true;
flatpickr(inputElem, options);

function markup({ days, hours, minutes, seconds }) {
  updateTextContent(daysElem, days);
  updateTextContent(hoursElem, hours);
  updateTextContent(minutesElem, minutes);
  updateTextContent(secondsElem, seconds);
}
function updateTextContent(value, newValue) {
  const resultValue = newValue.toString().padStart(2, '0');
  if (value.textContent !== resultValue) {
    value.textContent = resultValue;
  }
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
