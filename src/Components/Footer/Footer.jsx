import './Footer.css';
import penguinImg from '../../Assets/penguin.png';
import facebookIcon from '../../Assets/facebook-square-brands.svg';
import youtubeIcon from '../../Assets/youtube-square-brands.svg';

const Footer = () => (
    <div className="footer">
        <div id="footer-wrapper">
            <p>© By Đỗ Lộc 2022</p>
            <img src={ penguinImg } alt="penguin" className="penguin"/>
            <div id="social">
                <a href="https://www.facebook.com/luoc.do.03/" target="_blank" className="social-icon">
                    <img src={ facebookIcon } alt="Personal facebook" border="0"/>
                </a>
                <a href="https://www.youtube.com/channel/UC9clADyiBc2Ue2KwP1lB02g" target="_blank" className="social-icon">
                    <img src={ youtubeIcon } alt="Youtube channel" border="0"/>
                </a>
            </div>
        </div>
    </div>
)

export default Footer