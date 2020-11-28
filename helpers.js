exports.retrieveRolByName = (rolName) => {
    switch (rolName) {
        case 'MASTER':
            return '781605333851308094'
        case 'PLAYER':
            return '781605395302711357'
        default:
            break;
    }
}