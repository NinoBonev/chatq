import React from 'react'
import {Carousel, Button, Row, Col} from 'antd'
import '../../resources/style/custom.css'

export default class CarouselClass extends React.Component {
    render() {
        let front = <Col align="center" style={{marginTop: 240}}>
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
            dots: false,
            infinite: true,
            speed: 1500,
            pauseOnHover: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            autoplay: true,
            slidesToScroll: 1,
            effect: 'fade',

        };
        return (
            <Row>
                <div>
                    <Carousel {...settings}>
                        <div className='one'>
                            {front}
                        </div>
                        <div className='two'>
                            {front}
                        </div>
                        <div className='three'>
                            {front}
                        </div>
                    </Carousel>
                </div>
            </Row>
        )
    }
}