<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">咨询详情</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-flex xs12 style="height: 200px;overflow: hidden" v-if="data.image.length!==0">
            <img :src="data.img" alt="" style="height: 100%;
width: 100%;object-fit: cover">
        </v-flex>
        <v-layout row wrap style="height:70px">
            <v-flex xs2 style="padding-top: 10px" @click="$router.push({name:'detail',query:{id:data.userID}})">
                <div style="height: 50px;width: 50px;border-radius: 50%;overflow:hidden;margin: 0 auto;">
                    <img :src="data.user_head_portrait" alt="" style="width: 100%;height: 100%;">
                </div>
            </v-flex>
            <v-flex xs7
                    style="flex-direction: column;justify-content: space-between;line-height: 27px;padding-top: 10px; "
                    @click="$router.push({name:'detail',query:{id:data.userID}})">
                <div><h3>{{data.user_nickname}}</h3></div>
                <div>{{data.user_description}}</div>
            </v-flex>
            <v-flex xs3 style="justify-content: center;align-items: center;display: flex;line-height: 1.5">
                <div :class="{unfollow:!follow,follow:follow}" @click="follow_user()"><h3>{{follow?'已关注':'关注'}}</h3>
                </div>
            </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-flex xs12 style="line-height: 1.5;padding: 1em;">
            <p style="word-wrap:break-word ;" v-html="data.content"></p>
        </v-flex>
        <v-footer class="pa-3" style="padding-right: 1em;background-color: transparent;text-align: right">
            <v-spacer></v-spacer>
            <div>咨询于 <span style="color: #409eff">{{data.time}}</span> <br> 截至时间 <span style="color: #409eff">{{data.expire_date}}</span>
                <br> 剩余时间：<span style="color: red">{{data.expire}}</span></div>
        </v-footer>
        <div style="width: 100%;margin-top: 1em;" v-if="data.answer">
            <h2 style="margin-left: 1em;">回答</h2>
            <v-flex xs12 style="line-height: 1.5;padding: 1em;">
                <p style="word-wrap:break-word ;" v-html="data.answer"></p>
            </v-flex>
        </div>
        <div style="height: 90px"></div>
        <div style="position: fixed;bottom: 0;width: 100%;background-color: white;z-index: 100;height: 50px" v-if="!self">
            <ButtonGroup
                    style="width: 100%;height: 50px;">
                <Button type="error" style="height: 50px;width: 50%" @click="refuse"
                        :disabled="data.expire==='已过期'||data.state!==0">拒绝回答
                </Button>
                <Button type="warning" style="height: 50px;width: 50%;"
                        :disabled="data.expire==='已过期'||data.state!==0"
                        @click="$router.push({name:'advisory-answer',query:{id:$route.query.id}})"
                >立即回答
                </Button>
            </ButtonGroup>
            <!--<v-btn style="height: 50px" block color="#ffcc00"-->
            <!--@click="$router.push({name:'advisory-answer',query:{id:$route.query.id}})"-->
            <!--:disabled="data.expire==='已过期'||data.state!==0">立即回答-->
            <!--</v-btn>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "advisory-detail",
        data() {
            return {
                word: '',
                data: {
                    content: '<h3><v-progress-circular indeterminate color="primary"></v-progress-circular><span style="margin-left: 1em">加载中</span></h3>',
                    userID: '',
                    image: [],
                    img: '',
                    answer: '',
                    user_head_portrait: '',
                    state: '',
                    expire: '',
                    time: '',
                    expire_date: ''
                },
                comments: [],
                follow: false,
                self:false,
            }
        },
        methods: {
            follow_user() {
                if (this.follow) {
                    this.$api.account.un_follow_user(this.data.userID).then(res => {
                        if (res.data.code === 1) {
                            this.follow = false;
                            this.$store.state.userInfo.follow--;
                        }
                    })
                } else {
                    this.$api.account.follow_user(this.data.userID).then(res => {
                        if (res.data.code === 1) {
                            this.follow = true;
                            this.$store.state.userInfo.follow++;
                        }
                    })
                }
            },
            get_follow_state() {
                this.$api.account.get_user_follow_state(this.data.userID).then(res => {
                    if (res.data.code === 1) {
                        this.follow = true
                    }
                })
            },
            get_order() {
                this.$api.specialist.get_order(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.data = res.data.data;
                        this.data['expire'] = this.get_date(this.data.time);
                        this.data['expire_date'] = this.get_expire_date(this.data.time);
                        if (this.data['image'].length >= 1) {
                            this.data['img'] = this.data['image'][0].split('src="')[1].split('"')[0];
                        }
                        this.self=this.data.userID==this.$store.state.userInfo.user_id;
                    }
                })
            },
            get_date(date) {
                let old = new Date(date);
                let now = new Date();
                let time = old.getTime() + 24 * 60 * 60 * 1000 - now.getTime();
                if (time < 0) {
                    return '已过期'
                } else if (time < 60 * 1000) {
                    return "即将过期"
                } else if (time > 60 * 1000 && time < 60 * 60 * 1000) {
                    return Math.round(time / 60 / 1000) + '分钟后'
                } else if (time > 60 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
                    return Math.round(time / 60 / 60 / 1000) + '小时后'
                } else if (time > 24 * 60 * 60 * 1000 && time < 10 * 60 * 60 * 1000) {
                    return Math.round(time / 24 / 60 / 60 / 1000) + '天后'
                } else {
                    return old.getFullYear() + '-' + (old.getMonth() + 1) + '-' + (old.getDay() + 1) + ' ' + old.getHours() + ':' + old.getMinutes();
                }
            },
            get_expire_date(date) {
                let time = new Date(date);
                time = new Date(time.getTime() + 24 * 60 * 60 * 1000);
                return time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + (time.getDate()) + ' ' + time.getHours() + ':' + time.getMinutes();
            },
            refuse() {
                this.$api.specialist.refuse_order(this.$route.query.id).then(res => {
                    if (res.data.code === 1) {
                        this.$store.commit('showInfo', '已成功拒绝');
                        this.get_order();
                    }
                })
            }
        },
        mounted() {
            this.get_follow_state();
            this.get_order();
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
<style>
    img {
        max-width: 100%;
        object-fit: cover;
    }
</style>
