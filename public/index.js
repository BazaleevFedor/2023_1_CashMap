import Router from "./modules/router.js";
import SignInView from "./views/signInView.js";
import SignUpView from "./views/signUpView.js";
import FeedView from "./views/feedView.js";
import FriendsView from "./views/friendsView.js";
import {actionUser} from "./actions/actionUser.js";


const Views = {
    FeedView: new FeedView(),
    SignInView: new SignInView(),
    SignUpView: new SignUpView(),
    FriendsView: new FriendsView(),
};

/*actionUser.checkAuth();*/

Router.registerPage('/', Views.FeedView);
Router.registerPage('/feed', Views.FeedView);
Router.registerPage('/signIn', Views.SignInView);
Router.registerPage('/signUp', Views.SignUpView);
Router.registerPage('/friends', Views.FriendsView);

Router.init()

