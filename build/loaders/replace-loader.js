const loaderUtils = require('loader-utils')
module.exports = function(source){
    var options = loaderUtils.getOptions(this)
    console.log('获取配置参数',options.name)
    // this.callback(null, source)
    return source.replace('loader', '被loader修改了，哈哈！')
}