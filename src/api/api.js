import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',

/*{withCredentials: true},
    headers: {
        'API-KEY': 'b1775b2f-c3a5-4509-8dc9-90b5629de7c3'
    }*/
});

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 5) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data;
            });
    },
    follow(userId) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId) {
       return instance.delete(`follow/${userId}`)
    },
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`,
            {withCredentials: true},
        )
    },
}


/* до рефакторинга с использованием instance запрос был такой

//устанавливаем в параметрах значения по умолчанию, если параметры не прийдут в функцию
export const getUsers = (currentPage = 1, pageSize = 5) => {
    //возвращаем промис, который нам даст get
    return axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`
    //,{withCredentials: true}
      //возвращаем не весь респонсе, а только data из него, чтобы функциональная компонента не получала то, что ей не нужно
    )
        .then(response => response.data)
        }

 */