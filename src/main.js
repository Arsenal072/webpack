import Vue from 'vue'
import App from './app.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/main.css'

Vue.use(ElementUI);

new Vue({
    render: h=> h(App)
}).$mount('#app')

import( /* webpackChunkName: "test" */ './test').then((module) => {
    const test = module.default
    // function SupType(name){
    //     this.name = name
    //     this.colors = ['red', 'black']
    // }
    // SupType.prototype.sayName = function(){
    //     console.log(this.name)
    //     console.log('333',this)
    // }
    // function SubType(name, age){
    //     console.log('111',this)
    //     SupType.call(this, name)
    //     this.age = age
    // }
    // SubType.prototype = new SupType()
    // SubType.prototype.constructor = SubType
    // SubType.prototype.sayAge = function(){
    //     console.log('222',this)
    //     console.log(this.age)
    // }
    // var instance = new SubType('allen',26)
    // instance.colors.push('blue')
    // console.log('instance.colors',instance.colors)
    // instance.sayAge()
    // instance.sayName()

    // function Person(){
    // }
    // Person.prototype = {
    //     name: 'nicholas',
    //     age: 26,
    //     job: 'software Engineer',
    //     sayName: function(){
    //         console.log(this.name)
    //     }
    // }
    // var person3 = new Person()
    // function SupType(){
    //     this.name = 'nicholas'
    // }
    // SupType.prototype.sayName = function(){
    //     console.log(this.name)
    // }
    // function SubType(){
    //     this.age = 'allen'
    // }
    // SubType.prototype = new SupType()
    // SubType.prototype.sayAge = function(){
    //     console.log(this.name)
    // }
    // var instance = new SubType()
    // function inheritPrototype(SubType, SupType){
    //     var prototype = Object.create(SupType.prototype) 
    //     prototype.constructor = SubType
    //     SubType.prototype = prototype 
    // }
    test()
})
// Class Add {

// }