<template>
    <div class="navigation-drawer" style="z-index: 999">
        <div id="head-container" class="primary">
            <v-layout justify-space-between align-start>
                <v-flex shrink>
                    <v-avatar id="avatar" size="80">
                        <img @click="$router.push({name: 'account'})" :src="$store.state.userInfo.head_portrait" alt="">
                    </v-avatar><!--头像-->
                </v-flex>
                <v-flex shrink>
                    <div id="button-group">
                        <v-btn id="wallet" outline fab small color="secondary"
                               @click="$router.push({name:'wallet', query: {redirect: $route.fullPath}})">
                            <v-icon>account_balance_wallet</v-icon>
                        </v-btn>
                        <!--<v-btn id="camera" outline fab small color="secondary">-->
                        <!--<v-icon>photo_camera</v-icon>-->
                        <!--</v-btn>-->
                    </div>
                </v-flex><!--按钮组-->
            </v-layout>

            <div id="info-container" v-if="$store.state.token">
                <v-layout>
                    <span id="nickname">{{ $store.state.userInfo.nickname }}</span>
                    <v-chip id="group" color="secondary" text-color="font" small disabled>{{
                        $store.state.userInfo.group.text }}
                    </v-chip>
                </v-layout><!--昵称&用户组-->

                <v-layout class="text-xs-center primary" align-center>
          <span>
            <span id="level" class="orange lighten-1 secondary--text font-weight-bold">Lv{{ $store.state.userInfo.level }}</span>
          </span>
                    <v-flex xs7><!--xs(1-12)代表经验条长度-->
                        <v-progress-linear id="exp" color="secondary"
                                           v-model="$store.state.userInfo.exp.percent"></v-progress-linear>
                    </v-flex>
                </v-layout>
            </div><!--未登录时不显示部分-->
        </div>

        <v-layout v-if="$store.state.token" id="fans_container">
            <v-flex xs4 @click="$router.push('/account/historical-post')">
                <v-layout class="text-xs-center">
                    <v-flex class="font-weight-bold">{{ $store.state.userInfo.answer }}</v-flex>
                </v-layout>
                <v-layout class="text-xs-center font--text">
                    <v-flex>回答</v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs4 @click="fan_list(0)">
                <v-layout class="text-xs-center">
                    <v-flex class="font-weight-bold">{{ $store.state.userInfo.follow }}</v-flex>
                </v-layout>
                <v-layout class="text-xs-center font--text">
                    <v-flex>关注</v-flex>
                </v-layout>
            </v-flex>
            <v-flex xs4 @click="fan_list(1)">
                <v-layout class="text-xs-center">
                    <v-flex class="font-weight-bold">{{ $store.state.userInfo.fans }}</v-flex>
                </v-layout>
                <v-layout class="text-xs-center font--text">
                    <v-flex>粉丝</v-flex>
                </v-layout>
            </v-flex>
        </v-layout><!--动态&关注&粉丝--><!--未登录时不显示部分-->

        <v-divider></v-divider>

        <div id="list">
            <v-list>
                <v-list-tile :to="{name: 'topic'}" @click="$store.commit('drawer')">
                    <v-list-tile-action>
                        <v-icon>question_answer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>行业热议</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{name: 'history'}" @click="$store.commit('drawer')">
                    <v-list-tile-action>
                        <v-icon>history</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>历史记录</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{name: 'collection'}" @click="$store.commit('drawer')">
                    <v-list-tile-action>
                        <v-icon>favorite</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>个人收藏</v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{name: 'message'}" @click="$store.commit('drawer')">
                    <v-list-tile-action>
                        <v-icon>chat</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>消息通知</v-list-tile-title>
                </v-list-tile>

                <!--<v-list-tile :to="{name: 'account'}" @click="$store.commit('drawer')">-->
                <!--<v-list-tile-action>-->
                <!--<v-icon>person</v-icon>-->
                <!--</v-list-tile-action>-->
                <!--<v-list-tile-title>个人中心</v-list-tile-title>-->
                <!--</v-list-tile>-->
            </v-list>
            <v-divider></v-divider>
            <v-list>
                <v-list-tile @click="$router.push({name:'historical-post'})">
                    <v-list-tile-action>
                        <v-icon class="time--text">description</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <v-layout justify-space-between>
                            <span>我发布的</span>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="$router.push({name:'article-publish'})">
                    <v-list-tile-action>
                        <v-icon class="time--text">border_color</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <v-layout justify-space-between>
                            <span>发布文章</span>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="$router.push({name:'question-publish'})">
                    <v-list-tile-action>
                        <v-icon class="time--text">create_new_folder</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <v-layout justify-space-between>
                            <span>发布话题</span>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="$router.push({name:'creation-manager'})">
                    <v-list-tile-action>
                        <v-icon class="time--text">insert_chart</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <v-layout justify-space-between>
                            <span>创作中心</span>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile @click="$router.push({name:'corporate_center'})"
                             v-if="$store.state.userInfo.group.value===3 || $store.state.userInfo.group.value===0">
                    <v-list-tile-action>
                        <v-icon class="time--text">local_offer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <v-layout justify-space-between>
                            <span>企业中心</span>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
                <v-list-tile :to="{name: 'exp-detail', query: {redirect: $route.fullPath}}">
                    <v-list-tile-action>
                        <v-icon class="time--text">trending_up</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>
                        <v-layout justify-space-between>
                            <span>积分等级</span>
                        </v-layout>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
            <v-divider></v-divider>

            <v-list>
                <v-list-tile :to="{name: 'settings', query: {redirect: this.$route.fullPath}}" @click="drawer = false">
                    <v-list-tile-action>
                        <v-icon>settings</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-title>设置</v-list-tile-title>
                </v-list-tile>
            </v-list>
        </div><!--功能列表-->
    </div>
</template>

<script>
    export default {
        name: "NavigationDrawer",
        methods: {
            fan_list(active) {
                this.$router.push({name: 'fan-list', query: {active: active}})
            }
        }
    }
</script>

<style scoped>
    #head-container {
        padding: 1em;
    }

    #wallet {
        margin: 0 5px;
    }

    #camera {
        margin: 0;
    }

    #info-container {
        margin-top: 10px;
    }

    #nickname {
        font-weight: 700;
        margin: 4px;
        color: white;
    }

    #group {
        height: 20px;
        font-weight: 700;
    }

    #exp {
        margin: 4px;
    }

    #level {
        margin: 4px;
    }

    #fans_container {
        padding: 10px;
    }

    .v-navigation-drawer, .v-navigation-drawer--fixed, .v-navigation-drawer--open, .v-navigation-drawer--temporary {
        z-index: 9999 !important;
    }

    aside {
        z-index: 9999;
    }
</style>
