<template>
    <div class="question-card" style="width: 100%">

        <v-flex id="card" flat border style="width: 100%">
            <v-card style="width: 100%">

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
        </v-flex>
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

<style>
    .question-card{
        width: 100% !important;
    }
</style>
