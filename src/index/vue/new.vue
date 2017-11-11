<template>
    <div class="a">
        <div v-for="n in 2" v-text="msg"></div>
        <div class="b"></div>
    </div>
</template>

<script>

    export default {
        data () {
            return {
                msg: 'Hello World!'
            }
        }
    }
</script>

<style scoped lang="scss">
    body{
        .a{
            .b{
                height: 60px;
                background: green
            }
        }
    }
</style>