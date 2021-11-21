import { refs } from './refs';
const { bodyStyle, switchToggle } = refs;

const Theme = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

if (localStorage.getItem('theme') === Theme.DARK) {
  bodyStyle.classList.add(Theme.DARK);
  switchToggle.checked = true;
} else {
  bodyStyle.classList.add(Theme.LIGHT);
}

const switchTheme = e => {
  if (e.target.checked) {
    bodyStyle.classList.add(Theme.DARK);
    bodyStyle.classList.remove(Theme.LIGHT);
    localStorage.setItem('theme', Theme.DARK);
  } else {
    bodyStyle.classList.add(Theme.LIGHT);
    bodyStyle.classList.remove(Theme.DARK);
    localStorage.setItem('theme', Theme.LIGHT);
  }
};

switchToggle.addEventListener('change', switchTheme);
