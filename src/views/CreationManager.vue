<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'topic'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">创作中心</span>
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
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs3 style="align-items: center;justify-content: space-between;flex-direction: column"
                            @click="$router.push({name:'historical-post'})">
                        <div>
                            <v-icon large color="white" style="background-color:rgb(76,175,80); padding:7px;   border-radius:50px">event_note</v-icon>
                        </div>
                        <div style="margin-top: 5px">回答管理</div>
                    </v-flex>
                    <v-flex xs3 style="align-items: center;justify-content: space-between;flex-direction: column"
                            @click="$router.push({name:'historical-post'})">
                        <div>
                            <v-icon large color="white" style="background-color:#FF7F00; padding:7px; border-radius:50px">library_books</v-icon>
                        </div>
                        <div style="margin-top: 5px">文章管理</div>
                    </v-flex>
                    <v-flex xs3 style="align-items: center;justify-content: space-between;flex-direction: column"
                            @click="$router.push({name: 'fan-list', query: {active: 1}})">
                        <div>
                            <v-icon large color="white" style="background-color:#B0C4DE; padding:7px; border-radius:50px">people</v-icon>
                        </div>
                        <div style="margin-top: 5px">粉丝管理</div>
                    </v-flex>
                    <v-flex xs3 style="align-items: center;justify-content: space-between;flex-direction: column"
                            @click="$router.push({name: 'message'})">
                        <div>
                            <v-icon large color="white" style="background-color:#9F79EE; padding:7px; border-radius:50px">question_answer</v-icon>
                        </div>
                        <div style="margin-top: 5px">互动管理</div>
                    </v-flex>
                </v-layout>
                <v-layout row wrap>
                    <v-flex xs3 style="align-items: center;justify-content: space-between;flex-direction: column" @click="$router.push({name:'advisory-list'})">
                        <div>
                            <v-icon large color="white" style="background-color:#FF6347; padding:7px; border-radius:50px">watch_later</v-icon>
                        </div>
                        <div style="margin-top: 5px">咨询管理</div>
                    </v-flex>
                    <v-flex xs3 style="align-items: center;justify-content: space-between;flex-direction: column">
                        <div>
                            <v-icon large color="white"
                                    @click="$router.push({name:'wallet', query: {redirect: $route.fullPath}})" style="background-color:rgb(130,177,255); padding:7px; border-radius:50px">
                                account_balance_wallet 
                            </v-icon>
                        </div>
                        <div style="margin-top: 5px">创作收益</div>
                    </v-flex>
                </v-layout>
            </v-container>
            <v-divider></v-divider>
            <!--<v-layout row wrap style="line-height: 1.5;height: 40px;align-items: center;justify-content: center;">-->
            <!--<v-flex xs2 style="text-align: center">-->
            <!--<v-icon color="#FF0066">volume_up</v-icon>-->
            <!--</v-flex>-->
            <!--<v-flex xs9>-->
            <!--<h3>你有一份新的收益周报待查看</h3>-->
            <!--</v-flex>-->
            <!--<v-flex xs1>-->
            <!--<v-icon color="black">chevron_right</v-icon>-->
            <!--</v-flex>-->
            <!--</v-layout>-->
            <!--<v-divider></v-divider>-->
            <v-layout row wrap style="line-height: 1.5;height: 40px;align-items: center;justify-content: center;">
                <v-flex xs11>
                    <h2 style="margin-left: 1em">数据中心</h2>
                </v-flex>
                <!--<v-flex xs1>-->
                <!--<v-icon color="black">chevron_right</v-icon>-->
                <!--</v-flex>-->
            </v-layout>
            <v-container grid-list-md text-xs-center>
                <v-layout row wrap>
                    <v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">
                        <div style="margin-top: 5px;font-weight:600;font-size:1.5em;">{{click.fan}}</div>
                        <div style="margin-top: 5px;" >粉丝</div>
                        <!--<div style="margin-top: 5px;color: #FF0033">-->
                        <!--<v-icon large color="#FF0033" small>-->
                        <!--keyboard_arrow_up-->
                        <!--</v-icon>-->
                        <!--366-->
                        <!--</div>-->
                    </v-flex>
                    <v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">
                        <div style="margin-top: 5px;font-weight:600;font-size:1.5em;">{{click.answer_read}}</div>
                        <div style="margin-top: 5px">回答浏览</div>
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                        <!--<v-icon large color="#99FF00" small>-->
                        <!--keyboard_arrow_down-->
                        <!--</v-icon>-->
                        <!--366-->
                        <!--</div>-->
                    </v-flex>
                    <v-flex xs4 style="align-items: center;flex-direction: column">
                        <div style="margin-top: 5px;font-weight:600;font-size:1.5em;">{{click.article_read}}</div>
                        <div style="margin-top: 5px">文章阅读</div>
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                        <!--<v-icon large color="#99FF00" small>-->
                        <!--keyboard_arrow_down-->
                        <!--</v-icon>-->
                        <!--5566-->
                        <!--</div>-->
                    </v-flex>
                </v-layout>
                <v-divider></v-divider>
                <v-layout row wrap>
                    <v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">
                        <div style="margin-top: 5px;font-weight:600;font-size:1.5em;">{{click.agree}}</div>
                        <div style="margin-top: 5px">点赞</div>
                        <!--<div style="margin-top: 5px;color: #FF0033">-->
                        <!--<v-icon large color="#FF0033" small>-->
                        <!--keyboard_arrow_up-->
                        <!--</v-icon>-->
                        <!--366-->
                        <!--</div>-->
                    </v-flex>
                    <v-flex xs4 style="align-items: center;flex-direction: column;border-right: 1px solid #eee">
                        <div style="margin-top: 5px;font-weight:600;font-size:1.5em;">{{click.collect}}</div>
                        <div style="margin-top: 5px">收藏</div>
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                        <!--<v-icon large color="#99FF00" small>-->
                        <!--keyboard_arrow_down-->
                        <!--</v-icon>-->
                        <!--366-->
                        <!--</div>-->
                    </v-flex>
                    <v-flex xs4 style="align-items: center;flex-direction: column">
                        <div style="margin-top: 5px;font-weight:600;font-size:1.5em;">{{click.pay}}</div>
                        <div style="margin-top: 5px">收入</div>
                        <!--<div style="margin-top: 5px;color: #99FF00">-->
                        <!--<v-icon large color="#99FF00" small>-->
                        <!--keyboard_arrow_down-->
                        <!--</v-icon>-->
                        <!--5566-->
                        <!--</div>-->
                    </v-flex>
                </v-layout>
            </v-container>
        </Scroll>
    </div>
</template>

<script>
    import Scroll from '../components/Scroll'

    export default {
        name: "creation-manager",
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
                ],
                click: {
                    article_read: 0,
                    answer_read: 0,
                    fan: 0,
                    pay: 0,
                    collect: 0,
                    agree: 0,
                }
            }
        },
        methods: {
            get_activities() {
                this.$api.activities.get_activities(3).then(res => {
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
            get_click_info() {
                this.$api.specialist.get_click_info().then(res => {
                    if (res.data.code === 1) {
                        this.click = res.data.data;
                    }
                })
            }
        },
        mounted() {
            this.get_activities();
            this.get_click_info();
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

    .banner {
        position: absolute;
        bottom: 0;
        width: 100%;
        height:30px;
        padding-top: 3px;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 1.3em;
        color: rgba(255, 255, 255, 0.9);
    }
</style>
