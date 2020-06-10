<!--  -->
<template>
    <div class='input-wrapper'>
        <input :value='value' @input='input' v-bind='$attrs' @blur='blur'>
    </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {
      value:{
        type: String,
        default: ''
      }
  },
  data () {
    return {
    };
  },

  methods: {
    input(e){
        console.log(e.target.value)
        this.$emit('input', e.target.value)
    },
    blur(){
        this.$parent.$emit('validate')
    }
  }
}

</script>
<style lang='scss' scoped>
.input-wrapper{
    display: inline-block;
}
</style>