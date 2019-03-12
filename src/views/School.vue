<template>
    <div class="school">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>学院</span>
            </v-toolbar-title>

            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>

            <v-tabs light slot="extension" v-model="tabs" color="primary" centered slider-color="secondary">
                <v-tab :key="0">推荐</v-tab>
                <v-tab :key="1">分类</v-tab>
            </v-tabs>
        </v-toolbar>
        <v-card>
            <v-tabs-items v-model="tabs">
                <v-tab-item :key="0">
                    <v-flex xs12>
                        <!--<v-carousel height="200" hide-delimiters class="banner-father">-->
                        <!--<v-carousel-item-->
                        <!--v-for="(item,i) in items"-->
                        <!--:key="i"-->
                        <!--:src="item.src"-->
                        <!--@click="jump_url(item.url)"-->
                        <!--&gt;<span class="banner">{{item.title}}</span></v-carousel-item>-->
                        <!--</v-carousel>-->
                        <Carousel autoplay loop dots="none" arrow="always" style="z-index: 1 !important;">
                            <CarouselItem v-for="item in items">
                                <div class="banner-image" v-bind:style="{backgroundImage:'url(' + item.src + ')'}"
                                     @click="jump_url(item.url)">
                                    <span class="banner">{{item.title}}</span>
                                </div>
                            </CarouselItem>
                        </Carousel>
                    </v-flex>
                    <v-container grid-list-md>
                        <v-layout row wrap>

                            <v-flex xs6 v-for="(value,i) in recommends" :key="i">
                                <v-hover>
                                    <v-card
                                            slot-scope="{ hover }"
                                            :class="`elevation-${hover ? 12 : 2}`"
                                            class="mx-auto"
                                            @click="jump_article(value.id)"
                                    >
                                        <v-img
                                                :aspect-ratio="16/9"
                                                :src="value.img"
                                        ></v-img>
                                        <v-card-title>
                                            <div>
                                                <span class="inline"><b>{{value.title}}</b></span>
                                                <div>
                                                    <div class="grey--text text--darken-2">
                                                        <span v-for="(tag, index) in value.tags" :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </v-card-title>
                                    </v-card>
                                </v-hover>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <div :class="busy ? 'load-more-normal' : 'load-more-hide'" v-infinite-scroll="loadMore"
                         infinite-scroll-disabled="busy" infinite-scroll-distance="0">
                        <h3>
                            <v-progress-circular
                                    indeterminate
                                    color="primary"
                            ></v-progress-circular>
                            <span style="margin-left: 1em">加载中</span></h3>
                    </div>
                    <div class="bottom"></div>
                </v-tab-item>
                <v-tab-item :key="1">
                    <Row>

                        <!--尝试修复菜单栏滚动，失败了-->

                        <Col span="10"
                             style="background-color: white;position: fixed;left: 0;overflow: scroll;height: 82%">

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
                                                        @click="jump_article(value.articleID)"
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
                                                                    作者：{{value.nickname}}
                                                                    <span class="right green--text"
                                                                          style="margin-left: 10em"
                                                                          v-if="value.free!==1">
                                                                        ￥{{value.price}}
                                                                    </span>
                                                                    <span class="right red--text"
                                                                          style="margin-left: 10em"
                                                                          v-if="value.free===1">免费
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
        </v-card>
        <v-footer app v-if="$route.path !== '/login' && $route.path !== '/register'">
            <bottomNav :bottom-nav="'school'"></bottomNav>
        </v-footer>
    </div>
</template>

<script>
    import bottomNav from '../components/bottomNav';
    import Scroll from '../components/Scroll'

    export default {
        components: {bottomNav, Scroll},
        name: "School",
        data() {
            return {
                selected: [2],
                articles: [],
                menu: [],
                eee: 1,
                category: 0,
                items: [
                    {
                        src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551793082170&di=a969802b6be72df8065f08348913985c&imgtype=0&src=http%3A%2F%2Fwww.3d2000.com%2Fwp-content%2Fuploads%2F2016%2F05%2F294194-7268075d6ad931da.gif',
                        title: '加载中···'
                    }
                ],
                tabs: 0,
                bottomNav: 1,
                page: 1,
                busy: false,
                recommends: []
            }
        },
        methods: {
            menu_change(name) {
                if (name.length === 0) {
                    return;
                }
                this.$api.article.get_tag_articles(name[0]).then(res => {
                    if (res.data.code === 1) {
                        this.articles = res.data.data;
                    }
                })
            },
            change(tag_id) {
                this.$api.article.get_tag_articles(tag_id).then(res => {
                    if (res.data.code === 1) {
                        this.articles = res.data.data;
                    }
                })
            },
            toggle(index) {
                const i = this.selected.indexOf(index)

                if (i > -1) {
                    this.selected.splice(i, 1)
                } else {
                    this.selected.push(index)
                }
            },
            get_recommend_article() {
                this.$api.school.get_recommend_article(this.page).then(res => {
                    if (res.data.code === 1) {
                        if (this.page === 1) {
                            this.recommends = []
                        }
                        res.data.data.forEach(value => {
                            this.recommends.push({
                                title: value['title'],
                                tags: value['tags'],
                                img: value['cover'],
                                id: value['articleID']
                            })
                        });
                        this.page++;
                        this.busy = false;
                    }
                })
            },
            get_activities() {
                this.$api.activities.get_activities(2).then(res => {
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
            jump_url(url) {
                this.$router.push({name: 'browser', query: {url: url}});
            },
            jump_article(id) {
                this.$router.push({name: 'article', query: {id: id}})
            },
            loadMore() {
                this.busy = true;
                this.get_recommend_article()
            },
            get_tag_tree() {
                this.$api.tags.get_tag_tree().then(res => {
                    if (res.data.code === 1) {
                        this.menu = res.data.data;
                        this.change(this.menu[0].id);
                    }
                })
            }
        }
        ,
        mounted() {
            this.get_recommend_article();
            this.get_activities();
            this.get_tag_tree();
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            // from.meta.keepAlive = to.name === 'article';
            next();
        }
    }
</script>

<style scoped>
    .ivu-menu-item {
        padding: 10px 6px 10px 6px;
    }

    .bottom {
        margin-bottom: 10%;
    }

    .banner-image {
        width: inherit;
        height: 200px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
    }

    .banner {
        position: absolute;
        bottom: 0;
        width: inherit;
        background: rgba(0, 0, 0, 0.5);
        text-align: center;
        font-size: 1.3em;
        color: rgba(255, 255, 255, 0.9);
    }

    .nothing {
        text-align: center;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
    }

    .banner-father {
        position: relative;
    }

    .load-more-normal {
        text-align: center;
        height: 60px;
        line-height: 60px;
    }

    .load-more-hide {
        height: 0;
    }

    .ivu-menu {
        z-index: 1 !important;
    }

    button {
        z-index: 1;
    }

    .inline {
    }
</style>
