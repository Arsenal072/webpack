<!-- app.vue -->
<template>
    <div class='app-wrapper'>
        <span>app运行成功哈哈哈哈</span>
        <div>风格化风格化风格规划规范化化445</div>
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

    methods: {}
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
}
</style>