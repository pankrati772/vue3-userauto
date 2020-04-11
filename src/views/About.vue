<template>
<div style="width:100%;position:relative;">
  <div class="btns">
    <a-button @click="add">添加新方案</a-button>
    <a-button @click="KT15">KT-15配置</a-button>

  </div>
  <h1 class="TOP_name">黑体辐射源智能校准系统方案配置</h1>
  <div class="plan_list">
    <a-list class="demo-loadmore-list" :loading="loading" itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
       
        <a slot="actions" @click="DEL(item.id)">删除</a>
        <a-list-item-meta
          description=""
        >
          <a slot="title"  @click="optionshow(item)">{{item.value}}</a>
          
        </a-list-item-meta>
        
      </a-list-item>
    </a-list>
  </div>





  
</div>
</template>
<script>

import axios from 'axios'

  export default {
    data() {
      return {
        loading: true,
        loadingMore: false,
        showLoadingMore: true,
        URL:"http://192.168.4.77:8080/autotest",
        formLayout: 'horizontal',
        data: [
          
        ],
        msg:{
          domains:[
            {value:'',
            kt_15:''
            },
            {value:'',
            kt_15:''
            }
          ]
        },
        
      };
    },
    computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 },
          }
        : {};
    },
  },
    mounted() {
      
        this.loading = false;
        // 获取已设置方案列表
        axios.get(this.URL+'/plan/getAll').then((data)=>{
          console.log(data.data.data)
          this.data=data.data.data
        })
       
      
      
    },
    methods: {
      DEL(item){
        console.log(item)
        let data={
          id:item
        }
        // 删除方案
        axios.post(this.URL+'/plan/deleteById',data).then((data)=>{
          console.log(data)
          if(data.status===200){
            // 删除成功后重新加载方案列表
            axios.get(this.URL+'/plan/getAll').then((data)=>{
            // console.log(data.data.data)
            this.data=data.data.data
        })
          }
        })
      },
      // 新增方案
      add(){
        this.$router.push('/option')
      },
      // 跳转kt15配置列表页
      KT15(){
        this.$router.push('/Kt_list')
      },
     
      // 查看方案
      optionshow(data){
      
        this.$router.push({path:'/optionshow',query:{value:JSON.stringify(data)}})
      }
    },
     components: {
    
    }
  };
</script>
<style scoped lang="scss">

</style>