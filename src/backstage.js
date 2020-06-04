import './assets/css/backstage.css'
import(/* webpackChunkName: "backstageTest" */ './test').then((module)=>{
    const test = module.default
    // console.log('hello backstage!')
    test()
})