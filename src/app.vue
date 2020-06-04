<!-- app.vue -->
<template>
    <div class='app-wrapper'>
        <span>app运行成功哈哈哈哈</span>
        <div>风格化风格化风格规划规范化化445</div>
        <div class="box">
            <div>等分效果</div>
            <div>等分效果</div>
        </div>
        <button @click="a">点击引入js</button>
    </div>
</template>

<script>
export default {
    name: "",
    components: {},

    data() {
        return {};
    },
    created() {
        // class Logger {
        //     printName(name = "there") {
        //         console.log('this',this)
        //         this.print(`Hello ${name}`);
        //     }

        //     print(text) {
        //         console.log(text);
        //     }
        // }

        // const logger = new Logger();
        // logger.printName()
        console.log(Promise.resolve(1).then(res=>{console.log('2')}))
        // const { printName } = logger;
        // printName(); // TypeError: Cannot read property 'print' of undefined
    },

    },
    methods: {
        
        a(){
            import(/* webpackChunkName: "test" */ './test').then((module)=>{
                const test = module.default
                test()
            })
        }
    }
};
</script>
<style lang='scss' scoped>
.app-wrapper {
    height: 1000px;
    background-image: url("./assets/images/veer-141542994.jpg");
    span {
        font-size: 18px;
        color: orange;
        font-weight: bold;
    }
    div {
        box-shadow: 0 0 0 #000;
    }
    .box {
        display: flex;
        div {
            height: 300px;
            border: 1px solid #000000;
            flex: 1; //这就是flex：1的妙用
            text-align: center;
        }
    }
}
</style>