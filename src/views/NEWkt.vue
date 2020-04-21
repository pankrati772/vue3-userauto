<template>

<div class="optionFrom">
    <a-form :layout="formLayout" :model="msg" >
    
        <a-form-item
        label="KT-15 SN编号"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入SN编号"    v-model='msg.name' />
        </a-form-item>
        <a-form-item
        label="发射率"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入设备发射率"  v-model='msg.GL' />
        </a-form-item>
        <a-form-item
        label="设备间距"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入设备间距"  v-model='msg.JJ' />
        </a-form-item>

        <h3>温度设置</h3>
        <a-button @click="addDomain"> 添加温度点</a-button>
        <a-form-item
        
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
         v-for="(domain, index) in msg.domains"
        :key="domain.id"
        :label="'温度' + Number(index+1)"
        
        >
        <div><input class="changenum" type="text" v-model="domain.value"><span>黑体温度</span></div>
        <div><input class="changenum" type="text" v-model="domain.kt_15"><span>测试温度</span></div>
        <div><input class="changenum" type="text" v-model="domain.movepoint"><span>差值</span></div>
        
        
        <a-button @click="removeDomain(domain)"> 删除</a-button>
        </a-form-item>
       
        <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <el-button type="primary" @click="pull">保存方案</el-button>
        <el-button type="danger"  @click="back">返回列表页</el-button>
        </a-form-item>
    </a-form>
    
</div>
  
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formLayout: 'horizontal',
      value:[],
      msg:{
          
          
          domains:[
              {
                  value:'',
                  kt_15:'',
                  movepoint:''
              },
              {
                  value:'',
                  kt_15:'',
                  movepoint:''
              }
              
          ]
      }
      ,UTL:'http://192.168.4.221:8080/autotest'
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
    mounted(){
       
    }

  ,
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    addDomain() {
        
    this.msg.domains.push({
        
        
    });
    // console.log(this.msg.domains)
    },removeDomain(item) {
    var index = this.msg.domains.indexOf(item)
    if (index !== -1) {
        this.msg.domains.splice(index, 1)
    }
    },
    success(){
        alert('成功')
    }

    ,
    pull(){
        console.log(this.msg)
        
        axios.post(this.UTL+'/Kt/insertDevice',this.msg).then((data)=>{
            console.log(data)
            if(data.status===200){
                // alert('新增成功')
                this.$message({
                      message: '数据新增成功',
                      type: 'success'
                    });
                 this.$router.push('/Kt__list')
            }else{
              this.$message.error('数据新增失败');
            }
            
            
        })
    }
    ,
    back(){
        this.$router.push('/Kt__list')
    },
    paixu(){
        this.msg.domains.sort(this.arraySort('value'))
        
      },
      
      arraySort(field) {
          return (a, b) => {
               a = a[field]
               b = b[field]
              return a - b
          }
      },
  },
};
</script>

<style scoped lang="scss">
.optionFrom{
    width:800px;
    margin:0 auto;
}
.changenum:hover{
    border-color: #40a9ff;
    border-right-width: 1px !important
}
.changenum{
        -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-variant: tabular-nums;
    list-style: none;
    -webkit-font-feature-settings: 'tnum';
    font-feature-settings: 'tnum';
    position: relative;
    display: inline-block;
    width: 100%;
    height: 32px;
    padding: 4px 11px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #fff;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
}
</style>