<template>
    <div class="question">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <!--<v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>-->
            <v-btn icon @click="$router.back()">
                <v-icon color="white">keyboard_arrow_left</v-icon>
            </v-btn>
            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>话题</span>
            </v-toolbar-title>

            <v-btn icon>
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
        <!--头部，主要是问题描述之类-->
        <v-container>
            <div class="head">
                <h2>{{questionData.title}}</h2>
                <div class="head-something">
                    <div style="flex: 0 0 70%">
                        <p>标签 : <span v-for="(tag, index) in questionData.tags" :key="index">{{tag.text}} </span></p>
                        <p><span> {{questionData.follow}} </span>人关注&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;<span>{{questionData.commentsNum}} </span>
                            条评论 </p>
                    </div>
                    <div :class="{attention:!isfollowed,followed:isfollowed}" style="flex: 0 0 30%" @click="follow()">
                        {{followNotice}}
                    </div>
                </div>
                <p class="topicdetail">
                    <span v-if="!showAll"
                          v-html="questionData.content.length > 65 ? questionData.content.substring(0, 65) + '...' : questionData.content"></span>
                    <span v-else v-html="questionData.content"></span>
                    <button id="show-all-button" v-if="questionData.content.length > 65" @click="showAll = !showAll">
                        <span v-if="!showAll" style="color: blue">显示全部</span>
                        <span v-else style="color: blue">收起</span>
                    </button>
                </p>
            </div>
        </v-container>
        <!--一个浅色的分割栏，只有回答数和排序-->

        <div class="line">
            <p class="answerNum"><span>&nbsp; {{answerNum}}</span>条回答</p>
            <div style="margin-right: 1em"><a
                    @click="$router.push({name:'comment',query:{id:$route.query.id,type:0}})">查看评论</a></div>
        </div>

        <!--页面主体，展示不同的回答列表-->

        <v-card v-for="(answer, index) in answersDataList" :key="index"
                :to="{name: 'answer', query: {redirect: $route.fullPath, id: answer.answerID}}">
            <div style="padding-left: 1em; padding-right: 1em;padding-bottom: 1em">

                <router-link :to="{name: 'answer', query: {redirect: $route.fullPath, id: answer.answerID}}">
                    <!--<p class="answerDetail">{{ answer.content.length > 70 ? answer.content.substring(0, 70) + '...' :-->
                    <!--answer.content }}</p>-->

                    <!--列表正文内容-->
                    <p class="answerDetail">{{answer.content.replace(/<[^>]+>/g, '')}}</p>

                    <!--没有图片时不加载下面的div-->
                    <div class="answerImg" v-if="answer.image.length >=3">
                        <img v-for="(item,x) in answer.image" :key="x" v-if="x<3" :src="item" alt=""/>
                    </div>
                    <div class="answerImg" v-if="answer.image.length === 1">
                        <img :src="answer.image[0]" alt="" style="width: 100%;object-fit: cover;"/>
                    </div>
                    <div class="answerImg" v-if="answer.image.length === 2">
                        <img :src="answer.image[0]" alt="" style="width: 50%;object-fit: cover;"/>
                        <img :src="answer.image[1]" alt="" style="width: 50%;object-fit: cover;"/>
                    </div>
                </router-link>
                <div style="width: 100%;display: flex;align-items: center;position: relative;">
                    <div class="userhead">
                        <img :src="answer.headportrait" alt="" style="width: 100%">
                    </div>
                    <p class="userName">{{answer.nickname}}</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p class="like">点赞: {{answer.agree}} 反对: {{ answer.disagree }}</p>
                    <!--<p class="userTag">{{answer.user.tag}}</p>-->
                    <p class="answerTime">{{answer.edittime}}</p>
                </div>
            </div>
        </v-card>
        <div class="bottom"></div>

        <!--固定在底部的input等-->
        <v-card-text style="height: 100px; position: fixed;right:2%;bottom: 2%;">
            <v-btn
                    absolute
                    dark
                    fab
                    top
                    right
                    color="accent"
                    @click="$router.push({name:'answer-publish',query:{redirect: $route.fullPath, id:$route.query.id}})"
            >
                <v-icon>add</v-icon>
            </v-btn>
        </v-card-text>
        <!--<div class="foot">-->
        <!--<div class="footinput">-->
        <!--<input type="text" placeholder="输入您的回答">-->
        <!--</div>-->
        <!--<div>又是俩icon</div>-->
        <!--</div>-->

        <!--END-->

        <!--底部为添加按钮留出空间，防止遮挡内容-->
        <v-footer app>
            <bottomNav :bottom-nav="'topic'"></bottomNav>
        </v-footer>
    </div>
</template>

