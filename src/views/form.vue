<!--  -->
<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: '',
        components: {},
        provide() {
            return {
                form: this
            }
        },
        props: {
            model: {
                type: Object,
                default: {}
            },
            rules: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {};
        },

        methods: {
            validate(cb) {
                console.log('this.$children',this.$children)
                const tasks = this.$children
                    .filter(item => item.prop)
                    .map(item => item.validate());

                // 所有任务都通过才算校验通过
                Promise.all(tasks)
                    .then(() => cb(true))
                    .catch(() => cb(false));
            }
        }
    }
</script>
<style lang='scss' scoped>
</style>