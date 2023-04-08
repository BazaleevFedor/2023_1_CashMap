import userStore from "../stores/userStore.js";
import Router from "../modules/router.js";
import {sideBarConst, headerConst} from "../static/htmlConst.js";
import {actionUser} from "../actions/actionUser.js";
import {actionFriends} from "../actions/actionFriends.js";
import friendsStore from "../stores/friendsStore.js";

export default class FriendsView {
	constructor() {
		this._addHandlebarsPartial();

		this._jsId = 'friends';
		this.curPage = false;
		this.init = false;

		friendsStore.registerCallback(this.updatePage.bind(this));
		userStore.registerCallback(this.updatePage.bind(this));
	}

	_addHandlebarsPartial() {
		Handlebars.registerPartial('inputField', Handlebars.templates.inputField)
		Handlebars.registerPartial('button', Handlebars.templates.button)
		Handlebars.registerPartial('sideBar', Handlebars.templates.sideBar)
		Handlebars.registerPartial('header', Handlebars.templates.header);
		Handlebars.registerPartial('menuItem', Handlebars.templates.menuItem)
		Handlebars.registerPartial('search', Handlebars.templates.search)
		Handlebars.registerPartial('friend', Handlebars.templates.friend)
	}

	_addPagesElements() {
		this._exitBtn = document.getElementById('js-exit-btn');

		this._myPageItem = document.getElementById('js-side-bar-my-page');
		this._newsItem = document.getElementById('js-side-bar-news');
		this._msgItem = document.getElementById('js-side-bar-msg');
		this._photoItem = document.getElementById('js-side-bar-photo');
		this._friendsItem = document.getElementById('js-side-bar-friends');
		this._groupsItem = document.getElementById('js-side-bar-groups');
		this._bookmarksItem = document.getElementById('js-side-bar-bookmarks');

		this._addFr = document.getElementsByClassName('js-add-friend');
	}

	_addPagesListener() {
		this._exitBtn.addEventListener('click', () => {
			actionUser.signOut();
		});

		this._myPageItem.addEventListener('click', () => {
			Router.go('/profile', false);
		});

		this._newsItem.addEventListener('click', () => {
			Router.go('/feed', false);
		});

		/*this._addFr.addEventListener('click', () => {
			const dataId = this._addFr.getAttribute('data-id');
			console.log(dataId);

			actionFriends.unsub('id2');
		});*/
	}

	remove() {
		document.getElementById(this._jsId)?.remove();
	}

	showPage() {
		this.init = true;
		actionUser.getProfile(() => { actionFriends.getFriends(userStore.user.user_link, 15, 0); });
	}

	updatePage() {
		if (this.curPage) {
			if (!userStore.user.isAuth) {
				Router.go('/signIn');
			} else {
				this._render();
			}
		}
	}

	_preRender() {
		this._template = Handlebars.templates.friends;

		let header = headerConst;
		header['avatar'] = userStore.user.avatar;
		this._context = {
			sideBarData: sideBarConst,
			headerData: header,
			friendsData: friendsStore.friends,
		}
	}

	_render() {
		this._preRender();
		Router.rootElement.innerHTML = this._template(this._context);
		this._addPagesElements();
		this._addPagesListener();
	}

}
