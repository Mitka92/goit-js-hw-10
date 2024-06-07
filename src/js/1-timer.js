// Імпорт бібліотек і стилів
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iconUrl from '../img/bi_x-octagon.png';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import '../css/timer.css';

// Збереження до змінних посилань на елементи DOM
const refs = {
  inputElem: document.querySelector('#datetime-picker'),
  btnElem: document.querySelector('[data-start]'),
  daysElem: document.querySelector('[data-days]'),
  hoursElem: document.querySelector('[data-hours]'),
  minutesElem: document.querySelector('[data-minutes]'),
  secondsElem: document.querySelector('[data-seconds]'),
};

// Оголошено глобальну змінну для зберігання вибраної дати
let userSelectedDate;

// Об'єкт options для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    const validDate = userSelectedDate - Date.now() > 0;
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
        progressBarColor: ' #B51B1B',
      });
      refs.btnElem.disabled = true;
      refs.btnElem.classList.remove('button-normal');
    } else {
      refs.btnElem.disabled = false;
      refs.btnElem.classList.add('button-normal');
    }
  },
};

refs.btnElem.disabled = true; //Кнопка не активна

// додаємо класи до DOM елементів
refs.btnElem.classList.add('button-disabled');
refs.inputElem.classList.add('input-normal');

flatpickr(refs.inputElem, options); //Виклик flatpickr

//Додаємо прослуховувач до кнопки
refs.btnElem.addEventListener('click', () => {
  refs.btnElem.disabled = true;
  refs.btnElem.classList.remove('button-normal');
  refs.inputElem.disabled = true;
  refs.inputElem.classList.add('input-disabled');
  refs.inputElem.classList.remove('input-normal');
  const intervalId = setInterval(() => {
    const ms = userSelectedDate - Date.now();
    markup(convertMs(ms));
    setTimeout(() => {
      clearInterval(intervalId);
      refs.inputElem.disabled = false;
      refs.inputElem.classList.remove('input-disabled');
      refs.inputElem.classList.add('input-normal');
    }, ms);
  }, 1000);
});

//Допоміжні функції
function markup({ days, hours, minutes, seconds }) {
  updateTextContent(refs.daysElem, days);
  updateTextContent(refs.hoursElem, hours);
  updateTextContent(refs.minutesElem, minutes);
  updateTextContent(refs.secondsElem, seconds);
}

function updateTextContent(elem, value) {
  const newValue = value.toString().padStart(2, '0');
  elem.textContent = newValue;
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
