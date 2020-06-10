<!--  -->
<template>
    <div>
        <Form class='form-wrapper' :model='model' :rules='rules'>
            <FormItem title='用户名' prop='usename'>
                <Input v-model='model.usename' placeholder="输入用户名" autocomplete="off"></Input>
            </FormItem>
            <FormItem title='密码' prop='password'>
                <Input v-model='model.password' placeholder="输入密码" autocomplete="off"></Input>
            </FormItem>
            <button class='btn'>提交</button>
            <p>{{model}}</p>
        </Form>
    </div>
</template>

<script>
    import Form from './Form'
    import FormItem from './formItem'
    import Input from './input'
    export default {
        name: '',
        components: {
            Form,
            FormItem,
            Input
        },

        data() {
            return {
                model: {
                    usename: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: "请输入用户名"
                    }],
                    password: [{
                        required: true,
                        message: "请输入密码"
                    }]
                }
            };
        },

        methods: {}
    }
</script>
<style lang='scss' scoped>
    .form-wrapper {
        width: 80%;
        margin: 0 auto;
    }

    .btn {
        width: 60px;
    }
</style>