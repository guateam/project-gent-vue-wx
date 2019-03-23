<template>
    <div class="bigbox">
        <div class="head">
            <div style="width: 45px;height: 45px;margin-left: 14px;display: flex;align-items: center;justify-content: center;">
                <v-icon large color="white" @click="$router.back()">keyboard_arrow_left</v-icon>
            </div>
            <span style="color: #fff;font-size: 20px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">付费咨询</span>
            <div style="width: 45px;height: 45px;margin-right: 14px;display: flex;align-items: center;justify-content: center;color: #fff;font-size: 17px;font-weight: 500;line-height: 1;letter-spacing: .02em;font-family: Roboto,sans-serif;">
                <v-layout row justify-center>
                    <v-dialog v-model="dialog" persistent fullscreen="">
                        <template v-slot:activator="{ on }">
                            <div v-on="on" style="line-height: 1em;">发送</div>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">确认发送</span>
                            </v-card-title>
                            <v-card-text>
                                <Form :model="formItem">
                                    <FormItem label="悬赏金额">
                                        <Input v-model.number="formItem.price" type="number">
                                            <span slot="prepend">￥</span>
                                            <span slot="append">元</span>
                                        </Input>
                                        <!--<Slider :value="formItem.price" :step="0.1" :max="100"></Slider>-->
                                    </FormItem>
                                </Form>

                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red" flat @click="dialog = false">关闭</v-btn>
                                <v-btn color="primary" flat @click="send()">确认</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-layout>
            </div>
        </div>
        <div class="line"></div>

        <!--富文本编辑器采用的wangEditor-->
        <!--git地址https://github.com/wangfupeng1988/wangEditor-->


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
    import 'iview/dist/styles/iview.css';

    Quill.register('modules/imageResize', ImageResize);
    Quill.register('modules/ImageExtend', ImageExtend);
    export default {
        name: "AdvisoryPublish",
        data() {
            return {
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
                content: '',
                dialog: false,
                formItem: {
                    price: 0
                },
                busy: false,
            }
        },
        methods: {
            send() {
                if (this.content === '') {
                    this.$store.commit('showInfo', '问题不能为空！');
                    return;
                }
                if (this.formItem.price <= 0 || this.formItem.price == null) {
                    this.$store.commit('showInfo', '价格不能为负！');
                    return;
                }
                this.busy = true;
                let data = {
                    token: this.$store.state.token,
                    content: this.content,
                    price: this.formItem.price,
                    target: this.$route.query.id
                };
                this.$api.specialist.add_order(data).then(res => {
                    if (res.data.code === 1) {
                        this.busy = false;
                        this.$router.back()
                    } else {
                        this.$store.commit('showInfo', res.data.msg);
                        this.busy = false;
                    }
                })
            }
        },
        mounted() {
            if (this.$store.state.userInfo.level < 2) {
                this.editorOption = {
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
                            ],
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                    QuillWatch.emit(this.quill.id)
                                }
                            }
                        }
                    },
                    placeholder: '请在此输入内容'
                };
            }
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