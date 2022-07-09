import profileReducer, {addPostActionCreator, deletePost} from "./profile-reducer";

//1. start test data
let state = {
    posts: [
        {id: 1, message: "Это мой первый пост", like: 100},
        {id: 2, message: "Это мой второй пост", like: 200},
    ]
};

it('length of posts should be incremented', () => {

    //1. start test data
    let action = addPostActionCreator('новый пост');

    //2. action
    let newState = profileReducer(state, action);

    //3. expectation
    expect(newState.posts.length).toBe(3);
});

it('correct text of newText', () => {
    let action = addPostActionCreator('новый пост');
    let newState = profileReducer(state, action);
    expect(newState.posts[2].message).toBe('новый пост');
});

it('after deleting length of messages should be incremented', () => {
    let action = deletePost(2);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(1);
});

it("after deleting post with wrong id length of messages shouldn't be changed", () => {
    let action = deletePost(4);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});