<template>
    <div class="question-card">

        <v-card id="card" flat border>
            <!--<v-container v-if="card_type==0">-->
            <!--<v-layout row>-->
            <!--<v-flex pa-1>-->
            <!--<span class="font-weight-bold">{{ title }}</span>-->
            <!--<div>{{substring}}</div>-->
            <!--</v-flex>-->
            <!--<v-flex v-if="img" shrink pa-1>-->
            <!--<img :src="img" width="150px" height="90px" alt="">-->
            <!--</v-flex>-->
            <!--</v-layout>-->
            <!--<v-layout row>-->
            <!--<v-flex class="font&#45;&#45;text" xs12 pa-1>标签 : <span v-for="(tag, index) in tags" :key="index">{{ index===0 ? '' : '/' }}{{ tag }}</span>-->
            <!--</v-flex>-->
            <!--</v-layout>-->
            <!--<v-layout row>-->
            <!--<v-flex class="font&#45;&#45;text" grow pa-1>{{ follow }} 人关注&nbsp;·&nbsp;{{ comment }} 条评论</v-flex>-->
            <!--<v-flex class="time&#45;&#45;text" shrink pa-1>{{ edittime }}</v-flex>-->
            <!--</v-layout>-->

            <!--</v-container>-->
            <v-card>

                <v-img
                        :src="img"
                        aspect-ratio="2.75"
                        v-if="img!==''&&img"
                ></v-img>

                <v-card-title primary-title>
                    <div>
                        <h3>{{ title }}</h3>
                        <p class="description" v-text="description.replace(/<[^>]+>/g, '')">
                        </p>

                    </div>

                </v-card-title>

                <v-card-actions>
                    <v-flex class="font--text" xs12 pa-1>标签 : <span v-for="(tag, index) in tags" :key="index">{{ index===0 ? '' : '/' }}{{ tag.text }}</span>
                    </v-flex>
                    <v-flex class="font--text" grow pa-1>{{ follow }} 人关注&nbsp;·&nbsp;{{ comment }} 条评论 <span
                            class="time--text">{{ edittime }}</span></v-flex>

                </v-card-actions>
            </v-card>
        </v-card>
    </div>
</template>

<script>
    export default {
        name: "QuestionCard",
        props: ['title', 'img', 'tags', 'follow', 'comment', 'edittime', 'description', 'card_type'],
    }
</script>

<style scoped>
    #card {
        margin-top: 10px;
    }
    .description{
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        word-break: break-all;
    }
</style>
