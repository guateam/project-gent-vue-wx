<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">文章详情</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-container grid-list-md text-xs-center>
            <v-layout row>
                <v-flex xs4 style="padding: 0;">
                    <div style="width: 100%;height: 100%">
                        <img :src="data.cover" alt=""
                             style="width: 90%;height: 150px;object-fit: cover">
                    </div>
                </v-flex>
                <v-flex xs8 style="height: 150px;text-align: left;justify-content: center;line-height: 1.5;">
                    <div class="title_box_item" style="width: 100%;height: 25%;">
                        <h2>{{data.title}}</h2>
                    </div>
                    <div class="title_box_item" style="width: 100%;height: 25%;">
                        <h3>{{data.nickname}}</h3>
                        <div style="margin-left: 5px;color:#66ccff; border: #66ccff 2px solid;padding: 1px 6px;border-radius: 25%">
                            {{data.group.text}} lv.{{data.level}}
                        </div>
                    </div>
                    <div class="title_box_item" style="width: 100%;height: 25%;padding: 0 !important;">
                        <v-rating v-model="data.rate" style="padding: 0 !important;" readonly></v-rating>
                        <h3>{{data.rate}}分</h3>
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
            <v-flex xs3
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px;border-right: 1px solid #eee;">
                <div>收藏</div>
                <div style="margin-top: 5px">{{data.collect}}</div>
            </v-flex>
            <v-flex xs3
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px;border-right: 1px solid #eee;">
                <div>点击量</div>
                <div style="margin-top: 5px">{{data.read}}</div>
            </v-flex>
            <v-flex xs3
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px;border-right: 1px solid #eee;">
                <div>综合评价</div>
                <div style="margin-top: 5px">{{data.rate}}分</div>
            </v-flex>
            <v-flex xs3
                    style="align-items: center;justify-content: space-between;flex-direction: column;text-align: center;padding-top: 10px;padding-bottom: 10px">
                <div>价格</div>
                <div style="margin-top: 5px"><span v-if="data.free!==1">￥{{data.price}}</span><span v-else
                                                                                                    style="color:tomato">免费</span>
                </div>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <div style="padding: 1em;line-height: 1.5;">
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em">文章简介</h3>
            <p class="topicdetail">
                <span v-if="!showAll_one">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.article_description.length > 80 ? data.article_description.substring(0, 80) + '...' : data.article_description }} </span>
                <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ data.article_description }} </span>
                <button id="show-all-button" v-if="data.article_description.length > 80"
                        @click="showAll_one = !showAll_one">
                    <span v-if="!showAll_one" style="color: blue">显示全部</span>
                    <span v-else style="color: blue">收起</span>
                </button>
            </p>
        </div>
        <v-divider></v-divider>
        <div style="padding: 1em;line-height: 1.5;">
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em">作者简介</h3>
            <v-layout row wrap @click="$router.push({name:'detail',query:{redirect: $route.fullPath, id:data.user_id}})">
                <v-flex xs3>
                    <div style="width: 65px;height: 65px;overflow:hidden;border-radius: 50%">
                        <img :src="data.head_portrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <p class="topicdetail">
                    <h3>{{data.nickname}}</h3>
                    作者简介：
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
        <v-divider></v-divider>
        <div style="padding: 1em;line-height: 1.5;">
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em">文章评价</h3>
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px" v-for="item in comments">
                <v-flex xs3>
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img :src="item.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div><b class="nickname">{{item.nickname}}</b><span class="board">{{item.group.text}} lv.{{item.level}}</span>
                    </div>
                    <p class="topicdetail">
                        <span>{{ item.content }} </span>
                    </p>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
        </div>
        <!--占位的盒子   STAR-->
        <v-flex xs12 style="height: 70px;background-color: white"></v-flex>
        <!--占位的盒子   END-->
        <v-container grid-list-md text-xs-center
                     style="position: fixed;bottom: 0;height: 60px;background: white;z-index: 100;width: 100%;padding:0;padding-top:5px;border-top:1px #ccc solid; align-items: center;">
            <v-layout row style="height: 100%;align-items: center;">
                <v-flex xs2
                        style="align-items: center;justify-content: space-between;flex-direction: column;border-right: 1px solid #ccc"
                        @click="collect_article()"
                >
                    <div>
                        <v-icon color="primary">{{favorite}}</v-icon>
                    </div>
                    <div style="margin-top: 5px">{{favorite==='favorite'?'已关注':'关注'}}</div>
                </v-flex>
                <v-flex xs2
                        style="align-items: center;justify-content: space-between;flex-direction: column;border-right: 1px solid #ccc"
                        @click="$router.push({name:'comment',query:{id:$route.query.id,type:2}})"
                >
                    <div>
                        <v-icon color="primary">comment</v-icon>
                    </div>
                    <div style="margin-top: 5px">评论</div>
                </v-flex>
                <v-flex xs8 style="background-color: orange;height: 100%;line-height: 48px" @click="pay_confirm()">
                    <h2 style="color: white">立即阅读<span v-if="data.free!==1 && paid===false">（￥{{data.price}}）</span>
                    </h2>
                </v-flex>
            </v-layout>
        </v-container>
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
                    你确定支付￥{{data.price}}元来购买本文章吗？
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
                            @click="pay"
                    >
                        确定
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default {
        name: "article",
        data() {
            return {
                showAll_one: false,
                showAll_two: false,
                showAll_three: false,
                data: {
                    title: '加载中',
                    nickname: '未知',
                    group: {
                        text: '未知用户组'
                    },
                    level: 0,
                    description: '加载中请稍等···',
                    article_description: '加载中请稍等···',
                    collect: 0,
                    read: 0,
                    rate: 0,
                    free: 1,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551871818376&di=23a06b4313b4716598c3448d8803049e&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F3c6d55fbb2fb431690697fb32aa4462308f7d381.jpg',
                    head_portrait: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551871796439&di=b76ea1eec37f57c40181636afbe7d303&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F01%2F69%2F80%2F595f67c2239cb_610.jpg',

                },
                comments: [],
                dialog: false,
                paid: false,
                favorite: 'favorite_border',
            }
        },
        methods: {
            get_article_info(id) {
                this.$api.article.get_article_info(id).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data;
                    }
                })
            },
            get_article_comment(id) {
                this.$api.article.get_article_comment(id).then(res => {
                    if (res.data.code === 1) {
                        this.comments = res.data.data;
                    }
                })
            },
            set_user_action() {
                this.$api.account.add_user_action(this.$route.query.id, 21);
            },
            pay() {
                this.dialog = false;
                this.$api.article.pay_article(this.$route.query.id).then(res => {
                    if (res.data.code === 1 || res.data.code === 2) {
                        this.$router.push({name: 'article-read', query: {id: this.$route.query.id}})
                    }
                })
            },
            pay_confirm() {
                if (this.paid === false && this.data.free !== 1) {
                    this.dialog = true;
                } else {
                    this.$router.push({name: 'article-read', query: {id: this.$route.query.id}})
                }
            },
            get_paid(id) {
                this.$api.article.get_paid(id).then(res => {
                    if (res.data.code === 1) {
                        this.paid = true;
                    }
                })
            },
            collect_article() {
                if (this.favorite === 'favorite_border') {
                    this.$api.article.collect_article(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.favorite = 'favorite'
                        }
                    })
                } else {
                    this.$api.article.un_collect_article(this.$route.query.id).then(res => {
                        if (res.data.code === 1) {
                            this.favorite = 'favorite_border'
                        }
                    })
                }
            },
            get_article_collect_state(id) {
                this.$api.article.get_article_collect_state(id).then(res => {
                    if (res.data.code === 1) {
                        this.favorite = 'favorite'
                    }
                })
            }
        },
        mounted() {
            this.get_article_info(this.$route.query.id);
            this.get_article_comment(this.$route.query.id);
            this.set_user_action();
            this.get_paid(this.$route.query.id);
            this.get_article_collect_state(this.$route.query.id);
        }
    }
</script>

<style scoped>
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
