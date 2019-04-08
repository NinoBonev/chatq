/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'

function withModal(WrappedComponent) {
    class Modal extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                visible: false,
                storyName: '',
                storyId: '',
            };
        }

        showModal = (storyId, storyName) => {
            this.setState({
                storyName,
                storyId,
                visible: true,
            });
        }

        handleOk = (e) => {
            this.setState({
                visible: false,
                storyName: '',
                storyId: ''
            });
        }

        handleCancel = (e) => {
            this.setState({
                visible: false,
                storyName: '',
                storyId: ''
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

export default withModal;