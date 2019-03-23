<template>
    <div class="history">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>浏览纪录</span>
            </v-toolbar-title>

            <v-btn icon>
                <v-icon>delete</v-icon>
            </v-btn>

            <v-tabs slot="extension" v-model="active" centered color="primary" slider-color="secondary">
                <v-tab v-for="(tab, tab_idx) in tabs" :key="tab_idx">{{ tab.title }}</v-tab>
            </v-tabs>
        </v-toolbar>
        <v-card>
            <v-tabs-items v-model="active">
                <v-tab-item
                        v-for="n in tabs.length"
                        :key="n"
                >
                    <v-list>
                        <template v-for="(item, index) in items[n-1]">
                            <v-list-tile
                                    :key="item.title"
                                    avatar
                                    ripple
                                    @click="toggle(item.targetID,n-1)"
                            >
                                <v-list-tile-content>
                                    <v-list-tile-title>{{ item.title}}</v-list-tile-title>
                                    <v-list-tile-sub-title class="text--primary">{{ item.headline }}
                                    </v-list-tile-sub-title>
                                    <v-list-tile-sub-title><span v-for="(tag, index) in item.tags" :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
                                    </v-list-tile-sub-title>
                                </v-list-tile-content>

                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{ get_date(item.actiontime) }}</v-list-tile-action-text>
                                </v-list-tile-action>

                            </v-list-tile>
                            <v-divider
                                    v-if="index + 1 < items[n-1].length"
                                    :key="index"
                                    style="margin-bottom: 0.5em;margin-top: 0.5em"
                            ></v-divider>
                        </template>
                        <div v-if="busy" class="load-more-normal">
                            <h3>
                                <v-progress-circular
                                        indeterminate
                                        color="primary"
                                ></v-progress-circular>
                                <span style="margin-left: 1em">加载中</span></h3>
                        </div>
                    </v-list>

                </v-tab-item>
            </v-tabs-items>
        </v-card>
        <div style="height: 1em"></div>
    </div>
</template>

<script>
    export default {
        name: "History",
        data() {
            return {
                active: 0,
                tabs: [
                    {title: '回答'},
                    {title: '提问'},
                    {title: '文章'},
                ],
                items: [],
                busy: false,
            }
        },
        methods: {
            get_history() {
                this.busy = true;
                this.$api.account.get_history().then(res => {
                    if (res.data.code === 1) {
                        res.data.data.forEach(data => {
                            data.forEach(value => {
                                value['title'] = value['title'].replace(/<[^>]+>/g, '')
                                // value['headline'] = value['headline'].replace(/<[^>]+>/g, '')
                            })
                        });
                        this.items = res.data.data;
                        this.busy = false;
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
                    return (old.getMonth() + 1) + '-' + (old.getDate())
                }
            },
            toggle(targetID, targetType) {
                switch (targetType) {
                    case 0:
                        this.$router.push({name: 'answer', query: {id: targetID}});
                        break;
                    case 1:
                        this.$router.push({name: 'question', query: {id: targetID}});
                        break;
                    case 2:
                        this.$router.push({name: 'article', query: {id: targetID}});
                        break;
                }
            }
        },
        mounted() {
            this.get_history()
        },
    }
</script>

<style scoped>
    .load-more-normal {
        text-align: center;
        height: 60px;
        line-height: 60px;
    }
</style>
