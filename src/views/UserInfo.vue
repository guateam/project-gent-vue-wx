<template>
    <div class="user-info">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>{{ title }}</span>
            </v-toolbar-title>

            <v-btn :to="{name: 'settings', query: {redirect: this.$route.fullPath}}" icon>
                <v-icon>settings</v-icon>
            </v-btn>
        </v-toolbar>
        <v-card color="primary" flat>
            <v-container>
                <v-layout align-center>
                    <v-flex offset-xs1 grow>
                        <v-layout align-center>
                            <v-flex shrink>
                                <v-avatar id="avatar" size="70" @click="$router.push({name:'detail',query:{id:$store.state.userInfo.user_id}})">
                                    <img :src="$store.state.userInfo.head_portrait" alt="">
                                </v-avatar>
                            </v-flex><!--头像-->

                            <v-flex offset-xs1>
                                <v-layout align-end>
                                    <v-flex shrink>
                                        <span id="nickname">{{ $store.state.userInfo.nickname }}</span>
                                    </v-flex>
                                    <v-flex shrink>
                                        <v-chip id="group" outline disabled color="black" small>{{
                                            $store.state.userInfo.group.text }}
                                        </v-chip>
                                    </v-flex>
                                </v-layout>
                                <v-layout align-center>
                                    <v-flex shrink>
                                        <span id="level"
                                              class="font-weight-bold">Lv.{{ $store.state.userInfo.level }}</span>
                                    </v-flex>
                                    <v-flex xs6 offset-xs1>
                                        <v-progress-linear id="exp" height="16" color="progress"
                                                           background-color="secondary"
                                                           v-model="$store.state.userInfo.exp.percent"></v-progress-linear>
                                    </v-flex>
                                </v-layout>
                            </v-flex><!--昵称&用户组&等级-->
                        </v-layout>
                    </v-flex>

                    <v-flex xs1>
                        <v-btn icon small :to="{name:'user-detail'}">
                            <v-icon>keyboard_arrow_right</v-icon>
                        </v-btn>
                    </v-flex><!-- 按钮 -->
                </v-layout>

            </v-container>
        </v-card><!--个人信息-->

        <v-card height="25px" color="primary" flat></v-card><!--占位用-->

        <v-layout justify-center>
            <v-card id="float-card" width="80%" height="50px">
                <v-container fill-height>
                    <v-layout class="text-xs-center" align-center>
                        <v-flex xs6 @click="fan_list(0)">
                            <v-layout justify-space-between align-center>
                                <v-flex shrink offset-xs1>
                                    <span class="font--text">关注</span>
                                </v-flex>
                                <v-flex grow>
                                    <span class="font-weight-bold number">{{ $store.state.userInfo.follow }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-divider vertical></v-divider>
                        <v-flex xs6 @click="fan_list(1)">
                            <v-layout justify-space-between align-center>
                                <v-flex shrink offset-xs1>
                                    <span class="font--text">粉丝</span>
                                </v-flex>
                                <v-flex grow>
                                    <span class="font-weight-bold number">{{ $store.state.userInfo.fans }}</span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-layout><!--浮动卡片 关注&粉丝-->

        <v-card id="bottom-card" height="75px" flat></v-card><!--占位用-->

        <v-divider></v-divider>
        <v-card flat>
            <div id="list">
                <v-list>
                    <!--<v-list-tile @click="jump_qr_code()">-->
                    <!--<v-list-tile-action>-->
                    <!--<v-icon class="time&#45;&#45;text">crop_free</v-icon>-->
                    <!--</v-list-tile-action>-->
                    <!--<v-list-tile-title>-->
                    <!--<v-layout justify-space-between>-->
                    <!--<span>我的二维码</span>-->
                    <!--<v-icon>keyboard_arrow_right</v-icon>-->
                    <!--</v-layout>-->
                    <!--</v-list-tile-title>-->
                    <!--</v-list-tile>-->

                    <!--<v-divider></v-divider>-->

                    <v-list-tile @click="$router.push({name:'historical-post'})">
                        <v-list-tile-action>
                            <v-icon class="time--text">description</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            <v-layout justify-space-between>
                                <span>我发布的</span>
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-layout>
                        </v-list-tile-title>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile @click="$router.push({name:'wallet', query: {redirect: $route.fullPath}})">
                        <v-list-tile-action>
                            <v-icon class="time--text">account_balance_wallet</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            <v-layout justify-space-between>
                                <span>我的钱包</span>
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-layout>
                        </v-list-tile-title>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile :to="{name: 'exp-detail', query: {redirect: $route.fullPath}}">
                        <v-list-tile-action>
                            <v-icon class="time--text">trending_up</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            <v-layout justify-space-between>
                                <span>积分等级</span>
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-layout>
                        </v-list-tile-title>
                    </v-list-tile>

                    <v-divider></v-divider>

                    <v-list-tile>
                        <v-list-tile-action>
                            <v-icon class="time--text">attach_money</v-icon>
                        </v-list-tile-action>
                        <v-list-tile-title>
                            <v-layout justify-space-between>
                                <span>某币充值</span>
                                <v-icon>keyboard_arrow_right</v-icon>
                            </v-layout>
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </div>
        </v-card><!--功能列表-->
        <v-divider></v-divider>

    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        methods: {
            fan_list(active) {
                this.$router.push({name: 'fan-list', query: {active: active}});
            },
            jump_qr_code() {
                this.$router.push({name: 'qr-code', query: {text: 'uid://' + this.$store.state.userInfo.user_id}})
            }
        },
        mounted() {
            this.$emit('changeTitle', '');
        },
    }
</script>

<style scoped>
    #avatar {
        border: 10px;
    }

    #nickname {
        font-weight: 700;
        font-size: 17px;
    }

    #group {
        height: 17px;
        font-size: 12px;
    }

    #level {
        letter-spacing: 1px;
    }

    #exp {
        border-radius: 20px;
    }

    /*浮动卡片定位和圆角*/
    #float-card {
        margin: -25px 0;
        border-radius: 12px;
    }

    .number {
        font-size: 18px;
    }

    /*调整底部占位卡片到下方*/
    #bottom-card {
        z-index: -1;
    }
</style>
