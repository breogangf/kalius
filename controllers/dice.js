exports.roll = (command) => {
    console.log(command)
    const regex = /(!roll) (\d{1,2})d(\d{1,3})([+,-])?(\d+)?$/gm;
    const groups = regex.exec(command)
    const dices = groups[2]
    const faces = groups[3]
    const operation = groups[4] || ''
    const modifier = parseInt(groups[5] || 0)
    console.log(`Rolling ${dices} dices, with ${faces} faces, and modifier ${modifier}`)

    let message = ''
    let divider = '+'
    let result = 0

    for (let index = 0; index < dices; index++) {
        if (index === (dices - 1)) {
            divider = ''
        }
        const partial = randomIntFromInterval(1, faces);
        result = result += partial
        message = message + partial.toString() + divider
    }

    if (!operation) {
        console.log(`Result: (${message}) = ${result}`)
    } else {
        if (operation === '+') {
            result = result + modifier
        } else if (operation === '-') {
            result = result - modifier
        }
    }

    return `(${message}) ${operation}${modifier} = ${result}`
}

const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}