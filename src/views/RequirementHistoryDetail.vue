<template>
    <div style="background-color: white">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">需求详情</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-container grid-list-md text-xs-center style="background-color: white">
            <v-layout row>
                <v-flex xs12 style="padding: 0;">
                    <div style="width: 100%;height: 100%">
                        <img :src="data.cover" alt=""
                             style="width: 90%;height: 150px;object-fit: cover">
                    </div>
                </v-flex>
            </v-layout>
            <v-layout row>
                <v-flex xs12 style="height: 80px;text-align: left;justify-content: center;line-height: 1.5;">
                    <div class="title_box_item" style="width: 100%;height: 50%;">
                        <h2>{{data.title}}</h2>
                    </div>
                    <div class="title_box_item" style="width: 100%;height: 50%;">
                        <h3>{{data.nickname}}</h3>
                        <div style="margin-left: 5px;color:#66ccff; border: #66ccff 2px solid;padding: 1px 6px;">
                            {{data.usergroup.text}} lv.{{data.level}}
                        </div>
                    </div>
                    <div class="title_box_item" style="width: 100%;height: 25%;">
                        <span v-for="(tag, index) in data.tags"
                              :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-layout row wrap>
            <v-flex xs4
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px;border-right: 1px solid #eee;">
                <div>点击量</div>
                <div style="margin-top: 5px">{{data.read}}</div>
            </v-flex>
            <v-flex xs4
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px;border-right: 1px solid #eee;">
                <div>项目方向</div>
                <span v-for="(tag, index) in data.tags"
                      :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
            </v-flex>
            <v-flex xs4
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px">
                <div>项目状态</div>
                <div style="margin-top: 5px">
                    <span>{{state[data.state+1]}}</span>
                </div>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <div style="padding: 1em;line-height: 1.5;">
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em">具体要求</h3>
            <p class="topicdetail">
                <span v-if="!showAll_one">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.content.length > 80 ? data.article_description.substring(0, 80) + '...' : data.content }} </span>
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.content }} </span>
                <button id="show-all-button" v-if="data.content.length > 80"
                        @click="showAll_one = !showAll_one">
                    <span v-if="!showAll_one" style="color: blue">显示全部</span>
                    <span v-else style="color: blue">收起</span>
                </button>
            </p>
        </div>
        <v-divider></v-divider>
        <div style="padding: 1em;line-height: 1.5;border-bottom: 1px #eee solid">
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em">需求发布人</h3>
            <v-layout row wrap @click="$router.push({name:'detail',query:{id:data.userID}})">
                <v-flex xs3>
                    <div style="width: 65px;height: 65px;overflow:hidden;border-radius: 50%">
                        <img :src="data.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <p class="topicdetail">
                    <h3>{{data.nickname}}</h3>
                    账号简介：
                    <span v-if="!showAll_two">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.description.length > 100 ? data.description.substring(0, 100) + '...' : data.description }} </span>
                    <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{data.description }} </span>
                    <button v-if="data.description.length > 80" @click="showAll_two = !showAll_two">
                        <span v-if="!showAll_two" style="color: blue">显示全部</span>
                        <span v-else style="color: blue">收起</span>
                    </button>
                    </p>
                </v-flex>
            </v-layout>
        </div>
        <div style="padding: 1em;line-height: 1.5;">
            <!--<h3 style="margin-bottom: 1.1em;font-size: 1.2em">需求申请人</h3>-->
            <v-tabs fixed-tabs>
                <v-tab
                        v-for="tab in ['待审核', '已审核', '已拒绝']"
                        :key="tab"
                >
                    {{ tab }}
                </v-tab>
                <!--动态-->
                <v-tab-item :key="'待审核'">
                    <v-layout row wrap
                              style="margin-bottom: 2em;border-bottom: 1px #eee solid" v-for="item in users"
                              v-if="item.state===0">
                        <v-flex xs3>
                            <div style="width: 65px;height: 65px;overflow:hidden;border-radius: 50%">
                                <img :src="item.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                            </div>
                        </v-flex>
                        <v-flex xs9 @click="$router.push({name:'detail',query:{id:item.userID}})">
                            <p class="topicdetail">
                            <h3>{{item.nickname}}</h3>
                            账号简介：
                            <span v-if="!showAll_two">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description }} </span>
                            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.description }} </span>
                            <button v-if="item.description.length > 80" @click="showAll_two = !showAll_two">
                                <span v-if="!showAll_two" style="color: blue">显示全部</span>
                                <span v-else style="color: blue">收起</span>
                            </button>
                            <h3>当前状态：{{user_state[item.state+1]}}</h3>
                            </p>
                        </v-flex>
                    </v-layout>
                </v-tab-item>

                <!--回答-->
                <v-tab-item :key="'已审核'">
                    <v-layout row wrap
                              style="margin-bottom: 2em;border-bottom: 1px #eee solid" v-for="item in users"
                              v-if="item.state===1">
                        <v-flex xs3>
                            <div style="width: 65px;height: 65px;overflow:hidden;border-radius: 50%">
                                <img :src="item.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                            </div>
                        </v-flex>
                        <v-flex xs9 @click="$router.push({name:'detail',query:{id:item.userID}})">
                            <p class="topicdetail">
                            <h3>{{item.nickname}}</h3>
                            账号简介：
                            <span v-if="!showAll_two">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description }} </span>
                            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.description }} </span>
                            <button v-if="item.description.length > 80" @click="showAll_two = !showAll_two">
                                <span v-if="!showAll_two" style="color: blue">显示全部</span>
                                <span v-else style="color: blue">收起</span>
                            </button>
                            <h3>当前状态：{{user_state[item.state+1]}}</h3>
                            </p>
                        </v-flex>
                    </v-layout>
                </v-tab-item>

                <!--专栏-->
                <v-tab-item :key="'已拒绝'">
                    <v-layout row wrap
                              style="margin-bottom: 2em;border-bottom: 1px #eee solid" v-for="item in users"
                              v-if="item.state===-1">
                        <v-flex xs3>
                            <div style="width: 65px;height: 65px;overflow:hidden;border-radius: 50%">
                                <img :src="item.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                            </div>
                        </v-flex>
                        <v-flex xs9 @click="$router.push({name:'detail',query:{id:item.userID}})">
                            <p class="topicdetail">
                            <h3>{{item.nickname}}</h3>
                            账号简介：
                            <span v-if="!showAll_two">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ item.description.length > 100 ? item.description.substring(0, 100) + '...' : item.description }} </span>
                            <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.description }} </span>
                            <button v-if="item.description.length > 80" @click="showAll_two = !showAll_two">
                                <span v-if="!showAll_two" style="color: blue">显示全部</span>
                                <span v-else style="color: blue">收起</span>
                            </button>
                            <h3>当前状态：{{user_state[item.state+1]}}</h3>
                            </p>
                        </v-flex>
                    </v-layout>
                </v-tab-item>
            </v-tabs>

        </div>
    </div>
