<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'group-chat'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px!important;font-weight: 500;line-height: 1!important;letter-spacing: .02em!important;font-family: Roboto,sans-serif!important;">管理群</span>
            <div style="width: 45px;height: 45px;margin-right: 14px"></div>
        </div>
        <!--这里写的有点蠢了，一时间想不到什么好办法-->
        <div class="line"></div>
        <div class="head-pic">
            <div style="padding-left: 1.5em;">群成员(<span>45</span>人)</div>
            <div class="imgbox">
                <div class="add">
                    <img src="https://www.asgardusk.com/images/head-pic.jpeg" alt="">
                </div>
            </div>
            <div class="imgbox">
                <div class="add">
                    <img src="https://www.asgardusk.com/images/none.png" alt="">
                </div>
            </div>
            <div class="imgbox">
                <div class="add">
                    <img src="https://www.asgardusk.com/images/portfolio/1.png" alt="">
                </div>
            </div>
            <div class="imgbox" style="right: 10px;position: absolute;">
                <div class="add">
                    +
                </div>
            </div>
        </div>
        <div class="real-line"></div>
        <div class="items">
            <div>置顶聊天</div>
            <div>
                <v-switch v-model="switch1"
                ></v-switch>
            </div>
        </div>
        <div class="items">
            <div>屏蔽消息</div>
            <div>
                <v-switch v-model="switch2"
                ></v-switch>
            </div>
        </div>
        <div class="items">
            <div>群内禁言</div>
            <div>
                <v-icon>keyboard_arrow_right</v-icon>
            </div>
        </div>
        <div class="real-line"></div>
        <div class="items" style="color: red;justify-content: center;">清空聊天记录</div>
    </div>
</template>

<script>
    export default {
        name: "group-chat-setting",
        data() {
            return {
                switch1: false,
                switch2: false
            }
        }
    }
</script>

<style scoped>
    p {
        padding-bottom: 0;
    }

    .bigbox {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 1000;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
        margin: 0;
        padding: 0;
        line-height: 1.5;
    }

    .head {
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
        width: 100%;
        height: 4em;
        background-color: #eee;
    }

    .head-pic {
        width: 100%;
        height: 6em;
        display: flex;
        align-items: center;
        background-color: white;
    }

    .imgbox {
        display: flex;
        height: 100%;
        align-items: center;
        justify-content: center;
        flex: 0 0 18%;
    }

    .add {
        width: 4em;
        height: 4em;
        border: 1px solid #aaa;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #eee;
        margin-top: 0.8em;
    }

    .head-pic img {
        width: 4em;
        height: 4em;
        border-radius: 50%;
    }

    .real-line {
        width: 100%;
        height: 1em;
        background-color: #eee;
    }

    .items {
        width: 100%;
        height: 3em;
        background-color: white;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px #eee solid;
        padding-right: 1em;
        padding-left: 1.5em;
    }
</style>
