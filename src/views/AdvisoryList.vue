<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.push({name:'topic'})">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">咨询管理</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap style="height: 160px;margin: 5px auto">
                <v-flex xs4 style="display: none">
                    <img src="https://www.asgardusk.com/images/portfolio/1.png" alt="" style="width: 100%;height: 100%;object-fit: cover">
                </v-flex>
                <v-flex xs12 style="text-align: left">
                    <v-flex xs12><h3>应该怎么和PM打好关系，设计用户交互有什么讲究？</h3></v-flex>
                    <v-flex xs12><h5>咨询人：<span>吉良吉影</span></h5></v-flex>
                    <v-flex xs12><h5>咨询费用：￥<span>20</span></h5></v-flex>
                    <v-flex xs12><h5>咨询时间：<span>2019/03/23&nbsp;&nbsp;&nbsp;08:21</span></h5></v-flex>
                    <v-flex xs12><h5>剩余时间 <span>43小时23分钟</span></h5></v-flex>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-layout row wrap style="height: 160px;margin: 5px auto">
                <v-flex xs4>
                    <img src="https://www.asgardusk.com/images/portfolio/1.png" alt="" style="width: 100%;height: 100%;object-fit: cover">
                </v-flex>
                <v-flex xs8 style="text-align: left">
                    <v-flex xs12><h3>应该怎么和PM打好关系，设计用户交互有什么讲究？</h3></v-flex>
                    <v-flex xs12><h5>咨询人：<span>吉良吉影</span></h5></v-flex>
                    <v-flex xs12><h5>咨询费用：￥<span>20</span></h5></v-flex>
                    <v-flex xs12><h5>咨询时间：<span>2019/03/23&nbsp;&nbsp;&nbsp;08:21</span></h5></v-flex>
                    <v-flex xs12><h5>剩余时间 <span>43小时23分钟</span></h5></v-flex>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "advisory-list"
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
