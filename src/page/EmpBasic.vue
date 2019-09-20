<template>
  <div>
<!--      <el-button  type="primary" plain @click="back">返回</el-button>-->
      <head-top></head-top>
      <p>{{info}}</p>
      <p>{{trans}}</p>
      <baidu-map class="map" :center="{lng:info[0].longitude, lat:info[0].latitude}" :zoom="zoom" :mapStyle="st" :roam=true>
      <bm-view class="bm-view"></bm-view>
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
      <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
      <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

      <bm-marker
          v-for="item in trans"
          :position="{lng: item.longitude, lat: item.latitude}"
          :key="item.dev_id"
          :dragging="false"
          animation="BMAP_ANIMATION_DROP"
          @click="a"
          :title="item.message"

      >

      </bm-marker>

      </baidu-map>
  </div>
</template>

<script>
  import {getGPS} from '@/api/getData'
  import headTop from '../components/headTop'


  export default {
    data () {
      return {
        info: [],
        zoom: 12,
        infoWindow: {
          show: false,
          contents: null
        },
	     st:{
			'styleJson': [
				{
					"featureType": "water",
					"elementType": "all",
					"stylers": {
						"color": "#044161"
					}
				},
				{
					"featureType": "land",
					"elementType": "all",
					"stylers": {
						"color": "#004981"
					}
				},
				{
					"featureType": "boundary",
					"elementType": "geometry",
					"stylers": {
						"color": "#064f85"
					}
				},
				{
					"featureType": "railway",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "highway",
					"elementType": "geometry",
					"stylers": {
						"color": "#004981"
					}
				},
				{
					"featureType": "highway",
					"elementType": "geometry.fill",
					"stylers": {
						"color": "#005b96",
						"lightness": 1
					}
				},
				{
					"featureType": "highway",
					"elementType": "labels",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "arterial",
					"elementType": "geometry",
					"stylers": {
						"color": "#004981"
					}
				},
				{
					"featureType": "arterial",
					"elementType": "geometry.fill",
					"stylers": {
						"color": "#00508b"
					}
				},
				{
					"featureType": "poi",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "green",
					"elementType": "all",
					"stylers": {
						"color": "#056197",
						"visibility": "off"
					}
				},
				{
					"featureType": "subway",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "manmade",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "local",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "arterial",
					"elementType": "labels",
					"stylers": {
						"visibility": "off"
					}
				},
				{
					"featureType": "boundary",
					"elementType": "geometry.fill",
					"stylers": {
						"color": "#029fd4"
					}
				},
				{
					"featureType": "building",
					"elementType": "all",
					"stylers": {
						"color": "#1a5787"
					}
				},
				{
					"featureType": "label",
					"elementType": "all",
					"stylers": {
						"visibility": "off"
					}
				}
			]
		}
      }
    },
     computed:{//GPS校准
        trans:function() {
        	var t=Object.assign({}, this.info);
//////////////////////////////////////////////////////////////////////////////////
			for (var i = 0; i < 2; i++) {
				console.log(i);
			}
//////////////////////////////////////////////////////////////////////////////////
			for (var i = 0; i < this.info.length; i++) {
				var x = t[i].longitude, y = t[i].latitude;
				var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * 3.14159265358979324 * 3000.0 / 180.0)
				var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * 3.14159265358979324 * 3000.0 / 180.0)
				t[i].longitude = z * Math.cos(theta) + 0.0130;
				t[i].latitude = z * Math.sin(theta) + 0.007;
                var ss="设备号:"+t[i].dev_id+"\n状态:";
                t[i].message=ss;
			}

			return t;
		}
     },
    created () {
    	this.initData();
    },
    methods: {
    	// back(){
		// 	window.setTimeout(function() {
		// 		map.panTo(new BMap.Point(114.224443, 22.731518));
		// 	}, 2000);
        // },
		async initData(){
			try{
				await this.getGPSs();
			}catch(err){
				console.log('获取数据失败', err);
			}
		},
		async getGPSs(){
			var GPS=await getGPS();
			this.info=GPS;
        }
    },
	  components: {
		  headTop,
	  },
  }
</script>

<style>
  .bm-view {
    position:fixed;
    top:40px;
    left:40px;
    width: 90%;
    height: 800px;
  }
</style>
