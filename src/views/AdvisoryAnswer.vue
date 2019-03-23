<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">添加回答</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
                <span @click="send">确认</span>
            </div>
        </div>
        <div class="line"></div>


        <div style="width: 100%;height: 100%">
            <quill-editor
                    v-model="content"
                    :options="editorOption">
            </quill-editor>
        </div>
        <v-dialog
                v-model="busy"
                persistent
                width="300"
        >
            <v-card
                    color="primary"
                    dark
            >
                <v-card-text>
                    正在发送···
                    <v-progress-linear
                            indeterminate
                            color="white"
                            class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import * as Quill from 'quill'  //引入编辑器
    import ImageResize from 'quill-image-resize-module'
    import {ImageExtend, QuillWatch} from 'quill-image-extend-module'

    Quill.register('modules/imageResize', ImageResize);
    Quill.register('modules/ImageExtend', ImageExtend);

    export default {
        name: "AnswerPublish",
        data() {
            return {
                content: '',
                dialog: false,
                price: ['0', '￥19.9', '￥29.9', '￥69.9', '￥99.9'],
                editorOption: {
                    modules: {
                        ImageExtend: {
                            loading: true,  // 可选参数 是否显示上传进度和提示语
                            name: 'picture',  // 图片参数名
                            size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                            action: 'https://hanerx.tk:5000/api/upload/upload_picture',  // 服务器地址, 如果action为空，则采用base64插入图片
                            // response 为一个函数用来获取服务器返回的具体图片地址
                            // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                            // 则 return res.data.url
                            response: (res) => {
                                return res.data;
                            },
                        },
                        imageResize: {
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        },
                        toolbar: {
                            container: [['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                                [{'header': [1, 2, 3, 4, false]}, {'list': 'ordered'}, {'list': 'bullet'}],
                                [{'indent': '-1'}, {'indent': '+1'}],
                                ['blockquote', 'code-block', 'link', 'image', 'formula'],
                                [{'color': []}, {'background': []}]],
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    },
                    placeholder: '请在此输入内容'
                },
                busy: false,
            }
        },
        methods: {
            send() {
                if (this.content !== '') {
                    this.busy = true;
                    let data = {
                        answer: this.content,
                        order_id: this.$route.query.id,
                        token: this.$store.state.token
                    };
                    this.$api.specialist.confirm_order(data).then(res => {
                        if (res.data.code === 1) {
                            this.busy = false;
                            this.$router.back()
                        } else {
                            this.$store.commit('showInfo', res.data.msg);
                            this.busy = false;
                        }
                    })
                } else {
                    this.$store.commit('showInfo', '回答不能为空！');
                }
            }
        },
        mounted() {
            // var editor = new Edit(this.$refs.editor)
            // editor.customConfig.onchange = (html) => {
            //     this.editorContent = html
            // }
            // editor.create()
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

    .head {
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
        width: 100%;
        height: 4em;
        background-color: #eee;
    }

    .toolbar {
        border-bottom: 1px solid #ccc;
        border-top: 1px solid #ccc;
    }

    .text {
        border-bottom: 1px solid #ccc;
        height: 400px;
        font-size: 1.1em;
    }

    .quill-editor {
        height: 100%;
    }
</style>
