export const fetchUser = () => {
    const userInfo = localStorage.getItem('user') !== undefined ? JSON.parse(localStorage.getItem('user')) : '';
    return userInfo;

}

export const fetchCart = () => {
    const cartInfo = localStorage.getItem('cartItems') !== undefined ? console.log("empty") : '';
    return [];
}
