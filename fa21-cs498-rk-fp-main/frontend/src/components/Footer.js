import React from "react";
import './Footer.css';
// import { faGithub } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-left col-md-4 col-sm-6">
                <p className="about">
                    <span> About the company</span>
                    At Seeds Shop, we provide a platform for users to trade seeds that help our customers improve and
                    develop their overall health and well-being.
                </p>
                {/* <div class="icons">
                <a href="#"><FontAwesomeIcon icon={faGithub} /></a> */}
                {/* <a href="#"><FontAwesomeIcon icon="fa-brands fa-youtube" /></a>
                <a href="#"><i class="fa fa-linkedin"></i></a>
                <a href="#"><i class="fa fa-google-plus"></i></a>
            //     <a href="#"><i class="fa fa-instagram"></i></a> */}
                {/* // </div> */}
            </div>
            <div className="footer-center col-md-4 col-sm-6">
                <div>
                    <i className="fa fa-map-marker"></i>
                    <p><span>University of Illinois at Urbana-Champaign</span> Urbana, U.S.A</p>
                </div>
                <div>
                    <i className="fa fa-phone"></i>
                    {/* <FontAwesomeIcon className="fa fa-phone" icon={faPhoneSquare}/> */}
                    <p> (+01) 6454 312 442</p>
                    {/* <FontAwesomeIcon icon="fa-brands fa-youtube" /> */}
                </div>
                <div>
                    <i className="fa fa-envelope"></i>
                    <p><a href="#"> seeds@seedsShop.com</a></p>
                </div>
            </div>
            <div className="footer-right col-md-4 col-sm-6">
                <h2> Seed<span> Shops</span></h2>
                <p className="menu">
                    <a href="/"> Home</a> |
                    <a href="/post"> Sell Your Seeds</a>
                    {/* <a href="#"> Services</a> |
                <a href="#"> Portfolio</a> |
                <a href="#"> News</a> |
                <a href="#"> Contact</a> */}
                </p>
                <p className="name"> Seeds Shop &copy; 2021</p>
            </div>
        </footer>
    );
}

export default Footer;
