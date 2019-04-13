/**
 * Created by NinoB on 25.2.2019 г.
 */

import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import HomePage from './components/home/HomePage';
import Dashboard from './components/home/Dashboard';
import About from './components/common/About'

import WrappedNormalLoginForm from './components/forms/LoginPage';
import WrappedRegistrationForm from './components/forms/RegisterPage';

import CreateStoryForm from './components/story/CreateStory'
import StoryPage from './components/story/StoryPage';
import UserInfo from './components/story/UserInfo';

import AllGroups from './components/group/AllGroups';
import SingleGroup from './components/group/SingleGroup';

import AllChallenges from './components/challenge/AllChallengesPage';
import SingleCurrentChallengeTabs from './components/challenge/SingleCurrentChallengeTabs';
import SingleOldChallenge from './components/challenge/SingleOldChallenge'

import WrappedAdminCreateChallenge from './components/admin/AdminCreateChallenge';
import AdminAllUsersPane from './components/admin/AdminAllUsersPane'
import WrappedAdminCreateGroup from './components/admin/AdminCreateGroup';
import AdminAllGroupsPane from "./components/admin/AdminAllGroupsPane";


const AppRouter = (props) => {
    const {Crud, Auth, Helper,
        setSubHeaderKey, subHeaderKey,
        setContentKey, contentKey,
        setHeaderCoverVisibility, withHeaderCover,
        subHeaderLocation, setSubHeaderLocation,
        setHeaderCoverSource, setHeaderCoverAvatar,
        setHeaderCoverUserInfo, setHeaderCoverGroupInfo,
        clearHeaderCoverUserInfo, clearHeaderCoverGroupInfo
    } = props;

    const isAuth = Auth.isLoggedIn();
    const isAdmin = Auth.isAdmin();

    return (
        <Switch >

            <Route exact path='/' render={(props) => isAuth ? <Redirect to="/dashboard"/> :
                <HomePage
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path="/logout" render={() => <Redirect to="/" />}/>

            <Route exact path='/register' render={(props) => isAuth ? <Redirect to="/"/> :
                <WrappedRegistrationForm
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    Auth={Auth}
                    {...props}
                />
            }/>

            <Route exact path='/about' render={(props) => <About
                setSubHeaderKey={setSubHeaderKey}
                subHeaderKey={subHeaderKey}
                Auth={Auth}
                isAdmin={isAdmin}
                {...props}
            />} />

            <Route exact path='/login' render={(props) => isAuth ? <Redirect to="/"/> :
                <WrappedNormalLoginForm
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    Auth={Auth}
                    {...props}
                />
            }/>

            <Route exact path='/dashboard' render={(props) => !isAuth ? <Redirect to="/" /> :
                <Dashboard
                    setContentKey={setContentKey}
                    contentKey={contentKey}
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    setHeaderCoverAvatar={setHeaderCoverAvatar}
                    setHeaderCoverUserInfo={setHeaderCoverUserInfo}
                    clearHeaderCoverUserInfo={clearHeaderCoverUserInfo}
                    clearHeaderCoverGroupInfo={clearHeaderCoverGroupInfo}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/groups/create_story' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />}
            />

            <Route exact path='/groups/edit_story/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>

            <Route exact path='/challenges/edit_story/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>


            <Route exact path="/challenges" render={(props) =>
                <AllChallenges
                    setContentKey={setContentKey}
                    contentKey={contentKey}
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    setHeaderCoverAvatar={setHeaderCoverAvatar}
                    setHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    clearHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path="/challenges/current/:id" render={(props) =>
                <SingleCurrentChallengeTabs
                    setContentKey={setContentKey}
                    contentKey={contentKey}
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    setHeaderCoverAvatar={setHeaderCoverAvatar}
                    setHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    clearHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path="/challenges/old/:id" render={(props) =>
                <SingleOldChallenge
                    setContentKey={setContentKey}
                    contentKey={contentKey}
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    setHeaderCoverAvatar={setHeaderCoverAvatar}
                    setHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    clearHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/challenges/create_story' render={(props) =>
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />}
            />

            <Route exact path='/groups/edit/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <WrappedAdminCreateGroup
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>

            <Route exact path="/groups/:groupId/:storyId" render={(props) =>
                <StoryPage
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path="/groups/:name" render={(props) =>
                <SingleGroup
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    setHeaderCoverAvatar={setHeaderCoverAvatar}
                    setHeaderCoverGroupInfo={setHeaderCoverGroupInfo}
                    clearHeaderCoverGroupInfo={clearHeaderCoverGroupInfo}
                    Auth={Auth}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/groups' render={(props) =>
                <AllGroups
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/users/:name' render={(props) =>
                <UserInfo
                    setContentKey={setContentKey}
                    contentKey={contentKey}
                    setSubHeaderLocation={setSubHeaderLocation}
                    subHeaderLocation={subHeaderLocation}
                    setSubHeaderKey={setSubHeaderKey}
                    subHeaderKey={subHeaderKey}
                    withHeaderCover={withHeaderCover}
                    setHeaderCoverVisibility={setHeaderCoverVisibility}
                    setHeaderCoverSource={setHeaderCoverSource}
                    setHeaderCoverAvatar={setHeaderCoverAvatar}
                    setHeaderCoverUserInfo={setHeaderCoverUserInfo}
                    clearHeaderCoverUserInfo={clearHeaderCoverUserInfo}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/admin/challenges/create' render={(props) => !isAdmin ? <Redirect to="/"/> :
                <WrappedAdminCreateChallenge
                    setSubHeaderKey={setSubHeaderKey}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/admin/groups/create' render={(props) => !isAdmin ? <Redirect to="/"/> :
                <WrappedAdminCreateGroup
                    setSubHeaderKey={setSubHeaderKey}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/admin/users/all' render={(props) => !isAdmin ? <Redirect to='/'/> :
                <AdminAllUsersPane
                    setSubHeaderKey={setSubHeaderKey}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/admin/groups/all' render={(props) => !isAdmin ? <Redirect to='/' /> :
                <AdminAllGroupsPane
                    setSubHeaderKey={setSubHeaderKey}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                /> }
            />


        </Switch>
    );

};

export default AppRouter;