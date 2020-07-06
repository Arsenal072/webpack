import './assets/css/backstage.css'
import(/* webpackChunkName: "backstageTest" */ './test').then((module)=>{
    const test = module.default
    // console.log('hello backstage!')
    test()
})
var foo = 'bar'
var kkk = 'hello 路由懒加载'
setTimeout(() => foo = 'baz', 500);
export default {
    kkk,
    foo
};

