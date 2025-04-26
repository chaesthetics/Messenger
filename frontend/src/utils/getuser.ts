export const getUserInfo = async () => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        return JSON.parse(userInfo);
    } else {
        return null;
    }
}