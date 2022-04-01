import { Buffer } from 'buffer';

const setToken = (tokenName, token) => {
    if (token) {
        console.log('SETTING TOKEN: ', token);
        localStorage.setItem(tokenName, token);
    } else {
        console.warn('NO TOKEN TO SET');
    }
}

const getToken = (tokenName) => {
    let token = localStorage.getItem(tokenName);
    if (token === `Bearer ${null}`) {
        removeToken(tokenName);
    }
    // console.log(`TOKEN ${tokenName}: `, token);
    if (token && token !== 'null') {
        if (token.charAt(0) !== '$') {
            const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64'));
            if (payload?.exp < (Date.now() / 1000)) {
                console.log('Token expired');
                removeToken(tokenName);
                token = null;
            };
        }
    } else {
        removeToken(tokenName);
        token = null;
    };
    return token;
}

const getBearerToken = (tokenName) => {
    const token = getToken(tokenName);
    if (token) {
        const bearerToken = `Bearer ${token}`;
        return bearerToken;
    } else {
        removeToken(tokenName);
    }
}

const removeToken = (tokenName) => {
    localStorage.removeItem(tokenName);
    console.log('REMOVING TOKEN: ', tokenName);
}

export {
    setToken,
    getToken,
    getBearerToken,
    removeToken
}