</template>

<script>
    export default {
        name: "RequirementHistoryDetail",
        data() {
            return {
                showAll_one: false,
                showAll_two: false,
                showAll_three: false,
                data: {
                    title: '加载中...',
                    nickname: '加载中',
                    usergroup: {
                        text: '企业'
                    },
                    level: 0,
                    description: '加载...',
                    content: '加载中...',
                    read: 0,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551871818376&di=23a06b4313b4716598c3448d8803049e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3c6d55fbb2fb431690697fb32aa4462308f7d381.jpg',
                    head_portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551871796439&di=b76ea1eec37f57c40181636afbe7d303&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F69%2F80%2F595f67c2239cb_610.jpg',
                },
                comments: [],
                dialog: false,
                paid: false,
                favorite: 'favorite_border',
                state: ['被清除', '招标中', '项目开始', '项目结束'],
                sign: -2,
                users: [],
                user_state: ['被拒绝', '待审核', '已通过']
            }
        },
        methods: {
            get_demand(id) {
                this.$api.board.get_demand(id).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data;
                    }
                })
            },
            get_signed_users() {
                this.$api.enterprise.get_signed_users(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.users = res.data.data;
                    }
                })
            },
            un_refuse_signed_user(user_id) {
                this.$api.enterprise.un_refuse_signed_user(user_id, this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.get_signed_users();
                    }
                })
            },
            refuse_signed_user(user_id) {
                this.$api.enterprise.refuse_signed_user(user_id, this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.get_signed_users();
                    }
                })
            },
            confirm_signed_user(user_id) {
                this.$api.enterprise.confirm_signed_user(user_id, this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.get_signed_users();
                    }
                })
            }
        },
        mounted() {
            this.get_demand(this.$route.query.id);
            this.get_signed_users();
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

    .title_box_item {
        width: 100%;
        height: 25%;
        display: flex;
        align-items: center;
    }

    .v-chip__content {
        padding: 6px !important;
    }

    .v-rating, .v-icon {
        padding: 0 !important;
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
</style>