<template>
  <div>
    <div>
<!--        <div style="margin-top: 0px"><el-divider></el-divider></div>-->
      <Select v-for="(choice,index) in name"
              :key="index" :line="choice" :index="index"
              @uploaddata="getdata"
      ></Select>
    </div>
    <br>
    <div>
      <el-row style="margin-left: 50px">
          <el-button type="primary" @click="choose" >选择搜索字段</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
      </el-row>
    </div>
    <div>
      <el-dialog title="选择搜索字段" :visible.sync="selectView" :append-to-body="true" width="600px">
        <el-checkbox-group v-model="choices" style="margin-bottom:60px ">
          <el-checkbox border v-for="(line,index) in lines"
                       :label="line.name" :key="index">
          </el-checkbox>
        </el-checkbox-group>

          <el-divider></el-divider>
          <el-row >
              <el-col style="text-align: right">
                  <el-button @click="formatChoices" type="primary" style="margin-top: 0px">确定</el-button>
              </el-col>
          </el-row>
       </el-dialog>
    </div>

  </div>
</template>

<script>
  import Select from './Select.vue'
  export default {
    props:{
      lines:{
        type: Array,
        required: true
      },
      device:{
        type: String,
      }
    },
    data(){
      return {
        temp: '',
        //lines: [{name:'温度',type:'float'},{name:'风速',type:'int'}],
        name: [],
        choices: [],
        keywords: [],
        selectView: false,
      }
    },
    components:{
      Select,
    },
    mounted: function(){
      this.$nextTick(function (){
        this.name = []
      })
    },
    methods:{
      getdata(val){
        let index = val.index;
        this.keywords[index]=val.keyword;
		this.$emit('uploaddata', this.keywords);
      },
      choose(){
        this.selectView = true
      },
      formatChoices(){
        this.name = []
        this.choices.forEach((choice)=>{
          var temp = this.lines.find((ele=>(ele.name == choice)));
          this.name.push(temp)
        })
        this.keywords[this.name.length-1] = {}
        this.selectView = false
      },
      reset(){
        this.name=[];
        this.keywords=[];
		  this.$emit('uploaddata', this.keywords);
      },
    },
  }
</script>

<style>

</style>
