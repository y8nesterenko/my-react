const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let store = {
    _state: {

        profilePage: {

            posts: [
                {id: 1, message: "Это мой первый пост", like: 100},
                {id: 2, message: "Это мой второй пост", like: 200},
                {id: 3, message: "Это мой третий пост", like: 300},
                {id: 4, message: "Это мой четвёртый пост", like: 400},
                {id: 5, message: "Это мой пятый пост", like: 500},
                {id: 6, message: "Это мой шестой пост", like: 600},
                {id: 7, message: "Это мой седьмой пост", like: 700},
                {id: 8, message: "Это мой восьмой пост", like: 800},
            ],
            newPostText: '',
        },

        messagesPage: {

            dialogs: [
                {id: 1, name: "Вася", avatar: "https://www.meme-arsenal.com/memes/f95856ab40a1b549bfa2f1514099b2c7.jpg"},
                {id: 2, name: "Петя", avatar: "https://www.meme-arsenal.com/memes/c7dc460f61771f649ee17facc185ef3a.jpg"},
                {id: 3, name: "Коля", avatar: "https://www.meme-arsenal.com/memes/51a972709e645d4f9a8a10afe540c567.jpg"},
                {id: 4, name: "Антон", avatar: "https://www.meme-arsenal.com/memes/f76041521ee067dce455716fec5f0560.jpg"},
                {id: 5, name: "Иван", avatar: "https://www.meme-arsenal.com/memes/a3e01e1426a1c0b290b40d01ceadfed8.jpg"},
                {id: 6, name: "Фрол", avatar: "https://www.meme-arsenal.com/memes/242569be9a3b25fa0e0704d0b088c33a.jpg"},
                {id: 7, name: "Арнольд", avatar: "https://www.meme-arsenal.com/memes/c00ac4f98c08a5cc0924ba812415d27e.jpg"},
                {
                    id: 8,
                    name: "Товарищь",
                    avatar: "https://www.meme-arsenal.com/memes/c79d46e696c06b0bc0cf81ff08d1f44f.jpg"
                },
                {id: 9, name: "Тутси", avatar: "https://www.meme-arsenal.com/memes/56137e53246061fe6a57421c809f17f1.jpg"},
            ],

            messages: [
                {id: 1, message: "Сообщение 1", type: "income"},
                {id: 2, message: "Сообщение 2", type: "outcome"},
                {id: 3, message: "Сообщение 3", type: "income"},
                {id: 4, message: "Сообщение 4", type: "outcome"},
                {id: 5, message: "Сообщение 5", type: "income"},
                {id: 6, message: "Сообщение 6", type: "outcome"},
                {id: 7, message: "Сообщение 7", type: "income"},
                {id: 8, message: "Сообщение 8", type: "outcome"},
                {id: 9, message: "Сообщение 9", type: "income"},
            ],

            newMessageText: '',
        },

        newsPage: {
            news: [
                {id: 1, text: "Новость 1"},
                {id: 2, text: "Новость 2"},
                {id: 3, text: "Новость 3"},
                {id: 4, text: "Новость 4"},
                {id: 5, text: "Новость 5"},
                {id: 6, text: "Новость 6"},
            ],
        },

        moviesPage: {
            movies: [
                {id: 1, name: "Movie 1", year: 2022},
                {id: 2, name: "Movie 2", year: 2023},
                {id: 3, name: "Movie 3", year: 2024},
                {id: 4, name: "Movie 4", year: 2025},
                {id: 5, name: "Movie 4", year: 2026},
                {id: 6, name: "Movie 6", year: 2027},
            ],
        },

        settingsPage: {
            settings: [
                {id: 1, property: "interface"},
                {id: 2, property: "volume"},
                {id: 2, property: "color"},
            ],
        },
    },
    _callSubscriber() {},
    getState() {
        return this._state;
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },
    dispatch(action) {

        if (action.type === ADD_POST) {
            let newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                like: 0,
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';
            this._callSubscriber(this._state);
        }

        else if (action.type === UPDATE_NEW_POST_TEXT) {
            //Текст нового поста приходит нам из екшена (поля ввода пользователем)
            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);
        }

        else if (action.type === ADD_MESSAGE) {
            //Создаём объект, который будем добавлять в массив
            let newMessage = {
                id: 10,
                message: this._state.messagesPage.newMessageText,
                type: 'outcome',
            };
            //Пушим (добавляем) созданный объект в массив
            this._state.messagesPage.messages.push(newMessage);
            //Зануляем содержимое поля ввода
            this._state.messagesPage.newMessageText = '';
            this._callSubscriber(this._state);
        }

        else if (action.type === UPDATE_NEW_MESSAGE_TEXT) {
            this._state.messagesPage.newMessageText = action.newMessage;
            this._callSubscriber(this._state);
        }

        //равноценназапись через Switch

        // switch (action.type)
        //     case: ADD_POST, ;lm smlkmsklvdskl nklvsnklvsnklsvnklvsklvsdmklvsmkl

        },
};
export const addPostActionCreator = () => {
    return {
        type: ADD_POST};
};
// Равнозначная запись
//export const addPostActionCreator = () => ({type: ADD_POST});

export const addNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text};
};

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
export const addNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage: text});

export default store;
window.store = store;