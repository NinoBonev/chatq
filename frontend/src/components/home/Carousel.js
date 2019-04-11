import React from 'react'
import {Carousel, Button, Row, Col} from 'antd'
import '../../resources/style/custom.css'

export default class CarouselClass extends React.Component {
    render() {
        let front = <Col span={16} align="center" style={{marginTop: 240}}>
            <div style={{
                fontSize: 35,
                color: 'white',
            }}>{'Looking for inspiration point? This is your social network.'}</div>
            <div style={{
                fontSize: 18,
                color: '#fffb8f'
            }}>{'Chatq is the social network created to inspire the world by sharing the most amazing stories of yours'}</div>
            <div style={{margin: 20}}><Button href={'/register'} size={80}>Sign Up Now</Button></div>
        </Col>

        const settings = {
            dots: true,
            infinite: true,
            speed: 1500,
            pauseOnHover: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            autoplay: false,
            slidesToScroll: 1,
            effect: 'fade',

        };
        return (

                <div style={{marginTop: 70}}>
                    <Carousel {...settings}>
                        <div className='one'>
                            <Col span={4}>
                                <div className='side-home' ></div>
                            </Col>
                            {front}
                            <Col span={4}>
                                <div className='side-home' ></div>
                            </Col>
                        </div>
                        <div className='two'>
                            <Col span={4}>
                                <div className='side-home' ></div>
                            </Col>
                            {front}
                            <Col span={4}>
                                <div className='side-home' ></div>
                            </Col>
                        </div>
                        <div className='three'>
                            <Col span={4}>
                                <div className='side-home' ></div>
                            </Col>
                            {front}
                            <Col span={4}>
                                <div className='side-home' ></div>
                            </Col>
                        </div>
                    </Carousel>
                </div>

        )
    }
}