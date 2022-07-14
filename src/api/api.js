import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': '718c556a-277b-4513-b77b-893b6f3e2309' },
});

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
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
        console.warn('Obsolete method. Please use profileAPI object');
        return profileAPI.getProfile(userId)
    },
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`)
    },
    //в профайле нет статуса пользователя, поэтому запрашиваем отдельно
    getStatus(userId) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status) {
        //вторым параметром передаём payload (полезную нагрузку) в свойствах согласно требованиям сервера
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        //имя файла указываем так, как написано в API документации
        formData.append('image', photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile)
    },
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    //для rememberMe заглушка - если не прийдёт, будет false
    login(email, password, rememberMe = false, captcha = null) {
        return instance.post('auth/login',
            { email, password, rememberMe, captcha }
        )
    },
    logout() {
        return instance.delete('auth/login')
    },
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get(`security/get-captcha-url`)
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