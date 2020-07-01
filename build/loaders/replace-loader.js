const loaderUtils = require('loader-utils')
module.exports = function(source){
    // console.log('source',source)
    // console.log('this', this)
    // console.log('this.query', this.query)
    var options = loaderUtils.getOptions(this)
    // this.callback(null, source)
    return source.replace('loader', options.name)
}