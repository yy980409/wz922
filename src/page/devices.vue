<template>
  <div>
      <head-top></head-top>
    <el-container style="margin-top: 20px">
      <el-header style="height: 60px; width:1000px;">
        <div style="display: inline">
          <el-button round type="primary"  icon="el-icon-plus" style="float:left" @click="addmeun"> 添加设备</el-button>
          <el-button type="primary" icon="el-icon-search" style="float: right;" @click="search">搜索</el-button>
          <el-input  placeholder="搜索" clearable prefix-icon="el-icon-search"
                     style="width: 300px; float:right" v-model="keywords"></el-input>
        </div>
      </el-header>
      <el-main style="height: 600px">
        <el-table :data="devices" v-loading="tableloading" border stripe
                  size="mini" style="width: 100%">
          <el-table-column type="text" prop="id" align="center"
                           fixed label="设备名称" width="" ></el-table-column>
          <el-table-column type="text" prop="areaname" align="center"
                           fixed label="所属区域" width="" ></el-table-column>
          <el-table-column type="text" prop="latitude" align="center"
                           fixed label="维度" width=""></el-table-column>
          <el-table-column type="text" prop="longitude" align="center"
                           fixed label="经度" width=""></el-table-column>
          <el-table-column type="text" prop="description" align="center"
                           fixed label="说明" width=""></el-table-column>
          <el-table-column type="text" prop="type" align="center"
                           fixed label="类型" width=""></el-table-column>
          <el-table-column type="text"  align="center"
                           fixed="right" label="操作" width="">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="edit(scope.row)">设备信息</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer>
        <label>{{"显示第 " + (1+(currentpage-1)*10)+ " 到第 " + ((currentpage)*10>num?num:(currentpage)*10) + " 条记录，总共 " + num + " 条记录"}}</label>
        <el-pagination
          style="float: right"
          background
          layout="prev, pager, next"
          :total="num" :page-size="10" :current-page.sync="currentpage" @current-change="loaddevices">
        </el-pagination>
      </el-footer>
    </el-container>

    <el-form :model="device" status-icon style="margin: 0px;padding: 0px;">
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
                <el-form-item label="设备名称:" label-width="120px" label-position="right" prop="id" >
                  <el-input v-model="device.id"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="维度:" label-width="120px" label-position="right" prop="latitude" >
                  <el-input v-model="device.latitude"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="经度:" label-width="120px" label-position="right" prop="longitude" >
                  <el-input v-model="device.longitude"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="说明:" label-width="120px" label-position="right" prop="description" >
                  <el-input v-model="device.description"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="有无PM2.5:" label-width="120px" label-position="right" prop="type" >
                  <el-radio-group v-model="device.type">
                    <el-radio v-for="type in types"
                              :key="type" :label="type" border>{{ type }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="所属区域:" label-width="120px" label-position="right" prop="type" >
                  <el-radio-group v-model="device.areaname">
                    <el-radio v-for="area in areas"
                              :key="area" :label="area" border>{{ area }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="cancelchange">取 消</el-button>
              <el-button size="mini" type="primary" @click="submitadd">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-form>

    <el-form :model="device" style="margin: 0px;padding: 0px;">
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
                <el-form-item label="设备名称:" label-width="120px" label-position="right" prop="id" >
                  <el-input v-model="device.id"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="维度:" label-width="120px" label-position="right" prop="latitude" >
                  <el-input v-model="device.latitude"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="经度:" label-width="120px" label-position="right" prop="longitude" >
                  <el-input v-model="device.longitude"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="说明:" label-width="120px" label-position="right" prop="description" >
                  <el-input v-model="device.description"
                            size="mini" style="width: 150px" ></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item label="有无PM2.5:" label-width="120px" label-position="right" prop="type" >
                  <el-radio-group v-model="device.type">
                    <el-radio v-for="type in types"
                              :key="type" :label="type" border>{{ type }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
              <el-button size="mini" @click="cancelchange">取 消</el-button>
              <el-button size="mini" type="primary" @click="submitchange">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-form>
  </div>
</template>

<script>
	import headTop from '../components/headTop';
	import {testUrl} from '../config/env'
	import axios from 'axios';
  export default {
  	components:{headTop},
    data(){
      var validatePass= (rule,value,callback) => {
        if(isNaN(value)){
          callback(new Error('请输入数字'));
        }
      }
      return{
        //Host: 'http://172.26.199.19:8080',
		  Host: 'http://139.9.198.72:8082',
        keywords: '',
        devices: [],
        types: [],
        areas: [],
        device: {
          id: null,
          description: '',
          latitude: null,
          longitude: null,
          areaname: '',
          type: ''
        },
        num: null,
        tableloading: false,
        currentpage: 1,
        editTitle: '',
        editVisible: false,
        addVisible: false,
      }
    },
    mounted() {
      this.loaddevices();
    },
    methods: {
      loaddevices(){
        var _this = this;
        _this.tableloading = true;
        console.log(testUrl+"/basic/devices?page="+this.currentpage+"&size=10&keywords= "+this.keywords);
        axios.get(testUrl+"/basic/devices?page="+this.currentpage+"&size=10&keywords="+this.keywords).then(resp => {
          if(resp && resp.status==200){
            console.log(resp)
            _this.areas = resp.data.areas;
            _this.types = resp.data.types;
            _this.tableloading = false;
            _this.devices = resp.data.devices;
            _this.num = resp.data.count;
          }
        })
      },
      search(){
        this.currentpage = 1;
        this.loaddevices();
      },
      edit(row){
        this.editTitle = "设备信息";
        this.device.id = row.id;
        this.device.latitude = row.latitude;
        this.device.longitude = row.longitude;
        this.device.description = row.description;
        this.device.type = row.type;
        this.editVisible = true;
      },
      submitchange(){
        var _this = this;
        _this.editVisible = false;
        _this.tableloading = true;
        let param = new URLSearchParams();
        param.append('id',_this.device.id)
        param.append('latitude',_this.device.latitude)
        param.append('longitude',_this.device.longitude)
        param.append('description',_this.device.description)
        param.append('type',_this.device.type)
        console.log(_this.device.type)
        axios.post(testUrl+'/basic/updatedevice',param).then(resp => {
          console.log(resp)
          _this.tableloading = false;
          _this.loaddevices();
        })
      },
      cancelchange(){
        this.editVisible = false;
        this.addVisible = false;
      },
      addmeun(){
        this.addVisible = true;
        this.device = {
          id: null,
          description: '',
          latitude: null,
          longitude: null,
          type: ''
        }
      },
      submitadd(){
        var _this = this;
        let param = new URLSearchParams();
        param.append('id',_this.device.id)
        param.append('latitude',_this.device.latitude)
        param.append('longitude',_this.device.longitude)
        param.append('description',_this.device.description)
        param.append('statusname','正常')
        param.append('type',_this.device.type)
        param.append('areaname',_this.device.areaname)
        axios.post(testUrl+'/basic/addDevice',param).then(resp => {
          console.log(resp);
          _this.addVisible = false;
          _this.loaddevices();
        })
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

