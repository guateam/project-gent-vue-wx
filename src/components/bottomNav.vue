<template>
    <div class="bottom-nav">
        <v-bottom-nav :active.sync="bottomNav" :value="true" absolute color="white">
            <v-btn color="#FFCC00" flat value="topic" @click="$router.push('/topic')">
                <span>首页</span>
                <v-icon>question_answer</v-icon>
            </v-btn>

            <v-btn color="#FFCC00" flat value="school" @click="$router.push('/school')">
                <span>学院</span>
                <v-icon>school</v-icon>
            </v-btn>
            <v-btn color="#FFCC00" flat value="board" @click="$router.push('/board')">
                <span>告示板</span>
                <v-icon>event_note</v-icon>
            </v-btn>
        </v-bottom-nav>
    </div>
</template>

<script>
    export default {
        name: "bottomNav",
        props:{
            bottomNav:{
                type:String,
                default:'topic'
            }
        },
        data() {
            return {

            };
        },
        mounted() {
        }
    }
</script>

<style scoped>

</style>
