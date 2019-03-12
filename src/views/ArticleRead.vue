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
        <v-flex xs12 style="height: 200px;overflow: hidden">
            <img :src="data.cover" alt="" style="height: 100%;
width: 100%;object-fit: cover">
        </v-flex>
        <v-layout row wrap style="height:70px">
            <v-flex xs2 style="padding-top: 10px" @click="$router.push({name:'detail',query:{id:data.user_id}})">
                <div style="height: 50px;width: 50px;border-radius: 50%;overflow:hidden;margin: 0 auto;">
                    <img :src="data.head_portrait" alt="" style="width: 100%;height: 100%;">
                </div>
            </v-flex>
            <v-flex xs7
                    style="flex-direction: column;justify-content: space-between;line-height: 27px;padding-top: 10px; " @click="$router.push({name:'detail',query:{id:data.user_id}})">
                <div><h3>{{data.nickname}}</h3></div>
                <div>{{data.description}}</div>
            </v-flex>
            <v-flex xs3 style="align-items: center;display: flex;line-height: 1.5">
                <div :class="{unfollow:!follow,follow:follow}" @click="follow_user()"><h3>{{follow?'已关注':'关注作者'}}</h3>
                </div>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-flex xs12 style="line-height: 1.5;padding: 1em;">
            <h1>{{data.title}}</h1>
            <h3>来自作者：<span style="color: blue">{{data.nickname}}</span></h3>
            <br>
            <p v-html="data.content.replace(/\n/g, '<br>')"></p>
        </v-flex>
        <v-footer class="pa-3" style="padding-right: 1em;background-color: transparent;text-align: right">
            <v-spacer></v-spacer>
            <div>编辑于{{data.edit_time}} <br> 著作权归作者所有，未经授权禁止转载</div>
        </v-footer>
        <div style="padding: 1em;line-height: 1.5;">
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em">文章评价</h3>
            <v-layout row wrap style="padding-bottom: 10px;margin-top: 10px" v-for="(value,i) in comments" v-if="i<5">
                <v-flex xs3>
                    <div style="width: 55px;height: 55px;overflow:hidden;border-radius: 50%">
                        <img :src="value.headportrait" alt="" style="width: 100%;
height: 100%;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs9>
                    <div style="display: flex;align-items: center;"><b class="nickname">{{value.nickname}}</b><span
                            class="board">{{value.group.text}}lv.{{value.level}}</span>
                    </div>
                    <p class="topicdetail">
                        <span>{{value.content}}</span>
                    </p>
                </v-flex>
            </v-layout>
            <h3 style="margin-bottom: 1.1em;font-size: 1.2em;padding-left: 25%" v-if="comments.length>=5">查看全部</h3>
        </div>
        <!--占位的盒子   STAR-->
        <v-flex xs12 style="height: 60px;background-color: white"></v-flex>
        <!--占位的盒子   END-->
        <div class="chatinput">
            <div class="box">
                <input type="text" class="chat" placeholder="评论" autofocus v-model="word">
                <!--<span class="iconfont emoji-icon">collections</span>-->
                <button :class="word?'enSend':'disSend'" :disabled="!word" @click="send">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "article-read",
        data() {
            return {
                word: '',
                data: {
                    content: '<h3><v-progress-circular indeterminate color="primary"></v-progress-circular><span style="margin-left: 1em">加载中</span></h3>'
                },
                comments: [],
                follow: false
            }
        },
        methods: {
            send() {
                this.$api.article.add_article_comment(this.$route.query.id, this.word).then(res => {
                    if (res.data.code === 1) {
                        this.word = '';
                        this.get_article_comment(this.$route.query.id)
                    }
                });
            },
            get_article(id) {
                this.$api.article.get_article(id).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data;
                        this.$api.account.get_user_follow_state(this.data.user_id).then(res => {
                            if (res.data.code === 1) {
                                this.follow = true;
                            }
                        })
                    }
                })
            },
            follow_user() {
                if (this.follow) {
                    this.$api.account.un_follow_user(this.data.user_id).then(res => {
                        if (res.data.code === 1) {
                            this.follow = false
                        }
                    })
                } else {
                    this.$api.account.follow_user(this.data.user_id).then(res => {
                        if (res.data.code === 1) {
                            this.follow = true
                        }
                    })
                }
            },
            get_article_comment(id) {
                this.$api.article.get_article_comment(id).then(res => {
                    if (res.data.code === 1) {
                        this.comments = res.data.data;
                    }
                })
            },
        },
        mounted() {
            this.get_article(this.$route.query.id);
            this.get_article_comment(this.$route.query.id);
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

    .unfollow {
        border: 1px #ffcc00 solid;
        padding: 6px;
        border-radius: 3px;
        color: orange;
    }

    .follow {
        border: 1px #ffcc00 solid;
        padding: 6px;
        border-radius: 3px;
        color: white;
        background: #ffcc00;
    }
</style>
