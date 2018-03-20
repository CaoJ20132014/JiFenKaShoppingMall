<template>
    <div id="heard">
        <van-nav-bar :title="data.title" :left-text="data.left_text" :right-text="data.right_text" left-arrow @click-left="data.click_left" @click-right="data.click_right" :fixed="true">
            <van-icon v-if="data.rightIcon" :name="data.icon" slot="right" />
        </van-nav-bar>
    </div>
</template>
<script>
    export default {
        props: [
            'data'
        ],
        data () {
            return {
                
            }
        },
        methods: {
            click_left() {
                // window.history.go(-1);
            }
        }
    }
</script>
<style lang="less" scoped>
    #header{
        width: 10rem;
        height: 46px;
    }
</style>