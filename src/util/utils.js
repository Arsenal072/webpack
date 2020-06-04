
Array.prototype.unique = function(){
    let newArr = []
    this.forEach(item=>{
        if(newArr.indexOf(item)===-1){
            newArr.push(item)
        }
    })
    return newArr
}

Array.prototype.uni = function(){
    let arr = []
    this.sort()
    for(let i=0;i<this.length;i++){
        if(this[i]!=this[i+1]){
            arr.push(this[i])
        }
    }
    return arr
}