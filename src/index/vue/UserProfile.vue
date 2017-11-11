<template>
    <div>
        <div>UserProfile.vue==》{{ count }}</div>
        <div>UserProfile.vue==》{{ data }}</div>
        <div>UserProfile.vue==》{{ data2 }}</div>
        <div>UserProfile.vue==》{{ data3 }}</div>
    </div>
</template>

<script>
    export default {
        computed:{
            //如何在任何组件中取到store下面的值
            //使用this.$store.state.count;==>>取state
            //使用this.$store.getters.data;==>>取getters

            count(){
                return this.$store.state.count;
            },
            data(){
                return this.$store.getters.data;
            },
            data2(){
                return this.$store.getters.data2;
            },
            data3(){
                return this.$store.getters.data3(500);
                //传参进去供使用
            }
        }
    }
</script>

<style scoped lang="scss">

</style>