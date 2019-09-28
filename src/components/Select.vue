<template>
  <div>
    <inputString ref="inputString" :name="line.name"
                 :index="index" v-if="line.type == 'string'"
                 :en="line.en" @uploaddata="getdata"></inputString>
    <inputFloat ref="inputFloat" :name="line.name"
                :index="index" v-if="line.type == 'float'"
                :en="line.en" @uploaddata="getdata"></inputFloat>
    <input-int ref="inputInt" :name="line.name"
                :index="index" v-if="line.type == 'int'"
               :en="line.en" @uploaddata="getdata"></input-int>
  </div>
</template>

<script>
  import inputString from './inputString'
  import inputFloat from './inputFloat'
  import inputInt from './inputInt'
export default {
  components:{
    inputString,
    inputFloat,
    inputInt,
  },
  props: {
    line:{
      type: Object,
      required: true
    },
    index:{
      type: Number,
      required: true
    },
  },
  data(){
    return{

    }
  },
  methods:{
    getdata(val){
      this.$emit('uploaddata', val)
    },
  }
}
</script>

<style>

</style>
