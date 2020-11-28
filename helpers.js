exports.retrieveRolByName = (rolName) => {
    switch (rolName) {
        case 'MASTER':
            return '781605333851308094'
        case 'PLAYER':
            return '781605395302711357'
        case 'VILLAGER':
            return '781605717319614484'
        default:
            break;
    }
}
