const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE-NEW-MESSAGE-TEXT';

let initialState = {
    dialogs: [
        {
            id: 1,
            name: "Вася",
            avatar: "https://www.meme-arsenal.com/memes/f95856ab40a1b549bfa2f1514099b2c7.jpg"
        },
        {
            id: 2,
            name: "Петя",
            avatar: "https://www.meme-arsenal.com/memes/c7dc460f61771f649ee17facc185ef3a.jpg"
        },
        {
            id: 3,
            name: "Коля",
            avatar: "https://www.meme-arsenal.com/memes/51a972709e645d4f9a8a10afe540c567.jpg"
        },
        {
            id: 4,
            name: "Антон",
            avatar: "https://www.meme-arsenal.com/memes/f76041521ee067dce455716fec5f0560.jpg"
        },
        {
            id: 5,
            name: "Иван",
            avatar: "https://www.meme-arsenal.com/memes/a3e01e1426a1c0b290b40d01ceadfed8.jpg"
        },
        {
            id: 6,
            name: "Фрол",
            avatar: "https://www.meme-arsenal.com/memes/242569be9a3b25fa0e0704d0b088c33a.jpg"
        },
        {
            id: 7,
            name: "Арнольд",
            avatar: "https://www.meme-arsenal.com/memes/c00ac4f98c08a5cc0924ba812415d27e.jpg"
        },
        {
            id: 8,
            name: "Товарищь",
            avatar: "https://www.meme-arsenal.com/memes/c79d46e696c06b0bc0cf81ff08d1f44f.jpg"
        },
        {
            id: 9,
            name: "Тутси",
            avatar: "https://www.meme-arsenal.com/memes/56137e53246061fe6a57421c809f17f1.jpg"
        },
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
};

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newMessage,
                };
        case ADD_MESSAGE:
            let newMessage = {
                id: 10,
                message: state.newMessageText,
                type: 'outcome',
            };
            return {
                ...state,
                newMessageText: '',
                messages: [
                    ...state.messages,
                    //пушим новый объект
                    {id: 10, message: state.newMessageText, type: 'outcome', }],
            };
        default:
            return state;
    }
};
export const addMessageActionCreator = () => ({type: ADD_MESSAGE});
//ActionCreator создаётся вместо отдельного объекта action:
// let action = { type: 'UPDATE-NEW-MESSAGE-TEXT', newMessage: text};
export const addNewMessageTextActionCreator = (text) => ({type: UPDATE_NEW_MESSAGE_TEXT, newMessage: text});


export default dialogsReducer;