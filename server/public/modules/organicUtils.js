const config = require('../../config.json');
const moment = require('moment');

sortByLogDate = (a, b) => {
    if (moment(a.time, config.logDateFormat).diff(b.time, config.logDateFormat) > 0) {
        return -1;
    }
    if (moment(a.time, config.logDateFormat).diff(b.time, config.logDateFormat) < 0) {
        return 1;
    }
    return 0
}

sortByPaymentDate = (a, b) => {
    if (moment(a.time, config.paymentDateFormat).diff(b.time,config.paymentDateFormat) > 0) {
        return -1;
    }
    if (moment(a.time, config.paymentDateFormat).diff(b.time, config.paymentDateFormat) < 0) {
        return 1;
    }
    return 0
}

groupByDate = (list, section) => {
    let uniqDates = []
    list.map((d) => { 
        if (!uniqDates.includes(d.split(config.dateGroupByChar)[section])) { 
            uniqDates.push(d.split(config.dateGroupByChar)[section]) 
        } 
    })
    return uniqDates;
}

module.exports = {
    groupByDate,
    sortByPaymentDate,
    sortByLogDate
}