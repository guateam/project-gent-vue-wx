<template>
    <div class="bigbox">
        <div class="chat">
            <!--<div class="head">-->
            <!--<span class="goback" @click="$router.push('./message')">&lt;</span>-->
            <!--<h2>李一般</h2>-->
            <!--<span class="setting" @click="$router.push('./chatSetting')">设置</span>-->
            <!--</div>-->
            <!--<div class="line"></div>-->
            <div style="width: 100%;">
                <gChat
                        :data="wxChatData"
                        :showShade="false"
                        contactNickname="清纯女大学生激情聊"
                        :getUpperData="getUpperData"
                        :getUnderData="getUnderData"
                        :ownerAvatarUrl="ownerAvatarUrl"
                        :contactAvatarUrl="contactAvatarUrl"
                        :width="width">
                </gChat>
                <!--<div class="footinput">-->
                <!--<input type="text">-->
                <!--</div>-->
            </div>
        </div>
        <ChatInput></ChatInput>
        <router-view></router-view>
    </div>
</template>

<script>
    import gChat from "../components/gChat"
    import ChatInput from "../components/ChatInput"

    export default {
        name: "group-chat",
        components: {gChat,ChatInput},
        data() {
            return {
                upperTimes: 0,
                underTimes: 0,
                upperId: 0,
                underId: 6,
                width: window.screen.width,
                ownerAvatarUrl: 'https://www.asgardusk.com/images/none.png',
                contactAvatarUrl: 'https://www.asgardusk.com/images/head-pic.jpeg',
                wxChatData: [{
                    direction: 2,
                    id: 1,
                    type: 1,
                    content: '你好!![呲牙]',
                    ctime: new Date().toLocaleString()
                },
                    {
                        direction: 1,
                        id: 2,
                        type: 1,
                        content: '你也好。[害羞]',
                        ctime: new Date().toLocaleString()
                    },
                    {
                        direction: 2,
                        id: 3,
                        type: 1,
                        content: '你好香啊',
                        ctime: new Date().toLocaleString()
                    },
                    {
                        direction: 2,
                        id: 4,
                        type: 2,
                        content: 'https://www.asgardusk.com/images/pic1.jpg',
                        ctime: new Date().toLocaleString()
                    },
                    {
                        direction: 1,
                        id: 5,
                        type: 1,
                        content: '你也一样',
                        ctime: new Date().toLocaleString()
                    }]
            }
        },
        created() {
            this.initWidth();
        },
        methods: {
            initWidth() {
                var ua = navigator.userAgent;
                var ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
                    isIphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                    isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                    isMobile = isIphone || isAndroid;
                //非移动端设置400px宽度，移动端是100%
                if (!isMobile) {
                    this.width = 400
                }
            },

            //向上滚动加载数据
            getUpperData() {
                var me = this;

                // 这里为模拟异步加载数据
                // 实际上你可能要这么写:
                // return axios.get('xxx').then(function(result){
                //     return result;  //result的格式需要类似下面resolve里面的数组
                // })
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        //模拟加载完毕
                        if (me.upperTimes > 3) {
                            return resolve([]);
                        }

                        //加载数据
                        resolve([{
                                direction: 2,
                                id: me.upperId - 1,
                                type: 1,
                                content: '向上滚动加载第 ' + me.upperTimes + ' 条！',
                                ctime: new Date().toLocaleString()
                            },
                                {
                                    direction: 1,
                                    id: me.upperId - 2,
                                    type: 1,
                                    content: '向上滚动加载第 ' + me.upperTimes + ' 条！',
                                    ctime: new Date().toLocaleString()
                                }]
                        )
                    }, 1000);
                    me.upperId = me.upperId + 2;
                    me.upperTimes++;
                })
            },

            getUnderData() {
                var me = this;

                //意义同getUpperData()
                return new Promise(function (resolve) {
                    setTimeout(function () {
                        //模拟加载完毕
                        if (me.underTimes > 3) {
                            return resolve([]);
                        }

                        //加载数据
                        resolve(
                            [{
                                direction: 1,
                                id: me.underId + 1,
                                type: 1,
                                content: '向下滚动加载第 ' + me.underTimes + ' 条！',
                                ctime: new Date().toLocaleString()
                            },
                                {
                                    direction: 2,
                                    id: me.underId + 2,
                                    type: 1,
                                    content: '向下滚动加载第 ' + me.underTimes + ' 条！',
                                    ctime: new Date().toLocaleString()
                                }]
                        )
                    }, 1000);

                    me.underId = me.underId + 2;
                    me.underTimes++;
                })
            }

        }

    }
</script>

<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
    }

    .bigbox {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }

    .chat {
        margin: 0;
        padding: 0;
        line-height: 1.5;
    }

    .head {
        width: 100%;
        height: 3em;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        margin-bottom: 1em;
    }
    .footinput {
        width: 100%;
        height: 3.5em;
        position: fixed;
        z-index: 200;
        background-color: white;
        bottom: 0;
        display: flex;
        align-items: center;
    }

    .footinput input {
        border: 1px solid #bbb;
        border-radius: 10px;
        height: 90%;
        line-height: 1.5;
        width: 72%;
        margin-left: 2%;
        padding-left: 5%;
    }
</style>
