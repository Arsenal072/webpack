// import Vue from 'vue'
import App from './app.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// import './assets/css/main.css'
// Vue.use(ElementUI);
//路由懒加载
function load(component) {
    return () => import(`@/views/${component}`)
}
// 路由配置
const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            name: 'home',
            component: load('Home'),
            meta: {
                title: '首页'
            }
        },
    ]
});
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
// console.log('hello loader!!!')
// // const obj = require('./backstage')
// import obj from './backstage'
// console.log('obj.title', obj.foo)

// import( /* webpackChunkName: "test" */ './test').then((module) => {
//     const test = module.default
//     function SupType(name){
//         this.name = name
//         this.colors = ['red', 'black']
//     }
//     SupType.prototype.sayName = function(){
//         console.log(this.name)
//         console.log('333',this)
//     }
//     function SubType(name, age){
//         console.log('111',this)
//         SupType.call(this, name)
//         this.age = age
//     }
//     SubType.prototype = new SupType()
//     SubType.prototype.constructor = SubType
//     SubType.prototype.sayAge = function(){
//         console.log('222',this)
//         console.log(this.age)
//     }
//     var instance = new SubType('allen',26)
//     instance.colors.push('blue')
//     console.log('instance.colors',instance.colors)
//     instance.sayAge()
//     instance.sayName()

//     function Person(){
//     }
//     Person.prototype = {
//         name: 'nicholas',
//         age: 26,
//         job: 'software Engineer',
//         sayName: function(){
//             console.log(this.name)
//         }
//     }
//     var person3 = new Person()
//     function SupType(){
//         this.name = 'nicholas'
//     }
//     SupType.prototype.sayName = function(){
//         console.log(this.name)
//     }
//     function SubType(){
//         this.age = 'allen'
//     }
//     SubType.prototype = new SupType()
//     SubType.prototype.sayAge = function(){
//         console.log(this.name)
//     }
//     var instance = new SubType()
//     function inheritPrototype(SubType, SupType){
//         var prototype = Object.create(SupType.prototype) 
//         prototype.constructor = SubType
//         SubType.prototype = prototype 
//     }
//     test()
// })
// class Add {
//     constructor(name) {
//         this.name = name
//     }
//     sayName() {
//         console.log(`hello ${this.name}`)
//     }
// }
// let a = new Add('啊啊啊啊')
// a.sayName()
// // a.name = '哈哈哈，修改了'
// let b = new Add('哈哈哈哈哈哈')
// b.sayName()

// // call
// function say(name, age) {
//     return {
//         name,
//         age,
//         gender: this.gender
//     }
// }
// Function.prototype.myCall = function (context) {
//     //此处没有考虑context非object情况
//     context.fn = this;
//     let args = [];
//     for (let i = 1, len = arguments.length; i < len; i++) {
//         args.push(arguments[i]);
//     }
//     let result = context.fn(...args);
//     delete context.fn;
//     return result;
// };
// let obj = {
//     gender: '男'
// }
// let p1 = say.myCall(obj, 'Rose', 18)
// console.log('p1', p1)
// // apply
// Function.prototype.myApply = function (context, arr) {
//     console.log('Object(context)', Object(context))
//     var context = Object(context) || window;
//     console.log('context', context)
//     context.fn = this;

//     var result;
//     if (!arr) {
//         result = context.fn();
//     } else {
//         var args = [];
//         for (var i = 0, len = arr.length; i < len; i++) {
//             args.push("arr[" + i + "]");
//         }
//         console.log('args',args)
//         console.log('22',"context.fn(" + args + ")")
//         result = eval("context.fn(" + args + ")");
//     }

//     delete context.fn;
//     return result;
// }
// console.log('p2', say.myApply('hahaha', ['Pual', 21]))