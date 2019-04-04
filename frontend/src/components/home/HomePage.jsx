import React from 'react';
import Header from '../common/Header'

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Header {...this.props} />
                <div className="background"
                     style={{minHeight: 2000, backgroundColor: 'white'}}
                >
                </div>

            </div>
        );
    }
}

export default HomePage;
