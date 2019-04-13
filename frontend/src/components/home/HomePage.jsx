import React from 'react';
import {Row} from 'antd'
import CarouselClass from "./Carousel";

class HomePage extends React.Component {

    componentDidMount(){
        window.scrollTo(0,0);
        this.props.setSubHeaderKey('home')
    }

    render() {
        return (
            <div>
                <Row>
                    <CarouselClass />
                </Row>
            </div>

        );
    }
}

export default HomePage;
