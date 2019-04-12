/**
 * Created by NinoB on 27.2.2019 г.
 */

import React from 'react';
import {Carousel, Row, Col, Icon, Tabs, message} from 'antd';
import BasicComments from '../comment/BasicCommentList'

const {TabPane} = Tabs

//TODO Put arrows in the middle
export default class StoryPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            storyLines: [],
            activeKey: '1',
            count: 0
        };

        this.setKey = this.setKey.bind(this);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.carousel = React.createRef();
    }

    next() {
        this.carousel.next();
        this.setState(prevState => ({
            count: prevState.count + 1
        }))
    }

    previous() {
        this.carousel.prev();
        this.setState(prevState => ({
            count: prevState.count - 1
        }))
    }

    setKey(key) {
        this.setState({activeKey: key});
    }

    componentDidMount() {
        this.props.Crud.getStoryById(this.props.storyId).then((res) => {
            if (res.success){
                this.setState({
                    storyLines: res.body.storyLine,
                });
            } else {
                message.error(res.body)
            }
        })
    }

    render() {
        const settings = {
            dots: false,
            autoplaySpeed: 5000,
            slidesToShow: 1,
            autoplay: false,
            slidesToScroll: 1,
        };

        const sortedStoryLine = this.state.storyLines.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))

        return (
            <div>
                <Row gutter={8}>
                    <Tabs onChange={this.setKey} activeKey={this.state.activeKey}>
                        <TabPane tab={<span><Icon type="read"/>Storyline</span>} key="1">
                            <Carousel ref={node => (this.carousel = node)}  {...settings}>
                                {sortedStoryLine.map((str) =>
                                    <div key={str._id}>
                                        <Col style={{padding: 0, margin: 0}} span={1}>
                                            {this.state.count === 0 ? null :
                                                <p align="middle"><Icon onClick={this.previous} style={{fontSize: 50}}
                                                                        type="caret-left"/></p>}
                                        </Col>
                                        <Col style={{padding: 0, margin: 0}} span={15}>
                                            {<img src={str.cover} alt="" style={{width: '100%'}}/>}
                                        </Col>
                                        <Col style={{padding: 0, margin: 0}} span={1}>
                                            {this.state.count === 3 ? null :
                                                <p align="middle"><Icon onClick={this.next} style={{fontSize: 50}}
                                                                        type="caret-right"/></p>}
                                        </Col>
                                        <Col style={{padding: 0, margin: 0}} span={7}>
                                            <div>{str.info}</div>
                                        </Col>
                                    </div>)}
                            </Carousel>
                        </TabPane>
                        <TabPane tab={<span><Icon type="message"/>Comments</span>} key="2">
                            <BasicComments {...this.props} storyId={this.props.storyId}/>
                        </TabPane>
                    </Tabs>
                </Row>
            </div>
        );
    }
}

