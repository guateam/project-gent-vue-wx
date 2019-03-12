<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'topic'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">企业中心</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <Scroll :data="items" style="z-index: 200">
            <v-flex xs12>
                <v-carousel hide-delimiters height="200px">
                    <v-carousel-item
                            v-for="(item,i) in items"
                            :key="i"
                            :src="item.src"
                    >
                        <span class="banner">{{item.title}}</span>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
            <v-layout row wrap style="line-height: 1.5;height: 40px;align-items: center;justify-content: center;margin-top: 2em;">
                <v-flex xs11 style="margin-left: 2em">
                    <h2>功能模块</h2>
                </v-flex>
            </v-layout>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs4 style="align-items: center;justify-content: space-between;flex-direction: column" @click="$router.push({name:'requirement-publish'})">
                        <div>
                            <v-icon large color="#99FF00">event_note</v-icon>
                        </div>
                        <div style="margin-top: 5px">发布需求</div>
                    </v-flex>
                    <v-flex xs4 style="align-items: center;justify-content: space-between;flex-direction: column" @click="$router.push({name:'requirement-check'})">
                        <div>
                            <v-icon large color="#99FFFF">library_books</v-icon>
                        </div>
                        <div style="margin-top: 5px">需求审核</div>
                    </v-flex>
                    <v-flex xs4 style="align-items: center;justify-content: space-between;flex-direction: column" @click="$router.push({name:'requirement-history'})">
                        <div>
                            <v-icon large color="#CC66CC">question_answer</v-icon>
                        </div>
                        <div style="margin-top: 5px">历史发布</div>
                    </v-flex>
                </v-layout>
                <!--<v-layout row wrap style="margin-top: 2em">-->
                    <!--<v-flex xs4 style="align-items: center;justify-content: space-between;flex-direction: column">-->
                        <!--<div>-->
                            <!--<v-icon large color="#FFFF33">access_time</v-icon>-->
                        <!--</div>-->
                        <!--<div style="margin-top: 5px">群组管理</div>-->
                    <!--</v-flex>-->
                    <!--<v-flex xs4 style="align-items: center;justify-content: space-between;flex-direction: column">-->
                        <!--<div>-->
                            <!--<v-icon large color="#6699FF">-->
                                <!--account_balance_wallet-->
                            <!--</v-icon>-->
                        <!--</div>-->
                        <!--<div style="margin-top: 5px">广告投放</div>-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
            </v-container>
            <!--<v-divider></v-divider>-->
            <!--<v-layout row wrap style="line-height: 1.5;height: 40px;align-items: center;justify-content: center;">-->
                <!--<v-flex xs2 style="text-align: center">-->
                    <!--<v-icon color="#FF0066">volume_up</v-icon>-->
                <!--</v-flex>-->
                <!--<v-flex xs9>-->
                    <!--<h3>你有一份新的重要通知待查看</h3>-->
                <!--</v-flex>-->
                <!--<v-flex xs1>-->
                    <!--<v-icon color="black">chevron_right</v-icon>-->
                <!--</v-flex>-->
            <!--</v-layout>-->
            <!--<v-divider></v-divider>-->
            <!--<v-layout row wrap style="line-height: 1.5;height: 40px;align-items: center;justify-content: center;">-->
                <!--<v-flex xs11>-->
                    <!--<h3>数据中心</h3>-->
                <!--</v-flex>-->
                <!--<v-flex xs1>-->
                    <!--<v-icon color="black">chevron_right</v-icon>-->
                <!--</v-flex>-->
            <!--</v-layout>-->
            <!--<v-container grid-list-md text-xs-center>-->
                <!--<v-layout row wrap>-->
                    <!--<v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">-->
                        <!--<div style="margin-top: 5px">粉丝</div>-->
                        <!--<div style="margin-top: 5px">24369</div>-->
                        <!--<div style="margin-top: 5px;color: #FF0033">-->
                            <!--<v-icon large color="#FF0033" small>-->
                                <!--keyboard_arrow_up-->
                            <!--</v-icon>-->
                            <!--366-->
                        <!--</div>-->
                    <!--</v-flex>-->
                    <!--<v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">-->
                        <!--<div style="margin-top: 5px">需求发布</div>-->
                        <!--<div style="margin-top: 5px">5465465</div>-->
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                            <!--<v-icon large color="#99FF00" small>-->
                                <!--keyboard_arrow_down-->
                            <!--</v-icon>-->
                            <!--366-->
                        <!--</div>-->
                    <!--</v-flex>-->
                    <!--<v-flex xs4 style="align-items: center;flex-direction: column">-->
                        <!--<div style="margin-top: 5px">需求浏览</div>-->
                        <!--<div style="margin-top: 5px">54655</div>-->
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                            <!--<v-icon large color="#99FF00" small>-->
                                <!--keyboard_arrow_down-->
                            <!--</v-icon>-->
                            <!--5566-->
                        <!--</div>-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
                <!--<v-divider></v-divider>-->
                <!--<v-layout row wrap>-->
                    <!--<v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">-->
                        <!--<div style="margin-top: 5px">被关注数</div>-->
                        <!--<div style="margin-top: 5px">24369</div>-->
                        <!--<div style="margin-top: 5px;color: #FF0033">-->
                            <!--<v-icon large color="#FF0033" small>-->
                                <!--keyboard_arrow_up-->
                            <!--</v-icon>-->
                            <!--366-->
                        <!--</div>-->
                    <!--</v-flex>-->
                    <!--<v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">-->
                        <!--<div style="margin-top: 5px">达成交易</div>-->
                        <!--<div style="margin-top: 5px">5465465</div>-->
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                            <!--<v-icon large color="#99FF00" small>-->
                                <!--keyboard_arrow_down-->
                            <!--</v-icon>-->
                            <!--366-->
                        <!--</div>-->
                    <!--</v-flex>-->
                    <!--<v-flex xs4 style="align-items: center;flex-direction: column">-->
                        <!--<div style="margin-top: 5px">想不到了</div>-->
                        <!--<div style="margin-top: 5px">54655</div>-->
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                            <!--<v-icon large color="#99FF00" small>-->
                                <!--keyboard_arrow_down-->
                            <!--</v-icon>-->
                            <!--5566-->
                        <!--</div>-->
                    <!--</v-flex>-->
                <!--</v-layout>-->
            <!--</v-container>-->
        </Scroll>
    </div>
</template>

<script>
    import Scroll from '../components/Scroll'

    export default {
        name: "corporate-center",
        components: {
            Scroll
        },
        data() {
            return {
                bottomNav: 0,
                items: [
                    {
                        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551793082170&di=a969802b6be72df8065f08348913985c&imgtype=0&src=http%3A%2F%2Fwww.3d2000.com%2Fwp-content%2Fuploads%2F2016%2F05%2F294194-7268075d6ad931da.gif',
                        title: '加载中···'
                    }
                ]
            }
        },
        methods: {
            get_activities() {
                this.$api.activities.get_activities(4).then(res => {
                    if (res.data.code === 1) {
                        let data = [];
                        res.data.data.forEach(value => {
                            data.push({
                                title: value['title'],
                                src: value['cover'],
                                url: value['url']
                            })
                        });
                        this.items = data;
                    }
                })
            },
        },
        mounted() {
            this.get_activities();
        }
    }
</script>

<style scoped>

    .bigbox {
    }

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

    .banner {
        position: absolute;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 1.3em;
        color: rgba(255, 255, 255, 0.9);
    }
</style>
