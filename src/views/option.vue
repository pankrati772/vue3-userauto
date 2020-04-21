<template>

<div class="optionFrom">
<h1>黑体辐射源智能校准系统方案配置系统</h1>
    <a-form :layout="formLayout" :model="msg" >
    
        <a-form-item
        label="方案名称"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入方案名称" v-model='msg.value' />
        </a-form-item>
        <a-form-item
        label="测试数量"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入测试点数" v-model='msg.testcount' />
        </a-form-item>
        <a-form-item
        label="时间间隔"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="请输入测试时间间隔" v-model='msg.testinterval' />
        </a-form-item>
        <h3>温度设置</h3><a-button @click="addDomain"> 添加温度点</a-button>
        <a-form-item
        
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
         v-for="(domain, index) in msg.domains"
        :key="domain.key"
        :label="'温度' + Number(index+1)"
        :prop="'domains.' + index + '.tp'"
        >
        <a-input placeholder=""  v-model="domain.tp" @blur="paixu"/>
        <a-button @click="removeDomain(domain)"> 删除</a-button>
        </a-form-item>
        <h3>报警范围设置</h3>
        <a-form-item
        label="波动范围"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="" v-model='msg.flow' />
        </a-form-item>
        <a-form-item
        label="样本标准差"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :model='msg.differentValue'
        >
        <a-input placeholder="" v-model='msg.differentValue' />
        </a-form-item>
        <a-form-item
        label="偏差绝对值"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        
        >
        <a-input placeholder="" v-model='msg.arrangeValue' />
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
      msg:{
          
          
          domains:[
              {
                  tp:''
              },
              
          ]
      }
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
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    addDomain() {
    this.msg.domains.push({
        
        
    });
    },removeDomain(item) {
    var index = this.msg.domains.indexOf(item)
    if (index !== -1) {
        this.msg.domains.splice(index, 1)
    }
    },
    pull(){
        console.log(this.msg)
        
        axios.post('http://192.168.4.221:8080/autotest/plan/insterPlan',this.msg).then((data)=>{
            console.log(data)
            if(data.status===200){
                this.msg={
                                domains:[
                        {
                            tp:''
                        },
                        
                    ]
                }
                 this.$router.push('/plan')
            }
            
            
        })
    }
    ,
    back(){
        this.$router.push('/plan')
    },
    paixu(){
        this.msg.domains.sort(this.arraySort('tp'))
        
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
    margin:0 38%;
}
</style>