export const setLocalStorage = (object) => {
    for (const key in object) {
        if (localStorage.getItem(`${key}`) === null) {
            localStorage.setItem(`${key}`, `${object[key]}`);
        } else {
        localStorage.removeItem(`${key}`);
            localStorage.setItem(`${key}`, `${object[key]}`);
       }
    }
}
