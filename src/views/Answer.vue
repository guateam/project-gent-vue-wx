<template>
    <div class="answer">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.back()">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline " style="margin: 0 auto">
                <span>话题</span>
            </v-toolbar-title>

            <v-btn icon>
                <v-icon @click="$router.push({name:'report'})">error</v-icon>
            </v-btn>
        </v-toolbar>
        <div style="padding-left: 1em; padding-right: 1em;padding-top: 1em">
            <h2>{{topicTitle}}</h2>
            <h2 style="line-height: 1.5;height: 1.5em">
                <router-link :to="$route.query.redirect" class="totopic">查看话题></router-link>
            </h2>
        </div>

        <!--分隔线-->
        <div style="width: 100%;height: 12px;background-color: #EBEBEB;"></div>


        <div>
            <div style="display: flex;justify-content: space-between;margin-top: 1em;margin-bottom: 1em">
                <div style="display: flex;flex: 0 0 80%;"
                     @click="$router.push({name: 'detail', query: {redirect: $route.fullPath, id: user_id}})">
                    <div style="display: flex;flex: 0 0 25%;align-items: center;justify-content: center">
                        <div style="width: 60px;height: 60px;border-radius: 50%">
                            <img :src="avatar" alt=""
                                 style="width: 100%;height: 100%;border-radius: 50%;object-fit: cover">
                        </div>
                    </div>
                    <div style="display: flex;flex-direction: column;justify-content: space-between;">
                        <h2 style="margin-top: 8px;">{{ nickname }}<span
                                style="color: #ffcc00">&nbsp;&nbsp;{{ group.text }}</span>
                        </h2>
                        <p style="margin-bottom: 8px;"><span>{{ desc }}</span></p>
                    </div>
                </div>
                <div style="display: flex;flex: 0 0 20%;align-items: center;justify-content: center">
                    <div class="un_follow" @click="follow_user" v-if="!self">
                        {{follow?'已关注':'关注'}}
                    </div>
                </div>
            </div>
        </div>
        <v-divider></v-divider>
        <!--回答的答案-->

        <div class="intro" style="padding-left: 1em; padding-right: 1em;margin-bottom: 1em;">
            <p v-html="intro.replace(/\n/g, '<br>')" style="font-size: medium"></p>
        </div>
        <div style="padding-left: 1em; padding-right: 1em;display: flex;text-align: right">
            <p style="width: 100%">上一次编辑 <span>· {{ latestEdit }}</span>
            </p>
            <p>
                    <span v-for="(tag, idx) in warning" :key="idx">
                        {{ tag.text }}
                        <span v-if="idx !== warning.length - 1">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                    </span>
            </p>
        </div>
        <v-divider></v-divider>
        <div style="width: 100%">
            <ButtonGroup
                    style="width: 100%;margin-top: 1em;position:relative;overflow: hidden;height: 5em;margin-bottom: 1em">
                <Button type="warning" icon="md-arrow-dropup" style="height: 4em"
                        :class="{mid:select===0,long:select===1,hide:select===2,display:hidden1}"
                        @click="agree_answer()" :hidden="select===2">{{select!==0?'已':''}}点赞 {{agree}}
                </Button>
                <Button icon="md-arrow-dropdown" style="height: 4em"
                        :class="{mid2:select===0,long:select===2,hide2:select===1,display:hidden2}"
                        @click="disagree_answer()" :hidden="select===1">{{select!==0?'已':''}}点踩 {{disagree}}
                </Button>
            </ButtonGroup>
        </div>

        <!--<div style="width: 100%;height: 5em;border-top: 1px #eee solid;border-bottom: 1px #eee solid;display: flex;line-height: 1.5;">-->
        <!--<div style="height:100%;flex: 0 0 50%;border-right: 1px #eee solid;display: flex;align-items: center;justify-content: center;" @click="agree_answer()">-->
        <!--<v-icon style="width: 30px" :class="select===1?'agree':'no'">thumb_up_alt</v-icon>-->
        <!--<span style="font-size: 1.5em" :class="select===1?'agree':'no'">赞同</span>-->
        <!--</div>-->
        <!--<div style="height:100%;flex: 0 0 50%;border-right: 1px #eee solid;display: flex;align-items: center;justify-content: center;" @click="disagree_answer()">-->
        <!--<v-icon style="width: 30px" :class="select===2?'disagree':'no'">thumb_down_alt</v-icon>-->
        <!--<span style="font-size: 1.5em" :class="select===2?'agree':'no'">反对</span>-->
        <!--</div>-->
        <!--</div>-->
        <div class="comment" style="padding-left: 1em; padding-right: 1em;">
            <h2>评论</h2>
            <div v-for="(comment, index) in comments" :key="index" class="comment-item" v-if="index<3">
                <div class="comment-user" @click="$router.push({name:'detail',query:{id:comment.id}})">
                    <img :src="comment.avatar" alt=""><!-- 头像 -->
                    <h2>{{ comment.nickname }}</h2>
                    <span class="comment-user-tag">{{comment.usergroup.text}}</span>
                    <!--<div class="comment-like"><span class="subheading">{{ comment.agree }}</span>-->
                    <!--<v-icon style="height: 30px;margin-left: 3px">thumb_up</v-icon>-->
                    <!--</div>-->

                </div>
                <div style="margin-left: 4em;margin-bottom: 1em">
                    <p style="font-size: medium">{{ comment.content.length > 20 ? comment.content.substring(0, 20) +
                        '...' : comment.content
                        }}</p>
                </div>
            </div>
            <router-link :to="{name: 'comment', query: {id: $route.query.id,type:1}}" v-if="comments.length>=3">
                <h2 style="align-items: center;color: #ffcc00;text-align: center;margin: 1em;">加载更多</h2>
                <v-divider></v-divider>
            </router-link>
        </div>

        <!--占位的div，用来把下面的foot所遮住的空间挤出来-->

        <div style="width: 100%;height: 50px;"></div>

        <!--固定在底部的input等-->

        <div class="foot">
            <div class="footinput">
                <Input placeholder="请输入评论" v-model="comment_word" icon="md-arrow-round-forward" @on-enter="send()"
                       @on-click="send()">
                </Input>
            </div>
            <div class="footright">
                <v-btn icon>
                    <v-icon :color="favorite==='favorite'?'primary':'black'" @click="follow_answer()">{{favorite}}
                    </v-icon>
                </v-btn>
            </div>
            <div class="footright">
                <v-btn icon @click="$router.push({name:'comment',query:{id:$route.query.id,type:1}})">
                    <v-icon>comment</v-icon>
                </v-btn>
            </div>
        </div>

        <!--END-->
    </div>
