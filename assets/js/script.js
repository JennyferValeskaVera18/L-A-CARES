// MODO OSCURO/CLARO
function modoOscuro() {
  const toggleSwitch = document.getElementById('darkModeToggle');
  const container = document.querySelector(".circle-red");
  
  if (toggleSwitch.checked) {
    document.querySelector('.main-container').classList.add('bg-dark-toggle');
    container.classList.add("sign-up-mode");
    localStorage.setItem('theme', 'dark');
  } else {
    document.querySelector('.main-container').classList.remove('bg-dark-toggle');
    container.classList.remove("sign-up-mode");
    localStorage.setItem('theme', 'light');
  }
}

const toggleSwitch = document.getElementById('darkModeToggle');
toggleSwitch.addEventListener('change', modoOscuro);
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  toggleSwitch.checked = true; 
}
modoOscuro();