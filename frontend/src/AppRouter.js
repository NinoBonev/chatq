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
import AllUserStories from './components/story/AllUserStories';

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
    const {Crud, Auth, Helper, setActiveKey, activeKey} = props;

    const isAuth = Auth.isLoggedIn();
    const isAdmin = Auth.isAdmin();

    return (
        <Switch>

            <Route exact path='/' render={(props) => isAuth ? <Redirect to="/dashboard"/> :
                <HomePage
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path="/logout" render={() => <Redirect to="/" />}/>

            <Route exact path='/register' render={(props) => isAuth ? <Redirect to="/"/> :
                <WrappedRegistrationForm
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    Auth={Auth}
                    {...props}
                />
            }/>

            <Route exact path='/about' render={() => <About
                activeKey={activeKey}
                setActiveKey={setActiveKey}
                Auth={Auth}
                isAdmin={isAdmin}
            />} />

            <Route exact path='/login' render={(props) => isAuth ? <Redirect to="/"/> :
                <WrappedNormalLoginForm
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    Auth={Auth}
                    {...props}
                />
            }/>

            <Route exact path='/dashboard' render={(props) => !isAuth ? <Redirect to="/" /> :
                <Dashboard
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />}
            />

            <Route exact path='/groups/edit_story/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>

            <Route exact path='/challenges/edit_story/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>


            <Route exact path="/challenges" render={(props) =>
                <AllChallenges
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />}
            />

            <Route exact path='/groups/edit/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <WrappedAdminCreateGroup
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>

            <Route exact path="/groups/:groupId/:storyId" render={(props) =>
                <StoryPage
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAuth={isAuth}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/users/:name' render={(props) =>
                <AllUserStories
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
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
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/admin/groups/create' render={(props) => !isAdmin ? <Redirect to="/"/> :
                <WrappedAdminCreateGroup
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/admin/users/all' render={(props) => !isAdmin ? <Redirect to='/'/> :
                <AdminAllUsersPane
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/admin/groups/all' render={(props) => !isAdmin ? <Redirect to='/' /> :
                <AdminAllGroupsPane
                    activeKey={activeKey}
                    setActiveKey={setActiveKey}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                /> }
            />


        </Switch>
    );

};

export default AppRouter;