</template>

<script>
    export default {
        name: "Answer",
        data() {
            return {
                agreethis: 0,
                topicTitle: '加载中的标题...',  // 话题标题
                intro: '加载中的简介...',
                nickname: '加载中的用户名...',
                group: '加载中..',
                desc: '加载中..',
                latestEdit: '加载中..',
                warning: [],
                avatar: '',
                comments: [
                    {
                        agree: 1,
                        content: "加载中",
                        create_time: "加载中",
                        avatar: "",
                        id: 1,
                        nickname: "加载中",
                        usergroup: {
                            text: ''
                        }
                    },
                ],
                name: '',
                favorite: 'favorite_border',
                comment_word: '',
                agree: 0,
                disagree: 0,
                select: 0,
                user_id: 0,
                follow: false,
                hidden1: false,
                hidden2: false,
                self: false
            }
        },

        methods: {
            // 获取答案信息
            getAnswerData() {

                this.$api.answer.get_answer(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.intro = res.data.data.content;
                        this.nickname = res.data.data.user_nickname;
                        this.avatar = res.data.data.user_headportrait;
                        this.topicTitle = res.data.data.question_title;
                        this.latestEdit = res.data.data.edit_time;
                        this.group = res.data.data.group;
                        this.desc = res.data.data.description;
                        this.warning = res.data.data.tag;
                        this.agree = res.data.data.agree;
                        this.disagree = res.data.data.disagree;
                        this.user_id = res.data.data.user_id;
                        this.get_user_follow_state();
                        this.self = res.data.data.user_id == this.$store.state.userInfo.user_id;
                    }
                })
            },
            // 获取评论信息
            getCommentData() {

                this.$api.answer.get_answer_comment_list(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.comments = [];
                        for (let i = 0; i < 3; i++) {
                            this.comments.push({
                                content: res.data.data[i].content,
                                avatar: res.data.data[i].user_headportrait,
                                id: res.data.data[i].user_id,
                                nickname: res.data.data[i].user_nickname,
                                agree: res.data.data[i].agree,
                                usergroup: res.data.data[i].usergroup,
                            })
                        }
                    }
                })
            },
            follow_answer() {
                if (this.favorite === 'favorite_border') {
                    this.$api.answer.collect_answer(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.favorite = 'favorite'
                        }
                    })
                } else {
                    this.$api.answer.un_collect_answer(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.favorite = 'favorite_border'
                        }
                    })
                }
            },
            get_follow_state() {
                this.$api.answer.get_collect_state(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.favorite = 'favorite'
                    }
                })
            },
            add_user_action(id) {
                this.$api.account.add_user_action(id, 51).then(res => {
                    if (res.data.code === 1) {
                        return 0;
                    }
                })
            },
            send() {
                if (this.comment_word === '') {
                    this.$api.answer.add_answer_comment(this.$route.query.id, this.comment_word).then(res => {
                        if (res.data.code === 1) {
                            this.comment_word = '';
                            this.getCommentData();
                        }
                    })
                }
            },
            agree_answer() {
                if (this.select === 1) {
                    this.$api.answer.un_agree_answer(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.select = 0;
                            this.agree--;
                        }
                    })
                } else {
                    this.$api.answer.agree_answer(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.select = 1;
                            this.agree++;
                        }
                    })
                }
                // this.agreethis = 1
            },
            disagree_answer() {
                if (this.select === 2) {
                    this.$api.answer.un_disagree_answer(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.select = 0;
                            this.disagree--;
                        }
                    })
                } else {
                    this.$api.answer.disagree_answer(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.select = 2;
                            this.disagree++;
                        }
                    })
                }
                // this.agreethis = 2
            },
            get_answer_agree_state() {
                this.$api.answer.get_answer_agree_state(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.select = 1;
                    } else if (res.data.code === 2) {
                        this.select = 2;
                    }
                })
            },
            get_user_follow_state() {
                this.$api.account.get_user_follow_state(this.user_id).then(res => {
                    if (res.data.code === 1) {
                        this.follow = true;
                    }
                })
            },
            follow_user() {
                if (!this.self) {
                    if (this.follow) {
                        this.$api.account.un_follow_user(this.user_id).then(res => {
                            if (res.data.code === 1) {
                                this.follow = false;
                                this.$store.state.userInfo.follow++;
                            }
                        })
                    } else {
                        this.$api.account.follow_user(this.user_id).then(res => {
                            if (res.data.code === 1) {
                                this.follow = true;
                                this.$store.state.userInfo.follow--;
                            }
                        })
                    }
                }
            },
            set_exp_change() {
                this.$api.account.set_exp_change(1, '浏览回答').then(res => {

                })
            }
        },

        mounted() {
            this.getAnswerData();
            this.getCommentData();
            this.get_follow_state();
            this.add_user_action(this.$route.query.id);
            this.get_answer_agree_state();
            this.set_exp_change();
        },
    }
