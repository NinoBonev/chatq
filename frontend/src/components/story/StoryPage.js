/**
 * Created by NinoB on 27.2.2019 г.
 */

import React from 'react';
import {Carousel, Row, Col, Icon} from 'antd';


//TODO Put arrows in the middle
export default class StoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyLines: [],
        };

        this.handleResponse = this.handleResponse.bind(this);

        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }

    next() {
        this.carousel.next();
    }
    previous() {
        this.carousel.prev();
    }

    handleResponse(res) {
        if (res.success) {
            this.setState({
                storyLines: res.body.storyLine,
            });
        } else {
            console.log(res.message);
        }
    }


    async componentDidMount() {
        console.log(this.props);
        let res = await this.props.Crud.getStoryById(this.props.id)

        if (res.success){
            this.handleResponse(res);
        }
    }



    render() {
        const settings = {
            dots: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            autoplay: false,
            slidesToScroll: 1,
        };

        return (
            <div>
                <Row gutter={8}>
                    <Carousel ref={node => (this.carousel = node)}  {...settings}>
                        {this.state.storyLines.map((str) =>
                            <div key={str._id}>
                                <Col style={{padding: 0, margin: 0}} span={1}>
                                    <p align="middle"><Icon onClick={this.previous} style={{fontSize: 50}} type="caret-left" /></p>
                                </Col>
                                <Col style={{padding: 0, margin: 0}} span={15} >
                                    {<img src={str.cover} alt="" style={{width: '100%'}} />}
                                </Col>
                                <Col style={{padding: 0, margin: 0}} span={1}>
                                    <p align="middle"><Icon onClick={this.next} style={{fontSize: 50}} type="caret-right" /></p>
                                </Col>
                                <Col style={{padding: 0, margin: 0}} span={7}>
                                    <div>{str.info}</div>
                                </Col>
                            </div>)}
                    </Carousel>
                </Row>
            </div>
        );
    }
}

