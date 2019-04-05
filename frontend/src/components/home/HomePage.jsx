import React from 'react';
import {Row} from 'antd'

class HomePage extends React.Component {

    componentDidMount(){
        this.props.setSubHeaderKey('home')
    }

    render() {
        return (
            <Row>
                <div className='main-data-container'>
                    <p>Hello</p>
                </div>
            </Row>
        );
    }
}

export default HomePage;
