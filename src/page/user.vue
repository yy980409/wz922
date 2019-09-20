<template>
  <div>
    <el-container>
      <el-header style="height: 80px; width:1000px">
        <div style="display: inline">
          <el-button round type="primary"  icon="el-icon-plus" style="float:left" @click="addmeun"> 添加账户</el-button>
          <el-button type="primary" icon="el-icon-search" style="float: right;" @click="search">搜索</el-button>
          <el-input placeholder="搜索" clearable prefix-icon="el-icon-search"
                    style="width: 300px; float:right" v-model="keywords"></el-input>
        </div>

      </el-header>
      <el-main style="height: 600px">
        <el-table :data="users" v-loading="tableloading" border stripe
                  size="mini" style="width: 100%">
          <el-table-column type="text" prop="username" align="center"
                           fixed label="账户" width="" ></el-table-column>
          <el-table-column type="text" align="center"
                           fixed label="角色权限" width="">
            <template slot-scope="scope">
              <div v-html="formatroles(scope.row.roles)"></div>
            </template>
          </el-table-column>
          <el-table-column type="text" prop="description" align="center"
                           fixed label="说明" width=""></el-table-column>
          <el-table-column type="text"  align="center"
                           fixed="right" label="操作" width="">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="editmenu(scope.row)">修改信息</el-button>
              <el-button type="primary" size="small" @click="showpower(scope.row)">权限分配</el-button>
              <el-button type="primary" size="small" @click="resetpwd(scope.row)">重置密码</el-button>
              <el-button type="primary" size="small" @click="makesure(scope.row)">删除账号</el-button>
            </template>
          </el-table-column>
        </el-table>

      </el-main>
      <el-footer >
        <label>{{"显示第 " + (1+(currentpage-1)*10)+ " 到第 " + ((currentpage)*10>num?num:(currentpage)*10) + " 条记录，总共 " + num + " 条记录"}}</label>
        <el-pagination
          style="float: right"
          background
          layout="prev, pager, next"
          :total="num" :page-size="10" :current-page.sync="currentpage" @current-change="loadusers">
        </el-pagination>
      </el-footer>
    </el-container>

    <el-form :model="user" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog :title="editTitle"
                   style="padding: 0px;"
                   :close-on-click-modal="false"
                   :visible.sync="editVisible"
                   width="77%"
                   :append-to-body='true'>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="账户:" label-width="120px" label-position="right" prop="username" >
                  <el-input disabled v-model="user.username"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <!--
            el-col>
              <div>
                <el-form-item label="数据编辑权限:" label-width="120px" label-position="right" prop="editable">
                  <el-switch v-model="user.enable" active-text="允许" inactive-text="禁止"
                             :active-value="true" :inactive-value="false"
                             active-color="#13ce66" inactive-color="#ff4949" @change="editchange"></el-switch>
                </el-form-item>
              </div>
            </el-col>
            -->
            <el-col>
              <div>
                <el-form-item label="说明:" label-width="120px" label-position="right" prop="description">
                  <el-input prefix-icon="el-icon-edit" placeholder="请输入内容"
                            size="mini" style="width: 500px" v-model="user.description"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="cancelEdit">取 消</el-button>
              <el-button size="mini" type="primary" @click="submitchange">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-form>

    <el-form :model="user" style="margin: 0px;padding: 0px;">
      <div style="text-align: left">
        <el-dialog :title="editTitle"
                   style="padding: 0px;"
                   :close-on-click-modal="false"
                   :visible.sync="addVisible"
                   width="77%"
                   :append-to-body='true'>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="账户:" label-width="120px" label-position="right" prop="username" >
                  <el-input v-model="user.username" prefix-icon="el-icon-edit"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col>
              <div>
                <el-form-item label="说明:" label-width="120px" label-position="right" prop="description">
                  <el-input prefix-icon="el-icon-edit" placeholder="请输入内容"
                            size="mini" style="width: 500px" v-model="user.description"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="cancelEdit">取 消</el-button>
              <el-button size="mini" type="primary" @click="addsubmit">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-form>

    <div style="text-align: left">
      <el-dialog :title="editTitle"
                 style="padding: 0px;"
                 :close-on-click-modal="false"
                 :visible.sync="powerVisible"
                 width="77%" @close="clearpower"
                 :append-to-body='true'>
        <el-container>
          <el-main>
            <el-checkbox-group v-model="selectroles">
              <el-checkbox-button v-for="role in roles" :label="role" :key="role">{{ role }}</el-checkbox-button>
            </el-checkbox-group>
          </el-main>
        </el-container>
        <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="clearpower">取 消</el-button>
              <el-button size="mini" type="primary" @click="submitpower">确 定</el-button>
          </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
	import {testUrl} from '../config/env'
	import axios from 'axios';
  export default {
    data(){
      return{
        Host: 'http://172.26.251.125:8080',
        tableloading: false,
        currentpage: 1,
        searchcurrentpage: 1,
        keywords: '',
        users: [],
        editTitle: '',
        editVisible: false,
        addVisible: false,
        powerVisible: false,
        user: {
          username: '',
          editable: '禁止',
          description: '',
          enable: false
        },
        power: [],
        roles: [],
        areas: [],
        selectroles: [],
        choices: [],
        selectchoices: [],
        num: null
      }
    },
    mounted:function () {
      this.loadusers();
    },
    methods:{
      loadusers(){
        var _this = this;
        _this.tableloading = true;
        axios.get(testUrl+"/basic/users?page=" + _this.currentpage + "&size=10&keywords=" + _this.keywords)
          .then(resp => {
            if(resp && resp.status==200){
              _this.tableloading = false;
              var data = resp.data;
              _this.users = data.users;
              _this.num = data.count;
              _this.roles=[];
              for(var each in data.roles){
                _this.roles.push(data.roles[each].nameZh)
              }
            }
          })
      },
      editmenu(row){
        this.editTitle = "修改信息";
        this.user.username = row.username;
        this.user.description = row.description;
        this.user.editable = row.editable;
        if(this.user.editable == '允许'){
          this.user.enable = true;
        }else if(this.user.editable == "禁止"){
          this.user.enable = false;
        }
        this.editVisible = true;
      },
      editchange(val){
        if(val == 0){
          this.user.editable = '禁止'
        }else if(val == 1){
          this.user.editable = '允许'
        }
      },
      clearuser(){
        this.user = {
          username: '',
          editable: '禁止',
          description: '',
          enable: false
        }
      },
      cancelEdit(){
        this.editVisible = false;
        this.addVisible = false;
        this.clearuser();
      },
      submitchange(){
        var _this = this;
        _this.tableloading = true;
        _this.editVisible = false;
        let param = new URLSearchParams();
        param.append('username',_this.user.username);
        param.append('editable',_this.user.editable);
        param.append('description',_this.user.description);
        axios.post(testUrl+'/basic/update',param).then(resp => {
          if(resp && resp.status == 200){
            _this.tableloading = false;
            _this.clearuser();
            _this.loadusers();
          }
        })
      },
      addmeun(){
        var _this = this;
        _this.editTitle = "添加账户";
        _this.clearuser();
        _this.addVisible = true;
      },
      async addsubmit(){
        var _this = this;
        _this.tableloading = true;
        _this.addVisible = false;
        let param = new URLSearchParams();
        param.append('username',_this.user.username);
        param.append('editable',_this.user.editable);
        param.append('description',_this.user.description);
        param.append('password',_this.user.username);
        await axios.post(testUrl+'/basic/regis',param).then(resp => {
          if(resp && resp.status == 200){
            _this.tableloading = false;
            _this.clearuser();
            _this.loadusers();
          }
        });
      },
      resetpwd(row){
        var _this = this;
        _this.tableloading = true;
        let param = new URLSearchParams();
        param.append('username',row.username);
        param.append('password',row.username);
        axios.post(testUrl+"/basic/update",param).then(resp => {
          if(resp && resp.status==200){
            _this.tableloading = false;
            _this.loadusers();
          }
        })
      },
      deleteuser(row){
        var _this = this;
        _this.tableloading = true;
        let param = new URLSearchParams;
        param.append('username', row.username);
        axios.post(testUrl+"/basic/deleteUser",param).then(resp => {
          if(resp && resp.status==200){
            _this.tableloading = false;
            _this.loadusers();
          }
        })
      },
      makesure(row){
        var _this = this;
        _this.$confirm('如果继续将删除账号'+row.username+'，删除后将无法恢复，请谨慎操作！','你确定要删除账号吗？',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          _this.deleteuser(row)
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        })
      },
      getmenus(){
        var _this = this;
        axios.get(testUrl+'/basic/getAllMenu').then(resp => {
          if(resp && resp.status==200){
            var data = resp.data.menus;
            for (var each in data){
              if(!data.hasOwnProperty(each)){
                continue;
              }
              _this.areas.push(data[each].menuname)
            }

          }
        })
      },
      showpower(row){
        var _this = this;
        _this.editTitle="权限分配"
        _this.powerVisible = true;
        _this.user.username = row.username;
      },
      clearpower(){
        var _this = this;
        _this.powerVisible = false;
        _this.selectroles = [];
      },
      search(){
        this.currentpage = 1;
        this.loadusers();
      },
      submitpower(){
        var _this = this;
        _this.powerVisible = false;
        let param = new URLSearchParams();
        param.append('rolename',_this.selectroles)
        param.append('username',_this.user.username)
        axios.post(testUrl+'/basic/addRole',param).then(resp => {
          if(resp && resp.status==200){
            _this.loadusers();
            _this.clearpower();
          }
        })
      },
      formatroles(roles){
        let string = '';
        for(var each in roles){
          string=string+roles[each].nameZh+'<br>';
        }
        return string;
      },
    }
  }
</script>

<style>

  .el-switch__label {
    position: absolute;
    display: none;
    color: #fff;
  }
  /*打开时文字位置设置*/
  .el-switch__label--right {
    z-index: 1;
    right: -3px;
    color: #fff;
  }
  /*关闭时文字位置设置*/
  .el-switch__label--left {
    z-index: 1;
    left: 19px;
    color: #fff;
  }
  /*显示文字*/
  .el-switch__label.is-active {
    display: block;
    color: #fff !important;
  }
  .el-switch__core,
  .el-switch__label {
    width: 50px !important;
  }
  .el-dialog__body{
    padding: 0px 0px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
  .el-dialog__header {
    padding: 20px 20px 10px;
    background: #eeeeee;
  }
  .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
  }
  .el-checkbox-button{
    width: 320px;
    height: 40px;
  }
  .el-checkbox-button__inner {
    text-align: left;
    display: inline-block;
    position: relative;
    left: 10px;
    width: 300px;
    height: 32px;
    padding: 8px 12px;
    border: 1px solid blanchedalmond;
  }
</style>

