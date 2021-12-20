module.exports = function indexOfNth(str, subStr, n){
    return str.split(subStr, n).join(subStr).length
}