<script>
    import bottomNav from '../components/bottomNav';

    export default {
        name: "Question",
        components: {
            bottomNav
        },
        data() {
            return {
                showAll: false,
                isfollowed: false,
                followNotice: '+关注话题',
                questionData: {
                    title: '刚刚研制成功的世界首台分辨力最高紫外超分辨光刻装备意味着什么？对国内芯片行业有何影响？',  // 问题标题
                    tags: ['新闻', '芯片'],  // 标签
                    follow: '22222',  // 关注人数
                    commentsNum: '333',  // 评论数量
                    content: '新闻资讯军报记者成都11月29日电（吕珍慧、记者邹维荣）国家重大科研装备研制项目“超...',  // 内容
                },
                answerNum: "123",  // 回答的数量
                answersDataList: [
                    {
                        content: '先回答大家最关心的两个问题:2、不吹不黑，这个装备真的这么厉害吗，还是只是吹牛？答：确实很厉害。',
                        nickname: '看风景',  // 用户昵称
                        edittime: '2小时前',  // 回答时间
                        agree: '233',  // 点赞
                        commentsNum: '',  //评论数量
                    },
                ],  // 答案列表
            }
        },
        methods: {
            // getQuestion(questionID) {
            //     // 获取问题信息
            //     axios.get()
            // },
            getAnswers(questionID) {
                // 获取答案信息
                this.$api.questions.get_answer_list(questionID).then((response) => {
                    // console.log(response.data.data);
                    let data = response.data.data;
                    data.forEach((value) => {
                        let image = value.image;
                        let x = [];
                        image.forEach((img) => {
                            x.push(img.split('src="')[1].split('"')[0])
                        });
                        value.image = x;
                    });
                    this.answersDataList = data;
                    this.answerNum = response.data.data.length;
                });
            },
            getQuestion(questionID) {
                this.$api.questions.get_question(questionID).then((response) => {
                    // console.log(response.data.data);
                    const data = response.data.data;
                    this.questionData.title = data.title;
                    this.questionData.content = data.description;
                    this.questionData.tags = data.tags;
                    this.questionData.follow = data.follow;
                    this.questionData.commentsNum = data.comment;
                    //this.questionData.tags=data.tags;
                });
            },
            follow() {
                if (!this.isfollowed) {
                    this.$api.questions.follow_question(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.isfollowed = true;
                            this.followNotice = '已关注';
                            this.questionData.follow++;
                        }
                    })
                }
            },
            get_follow(id) {
                this.$api.questions.get_follow(id).then(res => {
                    if (res.data.code === 1) {
                        this.isfollowed = true;
                        this.followNotice = '已关注';
                    }
                })
            },
            add_user_action(id) {
                this.$api.account.add_user_action(id, 11).then(res => {
                    if (res.data.code === 1) {
                        return 0;
                    }
                })
            }
        },
        mounted() {
            const id = this.$route.query.id;
            this.getAnswers(id);
            this.getQuestion(id);
            this.get_follow(id);
            this.add_user_action(id);
        },
    }
</script>

<style scoped>
    .topic {
        width: 100%;
        height: 100%;
        z-index: 400;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }

    p {
        margin-bottom: 0;
    }

    a {
        text-decoration: none;
        outline: none;
    }

    .head {
        padding-top: 1em;
        line-height: 1.5;
    }

    .head-something {
        width: 100%;
        margin-top: 1.2em;
        display: flex;
        font-weight: 100;
    }

    .attention {
        float: right;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px #FFCC00 solid;
        border-radius: 3px;
        color: #FFCC00;
        font-weight: 600;
    }

    .followed {
        float: right;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px #FFCC00 solid;
        border-radius: 3px;
        color: #FFFFFF;
        font-weight: 600;
        background-color: #ffcc00;
    }

    .topicdetail {
        margin-top: 1.2em;
    }

    .line {
        width: 100%;
        height: 42px;
        background-color: #EBEBEB;
        margin-top: 1.2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .answerDetail {
        color: black;
        margin-bottom: 1em;
        line-height: 1.5;
        margin-top: 1em;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-top: 1em;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        word-break: break-all;
    }

    .answerImg {
        width: 100%;
        height: 120px;
        display: flex;
    }

    .answerImg img {
        display: flex;
        flex: 0 0 33.3%;
        width: 33.3%;
    }

    .like {
        line-height: 1.5;
        float: right;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .userhead {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .userhead img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }

    .userName {
        font-size: 1.3em;
        font-weight: 600;
    }

    .userTag {
        font-size: 1.2em;
        font-weight: 600;
        color: #FFCC00;
    }

    .answerTime {
        position: absolute;
        right: 0;
    }

    .foot {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        position: fixed;
        bottom: 0;
        background-color: white;
        z-index: 100;
        line-height: 1.5;
        padding-left: 1em;
    }

    .footinput {
        display: flex;
        flex: 0 0 70%;
        height: 80%;
        border: 1px solid #EBEBEB;
        border-radius: 10px;
    }

    .foot input {
        padding-left: 1em;
        width: 100%;
        height: 100%;
        outline: #EBEBEB;
    }

    #show-all-button {
        color: grey;
    }

    .bottom {
        margin-bottom: 3em;
    }

    #bottom-space {
        height: 8em;
    }

    img {
        max-width: 100%;
    }
</style>
