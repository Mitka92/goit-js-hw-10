import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import okIcon from '../img/ok.png';
import errIcon from '../img/bi_exclamation-triangle.png';
import '../css/snackbar.css';
// Об'єкт налаштувань для iziToast
const iziToastSet = {
  title: 'OK',
  message: '',
  titleColor: '#FFFFFF',
  titleSize: '16',
  titleLineHeight: '24',
  messageColor: '#FFFFFF',
  messageSize: '16',
  messageLineHeight: '24',
  position: 'topRight',
};
const formElem = document.querySelector('form');
const inputDelayElem = document.querySelector('[name = delay]');
const fieldSet = formElem.querySelector('fieldset');
const statusRadios = fieldSet.querySelectorAll('[type = radio]');

let selectedStatus;
let promise;

formElem.addEventListener('submit', e => {
  e.preventDefault();
  const delay = inputDelayElem.value;
  if (delay <= 0) {
    iziToastSet.backgroundColor = '#FFA000';
    iziToastSet.title = 'Error';
    iziToastSet.iconUrl = errIcon;
    iziToastSet.message = `enter a value greater than 0`;
    iziToast.show(iziToastSet);
    return;
  }
  statusRadios.forEach(radio => {
    if (radio.checked) {
      selectedStatus = radio.value;
    }
  });

  if (selectedStatus === 'fulfilled') {
    promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, delay);
    });
  } else {
    promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject();
      }, delay);
    });
  }

  promise
    .then(() => {
      iziToastSet.backgroundColor = '#59A10D';
      iziToastSet.title = 'OK';
      iziToastSet.iconUrl = okIcon;
      iziToastSet.message = `✅ Fulfilled promise in ${delay}ms`;
      iziToast.show(iziToastSet);
    })
    .catch(() => {
      iziToastSet.backgroundColor = 'rgb(187, 69, 69';
      iziToastSet.iconUrl = okIcon;
      iziToastSet.title = 'OK';
      iziToastSet.message = `❌ Rejected promise in ${delay}ms`;
      iziToast.show(iziToastSet);
    });
  formElem.reset();
});
