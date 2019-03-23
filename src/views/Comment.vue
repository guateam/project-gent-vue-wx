<template>
    <div class="comment">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">评论详情</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
                <!--<Select v-model="model1" style="width:200px;margin-right: 30px;" placeholder="按热度">-->
                <!--<Option v-for="item in List" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
                <!--</Select>-->
            </div>
        </div>
        <div class="line"></div>
        <!--<div style="height: 4em;background-color: #eee;display: flex;align-items: center;padding: 5px 10px;">-->
        <!--热门评论（<span>3</span>）-->
        <!--</div>-->
        <!--<div style="padding: 1em;line-height: 1.5;">-->
        <!--<v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">-->
        <!--<v-flex xs3 style="display: flex;justify-content: center;">-->
        <!--<div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">-->
        <!--<img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;-->
        <!--height: 100%;border-radius: 50%">-->
        <!--</div>-->
        <!--</v-flex>-->
        <!--<v-flex xs9>-->
        <!--<div style="display: flex;align-items: center;"><b class="nickname">拉拉人</b><span class="board">专家lv.4</span>-->
        <!--</div>-->
        <!--<p class="topicdetail">-->
        <!--<span>卡拉之光，如影随形。八门齐开，光复艾尔,卡拉之光，如影随形。八门齐开，光复艾尔卡拉之光，如影随形。八门齐开，光复艾尔卡拉之光，如影随形。八门齐开，光复艾尔</span>-->
        <!--</p>-->
        <!--<p class="topicdetail" style="margin-top: 5px">-->
        <!--<span>20:33</span>-->
        <!--<span @click="$router.push({name:'comment-detail'})"-->
        <!--style="margin-left: 1.5em;color: #66ccff;font-size: 1.3em">查看对话</span>-->
        <!--<v-icon style="float:right;margin-right:1em">thumb_up</v-icon>-->
        <!--</p>-->
        <!--</v-flex>-->
        <!--</v-layout>-->
        <!--<v-divider></v-divider>-->
        <!--<v-layout row wrap style="padding-bottom: 10px;margin-top: 10px">-->
        <!--<v-flex xs3 style="display: flex;justify-content: center;">-->
        <!--<div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">-->
        <!--<img src="https://www.asgardusk.com/images/none.png" alt="" style="width: 100%;-->
        <!--height: 100%;border-radius: 50%">-->
        <!--</div>-->
        <!--</v-flex>-->
        <!--<v-flex xs9>-->
        <!--<div style="display: flex;align-items: center;"><b class="nickname">拉拉人</b><span class="board">专家lv.4</span>-->
        <!--</div>-->
        <!--<p class="topicdetail">-->
        <!--<span>回复隔壁老万：卡拉之光，如影随形。八门齐开，光复艾尔</span>-->
        <!--</p>-->
        <!--<p class="topicdetail" style="margin-top: 5px">-->
        <!--<span>20:33</span>-->
        <!--<span @click="$router.push({name:'comment-detail'})"-->
        <!--style="margin-left: 1.5em;color: #66ccff;font-size: 1.3em">查看对话</span>-->
        <!--<v-icon style="float:right;margin-right:1em">thumb_up</v-icon>-->
        <!--</p>-->
        <!--</v-flex>-->
        <!--</v-layout>-->
        <!--<v-divider></v-divider>-->
        <!--</div>-->
        <div style="height: 4em;background-color: #eee;display: flex;align-items: center;padding: 5px 10px;">
            全部评论（<span>{{data.length}}</span>）
        </div>
        <div style="padding: 1em;line-height: 1.5;">
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px" v-for="item in data">
                <v-flex xs3 style="display: flex;justify-content: center;">
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img :src="item.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%;object-fit: cover"
                             @click="$router.push({name:'detail',query:{redirect: $route.fullPath, id:item.userID}})">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div style="display: flex;align-items: center;"><b class="nickname">{{item.nickname}}</b><span
                            class="board">{{item.usergroup.text}}lv.{{item.level}}</span>
                    </div>
                    <p class="topicdetail">
                        <span>{{item.content}}</span>
                    </p>
                    <p class="topicdetail" style="margin-top: 5px">
                        <span>{{item.createtime}}</span>
                        <!--<span @click="$router.push({name:'comment-detail'})"-->
                        <!--style="margin-left: 1.5em;color: #66ccff;font-size: 1.3em">查看对话</span>-->
                        <!--<v-icon style="float:right;margin-right:1em">thumb_up</v-icon>-->
                    </p>
                </v-flex>
            </v-layout>
            <v-divider v-if="data.length!==0"></v-divider>
            <h1 v-if="data.length===0" style="text-align: center">暂无数据</h1>
        </div>
        <!--占位的盒子   STAR-->
        <v-flex xs12 style="height: 60px;background-color: #fafafa"></v-flex>
        <!--占位的盒子   END-->
        <div class="chatinput">
            <div class="box">
                <input type="text" class="chat" placeholder="评论" autofocus v-model="word" :disabled="flag">
                <!--<span class="iconfont emoji-icon">collections</span>-->
                <button :class="word?'enSend':'disSend'" :disabled="!word" @click="send">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "comment",
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
                model1: '',
                data: [{
                    nickname: '',
                    headportrait: '',
                    agree: '',
                    content: '',
                    userID: 0,
                    level: 0,
                    usergroup: {
                        text: ''
                    }
                }],
                word: '',
                flag: false,
            }
        },
        methods: {
            send() {
                switch (this.$route.query.type) {
                    case 0:
                        this.$api.questions.add_question_comment(this.$route.query.id, this.word).then(res => {
                            if (res.data.code === 1) {
                                this.word = '';
                                this.get_question_comment(this.$route.query.id)
                            }
                        });
                        break;
                    case 1:
                        this.$api.answer.add_answer_comment(this.$route.query.id, this.word).then(res => {
                            if (res.data.code === 1) {
                                this.word = '';
                                this.get_answer_comment(this.$route.query.id)
                            }
                        });
                        break;
                    case 2:
                        this.$api.article.add_article_comment(this.$route.query.id, this.word).then(res => {
                            if (res.data.code === 1) {
                                this.word = '';
                                this.get_article_comment(this.$route.query.id)
                            }
                        });
                        break;
                }

            },
            get_question_comment(id) {
                this.$api.questions.get_question_comment(id).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data;
                    }
                })
            },
            get_answer_comment(id) {
                this.$api.answer.get_answer_comment_list(id).then(res => {
                    if (res.data.code === 1) {
                        this.data = [];
                        res.data.data.forEach(value => {
                            this.data.push({
                                userID: value.user_id,
                                nickname: value.user_nickname,
                                content: value.content,
                                createtime: value.create_time,
                                agree: value.agree,
                                level: value.level,
                                usergroup: value.usergroup,
                                headportrait: value.user_headportrait
                            })
                        })
                    }
                })
            },
            get_article_comment(id) {
                this.$api.article.get_article_comment(id).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data;
                    }
                })
            }
        },
        mounted() {
            switch (this.$route.query.type) {
                case 0:
                    this.get_question_comment(this.$route.query.id);
                    break;
                case 1:
                    this.get_answer_comment(this.$route.query.id);
                    break;
                case 2:
                    this.get_article_comment(this.$route.query.id);
                    break;
            }
            if (this.$route.query.flag === 'true' || this.$route.query.flag === true) {
                this.flag = true;
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
        background-color: #fff;
        z-index: 200;
        display: flex;
        justify-content: flex-end;
    }

    .chat {
        height: 40px;
        margin: 5px 10px 10px 10px;
        padding: 0 10px;
        border: 1px solid #ffcc00;
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
        border-radius: 5px;
        box-sizing: border-box;
        color: #999;
        background-color: #eee
    }

    .enSend {
        line-height: 30px;
        margin: 7px 10px;
        padding: 0 12px;
        border: 1px solid #ffcc00;
        border-radius: 5px;
        box-sizing: border-box;
        color: #fff;
        background-color: orange;
    }
</style>
