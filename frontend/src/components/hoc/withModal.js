/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'

function modalFunctionality(WrappedComponent) {
    class Modal extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                id: ''
            };
        }

        showModal = (id) => {
            console.log(id);
            console.log('Yes');
            this.setState({
                id,
                visible: true,
            });
            console.log(this.state);
        }

        handleOk = (e) => {
            this.setState({
                visible: false,
                id: ''
            });
        }

        handleCancel = (e) => {
            this.setState({
                visible: false,
                id: ''
            });
        }

        render() {
            const { ...otherProps } = this.props;
            return (<WrappedComponent
                showModal={this.showModal.bind(this)}
                handleCancel={this.handleCancel.bind(this)}
                handleOk={this.handleOk.bind(this)}
                {...otherProps}
                {...this.state}
            />);
        }
    }

    return Modal;
}

export default modalFunctionality;