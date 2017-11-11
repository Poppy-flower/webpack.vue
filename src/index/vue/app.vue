<template>
    <div>
        <router-link :to="'/app/'+routerId+'/profile'" class="profile">profile</router-link>
        <router-link :to="'/app/'+routerId+'/posts'" class="posts">posts</router-link>
        <!--<div class="profile" @click="router('/app/profile')">profile</div>-->
        <!--<div class="posts" @click="router('/app/posts')">posts</div>-->
        <router-view></router-view>
        <div>router:{{ routerId }}</div>
        <div>id:{{ id }}</div>
    </div>
</template>

<script>
    import ar from './Favlist.vue'
    import ar2 from './new.vue'
    export default {
        props:["id"],
        methods:{
            router(path){
                console.log("router");
                this.$router.push(path);
            }
        },
        mounted(){
        },
        data () {
            return {
                msg: 'Hello World!',
                routerId:this.$route.params.id
            }
        },
        components:{
            ar:ar,
            ar2:ar2
        }
    }
</script>

<style scoped lang="scss">

</style>