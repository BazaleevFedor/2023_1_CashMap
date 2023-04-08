import Router from "../modules/router.js";
import {logoDataSignUp, signUpData} from "../static/htmlConst";

export default class BaseView {
    constructor() {
        this._addHandlebarsPartial();

        this._jsId = 'sign-up';
        this.curPage = false;
    }

    _addHandlebarsPartial() {
        Handlebars.registerPartial('button', Handlebars.templates.button);
        Handlebars.registerPartial('buttonDefault', Handlebars.templates.buttonDefault);
        Handlebars.registerPartial('chat', Handlebars.templates.chat);
        Handlebars.registerPartial('chatItem', Handlebars.templates.chatItem);
        Handlebars.registerPartial('chatPage', Handlebars.templates.chatPage);
        Handlebars.registerPartial('comment', Handlebars.templates.comment);
        Handlebars.registerPartial('commentArea', Handlebars.templates.commentArea);
        Handlebars.registerPartial('createPost', Handlebars.templates.createPost);
        Handlebars.registerPartial('editPost', Handlebars.templates.editPost);
        Handlebars.registerPartial('editPostPage', Handlebars.templates.editPostPage);
        Handlebars.registerPartial('feed', Handlebars.templates.feed);
        Handlebars.registerPartial('friend', Handlebars.templates.friend);
        Handlebars.registerPartial('friendNotFound', Handlebars.templates.friendNotFound);
        Handlebars.registerPartial('friends', Handlebars.templates.friends);
        Handlebars.registerPartial('header', Handlebars.templates.header);
        Handlebars.registerPartial('inputField', Handlebars.templates.inputField);
        Handlebars.registerPartial('inputSettings', Handlebars.templates.inputSettings);
        Handlebars.registerPartial('logoPath', Handlebars.templates.logoPath);
        Handlebars.registerPartial('menuItem', Handlebars.templates.menuItem);
        Handlebars.registerPartial('message', Handlebars.templates.message);
        Handlebars.registerPartial('messages', Handlebars.templates.messages);
        Handlebars.registerPartial('post', Handlebars.templates.post);
        Handlebars.registerPartial('postArea', Handlebars.templates.postArea);
        Handlebars.registerPartial('profile', Handlebars.templates.profile);
        Handlebars.registerPartial('profileCard', Handlebars.templates.profileCard);
        Handlebars.registerPartial('search', Handlebars.templates.search);
        Handlebars.registerPartial('settings', Handlebars.templates.settings);
        Handlebars.registerPartial('settingsPath', Handlebars.templates.settingsPath);
        Handlebars.registerPartial('sideBar', Handlebars.templates.sideBar);
        Handlebars.registerPartial('signIn', Handlebars.templates.signIn);
        Handlebars.registerPartial('signUp', Handlebars.templates.signUp);
        Handlebars.registerPartial('signInPath', Handlebars.templates.signInPath);
        Handlebars.registerPartial('signUpPath', Handlebars.templates.signUpPath);
    }

    _addPagesElements() {

    }

    _addPagesListener() {

    }

    remove() {
        document.getElementById(this._jsId)?.remove();
    }

    updatePage() {

    }

    _preRender() {

    }

    _render() {
        this._preRender();
        Router.rootElement.innerHTML = this._template(this._context);
        this._addPagesElements();
        this._addPagesListener();
    }
}
