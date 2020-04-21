<template>
  <div>
    <h1 style="text-align:center">黑体辐射源智能校准系统方案配置系统</h1>

    
    <el-button class="editable-add-btn" @click="back" type="warning">返回</el-button>
     <el-button class="editable-add-btn" @click="handleAdd" type="primary">添加新方案</el-button>

    <a-table bordered :dataSource="data" :columns="columns">
      <template slot="name" slot-scope="text, record">
        <editable-cell :text="text" @change="onCellChange(record.key, 'name', $event)" />
      </template>
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record)"
        >
          <a href="javascript:;"><a-button type='danger'>删除</a-button></a>
        </a-popconfirm>
        
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
        URL:"http://192.168.4.221:8080/autotest",
        getall:'',
        delplan:'',
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
            title: '方案名称',
            dataIndex: 'value',
            width: '30%',
            // scopedSlots: { customRender: 'name' },
          },
          {
            title: '测试次数',
            dataIndex: 'testcount',
          },
          {
            title: '时间间隔',
            dataIndex: 'testinterval',
          },
          {
            title: '详情',
            dataIndex: 'chack',
            scopedSlots: { customRender: 'chack' },
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
        axios.post(this.URL+this.delplan,{"id":key.id}).then((data)=>{
          console.log(data)
          if(data.status===200){
            // 删除成功后重新加载方案列表
            axios.get(this.URL+this.getall).then((data)=>{
            // console.log(data.data.data)
            this.data=data.data.data
        })
          }
        })
        
      },
      handleAdd() {
       
        // 添加新方案
        this.$router.push('/option')
      },
      // 查看方案详情
      chack(data){
        console.log(data)
        this.$router.push({path:'/optionshow',query:{value:JSON.stringify(data)}})
      },
      back(){
        // console.log(this)
        this.$router.push('/')
      }
    },
    mounted(){
      // 获取已设置方案列表

      console.log(this.$store.state.api)
      this.delplan=this.$store.state.api.DeleteById
      this.getall=this.$store.state.api.Plangetall
      
        axios.get(this.URL+this.getall).then((data)=>{
          console.log(data.data.data)
          this.data=data.data.data
        })
    },
    beforeMount(){
      
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