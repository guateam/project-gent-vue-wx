<template>
    <div class="detail">
        <div style="height: 50%; width: 100%;">
            <v-layout column fill-height>
                <v-flex xs1>
                    <v-layout justify-space-between row>
                        <v-flex shrink>
                            <!--返回上一页-->
                            <v-btn @click="$router.back()" icon>
                                <v-icon>arrow_back</v-icon>
                            </v-btn>
                        </v-flex>
                        <v-flex shrink>
                            <v-btn icon>
                                <v-icon>more_horiz</v-icon>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-flex>

                <v-flex xs3>
                    <v-container fill-height>
                        <v-layout align-center justify-space-between row fill-height>
                            <!--头像-->
                            <v-flex xs6>
                                <img class="avatar" :src="userInfo.avatar" width="66%">
                            </v-flex>

                            <v-flex xs6>
                                <!--信息-->
                                <v-layout justify-center column fill-height>
                                    <v-flex xs6>
                                        <v-layout align-start justify-center row fill-height>
                                            <v-flex>
                                                <v-btn small block color="success" outline>{{ userInfo.group }}</v-btn>
                                            </v-flex>
                                        </v-layout>
                                        <v-divider></v-divider>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-layout align-end row fill-height>
                                            <v-flex xs6>
                                                <span class="headline font-weight-bold">{{ (userInfo.follow).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                                <br/>
                                                <span class="font--text">关注</span>
                                            </v-flex>

                                            <v-flex xs6>
                                                <span class="headline font-weight-bold">{{ (userInfo.fans).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}</span>
                                                <br/>
                                                <span class="font--text">粉丝</span>
                                            </v-flex>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

                <!--昵称-->
                <v-flex xs1>
                    <v-container fill-height>
                        <v-layout align-center justify-center row fill-height>
                            <v-flex shrink>
                                <span class="headline font-weight-bold">{{ userInfo.nickname }}</span>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>

                <!--简介-->
                <v-flex grow>
                    <v-container fill-height>
                        <span class="body-1 font-weight-light">{{ userInfo.desc.length > 60? userInfo.desc.substring(0, 60) + '...': userInfo.desc }}</span>
                    </v-container>
                </v-flex>
            </v-layout>
        </div>
        <v-layout>
            <v-flex>
                <v-tabs fixed-tabs>
                    <v-tab
                            v-for="tab in ['付费咨询']"
                            :key="tab"
                    >
                        {{ tab }}
                    </v-tab>
                    <!--公开咨询-->
                    <!--<v-tab-item :key="'公开咨询'">-->
                    <!--<v-card flat min-height="250">-->
                    <!--<v-flex xs10 offset-xs1-->
                    <!--style="padding: 2em;border: 1px #eee solid;margin-top: 2em;margin-bottom: 2em">-->
                    <!--提出问题，等待对方回答，价格由提问者自定，超过72小时未回答费用会自动退回。-->
                    <!--<br>-->
                    <!--公开提问你的回答被他人查看后，你将分成收入的一半-->
                    <!--</v-flex>-->
                    <!--<v-flex xs12 style="display: flex;align-items: center;justify-content: center;">-->
                    <!--<v-btn color="info">发起付费咨询</v-btn>-->
                    <!--</v-flex>-->
                    <!--<v-divider></v-divider>-->
                    <!--<v-card style="padding: 1em 2em;line-height: 1.5;">-->
                    <!--<h3 style="display: flex;align-items: center;margin-bottom: 8px"><img-->
                    <!--style="width: 25px;height: 25px;object-fit: contain;border-radius: 50%;margin-right: 5px"-->
                    <!--src="https://www.asgardusk.com/images/none.png" alt=""><span>拉拉人</span>回答了问题-->
                    <!--</h3>-->
                    <!--<p>交互原型图如何画更有利于工作,画交互图的时候有哪些事项需要注意？</p>-->
                    <!--<h4>-->
                    <!--<v-btn color="info">￥2&nbsp;&nbsp;学习一下</v-btn>-->
                    <!--</h4>-->
                    <!--<h4>价值<span>20</span>元，<span>9</span>人听过，<span>4</span>人觉得值</h4>-->
                    <!--</v-card>-->
                    <!--<v-divider></v-divider>-->
                    <!--<v-card style="padding: 1em 2em;line-height: 1.5;">-->
                    <!--<h3 style="display: flex;align-items: center;margin-bottom: 8px"><img-->
                    <!--style="width: 25px;height: 25px;object-fit: contain;border-radius: 50%;margin-right: 5px"-->
                    <!--src="https://www.asgardusk.com/images/none.png" alt=""><span>拉拉人</span>回答了问题-->
                    <!--</h3>-->
                    <!--<p>交互原型图如何画更有利于工作,画交互图的时候有哪些事项需要注意？</p>-->
                    <!--<h4>-->
                    <!--<v-btn color="info">￥2&nbsp;&nbsp;学习一下</v-btn>-->
                    <!--</h4>-->
                    <!--<h4>价值<span>20</span>元，<span>9</span>人听过，<span>4</span>人觉得值</h4>-->
                    <!--</v-card>-->
                    <!--<v-divider></v-divider>-->
                    <!--<v-card style="padding: 1em 2em;line-height: 1.5;">-->
                    <!--<h3 style="display: flex;align-items: center;margin-bottom: 8px"><img-->
                    <!--style="width: 25px;height: 25px;object-fit: contain;border-radius: 50%;margin-right: 5px"-->
                    <!--src="https://www.asgardusk.com/images/none.png" alt=""><span>拉拉人</span>回答了问题-->
                    <!--</h3>-->
                    <!--<p>交互原型图如何画更有利于工作,画交互图的时候有哪些事项需要注意？</p>-->
                    <!--<h4>-->
                    <!--<v-btn color="info">￥2&nbsp;&nbsp;学习一下</v-btn>-->
                    <!--</h4>-->
                    <!--<h4>价值<span>20</span>元，<span>9</span>人听过，<span>4</span>人觉得值</h4>-->
                    <!--</v-card>-->
                    <!--<v-divider></v-divider>-->
                    <!--</v-card>-->
                    <!--</v-tab-item>-->


                    <!--私密咨询-->
                    <v-tab-item :key="'付费咨询'">
                        <v-card flat min-height="250">
                            <v-flex xs10 offset-xs1
                                    style="padding: 2em;border: 1px #eee solid;margin-top: 2em;margin-bottom: 2em">
                                提出问题，等待对方回答，价格由提问者自定，超过72小时未回答费用会自动退回。
                                <br>
                                私密咨询内容仅双方可见
                            </v-flex>
                            <v-flex xs12 style="display: flex;align-items: center;justify-content: center;">
                                <v-btn color="info" @click="$router.push({name:'advisory-publish',query:{id:userId}})">
                                    发起付费咨询
                                </v-btn>
                            </v-flex>
                            <v-divider></v-divider>
                            <h2 style="margin-top: 0.2em;margin-left: 0.2em;">历史记录</h2>
                            <v-divider></v-divider>
                            <v-container>
                                <v-layout row wrap style="line-height: 1.5;height: 50px">
                                    <v-card style="padding: 1em 2em;line-height: 1.5;" v-for="value in orders">
                                        <h3 style="display: flex;align-items: center;margin-bottom: 8px"><img
                                                style="width: 25px;height: 25px;object-fit: contain;border-radius: 50%;margin-right: 5px"
                                                :src="value.user_head_portrait"
                                                alt=""><span>{{value.content}}</span>
                                        </h3>
                                        <p>{{value.answer}}</p>
                                        <h4>
                                            <v-btn color="info"
                                                   @click="$router.push({name:'advisory-detail',query:{id:value.id}})">
                                                查看详情
                                            </v-btn>
                                        </h4>
                                        <h4>提问日期：{{value.time}} 状态：{{value.state}}</h4>
                                    </v-card>
                                    <v-divider v-for="value in orders"></v-divider>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-tab-item>

                </v-tabs>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "advisory",
        data() {
            return {
                userId: 1,  // 当前页面对应的用户id
                // userId: this.$route.query.id,  // 当前页面对应的用户id
                userInfo: {
                    isFollow: false,  // 是否关注
                    nickname: '未知用户',  // 昵称
                    group: '路人',  // 用户组
                    avatar: '',  // 头像
                    follow: 0,  // 关注
                    fans: 0,  // 粉丝数
                    desc: '这个人很懒，什么也没留下。',  // 简介
                },  // 用户信息
                message: [
                    {title: '剪指甲的108种方法', subtitle: '发表文章', time: '1天前'},
                    {title: '剪指甲的正确方式', subtitle: '赞同答案', time: '2天前'},
                    {title: '修剪指甲的10种误区', subtitle: '收藏文章', time: '1个月前'},
                    {title: '修剪指甲的10种误区', subtitle: '收藏文章', time: '1个月前'},
                    {title: '修剪指甲的10种误区', subtitle: '收藏文章', time: '1个月前'},
                    {title: '修剪指甲的10种误区', subtitle: '收藏文章', time: '1个月前'},
                ],  // 动态
                answers: [],  // 回答
                articles: [
                    {title: '剪指甲的108种方法', subtitle: '说起修剪指甲，首先……', time: '2019-03-07'},
                    {title: '剪指甲的108种方法', subtitle: '说起修剪指甲，首先……', time: '2019-03-07'},
                    {title: '剪指甲的108种方法', subtitle: '说起修剪指甲，首先……', time: '2019-03-07'},
                    {title: '剪指甲的108种方法', subtitle: '说起修剪指甲，首先……', time: '2019-03-07'},
                    {title: '剪指甲的108种方法', subtitle: '说起修剪指甲，首先……', time: '2019-03-07'},
                    {title: '剪指甲的108种方法', subtitle: '说起修剪指甲，首先……', time: '2019-03-07'},
                ],  // 专栏文章
                group: [],  // 用户组信息
                orders: [
                    {
                        content: '加载中···',
                        answer: '',
                        state: 1,
                        time: '加载中'
                    }
                ]
            }
        },
        methods: {
            initUserData() {
                this.getUserGroup();
                let tic = new Date();
                do {
                    this.getUserData();
                    let toc = new Date();
                    if ((toc - tic) > 10000) {
                        this.$store.commit('showInfo', '超时');
                        break;
                    }  // 超过10秒认为加载失败
                } while (this.group.length > 0 && this.userInfo.avatar !== '')
                this.getMessage();
            },  // 初始化用户数据
            getMessage() {
                this.message = [];
                this.answers = [];
                this.articles = [];
            },  // 获取用户动态等数据
            getUserGroup() {
                this.$api.account.get_user_group().then(res => {
                    if (res.data.code === 1) {
                        this.group = res.data.data;
                    }
                })
            },  // 获取用户组信息
            getUserData() {
                this.$api.account.get_user(this.userId).then(res => {
                    if (res.data.code === 1) {
                        let data = res.data.data;
                        this.userInfo.nickname = data.nickname;
                        this.userInfo.group = this.group[data.user_group];
                        this.userInfo.avatar = data.head_portrait;
                        this.userInfo.follow = data.follow;
                        this.userInfo.fans = data.fans;
                        this.userInfo.desc = data.description;
                    }
                });
                this.$api.account.get_user_follow_state(this.userId).then(res => {
                    if (res.data.code !== 0) {
                        this.userInfo.isFollow = res.data.code === 1;
                    }
                });
            },  // 获取用户信息
            consult() {
                this.$store.commit('showInfo', '付费咨询');
            },  // 付费咨询
            followUser() {
                if (this.userInfo.isFollow) {
                    this.$api.account.un_follow_user(this.userId).then(res => {
                        if (res.data.code === 1) {
                            this.userInfo.isFollow = false;
                            this.$store.commit('showInfo', '已取消关注');
                        }
                    });
                }  // 取关
                else {
                    this.$api.account.follow_user(this.userId).then(res => {
                        if (res.data.code === 1) {
                            this.userInfo.isFollow = true;
                            this.$store.commit('showInfo', '关注成功!')
                        }
                    });
                }  // 关注
            },  // 关注/取关用户
            get_historical_orders() {
                this.$api.specialist.get_historical_orders().then(res => {
                    if (res.data.code === 1) {
                        this.orders = [];
                        let state = ['已拒绝', '待回答', '已回答'];
                        res.data.data.forEach(value => {
                            this.orders.push({
                                content: value['content'].replace(/<[^>]+>/g, ''),
                                answer: value['answer'] !== null ? value['answer'].replace(/<[^>]+>/g, '') : '',
                                id: value['orderID'],
                                state: state[value['state'] + 1],
                                time: value['time'],
                                user_head_portrait: value['user_head_portrait']
                            })
                        });
                    }
                })
            }
        },
        mounted() {
            this.initUserData();
            this.get_historical_orders();
        },
    }
</script>

<style scoped>
    .detail {
        height: 100vh;
        width: 100vw;
        font-family: Helvetica, Arial, sans-serif;
        background: linear-gradient(0deg, white, whitesmoke 40%, #FFCC00);
    }

    .avatar {
        border-radius: 80px;
    }

    .container {
        padding: 0 16px;
    }

    /*覆盖组件样式*/

    >>> .v-tabs {
        background-color: white !important;
    }

    .v-btn {
        margin: 1em 0 1em 0;
    }
</style>
