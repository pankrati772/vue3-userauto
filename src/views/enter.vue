<template>
    <div style="width:100%;position:absoltue;overflow-x: hidden;overflow-y: hidden;">
        <h1 style="text-align:center">黑体辐射源智能校准系统方案配置系统</h1>
        <div class="btns">
            <a-button class="btn" @click="plan">方案配置</a-button>
            <br/>
            <a-button class="btn" @click="ktplan">KT15配置</a-button>
        </div>
    
        
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        plan(){
            this.$router.push('/plan')
        },
        ktplan(){
            this.$router.push('/Kt__list')
        }
    }
}
</script>

<style scoped lang="scss">
.btn{

    width: 300px;
    height:100px;
    font-size: 50px;
    background:#40A9FF;
}
.btns{
    // width:100%;
    margin-top: 10%;
    position: relative;
    left: 40%;
    
}
</style>