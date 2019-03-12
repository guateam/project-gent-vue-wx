<template>
    <div class="collection">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>我发布的</span>
            </v-toolbar-title>

            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>

            <!--<v-tabs slot="extension" v-model="active" centered color="primary" slider-color="secondary">-->
                <!--<v-tab v-for="(tab, tab_idx) in tabs" :key="tab_idx">{{ tab.title }}</v-tab>-->
            <!--</v-tabs>-->
        </v-toolbar>
        <v-card>
            <!--<v-tabs-items v-model="active">-->
                <!--<v-tab-item-->
                        <!--v-for="n in tabs.length"-->
                        <!--:key="n"-->
                <!--&gt;-->
                    <!--<v-list>-->
                        <!--<template v-for="(item, index) in items[n-1]">-->
                            <!--<v-list-tile-->
                                    <!--:key="item.title"-->
                                    <!--avatar-->
                                    <!--ripple-->
                                    <!--@click="toggle(item.id,n-1)"-->
                            <!--&gt;-->
                                <!--<v-list-tile-content>-->
                                    <!--<v-list-tile-title>{{ item.title }}</v-list-tile-title>-->
                                    <!--<v-list-tile-sub-title class="text&#45;&#45;primary">{{ item.headline }}-->
                                    <!--</v-list-tile-sub-title>-->
                                    <!--<v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>-->
                                <!--</v-list-tile-content>-->

                                <!--<v-list-tile-action>-->
                                    <!--<v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>-->
                                <!--</v-list-tile-action>-->

                            <!--</v-list-tile>-->
                            <!--<v-divider-->
                                    <!--v-if="index + 1 < items[n-1].length"-->
                                    <!--:key="index"-->
                                    <!--style="margin-bottom: 0.5em;margin-top: 0.5em"-->
                            <!--&gt;</v-divider>-->
                        <!--</template>-->
                    <!--</v-list>-->

                <!--</v-tab-item>-->
            <!--</v-tabs-items>-->


            <v-tabs fixed-tabs>
                <v-tab
                    v-for="tab in tabs"
                    :key="tab.title"
                >
                    {{ tab.title }}

                </v-tab>
                <v-tab-item v-for="tab in tabs" :key="tab.title">
                    <v-card flat>
                        <v-list two-line>
                            <template v-for="(item, index) in items[tab.dataSet]">
                                <v-list-tile
                                    :key="index"
                                    avatar
                                    ripple
                                    @click="toggle(item.id, tab.dataSet)"
                                >
                                    <v-list-tile-content>
                                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                        <v-list-tile-sub-title class="text--primary">{{ item.headline }}
                                        </v-list-tile-sub-title>
                                        <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                    <v-list-tile-action>
                                        <v-list-tile-action-text>{{ item.action }}</v-list-tile-action-text>
                                    </v-list-tile-action>

                                </v-list-tile>
                                <v-divider
                                    :key="index + 'divider'"
                                    v-if="index + 1 < items[tab.dataSet].length"
                                    style="margin-bottom: 0.5em;margin-top: 0.5em"
                                ></v-divider>
                            </template>
                        </v-list>
                    </v-card>
                </v-tab-item>
            </v-tabs>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "HistoricalPost",
        data() {
            return {
                // active: 0,
                tabs: [
                    {title: '回答', dataSet: 'answers'},
                    {title: '提问', dataSet: 'questions'},
                    {title: '文章', dataSet: 'articles'},
                    {title: '咨询', dataSet: 'orders'},
                ],
                items: {
                    answers: [],
                    questions: [],
                    articles: [],
                    orders: [],
                },
                // selected: [2],
                // items: [
                //     [], [
                //         {
                //             action: '15 min',
                //             headline: '去你大爷的你才是非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋非酋',
                //             title: '为什么有些非洲人就是不愿意承认自己的血统？',
                //             subtitle: "3赞同  ·  4评论"
                //         },
                //         {
                //             action: '2 hr',
                //             headline: '',
                //             title: '请问什么姿势才能捞到闪电然后单抽出紫雨心？',
                //             subtitle: "8回答  ·  4评论"
                //         },
                //         {
                //             action: '6 hr',
                //             headline: '这里应该是文章的内容吧emmm这里应该是文章的内容吧emmm这里应该是文章的内容吧emmm',
                //             title: '假装这里是一篇文章',
                //             subtitle: '4赞同  ·  4评论'
                //         },
                //         {
                //             action: '12 hr',
                //             headline: '不然太像知乎了',
                //             title: '专栏？应该没有这玩意',
                //             subtitle: '3订阅  ·  9评论'
                //         }
                //     ], [], [], []
                // ],
            }
        },
        methods: {
            get_my_questions() {
                this.$api.questions.get_my_questions().then((data) => {
                    if (data.data.code === 1) {
                        data = data.data.data;
                        let items = [];
                        data.forEach((value) => {
                            items.push({
                                title: value['title'],
                                headline: value['description'],
                                action: this.get_date(value['edittime']),
                                subtitle: value['follow'] + '订阅  ·  ' + value['comments'] + '评论',
                                id: value['questionID']
                            })
                        });
                        // this.items[1] = items
                        this.items.questions = items;
                    }
                })
            },
            get_date(date) {
                let old = new Date(date);
                let now = new Date();
                let time = now.getTime() - old.getTime();
                if (time < 60 * 1000) {
                    return "刚刚"
                } else if (time > 60 * 1000 && time < 60 * 60 * 1000) {
                    return Math.round(time / 60 / 1000) + '分钟前'
                } else if (time > 60 * 60 * 1000 && time < 24 * 60 * 60 * 1000) {
                    return Math.round(time / 60 / 60 / 1000) + '小时前'
                } else if (time > 24 * 60 * 60 * 1000 && time < 10 * 60 * 60 * 1000) {
                    return Math.round(time / 24 / 60 / 60 / 1000) + '天前'
                } else {
                    return old.getMonth() + '-' + old.getDay()
                }
            },
            get_my_answers() {
                this.$api.answer.get_user_answers().then((data) => {
                    if (data.data.code === 1) {
                        data = data.data.data;
                        let items = [];
                        data.forEach((value) => {
                            items.push({
                                title: value['content'],
                                headline: value['title'],
                                action: this.get_date(value['edittime']),
                                subtitle: value['follow'] + '订阅  ·  ' + value['comments'] + '评论',
                                id: value['answerID'],
                            })
                        });
                        // this.items[0] = items
                        this.items.answers = items;
                    }
                })
            },
            get_my_articles() {
                this.$api.article.get_user_articles().then((data) => {
                    if (data.data.code === 1) {
                        data = data.data.data;
                        let items = [];
                        data.forEach((value) => {
                            items.push({
                                title: value['title'],
                                headline: value['content'],
                                action: this.get_date(value['edittime']),
                                subtitle: value['follow'] + '订阅',
                                id: value['articleID'],
                            })
                        });
                        // this.items[2] = items
                        this.items.articles = items;
                    }
                })
            },
            get_my_orders() {
                this.$api.specialist.get_historical_orders().then((data) => {
                    if (data.data.code === 1) {
                        data = data.data.data;
                        let items = [];
                        let state = ['被拒绝', '待回答', '已回答'];
                        data.forEach((value) => {
                            items.push({
                                title: value['content'],
                                headline: value['answer'],
                                action: this.get_date(value['time']),
                                subtitle: '状态：' + state[value['state'] + 1] + ' 回答人：' + value['specialist_nickname'],
                                id: value['orderID'],
                            })
                        });
                        if (this.tabs.length === 4) {
                            // this.items[3] = items;
                            this.items.orders = items;
                        } else {
                            // this.items[2] = items;
                            this.items.orders = items;
                        }
                    }
                })
            },
            get_category() {
                this.$api.article.get_article_allowed_group().then((data) => {
                    if (data.data.code === 1) {
                        this.tabs = [
                            {title: '回答', dataSet: 'answers'},
                            {title: '提问', dataSet: 'questions'},
                            {title: '文章', dataSet: 'articles'},
                            {title: '咨询', dataSet: 'orders'},
                        ];
                        this.get_my_articles()
                    } else if (data.data.code === -1) {
                        this.tabs = [
                            {title: '回答', dataSet: 'answers'},
                            {title: '提问', dataSet: 'questions'},
                            {title: '咨询', dataSet: 'orders'},
                        ]
                    } else {
                        this.tabs = [
                            {title: '错误'}
                        ]
                    }
                })
            },
            toggle(id, type) {
                switch (type) {
                    case 'answers':
                        this.$router.push({name: 'answer', query: {id: id}});
                        break;
                    case 'questions':
                        this.$router.push({name: 'question', query: {id: id}});
                        break;
                    default:
                        break;
                }
            }
        },
        mounted() {
            // this.get_category();
            this.get_my_answers();
            this.get_my_questions();
            // this.get_category();
            this.get_my_orders();
            this.get_my_articles()
        }
        ,
    }
</script>

<style scoped>

</style>
