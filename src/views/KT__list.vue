<template>
  <div>
    <h1 style="text-align:center">黑体辐射源智能校准系统kt15配置系统</h1>

    <a-button class="editable-add-btn" @click="handleAdd">添加新方案</a-button>
    <a-button class="editable-add-btn" @click="back">返回</a-button>

    <a-table bordered :dataSource="data" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        
        <a-button type='danger' @click="Edit(record)">修改</a-button>
      </template> 
      <template slot="chack"  slot-scope="text, record">
        
         
          <a-button @click="chack(record)" type='primary'>查看方案</a-button>
       
        
      </template>
      
    </a-table>
  </div>
</template>
<script>

  import EditableCell from '../views/EditableCell'
  import axios from 'axios'
  export default {
    components: {
      EditableCell,
    },
    data() {
      return {
        URL:"http://localhost:8080/autotest",
        data: [
          
        ],
        
        dataSource: [
          {
            key: '0',
            name: 'Edward King 0',
            age: '32',
            address: 'London, Park Lane no. 0',
          },
          {
            key: '1',
            name: 'Edward King 1',
            age: '32',
            address: 'London, Park Lane no. 1',
          },
        ],
        count: 3,
        columns: [
          {
            title: 'kt15编号',
            dataIndex: 'name',
            width: '30%',
            // scopedSlots: { customRender: 'name' },
          },
          {
            title: '发射率',
            dataIndex: 'emissing',
          },
          {
            title: '设备间距',
            dataIndex: 'spacing',
          },
          {
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: { customRender: 'operation' },
          },
          
        ],
      };
    },
    methods: {
      onCellChange(key, dataIndex, value) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      },
      onDelete(key) {
        console.log(key.id)
        // 删除方案
        axios.post(this.URL+'/plan/deleteById',key.id).then((data)=>{
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
      handleAdd() {
       
        // 添加新方案
        this.$router.push('/NEWkt')
      },
      // 查看方案详情
      chack(data){
        console.log(data)
        this.$router.push({path:'/optionshow',query:{value:JSON.stringify(data)}})
      },
      back(){
        this.$router.push('/')
      },
      Edit(item){
        console.log(item)
        axios.post(this.URL+'/ktDevice/getDeviation',{ktDeviceId:item.id}).then((data)=>{
        console.log(data)
        this.$router.push({path:'/KToption',query:{value:data.data.data,msg:item}})
    })
      }
    },
    mounted(){
      axios.get(this.URL+'/ktDevice/getKtDevice').then((data)=>{
        console.log(data.data.data)
        this.data = data.data.data
    })
    }
  };
</script>
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>