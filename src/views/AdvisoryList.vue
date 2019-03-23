<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'topic'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">咨询管理</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">

            </div>
        </div>
        <div class="line"></div>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap style="height: 200px;margin: 5px auto;background-color: white" v-for="value in data">
                <v-flex xs12>
                    <h2 style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;text-align: left">
                        {{value.content}}</h2>
                </v-flex>
                <v-flex xs8 style="text-align: left">
                    <v-flex xs12 style="height: 25%"><h4>咨询人：<span style="color: lightskyblue">{{value.nickname}}</span><span
                            style="padding: 0.2em;border: 1px solid #ffcc00;color: #ffcc00;margin-left: 0.5em">{{value.usergroup.text}}</span>
                    </h4></v-flex>
                    <v-flex xs12 style="height: 25%"><h4>咨询费用：<span style="color: lightskyblue">{{value.price}}</span>
                    </h4>
                    </v-flex>
                    <v-flex xs12 style="height: 25%"><h4>咨询时间：<span style="color: lightskyblue">{{value.time}}</span>
                    </h4></v-flex>
                    <v-flex xs12 style="height: 25%" v-if="value.state===0"><h4>剩余时间：<span style="color: lightskyblue">{{value.expire}}</span>
                    </h4>
                    </v-flex>
                    <v-flex xs12 style="height: 25%" v-if="value.state===1">
                        <h4>状态：
                            <span style="color: lawngreen">已回答</span>
                        </h4>
                    </v-flex>
                    <v-flex xs12 style="height: 25%" v-if="value.state===-1">
                        <h4>状态：
                            <span style="color: tomato">已拒绝</span>
                        </h4>
                    </v-flex>
                </v-flex>
                <v-flex xs4 style=" display: flex;justify-content: flex-end;align-items: flex-end;">
                    <div style="width: 100%;margin-bottom: 2em">
                        <v-btn color="error" v-if="value.state===0 && value.expire!=='已过期'"
                               @click="refuse(value.orderID)">拒绝回答
                        </v-btn>
                        <v-btn color="info" @click="$router.push({name:'advisory-detail',query:{id:value.orderID}})">
                            查看详情
                        </v-btn>
                    </div>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <div v-if="busy" class="load-more-normal">
                <h3>
                    <v-progress-circular
                            indeterminate
                            color="primary"
                    ></v-progress-circular>
                    <span style="margin-left: 1em">加载中</span></h3>
            </div>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "advisory-list",
        data() {
            return {
                busy: false,
                data: []
            }
        },
        methods: {
            get_order_list() {
                this.$api.specialist.get_order_list().then(res => {
                    if (res.data.code === 1) {
                        res.data.data.forEach(value => {
                            value['expire'] = this.get_date(value['time']);
                            value['content'] = value['content'].replace(/<[^>]+>/g, '');
                        });
                        this.data = res.data.data;
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
                    return old.getFullYear() + '-' + old.getMonth() + '-' + (old.getDay() + 1) + ' ' + old.getHours() + ':' + old.getMinutes();
                }
            },
            refuse(order_id) {
                this.$api.specialist.refuse_order(order_id).then(res => {
                    if (res.data.code === 1) {
                        this.$store.commit('showInfo', '已成功拒绝');
                        this.get_order_list();
                    }
                })
            }
        },
        mounted() {
            this.get_order_list();
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

    .load-more-normal {
        text-align: center;
        height: 60px;
        line-height: 60px;
    }
</style>
