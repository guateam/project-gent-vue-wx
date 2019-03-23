<template>
    <div class="exp-detail">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">积分等级</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
            </div>
        </div>
        <div class="line"></div>
        <v-card flat color="primary">
            <v-container>
                <v-layout justify-center>
                    <v-progress-circular
                            :rotate="180"
                            :size="200"
                            :width="10"
                            :value="$store.state.userInfo.exp.percent / 2"
                            color="secondary"

                    >
                        <v-layout id="exp-text-container" style="text-shadow:3px 3px 3px rgba(0,0,0,0.6);">
                            <v-flex style="display: flex;align-items: center;justify-content: center;text-align: center"><span style="text-align: center" id="exp-text">{{ $store.state.userInfo.exp.value }}</span></v-flex>
                            <br> <br/>

                        </v-layout>
                        <v-flex style="text-align: center;"><span style="font-size:1.2em;text-align:center;">我的积分</span></v-flex>
                    </v-progress-circular>
                </v-layout>
            </v-container>
        </v-card>

        <v-card id="authority-card" flat>
            <br>
            <v-layout justify-center>
                <span class="font--text">--- 等级特权 ---</span>
            </v-layout>
            <v-card flat>
                <v-card-title style="display: flex;align-items: center;justify-content: center;text-align: center">
                    <span class="font-weight-bold">基础功能 ({{ base }}/2)</span>
                </v-card-title>
                <v-card-text>
                    <v-layout class="text-xs-center">
                        <v-flex xs4 offset-xs2>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.publishInfo ? 'grey' : 'success'">
                                        <v-icon  style="margin-top: 2px">comment</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>发布内容</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.publishInfo }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.colorfulFont ? 'grey' : 'success'">
                                        <v-icon style="margin-top: 2px">color_lens</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>彩色字体</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.colorfulFont }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card flat>
                <v-card-title style="display: flex;align-items: center;justify-content: center;text-align: center">
                    <span class="font-weight-bold">编辑功能 ({{ edit }}/2)</span>
                </v-card-title>
                <v-card-text>
                    <v-layout class="text-xs-center">
                        <v-flex xs12>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.editQuestionTag ? 'grey' : 'success'">
                                        <v-icon style="margin-top: 2px">bookmark</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>添加二级标签</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.editQuestionTag }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <!--<v-flex xs4>-->
                            <!--<v-layout column>-->
                                <!--<v-flex>-->
                                    <!--<v-btn icon fab dark small-->
                                           <!--:color="$store.state.userInfo.level < authority.editQuestion ? 'grey' : 'success'">-->
                                        <!--<v-icon>edit</v-icon>-->
                                    <!--</v-btn>-->
                                <!--</v-flex>-->
                                <!--<v-flex><span>编辑问题</span></v-flex>-->
                                <!--<v-flex><span class="condition font&#45;&#45;text">等级 {{ authority.editQuestion }} </span>-->
                                <!--</v-flex>-->
                            <!--</v-layout>-->
                        <!--</v-flex>-->
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card flat>
                <v-card-title style="display: flex;align-items: center;justify-content: center;text-align: center">
                    <span class="font-weight-bold">优先权 ({{ prior }}/2)</span>
                </v-card-title>
                <v-card-text>
                    <v-layout class="text-xs-center">
                        <v-flex xs4 offset-xs2>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.priorReport ? 'grey' : 'success'">
                                        <v-icon style="margin-top: 2px">report</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>举报优先</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.priorReport }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                        <v-flex xs4>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.priorAudit ? 'grey' : 'success'">
                                        <v-icon style="margin-top: 2px">check_circle</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>审核优先</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.priorAudit }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card flat>
                <v-card-title style="display: flex;align-items: center;justify-content: center;text-align: center">
                    <span class="font-weight-bold">权重增加 ({{ strong }}/1)</span>
                </v-card-title>
                <v-card-text>
                    <v-layout class="text-xs-center">
                        <v-flex xs12>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.strongDisagree ? 'grey' : 'success'">
                                        <v-icon style="margin-top: 2px">exposure_neg_2</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>反对加权</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.strongDisagree }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>

            <v-card flat>
                <v-card-title style="display: flex;align-items: center;justify-content: center;text-align: center">
                    <span class="font-weight-bold">内容推荐 ({{ recommend }}/1)</span>
                </v-card-title>
                <v-card-text>
                    <v-layout class="text-xs-center">
                        <v-flex xs12>
                            <v-layout column>
                                <v-flex>
                                    <v-btn icon fab dark small
                                           :color="$store.state.userInfo.level < authority.recommendArticle ? 'grey' : 'success'">
                                        <v-icon style="margin-top: 2px">note</v-icon>
                                    </v-btn>
                                </v-flex>
                                <v-flex><span>文章推荐</span></v-flex>
                                <v-flex><span class="condition font--text">等级 {{ authority.recommendArticle }} </span>
                                </v-flex>
                            </v-layout>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card>
        </v-card>
        <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: 'ExpDetail',

        data() {
            return {
                level: 2,  // 用户等级
                exp: 120,  // 用户当前经验值
                limit: 500,  // 当前等级的经验上限
                authority: {
                    publishInfo: 1,  // 发布内容
                    colorfulFont: 2,  // 彩色字体
                    editQuestionTag: 3,  // 编辑问题标签
                    priorReport: 4,  // 优先举报
                    priorAudit: 4,  // 优先审核
                    editQuestion: 5,  // 编辑问题
                    strongDisagree: 5,  // 反对加权
                    recommendArticle: 6,  // 内容推荐
                },  // 用户需求等级
            }
        },

        computed: {
            base() {
                let count = 0;
                this.authority.publishInfo > this.$store.state.userInfo.level || count++;
                this.authority.colorfulFont > this.$store.state.userInfo.level || count++;
                return count
            },
            edit() {
                let count = 0;
                this.authority.editQuestionTag > this.$store.state.userInfo.level || count++;
                this.authority.editQuestion > this.$store.state.userInfo.level || count++;
                return count
            },
            prior() {
                let count = 0;
                this.authority.priorReport > this.$store.state.userInfo.level || count++;
                this.authority.priorAudit > this.$store.state.userInfo.level || count++;
                return count
            },
            strong() {
                let count = 0;
                this.authority.strongDisagree > this.$store.state.userInfo.level || count++;
                return count
            },
            recommend() {
                let count = 0;
                this.authority.recommendArticle > this.$store.state.userInfo.level || count++;
                return count
            },
        },

        mounted() {
            this.$emit('changeTitle', '积分等级');
        },
    }
</script>

<style scoped>
    .head {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
        margin-bottom: 1em;
        z-index: 2;
        background-color: #ffcc00;
    }

    .line {
        width: 100%;
        height: 4em;
        background-color: #eee;
    }

    .condition {
        font-size: 12px;
    }

    #exp-text-container {
        margin-top: -90px;
    }

    #exp-text {
        font-size: 40px;
        font-weight: 700;
        color: white;
    }

    #authority-card {
        margin-top: -115px;
    }

    .bottom {
        margin-bottom: 8%;
    }
    .container{
        background:linear-gradient(#ffcf00,#ff7500e6);
    }
    .v-btn--floating.v-btn--small .v-icon{
        font-size: 25px;
        margin-top: 11px;
    }
</style>
