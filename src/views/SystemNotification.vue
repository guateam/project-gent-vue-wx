<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">系统通知</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
                <v-icon large color="white">more_vert</v-icon>
            </div>
        </div>
        <div class="line"></div>
        <v-layout column>
            <v-flex xs12 style="padding: 2em 1.2em;border-bottom: 1px #eee solid;">
                <h2>2019拜年祭正在直播中！</h2>
                <p>
                    担任州长期间，他在泰晤士河战役中亲自带领肯塔基州民兵，并因此获得国会金质奖章。谢尔比的军族生涯在波因特普莱森特战役中拉开帷幕。之后，他和约翰·塞维尔带领部队翻越阿巴拉契亚山脉与北卡罗莱纳州的英军对抗，还在殖民地军队取胜的王山之战中发挥了至关重要的作用。</p>
                <p style="float:right;">14:45</p>
            </v-flex>
            <v-flex xs12 style="padding: 2.2em 1.2em;border-bottom: 1px #eee solid;">
                <h2>拉拉人邀请你加入会议</h2>
                <p>
                    拉拉人邀请你加入会议<span style="color: lightskyblue;">百万二五仔在线出征</span>
                    点击会议名称可直接进入会议
                </p>
                <p style="float:right;">14:45</p>
            </v-flex>
            <v-flex xs12 style="padding: 2.2em 1.2em;border-bottom: 1px #eee solid;">
                <h2>2019拜年祭正在直播中！</h2>
                <p>
                    担任州长期间，他在泰晤士河战役中亲自带领肯塔基州民兵，并因此获得国会金质奖章。谢尔比的军族生涯在波因特普莱森特战役中拉开帷幕。之后，他和约翰·塞维尔带领部队翻越阿巴拉契亚山脉与北卡罗莱纳州的英军对抗，还在殖民地军队取胜的王山之战中发挥了至关重要的作用。</p>
                <p style="float:right;">14:45</p>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
    export default {
        name: "system-notification"
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
