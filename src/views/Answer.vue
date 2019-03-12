<template>
    <div class="answer">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-btn icon @click="$router.push($route.query.redirect || {name: 'topic'})">
                <v-icon>arrow_back</v-icon>
            </v-btn>

            <v-toolbar-title class="headline " style="margin: 0 auto">
                <span>话题</span>
            </v-toolbar-title>

            <v-btn icon>
                <v-icon>more_vert</v-icon>
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

        <!--回答者的用户信息关注等，这部分dom写的太复杂了所以先直接把style全写在template里面-->

        <div>
            <div style="display: flex;justify-content: space-between;margin-top: 1em;margin-bottom: 1em">
                <div style="display: flex;flex: 0 0 80%;"
                     @click="$router.push({name: 'detail', query: {redirect: $route.fullPath, id: user_id}})">
                    <div style="display: flex;flex: 0 0 25%;align-items: center;justify-content: center">
                        <div style="width: 60px;height: 60px;border-radius: 50%">
                            <img :src="avatar" alt="" style="width: 100%;height: 100%;border-radius: 50%">
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
                    <div class="un_follow" @click="follow_user">
                        {{follow?'已关注':'关注'}}
                    </div>
                </div>
            </div>
            <div style="padding-left: 1em; padding-right: 1em;display: flex;justify-content: space-between;border-bottom: 1px solid #EBEBEB">
                <p>上一次编辑 <span>· {{ latestEdit }}</span>
                </p>
                <p>
                    <span v-for="(tag, idx) in warning" :key="idx">
                        {{ tag.text }}
                        <span v-if="idx !== warning.length - 1">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                    </span>
                </p>
            </div>
        </div>

        <!--回答的答案-->

        <div class="intro" style="padding-left: 1em; padding-right: 1em;">
            <p v-html="intro.replace(/\n/g, '<br>')"></p>
        </div>

        <!--评论这部分,是有组件的，但是这里不用，仅获取前三个类似热评一样的东西，不然样式不好写-->
        <div style="width: 100%">
            <ButtonGroup style="width: 100%;height: 6em;margin-top: 2em">
                <Button type="warning" icon="md-arrow-dropup" :class="{mid:select===0,long:select===1,hide:select===2}"
                        @click="agree_answer()" :hidden="select===2">{{select!==0?'已':''}}点赞 {{agree}}
                </Button>
                <Button icon="md-arrow-dropdown" :class="{mid:select===0,long:select===2,hide:select===1}"
                        @click="disagree_answer()" :hidden="select===1">{{select!==0?'已':''}}点踩 {{disagree}}
                </Button>
            </ButtonGroup>
        </div>
        <div class="comment" style="padding-left: 1em; padding-right: 1em;">
            <h2>评论</h2>
            <router-link :to="{name: 'comment', params: {id: $route.params.id,type:1}}">
                <div v-for="(comment, index) in comments" :key="index" class="comment-item">
                    <div class="comment-user">
                        <img :src="comment.avatar" alt=""><!-- 头像 -->
                        <span class="comment-user-name">{{ comment.nickname }}</span>
                        <!--<span class="comment-user-tag">从业者</span>-->
                        <div class="comment-like"><span class="subheading">{{ comment.agree }}</span>
                            <v-icon style="height: 30px;margin-left: 3px">thumb_up</v-icon>
                        </div>
                    </div>
                    <div>
                        <p>{{ comment.content.length > 20 ? comment.content.substring(0, 20) + '...' : comment.content
                            }}</p>
                    </div>
                </div>
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
                topicTitle: '刚刚研制成功的世界首台分辨力最高紫外超分辨光刻装备意味着什么？对国内芯片行业有何影响？',  // 话题标题
                intro: '先回答大家最关心的两个问题：\n' +
                    '1、我们可以实现芯片彻底国产化了吗？\n' +
                    '答：暂时还不行。\n' +
                    '2、不吹不黑，这个装备真的这么厉害吗，还是只是吹牛？\n' +
                    '答：确实很厉害。\n' +
                    '很多人只盯着新闻里22nm这个指标，其实大家要关注的是“365nm的光源，单次曝光线宽可达22nm”。注意到我加黑的那几个关键词了吗？22nm指标虽然很棒但是业界早就做过了，到底哪里厉害呢？所以关键是用365nm的光源单次曝光做到22nm，懂点光学的就知道这意味着什么：打破了传统的衍射极限。\n' +
                    '所以在我看来，这台机器最大的价值是验证了表面等离子体（SP）光刻加工的可行性。\n' +
                    '这台SP光刻机与ASML光刻机对比怎么样呢？举个不恰当的例子吧，这就像是初期的枪械与最厉害的弓箭的对比。早期枪械，比如火铳，无论是射击精度还是射击距离都远远比不上厉害的弓箭，但是如今的狙击枪早已把弓箭甩开十万八千里了，这就是原理性的胜利。\n' +
                    '要理解刚才说的这个“原理性的胜利”到底是怎么回事，我们首先得回顾一下以ASML为代表的传统光刻机是怎么做的。\n' +
                    '上面是ASML光刻机简单的原理图，抛开复杂的监测设备不谈，最核心的原理就是通过物镜系统将掩膜版上的图案进行缩印成像。涉及到成像过程，就不得不考虑光的衍射极限。即便抛开所有的几何像差，由于衍射的作用，一个无限小的点成像后也会变成一个弥散斑，被称为“艾里斑”。因此实际光学系统成像的分辨率就是两个艾里斑恰好能够分开的距离。\n' +
                    '所以由于衍射效应，成像分辨率会受到限制，最终的分辨率取决于波长、数值孔径等参数，波长越小、数值孔径越大分辨率则越高。所以ASML这些年来主要的研究方向就是利用更短的波长（近紫外-深紫外-极紫外）、增大数值孔径（更复杂的物镜、液体浸没）。但是每进一步都变得更加艰难，对系统设计、加工装配、误差检测等等诸多方面都提出了更为苛刻的要求，成本也越来越高昂。\n' +
                    '那么表面等离子体光刻又是怎么一回事呢？表面等离子体指的是一种局域在物质表面的特殊的电磁波，随着离开物质表面距离的增大迅速衰减，一般认为波长量级以上的区域就不存在了。\n' +
                    '更为神奇的是，虽然表面等离子体波是由其他电磁波激发的，但是波长会被极大地压缩，而压缩的比例取决于材料的电磁性质等参数。\n' +
                    '这就意味着，利用表面等离子体波进行光刻时，从原理上就不在受到传统衍射极限的限制了。\n' +
                    '在光刻机研制方面，我们一直有两个选择：沿用ASML的老路走一遍，还是另辟蹊径通过新原理弯道超车？我们国家很有钱，两个选择都在做。而这台SP光刻机的研制成功，就是让我们看到了弯道超车的可能性。其实从原理上，这简直就不是弯道超车了，而是在别的人还在绕山路的时候，我们尝试着打了一条隧道……虽然还没有完全挖通，但曙光就在眼前了。\n' +
                    '这个装备是我在的课题组主导研发的（但我没做这个方向），从原理提出、项目立项到装备最终验收通过，前前后后有十几年的时间。十几年磨一剑，挥洒了许许多多的老师和师兄师姐的智慧、汗水与青春。向他们致敬~',  // 回答内容
                nickname: '看风景的蜗牛君',
                group: '专家',
                desc: '杭州光学专家',
                latestEdit: '19:00',
                warning: ['原创', '不可转载'],
                avatar: './head.png',
                comments: [
                    {
                        agree: 1,
                        content: "这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论",
                        create_time: "Sat, 29 Dec 2018 11:15:40 GMT",
                        avatar: "",
                        id: 1,
                        nickname: "拉拉人"
                    },
                    {
                        agree: 0,
                        content: "这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论",
                        create_time: "Sat, 15 Dec 2018 19:08:09 GMT",
                        avatar: "",
                        id: 1,
                        nickname: "拉拉人"
                    },
                    {
                        agree: 0,
                        content: "这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论这是评论",
                        create_time: "Sat, 15 Dec 2018 19:08:36 GMT",
                        avatar: "",
                        id: 1,
                        nickname: "拉拉人"
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
                                agree: res.data.data[i].agree
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
                this.$api.answer.add_answer_comment(this.$route.query.id, this.comment_word).then(res => {
                    if (res.data.code === 1) {
                        this.comment_word = '';
                        this.getCommentData();
                    }
                })
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
                if (this.follow) {
                    this.$api.account.un_follow_user(this.user_id).then(res => {
                        if (res.data.code === 1) {
                            this.follow = false;
                        }
                    })
                } else {
                    this.$api.account.un_follow_user(this.user_id).then(res => {
                        if (res.data.code === 1) {
                            this.follow = true;
                        }
                    })
                }
            }
        },

        mounted() {
            this.getAnswerData();
            this.getCommentData();
            this.get_follow_state();
            this.add_user_action(this.$route.query.id);
            this.get_answer_agree_state();
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
        width: 50%;
        transition: all 0.5s;
        /*animation: back_ 2s;*/
        /*-moz-animation: back_ 2s; !* Firefox *!*/
        /*-webkit-animation: back_ 2s; !* Safari 和 Chrome *!*/
        /*-o-animation: back_ 2s; !* Opera *!*/
    }

    .long {
        width: 100%;
        transition: all 0.5s;
        /*animation: big 2s;*/
        /*-moz-animation: big 2s; !* Firefox *!*/
        /*-webkit-animation: big 2s; !* Safari 和 Chrome *!*/
        /*-o-animation: big 2s; !* Opera *!*/
    }

    .hide {
        width: 0;
        /*display: none;*/
        opacity: 0;
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
</style>
<style>
    img {
        max-width: 100%;
        width: auto;
        height: auto;
    }
</style>
