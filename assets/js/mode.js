const toggleButton = document.getElementById('theme-toggle');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Check for saved theme in local storage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    themeStylesheet.href = savedTheme;
    toggleButton.checked = savedTheme.includes('dark-mode.css');
}

toggleButton.addEventListener('change', () => {
    if (toggleButton.checked) {
        themeStylesheet.href = '/assets/css/dark-mode.css';
        localStorage.setItem('theme', '/assets/css/dark-mode.css');
    } else {
        themeStylesheet.href = '/assets/css/light-mode.css';
        localStorage.setItem('theme', '/assets/css/light-mode.css');
    }
});