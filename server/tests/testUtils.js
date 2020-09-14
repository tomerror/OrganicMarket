const chalk = require('chalk');

titleMessage = (message) => {
    console.log(chalk.bgCyan.black(message))
}
subtitleMessage = (message) => {
    console.log(message)
}
apiMessage = (message) => {
    console.log('\n'+chalk.black.bgMagenta(message))
}
successMessage = () => {
    console.log(chalk.black.bgGreen("Success"))
}

failedMessage = () => {
    console.log(chalk.black.bgRed("Failed"))
}

module.exports = {
    titleMessage,
    subtitleMessage,
    apiMessage,
    successMessage,
    failedMessage
}