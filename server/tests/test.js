const utils = require('./testUtils');
const authenticationTester = require('./authentication');
const shopTester = require('./shop');
const manageTester = require('./manage');
const paymentTester = require('./payment');


const serverTest = async () => {
    utils.titleMessage("Starting test ...")
    await authenticationTester()
    await shopTester()
    await manageTester()
    await paymentTester()
    utils.titleMessage("The test finish")
}

serverTest()