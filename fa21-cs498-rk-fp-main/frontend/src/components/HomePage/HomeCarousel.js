import React from 'react';
import Carousel from 'react-bootstrap/Carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeCarousel.css'
import image1 from "../../resources/seed_categories_2.jpg"
import image2 from "../../resources/seed_catrgories.jpg"
import image3 from "../../resources/seed_image_carousel_1.jpg"


export default function HomeCarousel() {
    return (
        <div className='Carousel'>
            <Carousel>
                <Carousel.Item>
                    <img className={'carousel-img'}
                         src={image1}
                         alt={'First slide'}
                    />
                    <Carousel.Caption>
                        <h3 className="title">plum Bossom</h3>
                        <p className="content">NA seed neither fears light nor darkness, but uses both to grow.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className={'carousel-img'}
                         src={image2}
                         alt={'Second slide'}
                    />

                    <Carousel.Caption>
                        <h3 className="title">Succulent Plant</h3>
                        <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img className={'carousel-img'}
                         src={image3}
                         alt={'Third slide'}
                    />

                    <Carousel.Caption>
                        <h3 className="title">Orchid</h3>
                        <p className="content">Love. Beauty. Refinement. Wisdom.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>
    );
}