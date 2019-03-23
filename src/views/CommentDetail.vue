<template>
    <div class="comment">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">对话列表</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <div style="padding: 1em;line-height: 1.5;">
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">
                <v-flex xs3 style="display: flex;justify-content: center;">
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div style="display: flex;align-items: center;"><b class="nickname"></b><span class="board"></span>
                    </div>
                    <p class="topicdetail">
                        <span></span>
                    </p>
                    <p class="topicdetail" style="margin-top: 5px">
                        <span>20:33</span>
                        <v-icon style="float:right;margin-right:1em">thumb_up</v-icon>
                    </p>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">
                <v-flex xs3 style="display: flex;justify-content: center;">
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div style="display: flex;align-items: center;"><b class="nickname"></b><span class="board"></span>
                    </div>
                    <p class="topicdetail">
                        <span></span>
                    </p>
                    <p class="topicdetail" style="margin-top: 5px">
                        <span>20:33</span>
                        <v-icon style="float:right;margin-right:1em"></v-icon>
                    </p>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </div>
        <div style="padding: 1em;line-height: 1.5;">
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">
                <v-flex xs3 style="display: flex;justify-content: center;">
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div style="display: flex;align-items: center;"><b class="nickname"></b><span class="board"></span>
                    </div>
                    <p class="topicdetail">
                        <span></span>
                    </p>
                    <p class="topicdetail" style="margin-top: 5px">
                        <span></span>
                        <v-icon style="float:right;margin-right:1em">thumb_up</v-icon>
                    </p>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">
                <v-flex xs3 style="display: flex;justify-content: center;">
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div style="display: flex;align-items: center;"><b class="nickname"></b><span class="board"></span>
                    </div>
                    <p class="topicdetail">
                        <span></span>
                    </p>
                    <p class="topicdetail" style="margin-top: 5px">
                        <span></span>
                        <v-icon style="float:right;margin-right:1em">thumb_up</v-icon>
                    </p>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment-detail",
        data() {
            return {
                List: [
                    {
                        value: '0',
                        label: '按热度'
                    },
                    {
                        value: '1',
                        label: '按时间倒序'
                    },
                    {
                        value: '2',
                        label: '按时间顺序'
                    },
                ],
                model1: ''
            }
        }
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

    >>> .ivu-select-selection {
        background-color: #ffd633 !important;
        color: white !important;
        border: none !important;
        outline: none !important;
        box-shadow: none !important;
    }

    >>> .ivu-select-selection:hover {
        border: none !important;
        outline: none !important;
    }

    >>> .ivu-select-placeholder {
        color: white !important;
    }

    >>> .ivu-select-arrow {
        color: white !important;
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

    .box {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background-color: #eee;
        z-index: 200;
        display: flex;
        justify-content: flex-end;
    }

    .chat {
        height: 40px;
        margin: 5px 15px;
        padding: 0 10px;
        border: 0;
        border-radius: 5px;
        flex: 1;
    }

    .chat::-webkit-input-placeholder {
        color: #999;
        font-size: 16px;
    }

    .emoji-icon {
        font-size: 30px;
        margin-top: 10px;
        color: #333;
    }

    .disSend {
        line-height: 30px;
        margin: 7px 10px;
        padding: 0 12px;
        border: 1px solid #999;
        border-radius: 1px;
        box-sizing: border-box;
        color: #999;
        background-color: #eee
    }

    .enSend {
        line-height: 30px;
        margin: 7px 10px;
        padding: 0 5px;
        border: 1px solid blue;
        border-radius: 5px;
        box-sizing: border-box;
        color: #fff;
        background-color: blue;
    }
</style>
