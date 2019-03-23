<template>
    <div>
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">举报</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
                发送
            </div>
        </div>
        <div class="line"></div>
        <h4 style="margin-top: 1em;margin-bottom:1em;padding-left: 2em">举报信息</h4>
        <v-divider></v-divider>
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs2>
                    <div style="width: 50px;height: 50px;overflow: hidden;border-radius: 50%">
                        <img src="https://www.asgardusk.com/images/none.png" alt=""
                             style="width: 50px;height: 50px;border-radius: 50%">
                    </div>
                </v-flex>
                <v-flex xs10>
                    <h3>用户名</h3>
                    <h4 style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;">
                        用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介用户简介</h4>
                </v-flex>
            </v-layout>
        </v-container>
        <v-flex xs12 style="padding:0 2em 2em 2em;">
            <span>评论：</span>
            <span style="overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp: 3;-webkit-box-orient: vertical;">我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑我想砸电脑</span>
        </v-flex>
        <v-divider></v-divider>
        <h4 style="margin-top: 1em;margin-bottom:1em;padding-left: 2em">举报原因</h4>
        <v-divider></v-divider>
        <v-flex xs12>
            <v-textarea
                    solo
                    name="input-7-4"
                    label="Solo textarea"
                    value="填写举报理由，我们会尽快处理哦"
                    v-model="reason"
            ></v-textarea>
        </v-flex>
    </div>
</template>

<script>
    export default {
        name: "report",
        data(){
            return {
                content:"",
                author_name:"",
                author_info:"",
                reason:"",
            }
        },
        methods:{

        },
        mounted(){
            let report_type = this.$route.query.report_type
            
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
