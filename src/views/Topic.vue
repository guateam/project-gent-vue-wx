<template>
    <div class="topic">

        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>话题</span>
            </v-toolbar-title>

            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>

            <v-tabs light slot="extension" v-model="tabs" color="primary" centered slider-color="secondary">
                <v-tab :key="0">推荐</v-tab>
                <v-tab v-for="data in category" :key="data.id">{{ data.name }}</v-tab>
            </v-tabs>
        </v-toolbar>
        <keep-alive>
            <v-card id="card">
                <v-tabs-items v-model="tabs">
                    <v-tab-item :key="0">
                        <question-card @click.native="view_detail(question.questionID)"
                                       v-for="(question,n) in questionList"
                                       :key="n" v-bind="question"></question-card>
                    </v-tab-item>

                    <v-tab-item v-for="(data,idx) in category" :key="data.id">
                        <question-card @click.native="view_detail(question.questionID)"
                                       v-for="question in classify_question[idx]"
                                       :key="question.questionID" v-bind="question"></question-card>
                    </v-tab-item>
                    <div class="bottom-nav"></div>
                </v-tabs-items>
            </v-card>
        </keep-alive>
        <div :class="'load-more-normal'" v-infinite-scroll="loadMore"
             infinite-scroll-disabled="busy" infinite-scroll-distance="0">
            <h3>
                <v-progress-circular
                        indeterminate
                        color="primary"
                ></v-progress-circular>
                <span style="margin-left: 1em">加载中</span></h3>
        </div>

        <div style="height: 1.5em"></div>
        <v-footer app>
            <bottomNav :bottom-nav="'topic'"></bottomNav>
        </v-footer>
    </div>
</template>

<script>
    import QuestionCard from "../components/QuestionCard";
    import bottomNav from '../components/bottomNav';

    export default {
        name: 'Topic',

        components: {
            QuestionCard,
            bottomNav,

        },

        data() {
            return {
                tabs: 0,
                category: [],
                questionList: [],
                classify_question: [],
                bottomNav: 0,
                page: 1,
                busy: false,
                timeout: 0,
                category_done: false,
            }
        },

        methods: {
            // 查看问题详情
            view_detail(id) {
                this.$router.push({name: 'question', query: {id: id}});  // 跳转到话题详情页
            },
            // 获取推荐内容
            get_recommend() {
                this.$api.homepage.get_recommend(this.page).then(res => {
                    if (res.data.code === 1) {
                        // 处理推荐内容
                        if (this.page === 1) {
                            this.questionList = [];
                        }
                        res.data.data.forEach(item => {
                            let flag = true;
                            for (let value in this.questionList) {
                                if (value['questionID'] === item['questionID'])
                                    flag = false;
                            }
                            if (item['type'] === 0) {
                                if (item['image'].length >= 1) {
                                    item['img'] = item['image'][0].split('src="')[1].split('"')[0];
                                }
                            }

                            if (item.type === 0 && flag) {
                                this.questionList.push(item);
                            }
                        });
                        this.page++;
                        this.busy = false;
                        this.timeout = 0;
                        this.$store.commit('closeDialog');
                    } else {
                        if (this.timeout < 3) {
                            this.get_recommend();
                            this.timeout++;
                        } else {
                            // this.snackbar=true;
                            // this.text='连接超时，请检查网络'
                            this.$store.commit('closeDialog');
                            this.$store.commit('showInfo', '连接超时，请检查网络');
                            this.$router.push({name: 'login'})
                        }
                    }
                })
            },
            // 获取分类标签
            get_category() {
                let that = this;
                this.$api.homepage.get_category().then(res => {
                    if (res.data.code === 1) {
                        that.category = res.data.data;
                        that.$api.homepage.classify_all_tag(1).then(res => {
                            if (res.data.code === 1) {
                                that.classify_question = res.data.data;
                                that.category_done = true;
                            }
                        })
                    }
                })
            },
            get_classify_question(idx, page) {
                let that = this;
                let id = this.category[idx]['id'];
                this.category[idx]['page']++;
                this.$set(this.category, idx, this.category[idx]);
                this.$api.homepage.get_classify(id, 1, page).then(res => {
                    if (res.data.code === 1) {
                        for (let i = 0; i < res.data.data.length; i++)
                            that.classify_question[idx].push(res.data.data[i]);
                        that.$set(that.classify_question, idx, that.classify_question[idx]);
                        that.busy = false;
                        that.timeout = 0;
                    } else {
                        that.timeout++;
                        that.get_classify_question(id, page)
                    }
                })
            },
            loadMore() {
                this.busy = true;
                if (this.tabs === 0) {
                    this.get_recommend();
                } else {
                    //获取目前的分类页码数
                    if (!this.category_done) return;
                    let cate_page = 0;
                    cate_page = this.category[this.tabs - 1]['page'] + 1;
                    this.get_classify_question(this.tabs - 1, cate_page)
                }
            },
        },
        deactivated() {
            this.busy = true;
        },
        activated() {
            this.busy = false;
        },
        mounted() {
            this.$store.commit('showDialog');
            this.get_category();
            // setTimeout(this.get_recommend(), 5000);
        },
        beforeRouteLeave(to, from, next) {
            // 设置下一个路由的 meta
            // if (to.name === 'question') {
            //     from.meta.keepAlive = true;
            //     this.busy = true;
            // } else {
            //     from.meta.keepAlive = false;
            // }

            next();
        }
    }
</script>

<style scoped>
    #card {
        background: #E4E4E4;
    }

    .bottom-nav {
        margin-bottom: 10%;
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
<style>
    img {
        max-width: 100%;
    }
</style>
