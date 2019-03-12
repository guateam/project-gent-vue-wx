<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">需求审核</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap style="border: 1px solid #eee;padding: 12px;height: 170px"
                      @click="$router.push({name:'requirement-check-detail',query:{id:item.demandID}})"
                      v-for="item in data">
                <v-flex xs4 style="height: 100%">
                    <img :src="item.cover" alt=""
                         style="width: 100%;height: 100%;object-fit: cover">
                </v-flex>
                <v-flex xs8
                        style="height: 100%;display: flex;justify-content: center;flex-direction: column;text-align: left">
                    <div style="height: 25%;display: flex;align-items: center;"><h2>{{item.title}}</h2></div>
                    <div style="height: 25%;display: flex;align-items: center;overflow: hidden"><h4>
                        {{item.content}}</h4></div>
                    <div style="height: 25%;display: flex;align-items: center;"><h4>发布时间：<span
                            style="color: blue;">{{item.createtime}}</span> 需求状态：{{state[item.state+1]}}</h4></div>
                    <div style="height: 25%;display: flex;align-items: center;"><h4>
                        <span v-for="tag in item.tags">{{tag.text}} </span>
                    </h4>
                    </div>
                </v-flex>
            </v-layout>
            <!--<div :class="busy ? 'load-more-normal' : 'load-more-hide'" v-infinite-scroll="loadMore"-->
            <!--infinite-scroll-disabled="busy" infinite-scroll-distance="0">-->
            <!--<h3>-->
            <!--<v-progress-circular-->
            <!--indeterminate-->
            <!--color="primary"-->
            <!--&gt;</v-progress-circular>-->
            <!--<span style="margin-left: 1em">加载中</span></h3>-->
            <!--</div>-->
            <h1 style="text-align: center" v-if="data.length===0">暂无数据</h1>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "requirement-check",
        data() {
            return {
                data: [],
                state: ['已清除', '招标中', '已开始', '已结束']
            }
        },
        methods: {
            get_my_demands() {
                this.$api.enterprise.get_my_demands().then(res => {
                    if (res.data.code === 1) {
                        this.data = [];
                        res.data.data.forEach(value => {
                            if (value.state === 0 || value.state === 1) {
                                this.data.push(value)
                            }
                        })
                    }
                })
            }
        },
        mounted() {
            this.get_my_demands();
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
</style>
