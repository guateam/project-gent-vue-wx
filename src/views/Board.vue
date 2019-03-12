<template>
    <div>
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>
            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>告示板</span>
            </v-toolbar-title>
            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>
            <v-tabs light slot="extension" v-model="tabs" color="primary" centered slider-color="secondary">
                <v-tab :key="0">推荐</v-tab>
                <v-tab :key="1">分类</v-tab>
            </v-tabs>
        </v-toolbar>
        <v-tabs-items v-model="tabs">
            <v-tab-item :key="0">
                <v-container grid-list-md text-xs-center>
                    <v-layout row wrap style="border: 1px solid #eee;padding: 12px;height: 170px"
                              v-for="item in demands"
                              @click="$router.push({name:'board-detail',query:{id:item.demandID}})">
                        <v-flex xs4 style="height: 100%">
                            <img :src="item.cover" alt=""
                                 style="width: 100%;height: 100%;object-fit: cover">
                        </v-flex>
                        <v-flex xs8
                                style="height: 100%;display: flex;justify-content: center;flex-direction: column;text-align: left">
                            <div style="height: 25%;display: flex;align-items: center;"><h2>{{item.title}}</h2></div>
                            <div style="height: 25%;display: flex;align-items: center;overflow: hidden"><h4>
                                {{item.content}}</h4></div>
                            <div style="height: 25%;display: flex;align-items: center;"><h4>发布单位：<span
                                    style="color: blue;">{{item.nickname}}</span></h4></div>
                            <div style="height: 25%;display: flex;align-items: center;"><h4>
                                <span v-for="(tag, index) in item.tags" :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
                            </h4>
                            </div>
                        </v-flex>
                    </v-layout>
                    <div :class="busy ? 'load-more-normal' : 'load-more-hide'" v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="busy" infinite-scroll-distance="0">
                        <h3>
                            <v-progress-circular
                                    indeterminate
                                    color="primary"
                            ></v-progress-circular>
                            <span style="margin-left: 1em">加载中</span></h3>
                    </div>
                </v-container>

            </v-tab-item>
            <v-tab-item :key="1">
                <Row>

                    <!--尝试修复菜单栏滚动，失败了-->

                    <Col span="10" style="background-color: white;position: fixed;left: 0;overflow: scroll;height: 82%">

                        <Col span="24">
                            <Menu Menu theme="light" width="auto" accordion @on-open-change="menu_change">
                                <Submenu :name="item.id" v-for="item in menu">
                                    <template slot="title">
                                        {{item.name}}
                                    </template>
                                    <MenuItem :name="value.id" @click.native="change(value.id)"
                                              v-for="value in item.children">{{value.name}}
                                    </MenuItem>
                                </Submenu>
                            </Menu>
                        </Col>

                    </Col>
                    <Col span="14" offset="10">
                        <v-layout row>
                            <v-flex xs12 sm6 offset-sm3>
                                <v-card>
                                    <v-list two-line>

                                        <!--<v-list-tile-->
                                        <!--:key="item.articleID"-->
                                        <!--avatar-->
                                        <!--ripple-->
                                        <!--@click="toggle(index)"-->
                                        <!--&gt;-->
                                        <!--<div style="width: 4em;height: 65px;background-color: red;margin-right: 1em">-->
                                        <!--<img :src="item.cover"-->
                                        <!--style="width: 100%;height: 100%; object-fit: cover;"/>-->
                                        <!--</div>-->
                                        <!--<v-list-tile-content>-->
                                        <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
                                        <!--<v-list-tile-sub-title>作者: {{ item.nickname }}-->
                                        <!--</v-list-tile-sub-title>-->
                                        <!--</v-list-tile-content>-->


                                        <!--</v-list-tile>-->
                                        <v-hover v-for="value in articles" style="margin-bottom: 0.5em">
                                            <v-card
                                                    slot-scope="{ hover }"
                                                    :class="`elevation-${hover ? 12 : 2}`"
                                                    class="mx-auto"
                                                    @click="$router.push({name:'board-detail',query:{id:value.demandID}})"
                                            >
                                                <v-img
                                                        :aspect-ratio="16/9"
                                                        :src="value.cover"
                                                        style="height: 5em"
                                                ></v-img>
                                                <v-card-title>
                                                    <div>
                                                        <span><b>{{value.title}}</b></span>
                                                        <div>
                                                            <div class="grey--text text--darken-2">
                                                                发布者：{{value.nickname}}
                                                                <span class="right green--text"
                                                                      style="margin-left: 10em">
                                                                        ￥{{value.price}}
                                                                    </span>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </v-card-title>
                                            </v-card>
                                        </v-hover>
                                        <div v-if="articles.length===0" class="nothing">
                                            <h3>暂无内容</h3>
                                        </div>
                                    </v-list>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </Col>
                </Row>
            </v-tab-item>
        </v-tabs-items>

        <v-footer app v-if="$route.path !== '/login' && $route.path !== '/register'">
            <bottomNav :bottom-nav="'board'"></bottomNav>
        </v-footer>
    </div>
</template>

<script>
    import bottomNav from '../components/bottomNav';

    export default {
        name: "board",
        components: {bottomNav},
        data() {
            return {
                tabs: 0,
                articles: [],
                demands: [],
                cityList: [
                    {
                        value: '人工智能',
                        label: '人工智能'
                    },
                    {
                        value: '射频技术',
                        label: '射频技术'
                    },
                    {
                        value: '绿色能源',
                        label: '绿色能源'
                    },
                    {
                        value: '水处理技术',
                        label: '水处理技术'
                    },
                    {
                        value: '还有啥忘了',
                        label: '还有啥忘了'
                    },
                    {
                        value: '再凑一个',
                        label: '再凑一个'
                    }
                ],
                model11: '',
                model12: [],
                menu: [],
                page: 1,
                busy: false
            }
        },
        methods: {
            menu_change(name) {
                if (name.length === 0) {
                    return;
                }
                this.$api.board.get_demands_by_tag(name[0]).then(res => {
                    if (res.data.code === 1) {
                        this.articles = res.data.data;
                    }
                })
            },
            change(tag_id) {
                this.$api.board.get_demands_by_tag(tag_id).then(res => {
                    if (res.data.code === 1) {
                        this.articles = res.data.data;
                    }
                })
            },
            get_tag_tree() {
                this.$api.tags.get_tag_tree().then(res => {
                    if (res.data.code === 1) {
                        this.menu = res.data.data;
                        this.change(this.menu[0].id);
                    }
                })
            },
            get_board_recommend() {
                this.$api.board.get_board_recommend(this.page).then(res => {
                    if (res.data.code === 1) {
                        if (this.page === 1) {
                            this.demands = [];
                        }
                        res.data.data.forEach(value => {
                            this.demands.push(value)
                        });
                        this.page++;
                        this.busy = false;
                    }
                })
            },
            loadMore() {
                this.busy = true;
                this.get_board_recommend()
            },
        }
        ,
        mounted() {
            this.get_tag_tree();
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            // from.meta.keepAlive = to.name === 'board-detail';
            next();
        }
    }
</script>

<style scoped>
    .nothing {
        text-align: center;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .load-more-normal {
        text-align: center;
        height: 60px;
        line-height: 60px;
    }

    .load-more-hide {
        height: 0;
    }
</style>
