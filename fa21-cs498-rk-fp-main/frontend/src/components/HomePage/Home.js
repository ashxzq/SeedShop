import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeCarousel from "./HomeCarousel";
import GalleryViewHome from "./GalleryViewHome";
import Footer from "../Footer";

export default function Home() {

    return (
        <div className="Home">
            <div className="homecarousel">
                <HomeCarousel/>
            </div>
            <GalleryViewHome/>
            <Footer/>
        </div>
    );
}