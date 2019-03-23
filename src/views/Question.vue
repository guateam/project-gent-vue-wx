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

            <v-btn icon @click="edit">
                <!--<v-icon v-if="$store.state.userInfo.level>=5&&user_id==$store.state.userInfo.user_id">edit</v-icon>-->
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
                            条评论
                            <span v-if="question_type!==0"
                                  style="color: #4CAF50">&nbsp;&nbsp;&nbsp;悬赏价格：￥{{price}}</span>
                        </p>
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

        <v-card v-for="(answer, index) in answersDataList" :key="index" v-if="paid">
            <div style="padding-left: 1em; padding-right: 1em;padding-bottom: 1em">

                <router-link :to="{name: 'answer', query: {redirect: $route.fullPath, id: answer.answerID}}">
                    <!--<p class="answerDetail">{{ answer.content.length > 70 ? answer.content.substring(0, 70) + '...' :-->
                    <!--answer.content }}</p>-->

                    <!--列表正文内容-->
                    <p class="answerDetail">{{answer.content.replace(/<[^>]+>/g, '')}}</p>

                    <!--没有图片时不加载下面的div-->
                    <div class="answerImg" v-if="answer.image.length >=3">
                        <img style="object-fit: cover" v-for="(item,x) in answer.image" :key="x" v-if="x<3" :src="item"
                             alt=""/>
                    </div>
                    <div class="answerImg" v-if="answer.image.length === 1">
                        <img :src="answer.image[0]" alt="" style="width: 100%;object-fit: cover;"/>
                    </div>
                    <div class="answerImg" v-if="answer.image.length === 2">
                        <img :src="answer.image[0]" alt="" style="width: 50%;object-fit: cover;"/>
                        <img :src="answer.image[1]" alt="" style="width: 50%;object-fit: cover;"/>
                    </div>
                </router-link>
                <div style="width: 100%;display: flex;align-items: center;position: relative;margin-top: 1em"
                     @click="$router.push({name:'detail',query:{id:answer.userID}})">
                    <div class="userhead">
                        <img :src="answer.headportrait" alt="" style="width: 100%;object-fit: cover;">
                    </div>
                    <p class="userName" style="margin-left: 0.5em">{{answer.nickname}}</p>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <p class="like">点赞: {{answer.agree}} 反对: {{ answer.disagree }}</p>
                    <!--<p class="userTag">{{answer.user.tag}}</p>-->
                    <p class="answerTime">{{answer.edittime}}</p>
                </div>
                <div style="width: 100%;display: flex;align-items: center;position: relative;margin-top: 1em">
                    <v-btn block v-if="user_id===$store.state.userInfo.user_id &&(!adopt)&&question_type!==0"
                           color="success"
                           @click="adopt_answer(answer.answerID)">采纳回答
                    </v-btn>
                </div>
            </div>
        </v-card>
        <v-card v-if="!paid" style="text-align: center;align-items: center;">
            <h2 style="margin-top: 1em;padding-top: 1em;">本问题是付费问题，请付费后查看</h2>
            <v-btn color="info" @click="confirm_pay" style="margin-top: 1em;">支付￥{{price*0.05.toFixed(2)}}</v-btn>
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
                    v-if="$store.state.userInfo.level>=1"
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
        <v-dialog
                v-model="dialog"
                width="500"
        >
            <v-card>
                <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                        color="primary"
                >
                    确认支付
                </v-card-title>

                <v-card-text>
                    你确定支付￥{{price*0.05.toFixed(2)}}元来查看回答吗？
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                            color="warning"
                            flat
                            @click="dialog = false"
                    >
                        取消
                    </v-btn>
                    <v-btn
                            color="success"
                            flat
                            @click="pay_question"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
                    title: '加载中的标题...',  // 问题标题
                    tags: [],  // 标签
                    follow: '加载中',  // 关注人数
                    commentsNum: '加载中',  // 评论数量
                    content: '加载中的内容...',  // 内容
                },
                answerNum: "加载中",  // 回答的数量
                answersDataList: [
                    {
                        content: '加载中的回答...',
                        nickname: '加载中',  // 用户昵称
                        edittime: '加载中',  // 回答时间
                        agree: '加载中',  // 点赞
                        commentsNum: '',  //评论数量
                    },
                ],  // 答案列表
                question_type: 0,
                paid: true,
                price: 0,
                dialog: false,
                user_id: '',
                adopt: false
            }
        },
        methods: {
            // getQuestion(questionID) {
            //     // 获取问题信息
            //     axios.get()
            // },
            getAnswers(questionID) {
                // 获取答案信息
                if (this.question_type === 0) {
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
                } else {
                    this.$api.questions.get_priced_answer_list(questionID).then(res => {
                        if (res.data.code === 1) {
                            let data = res.data.data;
                            data.forEach((value) => {
                                let image = value.image;
                                let x = [];
                                image.forEach((img) => {
                                    x.push(img.split('src="')[1].split('"')[0])
                                });
                                value.image = x;
                                if (value.answertype === 2) {
                                    this.adopt = true;
                                }
                            });
                            this.answersDataList = data;
                            this.answerNum = res.data.data.length;
                        } else if (res.data.code === 0) {
                            this.paid = false;
                        }
                    })
                }
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
                    this.question_type = data.question_type;
                    this.price = data.price;
                    this.answerNum = data.answer;
                    this.user_id = data.user_id;
                    this.getAnswers(questionID);
                });
            },
            pay_question() {
                this.$api.questions.pay_question(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.getAnswers(this.$route.query.id);
                        this.paid = true;
                    } else if (res.data.code === -1) {
                        this.$store.commit('showInfo', '余额不足，请充值！');
                    } else {
                        this.$store.commit('showInfo', res.data.msg);
                    }
                    this.dialog = false;
                })
            },
            confirm_pay() {
                this.dialog = true;
            },
            adopt_answer(answer_id) {
                this.$api.questions.adopt_answer(answer_id).then(res => {
                    if (res.data.code === 1) {
                        this.adopt = true;
                    } else {
                        this.$store.commit('showInfo', res.data.msg);
                    }
                })
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
                } else {
                    this.$api.questions.un_follow_question(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.isfollowed = false;
                            this.followNotice = '+关注话题';
                            this.questionData.follow--;
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
            },
            set_exp_change() {
                this.$api.account.set_exp_change(1, '浏览话题').then(res => {

                })
            },
            edit() {
                // if (this.user_id == this.$store.state.userInfo.user_id) {
                //     this.$router.push({name: 'question-edit', query: {id: this.$route.query.id}})
                // }
                this.$router.push({name: 'search'})
            }
        },
        mounted() {
            const id = this.$route.query.id;
            this.getQuestion(id);
            this.get_follow(id);
            this.add_user_action(id);
            this.set_exp_change();
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
