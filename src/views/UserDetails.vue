<template>
    <div class="detail">
        <div style="height: 50%; width: 100%;">
            <v-layout column fill-height>
                <v-flex xs1>
                    <v-layout justify-space-between row>
                        <v-flex shrink>
                            <!--返回上一页-->
                            <v-btn @click="$router.back()" icon>
                                <!--<v-btn @click="$router.push($route.query.redirect || {name: 'topic'})" icon>-->
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
                                <img class="avatar" :src="userInfo.avatar"
                                     style="width: 110px;height: 110px;border-radius: 50%;object-fit: cover">
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

                <!--功能-->
                <v-flex xs2>
                    <v-container fill-height>
                        <v-layout align-center justify-center row fill-height>
                            <v-flex xs5>
                                <v-btn @click="consult" block color="grey"
                                       :disabled='user_group==1||self'>
                <span class="font-weight-bold white--text">
                  咨询
                </span>
                                </v-btn>
                            </v-flex>
                            <v-flex xs5 offset-xs1>
                                <v-btn @click="followUser" block color="primary"
                                       :outline="userInfo.isFollow"
                                       :disabled="self">
                <span class="font-weight-bold">
                  {{ userInfo.isFollow? '已关注': '+ 关注' }}
                </span>
                                </v-btn>
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
                            v-for="tab in ['话题', '回答', '文章']"
                            :key="tab"
                    >
                        {{ tab }}
                    </v-tab>
                    <!--动态-->
                    <v-tab-item :key="'话题'">
                        <v-card flat min-height="250">
                            <v-layout v-if="message.length === 0" align-center justify-center row fill-height>
                                <span class="title font-weight-light"> <br>暂无话题</span>
                            </v-layout>
                            <v-list v-else two-line subheader>
                                <div v-for="(item, index) in message" :key="index">
                                    <v-divider></v-divider>

                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                    <span class="font-weight-light">
                        {{ item.time }}
                    </span>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </div>

                            </v-list>
                        </v-card>
                    </v-tab-item>

                    <!--回答-->
                    <v-tab-item :key="'回答'">
                        <v-card flat min-height="250">
                            <v-layout v-if="answers.length === 0" align-center justify-center row fill-height>
                                <span class="title font-weight-light"> <br>暂无回答</span>
                            </v-layout>

                            <v-list v-else two-line subheader>
                                <div v-for="(item, index) in answers" :key="index">
                                    <v-divider></v-divider>

                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                    <span class="font-weight-light">
                        {{ item.time }}
                    </span>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </div>

                            </v-list>
                        </v-card>
                    </v-tab-item>

                    <!--专栏-->
                    <v-tab-item :key="'专栏'">
                        <v-card flat min-height="250">
                            <v-layout v-if="articles.length === 0" align-center justify-center row fill-height>
                                <span class="title font-weight-light"> <br>暂无文章</span>
                            </v-layout>

                            <v-list v-else two-line subheader>
                                <div v-for="(item, index) in articles" :key="index">
                                    <v-divider></v-divider>

                                    <v-list-tile>
                                        <v-list-tile-content>
                                            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                            <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                        </v-list-tile-content>

                                        <v-list-tile-action>
                    <span class="font-weight-light">
                        {{ item.time }}
                    </span>
                                        </v-list-tile-action>
                                    </v-list-tile>
                                </div>

                            </v-list>
                        </v-card>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: 'Detail',
        data() {
            return {
                userId: this.$route.query.id,  // 当前页面对应的用户id
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
                    {title: '加载中', subtitle: '发表文章', time: '1天前'},
                ],  // 动态
                answers: [],  // 回答
                articles: [
                    {title: '加载中', subtitle: '加载中..', time: '2019-03-07'},
                ],  // 专栏文章
                group: [],  // 用户组信息
                user_group: {},
                self: false,
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
                } while (this.group.length > 0 && this.userInfo.group !== '');
                this.getMessage();
                this.self = this.$route.query.id == this.$store.state.userInfo.user_id;
            },  // 初始化用户数据
            getMessage() {
                this.message = [];
                this.answers = [];
                this.articles = [];
                this.$api.account.get_user_questions_by_id(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        res.data.data.forEach(value => {
                            this.message.push({
                                title: value['title'].replace(/<[^>]+>/g, ''),
                                subtitle: value['description'].replace(/<[^>]+>/g, ''),
                                time: this.get_date(value['edittime'])
                            })
                        })
                    }
                });
                this.$api.account.get_user_answers_by_id(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        res.data.data.forEach(value => {
                            this.answers.push({
                                title: value['title'].replace(/<[^>]+>/g, ''),
                                subtitle: value['content'].replace(/<[^>]+>/g, ''),
                                time: this.get_date(value['edittime'])
                            })
                        })
                    }
                });
                this.$api.account.get_user_articles_by_id(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        res.data.data.forEach(value => {
                            this.articles.push({
                                title: value['title'].replace(/<[^>]+>/g, ''),
                                subtitle: value['description'].replace(/<[^>]+>/g, ''),
                                time: this.get_date(value['edittime'])
                            })
                        })
                    }
                });
            },  // 获取用户动态等数据
            get_date(date) {
                let old = new Date(date);
                let now = new Date();
                let time = now.getTime() - old.getTime();
                if (time < 60 * 1000) {
                    return "刚刚"
                } else if (time > 60 * 1000 && time < 60 * 60 * 1000) {
                    return Math.round(time / 60 / 1000) + '分钟前'
                } else if (time > 60 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
                    return Math.round(time / 60 / 60 / 1000) + '小时前'
                } else if (time > 24 * 60 * 60 * 1000 && time < 10 * 60 * 60 * 1000) {
                    return Math.round(time / 24 / 60 / 60 / 1000) + '天前'
                } else {
                    return (old.getMonth() + 1) + '-' + (old.getDate())
                }
            },// 处理时间
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
                        this.user_group = data.user_group;
                    }
                });
                this.$api.account.get_user_follow_state(this.userId).then(res => {
                    if (res.data.code !== 0) {
                        this.userInfo.isFollow = res.data.code === 1;
                    }
                });
            },  // 获取用户信息
            consult() {
                this.$router.push({name: 'advisory', query: {id: this.userId}})
            },  // 付费咨询
            followUser() {
                if (!this.self) {
                    if (this.userInfo.isFollow) {
                        this.$api.account.un_follow_user(this.userId).then(res => {
                            if (res.data.code === 1) {
                                this.userInfo.isFollow = false;
                                this.$store.state.userInfo.follow--;
                                this.$store.commit('showInfo', '已取消关注');
                            }
                        });
                    } else {
                        this.$api.account.follow_user(this.userId).then(res => {
                            if (res.data.code === 1) {
                                this.userInfo.isFollow = true;
                                this.$store.state.userInfo.follow++;
                                this.$store.commit('showInfo', '已关注');
                            }
                        });
                    }
                }
            }
        },

        mounted() {
            this.initUserData()
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

</style>
