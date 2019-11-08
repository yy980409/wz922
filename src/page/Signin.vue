<template>
  <div style="height: 100%">
      <div id="web_bg"></div>
      <div style="height: 100%;">
          <h1 style="color: #ffffff;position: relative;top: 25%;text-align: center;">银翔科技智能运营平台</h1>
          <el-form :rules="rules" :model="Form" ref="Form" class="login_container" status-icon  label-position="left"
                   label-width="70px" v-loading="loading">
              <h3 class="login_title">用户登录</h3>
              <el-form-item label="账号" prop="username">
                  <el-input  v-model="Form.username"
                             auto-complete="off" placeholder="username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="Form.password"
                            auto-complete="off" placeholder="password"></el-input>
              </el-form-item>
              <el-form-item label=""></el-form-item>
              <el-form-item label="验证码" prop="imageCode">
                  <el-input v-model="Form.imageCode"  @keyup.enter.native="submit('Form')" auto-complete="off" style="width: 150px; float: left"  ></el-input>
                  <el-image  style="width: 120px; height: 40px"
                             :src="url" session="false" @click="refresh"></el-image>
              </el-form-item>
              <el-form-item style="width: 100%">
                  <el-button type="primary" style="width: 60%; float: left" @click="submit('Form')"  >登录</el-button>
              </el-form-item>
          </el-form>
      </div>


  </div>
</template>


<script>
  import {testUrl} from '../config/env'
  import {Message} from 'element-ui';
  import {mapActions, mapState} from 'vuex'
  import axios from 'axios';
  export default {

    data(){
      var checkaccount = (rule, value, callback) => {
        if(value.length<1){
          callback(new Error('请输入账户'))
        } else {
          callback()
        }
      };

      var checkpwd = (rule, value, callback) => {
        if(value.length<1){
          callback(new Error('请输入密码'))
        } else {
          callback()
        }
      };

      var checkcode = (rule, value, callback) => {
        if(value.length<1){
          callback(new Error('请输入验证码'))
        } else {
          callback()
        }
      };

      return {
      	urll:testUrl,
        Form: {
          username: '',
          password: '',
          imageCode: ''
        },
        rules: {
          username: [{validator: checkaccount, trigger: 'blur'}],
          password: [{validator: checkpwd, trigger: 'blur'}],
          imageCode: [{validator: checkcode, trigger: 'blur'}]
        },
        loading: false,
        random:1,
      }
    },
      mounted() {

	  },
      computed:{
		  Host: function () {
			  return testUrl;
		  },
		  defaulturl: function () {
			  return testUrl + '/code/image/';
		  },
		  url:function () {
			  return testUrl + '/code/image/' + this.random;
		  }
      },
    methods: {
      submit: function (formName) {
      	let err = null
          this.$refs[formName].validate((valid) => {
              if (!valid) {
                  Message.error('error submit!!');
                  err = false;
                  return
              }
              err = true
          });
		  if(!err){
		  	return
          }
        this.loading = true;
        let param = new URLSearchParams();
        param.append('username',this.Form.username)
        param.append('password',this.Form.password)
        param.append('imageCode',this.Form.imageCode)
        axios.post(this.Host+'/login',param).then(resp => {

          this.loading = false;
          if(resp && resp.data.status==200){
          	// this.$cookies.set("status", "logined", 15); // 设置cookie中存放的生命周期
			this.$store.commit('login', resp.data.msg);
            this.$router.push('manage');
          }else{
			  if(resp.data.status === 400){
				  Message.error({message: "验证码错误"})
			  }else if(resp.data.status === 401){
				  Message.error({message: "账户或密码错误"})
			  }
			  this.refresh();
			  this.Form.imageCode="";
          }
        }).catch(err=>{
          console.log(err);
        })
      },
      refresh: function (){
        // this.url = this.defaulturl + Math.random()
		  this.random = Math.random();
      },
        ////////////test
        hh:function () {
			this.$store.commit('increment');
		},
		hh2:function () {
			this.$store.commit('clear');

		},
		hh3:function () {
			this.$router.push('manage');

		}
    }
  }
</script>

<style>
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .login_container {
      position: relative;
      top: 25%;
    border-radius: 15px;
    background-clip: padding-box;
    margin: 0 auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
  #web_bg{
    position:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    min-width: 1000px;
    z-index:-10;
    zoom: 1;
    background-color: #fff;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    background-image: url(../assets/img/20190928154436.jpg);
  }
</style>
