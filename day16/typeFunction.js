const sum = (valueArray) => valueArray.reduce((tot, n) => tot += n, 0)

const prod = (valueArray) => valueArray.reduce((tot, n) => tot * n, 1)

const min = (valueArray) => Math.min(...valueArray)

const max = (valueArray) => Math.max(...valueArray)

const gt = (valueArray) => valueArray[0] > valueArray[1] ? 1 : 0

const lt = (valueArray) => valueArray[0] < valueArray[1] ? 1 : 0

const et = (valueArray) => valueArray[0] === valueArray[1] ? 1 : 0

module.exports = {
    "0": sum,
    "1": prod,
    "2": min,
    "3": max,
    "5": gt,
    "6": lt,
    "7": et
}