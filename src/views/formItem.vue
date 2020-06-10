<!--  -->
<template>
    <div class='formItem-wrapper'>
        <label class='label'>{{title}}</label>
        <slot></slot>
        <p v-if='errorMsg'>{{errorMsg}}</p>
    </div>
</template>

<script>
    import Input from './input'
    export default {
        name: '',
        components: {
            Input
        },
        inject: ['form'],
        props: {
            title: {
                type: String,
                default: ''
            },
            prop: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                errorMsg: ''
            };
        },
        mounted(){
            this.$on('validate', ()=>this.validate())
        },
        methods: {
            validate(){
                const value = this.form.model[prop]
                const rule = this.form.rules[prop]
                // npm i async-validator -S
                const desc = { [this.prop]: rules };
                const schema = new Schema(desc);
                // return的是校验结果的Promise
                return schema.validate({ [this.prop]: value }, errors => {
                    if (errors) {
                    this.errorMsg = errors[0].message;
                    } else {
                    this.errorMsg = "";
                    }
                });
            }
        }
    }
</script>
<style lang='scss' scoped>
    .label {
        display: inline-block;
        width: 50px;
        text-align: right;
    }
</style>