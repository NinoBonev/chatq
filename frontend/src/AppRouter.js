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
import TestComp from "./components/home/TestComp";



const AppRouter = (props) => {
    const {Crud, Auth, Helper} = props;

    const isAuth = Auth.isLoggedIn();
    const isAdmin = Auth.isAdmin();

    return (
        <Switch>

            <Route exact path='/api/hello' render={(props) => <TestComp Crud={Crud} />}/>

            <Route exact path='/' render={(props) => isAuth ? <Redirect to="/dashboard"/> :
                <HomePage/>
            }/>

            <Route exact path="/logout" render={() => <Redirect to="/"/>}/>

            <Route exact path='/register' render={(props) => isAuth ? <Redirect to="/"/> :
                <WrappedRegistrationForm
                    {...props}
                />
            }/>

            <Route exact path='/about' render={() => <About
                isAdmin={isAdmin}
            />} />

            <Route exact path='/login' render={(props) => isAuth ? <Redirect to="/"/> :
                <WrappedNormalLoginForm
                    {...props}
                />
            }/>

            <Route exact path='/dashboard' render={(props) => !isAuth ? <Redirect to="/" /> :
                <Dashboard
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/story/create' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />}
            />

            <Route exact path='/story/edit/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />
            }/>

            <Route exact path='/challenge/edit/:id' render={(props) => !isAuth ? <Redirect to="/" /> :
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
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path="/challenges/old/:id" render={(props) =>
                <SingleOldChallenge
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route exact path='/challenges/add_story' render={(props) =>
                <CreateStoryForm
                    isAuth={isAuth}
                    Auth={Auth}
                    Crud={Crud}
                    Helper={Helper}
                    {...props}
                />}
            />

            <Route exact path='/admin/challenges/create' render={(props) => !isAdmin ? <Redirect to="/"/> :
                <WrappedAdminCreateChallenge
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route  path="/groups/:groupId/:storyId" render={(props) =>
                <StoryPage
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />
            }/>

            <Route path="/groups/:id" render={(props) =>
                <SingleGroup
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
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/users/:id' render={(props) =>
                <AllUserStories
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />

            <Route exact path='/admin/users/all' render={(props) => !isAdmin ? <Redirect to='/'/> :
                <AdminAllUsersPane
                    isAdmin={isAdmin}
                    Helper={Helper}
                    Auth={Auth}
                    Crud={Crud}
                    {...props}
                />}
            />


        </Switch>
    );

};

export default AppRouter;