<template>
    <div class="sign-board">
        <v-toolbar dark flat color="primary" app dense scroll-off-screen>
            <v-toolbar-side-icon @click="$store.commit('drawer')"></v-toolbar-side-icon>

            <v-toolbar-title class="headline" style="margin: 0 auto">
                <span>我报名的</span>
            </v-toolbar-title>

            <v-btn icon @click="$router.push({name:'search'})">
                <v-icon>search</v-icon>
            </v-btn>
        </v-toolbar>
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
                    <div style="height: 34%;display: flex;align-items: center;"><h2  style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">{{item.title}}</h2></div>
                    <div style="height: 30%;display: flex;align-items: center;overflow: hidden"><h4  style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                        {{item.content}}</h4></div>
                    <div style="height: 18%;display: flex;align-items: center;"><h4>发布单位：<span
                            style="color: blue;">{{item.nickname}}</span>报名状态：<span
                            v-if="item.state===0">待审核</span><span v-if="item.state===1">已通过</span><span
                            v-if="item.state===-1">被拒绝</span></h4></div>
                    <div style="height: 18%;display: flex;align-items: center;"><h4>
                        <span v-for="(tag, index) in item.tags"
                              :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
                    </h4>
                    </div>
                </v-flex>
            </v-layout>
            <div v-if="busy">
                <h3>
                    <v-progress-circular
                            indeterminate
                            color="primary"
                    ></v-progress-circular>
                    <span style="margin-left: 1em">加载中</span></h3>
            </div>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "SignBoard",
        data() {
            return {
                busy: true,
                demands: []
            }
        },
        methods: {
            get_my_demand() {
                this.$api.board.get_my_demand().then(res => {
                    if (res.data.code === 1) {
                        res.data.data.forEach(value => {
                            value['content'] = value['content'].replace(/<[^>]+>/g, '');
                        });
                        this.demands = res.data.data;
                        this.busy = false;
                    }
                })
            }
        },
        mounted() {
            this.get_my_demand();
        }
    }
</script>

<style scoped>

</style>
