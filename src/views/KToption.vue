<template>

<div class="optionFrom">
    

    <a-form :layout="formLayout" :model="msg" >
    
        <a-form-item
        label="KT-15 SN编号"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入发射率" disabled   v-model='msg.name' />
        </a-form-item>
        <a-form-item
        label="发射率"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入发射率"  v-model='msg.emissing' />
        </a-form-item>
        <a-form-item
        label="设备间距"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入设备间距"  v-model='msg.spacing' />
        </a-form-item>

        <h3>温度设置</h3>
        <!--<a-button @click="addDomain"> 添加温度点</a-button>-->
        <a-form-item
        
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
         v-for="(domain, index) in msg.domains"
        :key="domain.id"
        :label="'温度' + Number(index+1)"
        
        >
        <div><input class="changenum" type="text" v-model="domain.blacktemp"><span>黑体温度</span></div>
        <div><input class="changenum" type="text" v-model="domain.testshow"><span>测试温度</span></div>
        <div><input class="changenum" type="text" v-model="domain.movepoint"><span>差值</span></div>
        
        
        <!--<a-button @click="removeDomain(domain)"> 删除</a-button>-->
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
        console.log(this.$route.query)
        
        this.msg=this.$route.query.msg
        this.value=this.$route.query.value
        this.msg.domains=this.value
        console.log(this.msg)
        this.paixu()
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
    pull(){
        console.log(this.msg)
        
        axios.post(this.UTL+'/ktDevice/updateDeviation',{"devicationArray":this.msg.domains}).then((data)=>{
            console.log(data)
            if(data.status===200){
                // alert('数据更新成功')
                axios.post(this.UTL+'/ktDevice/updateKtDevice',this.msg).then((data)=>{
                  console.log(data)
                  if(data.status===200){
                    this.$message({
                      message: '数据更新成功',
                      type: 'success'
                    });
                //  this.$router.push('/Kt__list')
                setTimeout(this.$router.push('/Kt__list'),1000)

                  }else{
              this.$message.error('KT数据更新失败');

                  }
                }) 
                
            }
            else{
              this.$message.error('温度数据更新失败');
            }
            
            
        })
    }
    ,
    back(){
        this.$router.push('/Kt__list')
    },
    paixu(){
        this.msg.domains.sort(this.arraySort('blacktemp'))
        
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
    margin:0 35%;
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