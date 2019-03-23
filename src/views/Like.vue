<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">我的赞</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">
            <v-flex xs3 style="display: flex;justify-content: center;">
                <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                    <img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;
height: 100%;border-radius: 50%"
                         @click="$router.push({name:'detail',query:{redirect: $route.fullPath, id:item.userID}})">
                </div>
            </v-flex>
            <v-flex xs9 style="padding: 0.5em 1em;">
                <div style="display: flex;align-items: center;"><b class="nickname">加载中</b><span
                        class="board">专家lv.2</span>
                </div>
                <p class="topicdetail" style="margin-top: 0.5em">
                    赞了你的回答<span>加载中...</span>
                </p>
                <p class="topicdetail" style="margin-top: 5px;float:right;">
                    <span></span>
                    <!--<span @click="$router.push({name:'comment-detail'})"-->
                    <!--style="margin-left: 1.5em;color: #66ccff;font-size: 1.3em">查看对话</span>-->
                    <!--<v-icon style="float:right;margin-right:1em">thumb_up</v-icon>-->
                </p>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
    </div>
</template>

<script>
    export default {
        name: "like"
    }
</script>

<style scoped>
    .head {
        z-index: 400;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        margin-bottom: 1em;
        background-color: #ffd633;
    }

    .line {
        z-index: 400;
        width: 100%;
        height: 4em;
        background-color: #eee;
    }
    .board {
        border: solid 1px #ffcc00;
        border-radius: 2px;
        margin-left: 1em;
        padding: 0.1em;
        margin-bottom: 0.2em;
        font-size: 1.1em;
        color: orange;
    }

    .nickname {
        font-size: 1.5em;
    }
</style>
