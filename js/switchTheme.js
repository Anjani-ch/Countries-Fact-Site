const themeStyles = document.querySelectorAll('#theme-styles')[0]
const toggleTheme = document.querySelector('#toggle-theme')
const toggleIcon = document.querySelector('#toggle-icon')
const themeMode = document.querySelector('#theme-mode')

let style = ''

const changeStylesheet = theme => {
    if (theme === 'dark') themeStyles.href.replace('light', 'dark')
    else if (theme === 'light') themeStyles.href.replace('dark', 'light')
}

const enableLightTheme = () => {
    themeStyles.href = themeStyles.href.replace('dark', 'light')
    toggleIcon.name = 'moon-outline'
    themeMode.innerText = 'Dark Mode'
    style = 'light'
}

const enableDarkTheme = () => {
    themeStyles.href = themeStyles.href.replace('light', 'dark')
    toggleIcon.name = 'sunny-outline'
    themeMode.innerText = 'Light Mode'
    style = 'dark'
}

if (localStorage.getItem('styleTheme')) {
    if (localStorage.getItem('styleTheme') === 'light') enableLightTheme()
    else enableDarkTheme()
}

toggleTheme.addEventListener('click', e => {
    if (e.target.id === 'toggle-theme' || e.target.parentElement.id === 'toggle-theme') {
        if (themeStyles.href.includes('light')) enableDarkTheme()
        else enableLightTheme()

        changeStylesheet(style)

        localStorage.setItem('styleTheme', style)
    }
})