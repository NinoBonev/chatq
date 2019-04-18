import React from 'react'

import AuthService from './utilities/AuthService'
import CrudService from './utilities/CrudService';
import HelperService from './utilities/HelperService';
import HeaderCoverUserInfo from './components/common/utils/HeaderCoverUserInfo'
import HeaderCoverGroupInfo from './components/common/utils/HeaderCoverGroupInfo'

function withAppStateHandler(WrappedComponent) {
    const Auth = new AuthService();
    const Crud = new CrudService();
    const Helper = new HelperService();

    class Handler extends React.Component {
        state = {
            subHeaderKey: 'home',
            contentKey: '',
            withHeaderCover: false,
            headerCoverSource: '',
            headerCoverAvatar: '',
            headerCoverUserInfo: '',
            headerCoverGroupInfo: '',
            subHeaderLocation: '/'
        }

        setSubHeaderLocation = (newProps) => {
            this.setState({
                subHeaderLocation: newProps
            })
        }

        setSubHeaderKey = (key) => {
            this.setState({
                subHeaderKey: key
            })
        }

        setContentKey = (key) => {
            this.setState({
                contentKey: key
            })
        }

        setHeaderCoverVisibility = (boolean) => {
            this.setState({
                withHeaderCover: boolean
            })
        }

        setHeaderCoverSource = (image) => {
            this.setState({
                headerCoverSource: image
            })
        }

        setHeaderCoverAvatar = (image) => {
            this.setState({
                headerCoverAvatar: image
            })
        }

        setHeaderCoverUserInfo = (name, username, followers, following, followGroups, stories) => {
            this.setState({
                headerCoverUserInfo: <HeaderCoverUserInfo
                    name={name}
                    username={username}
                    followers={followers}
                    following={following}
                    followGroups={followGroups}
                    stories={stories}
                />
            })
        }

        clearHeaderCoverUserInfo(){
            this.setState({
                headerCoverUserInfo: ''
            })
        }

        setHeaderCoverGroupInfo = (name, followers, stories) => {
            this.setState({
                headerCoverGroupInfo: <HeaderCoverGroupInfo
                    name={name}
                    followers={followers}
                    stories={stories}
                />
            })
        }

        clearHeaderCoverGroupInfo(){
            this.setState({
                headerCoverGroupInfo: ''
            })
        }

        render() {
            const {...otherProps} = this.props;
            return (<WrappedComponent
                isAuth={Auth.isLoggedIn()}
                isAdmin={Auth.isAdmin()}
                Crud={Crud}
                Auth={Auth}
                Helper={Helper}
                subHeaderLocation={this.state.subHeaderLocation}
                setSubHeaderLocation={this.setSubHeaderLocation.bind(this)}
                subHeaderKey={this.state.subHeaderKey}
                setSubHeaderKey={this.setSubHeaderKey.bind(this)}
                contentKey={this.state.contentKey}
                setContentKey={this.setContentKey.bind(this)}
                withHeaderCover={this.state.withHeaderCover}
                setHeaderCoverVisibility={this.setHeaderCoverVisibility.bind(this)}
                headerCoverSource={this.state.headerCoverSource}
                setHeaderCoverSource={this.setHeaderCoverSource.bind(this)}
                headerCoverAvatar={this.state.headerCoverAvatar}
                setHeaderCoverAvatar={this.setHeaderCoverAvatar.bind(this)}
                headerCoverUserInfo={this.state.headerCoverUserInfo}
                setHeaderCoverUserInfo={this.setHeaderCoverUserInfo.bind(this)}
                clearHeaderCoverUserInfo={this.clearHeaderCoverUserInfo.bind(this)}
                setHeaderCoverGroupInfo={this.setHeaderCoverGroupInfo.bind(this)}
                clearHeaderCoverGroupInfo={this.clearHeaderCoverGroupInfo.bind(this)}
                headerCoverGroupInfo={this.state.headerCoverGroupInfo}
                {...otherProps}
                {...this.state}
            />);
        }
    }

    return Handler
}

export default withAppStateHandler;