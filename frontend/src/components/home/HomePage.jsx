import React from 'react';
import {Row} from 'antd'
import CarouselClass from "./Carousel";

class HomePage extends React.Component {

    async componentDidMount(){
        window.scrollTo(0,0);
        await this.props.setSubHeaderKey('home');
        console.log(this.props);
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
