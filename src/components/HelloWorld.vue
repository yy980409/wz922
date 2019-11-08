<template>

  <div class="hello">
      <input v-model.number="number" type="number" step="20">
      <animatedNumber :number="number" :time="0.5"></animatedNumber>
    <h1>{{ aa }}</h1>
{{p}}
      <el-button @click="shuffle">shuffle</el-button>

      <el-button @click="bubbleSort">bubbleSort</el-button>
      <el-button @click="selctionSort">selctionSort</el-button>
      <el-button @click="insertionSort">insertionSort</el-button>


    <transition-group name="box1" >
        <div v-for="(pp) in p" :key="pp">
            <el-card :class="{box2:!(current.indexOf(pp)!==-1),currentBox:current.indexOf(pp)!==-1}"  :style="{width: pp +100+ 'px',background:'#'+convert(pp)+'ffff'}">
                {{pp}}
            </el-card>
        </div>

    </transition-group>



  </div>
</template>

<script>
	import animatedNumber from '../components/animatedNumber';

	export default {
		components: {
			animatedNumber
		},
		name: 'HelloWorld',
		props: {
			msg: String
		},
		data() {
			return {
				number: 0,
				aa: '排序',
				p: [180, 17, 80, 60, 120, 50, 130, 40, 140, 220, 190, 20, 30, 70, 150, 170, 110, 90, 100, 200, 230, 210],
				a: 1,
				current: [-1,233],
			}
		},
		methods: {
			convert(a) {
				return a.toString(16);

			},
			shuffle() {
				this.p = [180, 17, 80, 60, 120, 50, 130, 40, 140, 220, 190, 20, 30, 70, 150, 170, 110, 90, 100, 200, 230, 210];
			},
			async bubbleSort() {//冒泡排序
				for (let i = this.p.length - 1; i > 0; i--) {
					for (let j = 0; j < i; j++) {
						this.current[0] = this.p[j];
						if (this.p[j] > this.p[j + 1]) this.exchange(j, j + 1);
						await this.tiktok(200);
					}
				}
			},
			async selctionSort() {//选择排序
				for (let i = 0; i < this.p.length; i++) {
					let flag = i;
					let min = this.p[i];
					for (let j = i + 1; j < this.p.length; j++) {
						if (this.p[j] < min) {
							min = this.p[j];
							flag = j;
						}
					}
					if (min != this.p[i]) {
						this.current[0] = this.p[flag];
						this.current[1]= this.p[i];
						this.exchange(i, flag);
						await this.tiktok(1000);
					}
				}
			},
			async insertionSort() {
				for (let i = 0; i < this.p.length; i++) {
					for (let j = i + 1; j > 0; j--) {
						if (this.p[j] < this.p[j - 1]) {
							this.current[0] = this.p[j];
							this.exchange(j, j - 1);
							await this.tiktok(500);
						} else {
							break;
						}
					}
				}
			},
            async shellSort(){
                let gap=Math.floor(this.p.length/2);
            },
			exchange(x, y) {
				let a = [];
				for (let i = 0; i < this.p.length; i++) {
					a.push(this.p[i]);
				}

				let temp = a[x];
				a[x] = a[y];
				a[y] = temp;
				this.p = a;

			},
			tiktok(ms) {
				return new Promise((resolve) => setTimeout(resolve, ms));
			},
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .currentBox{
        color: #ff213f;
    }
  .box2{
      color:#ffffff;
  }
  .box1-move {
    transition: all 1s;
  }
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
