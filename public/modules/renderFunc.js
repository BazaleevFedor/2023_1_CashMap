import Post from "../components/post/post.js";
import CommentArea from "../components/commentArea/commentArea.js";
import Comment from "../components/comment/comment.js";
import SideBar from "../components/sidebar/sidebar.js";
import Header from "../components/header/header.js";
import CreatePost from "../components/createPost/createPost.js";
import Signup from "../components/signup/signup.js";
import signUp from "./signup.js";
import Login from "../components/login/login.js";
import signIn from "./signin.js";
import Ajax from "./ajax.js";

function renderFeed(parent) {
    //
    // const request = Ajax.get('http://127.0.0.1:8080/api/feed/');
    // request
    //     .then( response => {
    //         if (response.status < 300) {
    //             this.posts = response.response.posts
    //
    //             for (const post of this.posts) {
    //                 renderPost(parent, post)
    //                 console.log(post)
    //             }
    //             return
    //         }
    //         // TODO обработать код ответа
    //     })
    //     .catch(response =>{
    //         // TODO обработать ошибку
    //         console.log(response)
    //
    //     })

    const request = fetch("http://95.163.212.121:8080/api/feed?batch_size=10",
        {
            credentials: "include",
            method: 'GET',
            mode: "cors"
        })
        .then(response => response.json())
        .then(parsed => {
                const posts = parsed.body.posts
                for (const post of posts) {
                    renderPost(parent, post)
                }
            }
        ).catch(err => alert(err))
}


function renderPost(parent, postData) {
    const staticPaths = {
        postEditIconPath: "static/img/post_icons/post_menu.svg",
        likeIconPath: "static/img/post_icons/like.svg",
        clickedLikeIconPath: "static/img/post_icons/like_clicked.svg",
        commentIconPath: "static/img/post_icons/comment.svg",
        bookmarkIconPath: "static/img/post_icons/bookmark.svg",
        clickedBookmarkIconPath: "static/img/post_icons/bookmark_clicked.svg"
    }

    const post = new Post(parent, postData, staticPaths);
    let postBlock = post.render();

    renderCommentArea(postBlock, postData.comments);
}

function renderCommentArea(parent, comments) {
    const staticPaths = {
        attachPhotoIconPath: "static/img/post_icons/photo.svg",
        attachHoveredPhotoIconPath: "static/img/post_icons/photo_hover.svg",
        attachSmileIconPath: "static/img/post_icons/smile.svg",
        attachHoveredSmileIconPath: "static/img/post_icons/smile_hover.svg",
        sendIconPath: "static/img/post_icons/send.svg"
    }


    let user = {
        photoPath: "static/img/post_icons/profile_image.svg"
    }

    const commentsArea = new CommentArea(parent, user, staticPaths);

    let commentList = commentsArea.render();


    for (const data of comments) {
        renderComment(commentList, data);
    }
}

function renderComment(parent, commentData) {
    const staticPaths = {
        edit: "static/img/comment_icons/edit.svg",
        delete: "static/img/comment_icons/delete.svg"
    }

    const comment = new Comment(parent, commentData, staticPaths);
    console.log(commentData)
    comment.render();
}

function renderSideBar(parent) {
    const navItems = {
        pages: [
            {
                ref: '/profile',
                iconPath: 'static/img/nav_icons/profile.svg',
                hoveredIconPath: 'static/img/nav_icons/profile_hover.svg',
                title: 'Моя страница',
                notifies: 0
            },

            {
                ref: '/feed',
                iconPath: 'static/img/nav_icons/news.svg',
                hoveredIconPath: 'static/img/nav_icons/news_hover.svg',
                title: 'Новости',
                notifies: 0
            },

            {
                ref: '/msg',
                iconPath: 'static/img/nav_icons/messenger.svg',
                hoveredIconPath: 'static/img/nav_icons/messenger_hover.svg',
                title: 'Мессенджер',
                notifies: 0
            },

            {
                ref: '/albums',
                iconPath: 'static/img/nav_icons/photos.svg',
                hoveredIconPath: 'static/img/nav_icons/photos_hover.svg',
                title: 'Фотографии',
                notifies: 0
            },

            {
                ref: '/friends',
                iconPath: 'static/img/nav_icons/friends.svg',
                hoveredIconPath: 'static/img/nav_icons/friends_hover.svg',
                title: 'Друзья',
                notifies: 0
            },

            {
                ref: '/groups',
                iconPath: 'static/img/nav_icons/groups.svg',
                hoveredIconPath: 'static/img/nav_icons/groups_hover.svg',
                title: 'Сообщества',
                notifies: 0
            },

            {
                ref: '/bookmarks',
                iconPath: 'static/img/nav_icons/bookmarks.svg',
                hoveredIconPath: 'static/img/nav_icons/bookmarks_hover.svg',
                title: 'Закладки',
                notifies: 0
            }
        ]
    };

    const sideBar = new SideBar(parent, 'Depeche', 'static/img/logo.svg', navItems.pages);

    sideBar.render();
}


export function renderHeader(parent) {
    const tmpConfig = {
        profileUrl: '#',
        avatar: 'static/img/post_icons/profile_image.svg'
    }

    const header = new Header(parent)
    header.config = tmpConfig
    header.render()
}

export function renderCreatePost(parent) {
    const tmpConfig = {
        avatar: 'static/img/post_icons/profile_image.svg'
    }
    const createPost = new CreatePost(parent)
    createPost.config = tmpConfig
    createPost.render()
}


// render pages

export function renderFeedPage() {
    const rootElement = document.getElementById('root')
    const main = document.createElement('div');
    main.classList.add('main');
    rootElement.appendChild(main);

    const content = document.createElement('div');
    content.classList.add('main-content');
    main.appendChild(content);

    const feed = document.createElement('div');
    feed.classList.add('feed');
    content.appendChild(feed);

    renderHeader(content)
    renderCreatePost(content)
    renderSideBar(main);
    renderFeed(feed);
}

export function renderSignupPage() {
    const rootElement = document.getElementById('root');
    const createSignup = new Signup(rootElement, 'static/img/logo.svg', 'static/img/background_left.svg')
    createSignup.render()
    signUp()
}

export function renderLoginPage(parent) {
    const rootElement = document.getElementById('root');
    const createLogin = new Login(rootElement, 'static/img/logo.svg', 'static/img/background_right.svg')
    createLogin.render()
    signIn()
}