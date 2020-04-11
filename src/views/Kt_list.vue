<template>
  <div class="home">
    <h1>KT-15列表</h1>
    <div class="plan_list">
      <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
        <a-list-item slot="renderItem" slot-scope="item">
          <a slot="actions" @click="Edit(item.id,item)" >修改</a>
          <!--<a slot="actions" @click="DEL(item.id)">删除</a>-->
          <a-list-item-meta
            description=""
          >
            <a slot="title"  @click="optionshow(item)">{{item.name}}</a>
            
          </a-list-item-meta>
          
        </a-list-item>
      </a-list>
    </div>

    <div class="back">
    <a-button class="" type='primary' @click="NEWKT">新增设备</a-button>

    <a-button class="" type='danger' @click="back">返回</a-button>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Home',
  data(){
      return{
         loading: false,
        loadingMore: false,
        showLoadingMore: true,
        formLayout: 'horizontal',
          data:[
              
          ],
          UTL:'http://localhost:8080/autotest'
      }
  },
  components: {
    // HelloWorld
    
  },
  methods:{
      back(){
        this.$router.push('/')
    },
    Edit(id,item){
      console.log(item)
      axios.post(this.UTL+'/ktDevice/getDeviation',{ktDeviceId:id}).then((data)=>{
      console.log(data)
      this.$router.push({path:'/KToption',query:{value:data.data.data,msg:item}})
    })
    },
    optionshow(data){
      console.log(data)
    },
    NEWKT(){
      this.$router.push('/NEWkt')
    }
  },
  mounted(){
    //   获取kt15列表
    axios.get(this.UTL+'/ktDevice/getKtDevice').then((data)=>{
        console.log(data.data.data)
        this.data = data.data.data
    })

    
  }
}
</script>
<style scoped lang="scss">
.plan_list{
  width:60%;
    height:auto;
    // border:1px solid;
    margin: 20px;
    margin-left: 350px;

}
.back{
  margin-left: 45%;
}
</style>