</script>

<style scoped>
    .bigbox {
        width: 100%;
        height: 100%;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }

    * {
        line-height: 1.5;
    }

    a {
        text-decoration: none;
        outline: none;
    }

    .totopic {
        color: #ffcc00;
        float: right;
        line-height: 1.5;
    }

    .intro {
        margin-top: 1em;
        line-height: 1.5;
        /*margin-bottom: 50px;*/
    }

    .comment-item {
        width: 100%;
        border-bottom: 1px #eee solid;
        color: black;
    }

    .comment-user {
        display: flex;
        align-items: center;
    }

    .comment-user img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 1em 1em 1em 0;
    }

    .comment-user-name {
        font-size: 1.2em;
    }

    .comment-user-tag {
        color: #ffcc00;
        font-size: 1.0em;
        margin-left: 0.5em;
    }

    .comment-like {
        position: absolute;
        right: 2em;
    }

    .foot {
        width: 100%;
        height: 50px;
        display: flex;
        position: fixed;
        bottom: 0;
        background-color: white;
        z-index: 100;
        line-height: 1.5;
    }

    .footinput {
        display: flex;
        flex: 0 0 70%;
        height: 80%;
        margin-top: 1em;
        margin-left: 5px;
    }

    .foot input {
        padding-left: 1em;
        width: 100%;
        height: 100%;
        outline: #EBEBEB;
    }

    .footright {
        margin-left: 5px;
    }

    /*img {*/
    /*width: 100%;*/
    /*}*/
    img {
        max-width: 100%;
        overflow: hidden;
    }

    .mid {
        position: absolute;
        left: 0;
        width: 50%;
        transition: all 0.5s;
        /*animation: back_ 2s;*/
        /*-moz-animation: back_ 2s; !* Firefox *!*/
        /*-webkit-animation: back_ 2s; !* Safari 和 Chrome *!*/
        /*-o-animation: back_ 2s; !* Opera *!*/
    }

    .mid2 {
        position: absolute;
        left: 50%;
        width: 50%;
        transition: all 0.5s;
        /*animation: back_ 2s;*/
        /*-moz-animation: back_ 2s; !* Firefox *!*/
        /*-webkit-animation: back_ 2s; !* Safari 和 Chrome *!*/
        /*-o-animation: back_ 2s; !* Opera *!*/
    }

    .long {
        position: absolute;
        left: 0;
        width: 100%;
        transition: all 0.5s;
        /*animation: big 2s;*/
        /*-moz-animation: big 2s; !* Firefox *!*/
        /*-webkit-animation: big 2s; !* Safari 和 Chrome *!*/
        /*-o-animation: big 2s; !* Opera *!*/
    }

    .hide {
        position: absolute;
        width: 0;
        /*display: none;*/
        opacity: 0;
        right: 100%;
        visibility: hidden;
        transition: all 0.5s;
        /*animation: small_ 0.5s;*/
        /*-moz-animation: small_ 0.5s; !* Firefox *!*/
        /*-webkit-animation: small_ 0.5s; !* Safari 和 Chrome *!*/
        /*-o-animation: small_ 0.5s; !* Opera *!*/
    }

    .hide2 {
        position: absolute;
        width: 0;
        /*display: none;*/
        opacity: 0;
        left: 100%;
        visibility: hidden;
        transition: all 0.5s;
        /*animation: small_ 0.5s;*/
        /*-moz-animation: small_ 0.5s; !* Firefox *!*/
        /*-webkit-animation: small_ 0.5s; !* Safari 和 Chrome *!*/
        /*-o-animation: small_ 0.5s; !* Opera *!*/
    }

    @keyframes big {
        0% {
            width: 50%;
        }
        100% {
            width: 100%;
        }
    }

    @keyframes small_ {
        0% {
        }
        100% {
            display: none;
        }
    }

    @keyframes back_ {
        0% {
            width: 100%;
        }
        100% {
            width: 50%;
        }
    }

    .un_follow {
        width: 70px;
        height: 38px;
        background-color: #FFCC00;
        color: black;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
    }

    .agree {
        color: #ffcc00
    }

    .no {
        color: rgba(0, 0, 0, .54);
    }

    .disagree {
        color: #ffcc00
    }

    .display {
        display: none !important;
    }
</style>
<style>
    img {
        max-width: 100%;
        width: auto;
        height: auto;
    }
</style>
