<template>
    <div class="a">
        <div v-for="n in 2" v-text="msg"></div>
        <div class="b"></div>
    </div>
</template>

<script>
    import '../in2.css'
    import '../in.css'
    // 调用了extract-text-webpack-plugin

    export default {
        data () {
            return {
                msg: 'Hello World!'
            }
        }
    }
</script>

<style scoped lang="scss">
    /*@import '../in2.css';*/
    /*@import '../in.css';*/
    body{
        .a{
            .b{
                height: 60px;
                background: green;
            }
        }
    }
</style>