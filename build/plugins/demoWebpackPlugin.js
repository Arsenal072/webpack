class DemoWebpackPlugin{
    constructor(){
        console.log('plugin init')
    }
    apply(compiler){
        compiler.plugin('watch-run', (watching, callback)=>{
            const changedFiles = watching.watchFileSystem.watcher.mtimes;
            for(let key in changedFiles){
                console.log('changedFiles', key)
            }
            // if(changedFiles[filePath]!==undefined){
            //     console.log('changedFiles',changedFiles[filePath])
            // }
            // let fileList = 'in this build:\n\n'
            // for(var i=0;i<changedFiles.length;i++){
            //     fileList += ('-'+ changedFiles[i].filename + '\n')
            // }
            // compilation.assets['changedFileList.md'] = {
            //     source: ()=>{
            //         return fileList
            //     },
            //     size: ()=>{
            //         return fileList.length
            //     }
            // };
            callback()
        })
        compiler.plugin('emit', (compilation, callback)=>{
            // console.log('compilation',compilation)
            let fileList = 'in this build:\n\n'
            for(var filename in compilation.assets){
                fileList += ('-'+ filename + '\n')
            }
            fileList = fileList + compilation.assets
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