export const login = (username, password) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            (username === 'gavin' && password === '1234') ? resolve() : reject()
        }, 1000)
    })
}
