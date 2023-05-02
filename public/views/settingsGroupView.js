import userStore from "../stores/userStore.js";
import Router from "../modules/router.js";
import {sideBarConst, headerConst, settingsGroupConst, activeColor, groupAvatarDefault} from "../static/htmlConst.js";
import {actionGroup} from "../actions/actionGroup.js";
import {actionImg} from "../actions/actionImg.js";
import groupStore from "../stores/groupStore.js";
import BaseView from "./baseView.js";

export default class GroupView extends BaseView {
	constructor() {
		super();
		this._jsId = 'settingsGroup';

		this._validateTitle = true;
		this._validateInfo = true;
		groupStore.registerCallback(this.updatePage.bind(this));
		this._reader = new FileReader();

		this._fileList = null;
	}

	/**
	 * @private метод, отправляющий callback, которые вызываются при изменении определенных Store.
	 */
	addStore() {
		groupStore.registerCallback(this.updatePage.bind(this));
		userStore.registerCallback(this.updatePage.bind(this));
	}

	addPagesElements() {
		super.addPagesElements();

		this._dropArea = document.getElementById('js-drop-zone');
		this._dropContent = document.getElementById('js-drop-content');
		this._titleField = document.getElementById('js-title-input');
		this._titleErrorField = document.getElementById('js-title-error');
		this._infoField = document.getElementById('js-info-input');
		this._infoErrorField = document.getElementById('js-info-error');
		this._typeField = document.getElementById('js-type-input');
		this._showAuthorField = document.getElementById('js-showAuthor-input');
		this._saveBtn = document.getElementById('js-settings-save-btn');
	}

	addPagesListener() {
		super.addPagesListener();

		this._dropArea.addEventListener('dragover', (event) => {
			event.preventDefault();
		});

		this._dropArea.addEventListener('drop', (event) => {
			event.preventDefault();

			this._fileList = event.dataTransfer.files[0];

			this._dropContent.innerHTML = '';
			this._reader.readAsDataURL(this._fileList);
			this._reader.addEventListener('load', (event) => {
				this._dropContent.src = event.target.result;
			});
		});

		this._saveBtn.addEventListener('click', () => {
			if (this._validateTitle && this._validateInfo) {
				if (this._fileList) {
					actionImg.uploadImg(this._fileList, (newUrl) => {
						actionGroup.editGroup({avatar: newUrl, title: this._titleField.value, info: this._infoField.value, privacy: this._typeField.value, hideOwner: this._showAuthorField.checked});
					});
				} else {
					actionGroup.editGroup({title: this._titleField.value, info: this._infoField.value, privacy: this._typeField.value, hideOwner: this._showAuthorField.checked});
				}
			}
		});

		this._titleField.addEventListener('change', () => {
			this._validateTitle = Validation.validation(this._titleField, this._titleErrorField, 'userStatus', 'settings');
		});
		this._infoField.addEventListener('change', () => {
			this._validateInfo = Validation.validation(this._infoField, this._infoErrorField, 'bio', 'settings');
		});
		
	}

	showPage() {
		actionGroup.getGroup();
	}

	_preRender() {
		this._template = Handlebars.templates.settingsGroup;
		let header = headerConst;
		header['avatar'] = userStore.user.avatar;

		let settings = settingsGroupConst;
		settings['avatar'] = groupStore.group.avatar;
		settings['inputInfo']['data'] = groupStore.group.title;
		settings['info'] = groupStore.group.info;
		settings['type'] = groupStore.group.type;
		settings['showAuthor'] = groupStore.group.showAuthor;

		this._context = {
			sideBarData: sideBarConst,
			headerData: header,
			settingsPathData: settingsGroupConst,
		}
	}
}
