import Tab from './Tab'
import './Header.css'

const Header = ({ currTab, changeTab, scrollRef }) => (
    <header>
        <h2 ref={ scrollRef }>CEA201_IA1702_HE176673_Assignment2</h2>
        <a 
            href="https://drive.google.com/drive/folders/1zEAOGLOnpnuhzDhdg4pAETtHRrYcckBT?usp=sharing"
            target="_blank"
        >
            Google Drive Folder For Source Code
        </a>
        <Tab currTab={ currTab } changeTab={ changeTab } />  
    </header>
)

export default Header