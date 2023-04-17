import messagesStore from "../stores/messagesStore.js";
import {headerConst} from "../static/htmlConst.js";
import userStore from "../stores/userStore.js";
import Ajax from "./ajax.js";

/**
 * класс для работы с web сокетами
 */
class WebSock {
    /**
     * @constructor
     * конструктор метода
     */
    constructor() {
        this._socket = null;
        this._url = 'ws://' + Ajax.backendHostname + ':' + Ajax.backendPort + '/api/ws';
    }

    /**
     * метод, открывающий сокет и описывающий реакцию на сообщения
     */
    open() {
        if (!window['WebSocket']) {
            throw new Error('Ошибка: браузер не поддерживает WebSocket');
        }

        if (!this._socket && userStore.user.isAuth) {
            this._socket = new WebSocket(this._url);
            //this._socket = new WebSocket("ws://95.163.212.121:8080/api/ws");
        }

        this._socket.onmessage = function(event) {
            const response = JSON.parse(event.data);
            response.creation_date = new Date(response.creation_date).toLocaleDateString();
            if (!response.sender_info.url) {
                response.sender_info.url = headerConst.avatarDefault;
            }

            if (localStorage.getItem('chatId') === String(response.chat_id)) {
                messagesStore.messages.push(response);
            }
            messagesStore._refreshStore();
        };
    }

    /**
     * метод, закрывающий сокет
     */
    close() {
        this._socket.close(1000, "ok");
    }
}

export default new WebSock();
