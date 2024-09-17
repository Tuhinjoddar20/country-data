import { useTheme } from "../Hooks/useTheme"


export default function Header() {

    const [isDark, setIsDark] = useTheme()


    return (
        <header className={`header-container ${isDark ? 'dark' : ''}`}>
            <div className="header-contain">
                <h2 className="title">
                    <a href="/">Where in the World?</a>
                </h2>
                <p className="theme-changer" onClick={() => {
                    setIsDark(!isDark)
                    localStorage.setItem('isDarkMode', !isDark)
                }}>
                    <i className={`fa-regular fa-${isDark ? "sun" : "moon"}`}
                        style={isDark ? { color: "#fbda04" } : {}}></i> &nbsp;{isDark ? "Light" : "Dark"} Mode
                </p>
            </div>
        </header>
    )
}