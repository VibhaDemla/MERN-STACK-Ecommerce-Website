import React from 'react'
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download app for Android and IOS mobile phone</p>
            <img src={playStore} alt="playstore"/>
            <img src={appStore} alt="appstore"/>
        </div>

        <div className="midFooter">
            <h1>VIBHA ECOMMERCE</h1>
            <p>High quality is our first priority</p>


            <p>Copyrights 2021 &copy; MeVibhaDemla</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="https://www.linkedin.com/in/vibha-demla-0abb1825b/">LinkedIn</a>
        </div>
    </footer>
  )
}

export default Footer
