import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/timer.css';
import iconUrl from '../img/bi_x-octagon.png';
const inputElem = document.querySelector('#datetime-picker');
const btnElem = document.querySelector('[data-start]');
const daysElem = document.querySelector('[data-days]');
const hoursElem = document.querySelector('[data-hours]');
const minutesElem = document.querySelector('[data-minutes]');
const secondsElem = document.querySelector('[data-seconds]');

let userSelectedDate;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const validDate = userSelectedDate - new Date() > 0;
    if (!validDate) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        titleColor: '#FFFFFF',
        backgroundColor: '#EF4040',
        titleSize: '16',
        titleLineHeight: '24',
        messageColor: '#FFFFFF',
        messageSize: '16',
        messageLineHeight: '24',
        position: 'topRight',
        iconUrl,
        // iconUrl: '../img/bi_x-octagon.png',
        progressBarColor: ' #B51B1B',
      });
      btnElem.disabled = true;
      btnElem.classList.remove('button-normal');
      inputElem.classList.remove('input-active');
    } else {
      btnElem.disabled = false;
      btnElem.classList.add('button-normal');
      inputElem.classList.add('input-active');
    }
  },
};

btnElem.disabled = true;
btnElem.classList.add('button-disabled');
inputElem.classList.add('input-normal');
flatpickr(inputElem, options);
btnElem.addEventListener('click', e => {
  btnElem.disabled = true;
  btnElem.classList.remove('button-normal');
  inputElem.disabled = true;
  inputElem.classList.add('input-disabled');
  inputElem.classList.remove('input-active');
  inputElem.classList.remove('input-normal');
  const intervalId = setInterval(() => {
    const ms = userSelectedDate - new Date();
    if (ms <= 1000) {
      clearInterval(intervalId);
      inputElem.disabled = false;
      inputElem.classList.remove('input-disabled');
      inputElem.classList.add('input-normal');
    }
    markup(convertMs(ms));
  }, 1000);
});
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
