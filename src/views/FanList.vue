<template>
    <div class="fan-list">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>关注和粉丝</span>
            </v-toolbar-title>

            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>
            <!--<v-tabs slot="extension" v-model="active" centered color="primary" slider-color="secondary">-->
            <!--<v-tab v-for="(tab, tab_idx) in tabs" :key="tab_idx">{{ tab.title }}</v-tab>-->
            <!--</v-tabs>-->

        </v-toolbar>
        <v-card>
            <v-tabs fixed-tabs color="primary" v-model="active">
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
                                        @click="toggle(item.id)"
                                >
                                    <v-list-tile-avatar>
                                        <img :src="item.head_portrait" alt="">
                                    </v-list-tile-avatar>

                                    <v-list-tile-content>
                                        <v-list-tile-title><span class="lv">lv.{{item.level}}</span>{{ item.nickname }}
                                            <span :class="{chip:true,chip_red:item.usergroup.value===0,chip_yellow:item.usergroup.value===2||item.usergroup.value===5,chip_green:item.usergroup.value===1,chip_blue:item.usergroup.value===3||item.usergroup.value===6,chip_gray:item.usergroup.value===4}">
                                            {{ item.usergroup.text }}
                                        </span>
                                        </v-list-tile-title>
                                        <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                                    </v-list-tile-content>

                                </v-list-tile>
                                <v-divider
                                        v-if="index + 1 < items[tab.dataSet].length"
                                        :key="index + 'divider'"
                                        style="margin-bottom: 0.5em;margin-top: 0.5em"
                                ></v-divider>
                            </template>
                        </v-list>
                    </v-card>
                </v-tab-item>
            </v-tabs>

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
            <!--@click="toggle(item.id)"-->
            <!--&gt;-->
            <!--<v-list-tile-avatar>-->
            <!--<img :src="item.head_portrait" alt="">-->
            <!--</v-list-tile-avatar>-->

            <!--<v-list-tile-content>-->
            <!--<v-list-tile-title><span class="lv">lv.{{item.level}}</span>{{ item.nickname }}-->
            <!--<span :class="{chip:true,chip_red:item.usergroup.value===0,chip_yellow:item.usergroup.value===2||item.usergroup.value===5,chip_green:item.usergroup.value===1,chip_blue:item.usergroup.value===3||item.usergroup.value===6,chip_gray:item.usergroup.value===4}">-->
            <!--{{ item.usergroup.text }}-->
            <!--</span>-->
            <!--</v-list-tile-title>-->
            <!--<v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>-->
            <!--</v-list-tile-content>-->

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
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "fan-list",
        data() {
            return {
                active: 0,
                tabs: [
                    {title: '我的关注', dataSet: 'follow'},
                    {title: '我的粉丝', dataSet: 'fans'}
                ],
                items: {
                    follow: [],
                    fans: [],
                },
            }
        },
        watch: {
            $route(val) {
                this.active = this.$route.query.active;
            }
        },
        methods: {
            get_my_follow() {

                this.$api.account.get_my_follow().then(res => {
                    if (res.data.code === 1) {
                        this.items.follow = res.data.data;
                    }
                })
            },
            toggle(id) {
                this.$router.push({name: 'detail', query: {id: id}});
            },
            get_my_fans() {
                this.$api.specialist.get_my_fans().then(res => {
                    if (res.data.code === 1) {
                        this.items.fans = res.data.data;
                    }
                })
            }
        },
        mounted() {
            this.get_my_follow();
            this.get_my_fans();
            this.active = this.$route.query.active
            // this.active = this.$route.query.active;
        }
    }
</script>

<style scoped>
    .bigbox {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 200;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: white;
    }

    .chip {
        border: 1px solid;
        border-radius: 3px;
        font-size: 0.7em;
    }

    .chip_yellow {
        border-color: #ffcc00;
        color: #ffcc00;
    }

    .chip_green {
        border-color: green;
        color: green;
    }

    .chip_red {
        border-color: tomato;
        color: tomato;
    }

    .chip_gray {
        border-color: gray;
        color: gray;
    }

    .chip_blue {
        border-color: deepskyblue;
        color: deepskyblue;
    }

    .lv {
        font-size: 0.9em;
        font-weight: bolder;
        -webkit-text-stroke: 1px #ff9c00;
        color: transparent;
        margin-right: 0.5em;
    }
</style>
