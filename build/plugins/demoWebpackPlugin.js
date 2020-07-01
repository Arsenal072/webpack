class DemoWebpackPlugin{
    constructor(){
        console.log('plugin init')
    }
    apply(compiler){
        compiler.plugin('emit', (compilation, callback)=>{
            let fileList = 'in this build:\n\n'
            for(var filename in compilation.assets){
                fileList += ('-'+ filename + '\n')
            }
            compilation.assets['fileList.md'] = {
                source: ()=>{
                    return fileList
                },
                size: ()=>{
                    return fileList.length
                }
            };
            callback()
        })
    }
}
module.exports = DemoWebpackPlugin