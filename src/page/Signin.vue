<template>
  <div>
    <el-form :rules="rules" :model="Form" ref="Form" status-icon class="login_container" label-position="left"
             label-width="70px" v-loading="loading" >
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
        <el-input v-model="Form.imageCode"  @keyup.enter.native="submit" auto-complete="off" style="width: 150px; float: left"  ></el-input>
        <el-image  style="width: 120px; height: 40px"
                   :src="url" session="false" @click="refresh"></el-image>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 60%; float: left" @click="submit"  >登录</el-button>
      </el-form-item>
    </el-form>
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
      submit: function () {
        this.loading = true;
        let param = new URLSearchParams();
        param.append('username',this.Form.username)
        param.append('password',this.Form.password)
        param.append('imageCode',this.Form.imageCode)
          console.log(param);
        axios.post(this.Host+'/login',param).then(resp => {
          this.loading = false;
          if(resp && resp.status==200){
            console.log(resp);
			this.$store.commit('login', resp.data.msg);
            this.$router.push('manage');
          }
        }).catch(err=>{
          console.log(err);
          this.loading = false;
          Message.error({message: "验证码错误"});
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
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
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
</style>
