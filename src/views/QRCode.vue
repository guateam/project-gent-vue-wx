<template>
    <div class="bigbox">
        <div class="qr-code">
            <v-toolbar dark flat color="primary" app dense scroll-off-screen>
                <v-btn icon @click="$router.back()">
                    <v-icon>arrow_back</v-icon>
                </v-btn>

                <v-toolbar-title class="headline" style="margin: 0 auto">
                    <span>我的二维码</span>
                </v-toolbar-title>

                <v-btn icon>
                    <v-icon>share</v-icon>
                </v-btn>
            </v-toolbar>
            <div class="qr_code_box">
                <canvas class="qr_code" id="canvas" @click="save_qr_code"/>

            </div>
            <div class="grey--text notice">点击保存二维码</div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcode';

    export default {
        name: "QRCode",
        data() {
            return {
                timeOutEvent: null,
                plusReady: null,
            }
        },
        methods: {
            save_qr_code() {
                let canvas = document.getElementById('canvas');
                let url = canvas.toDataURL("image/jpeg");
                let that = this;
                console.info('!');
                this.plusReady(function () {
                    bitmap = new plus.nativeObj.Bitmap(that.$route.query.text);
                    bitmap.loadBase64Data(url, function () {
                        console.log("加载Base64图片数据成功");
                        bitmap.save("_doc/" + that.$route.query.text + ".jpg", {}, function (i) {
                            console.log('保存图片成功：' + JSON.stringify(i));
                        }, function (e) {
                            console.log('保存图片失败：' + JSON.stringify(e));
                        });
                    }, function () {
                        console.log('加载Base64图片数据失败：' + JSON.stringify(e));
                    });
                });
            },
            share() {
                this.plusReady(function () {
                    let Context = plus.android.importClass("android.content.Intent");
                    let Main = plus.android.runtimeMainActivity();
                    let shareIntent = new Context(Context.ACTION_SEND);
                    shareIntent.setType("text/plain");
                    shareIntent.putExtra(Context.EXTRA_TEXT, '我分享了我的专+二维码，欢迎关注我');
                    Main.startActivity(Context.createChooser(shareIntent, this.$route.query.text));
                });
            }
        },
        mounted() {
            let canvas = document.getElementById('canvas');

            QRCode.toCanvas(canvas, this.$route.query.text, {
                errorCorrectionLevel: 'H',
                width: 256,
                color: {dark: '#ffcc00'}
            });
            this.plusReady = function (callback) {
                if (window.plus) {
                    callback();
                } else {
                    document.addEventListener('plusready', callback);
                }
            };
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
    .qr_code_box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 11em;
    }

    /*.qr_code {*/
    /*margin-top: 7em;*/
    /*margin-left: 5.5em;*/
    /*}*/

    .notice {
        margin-top: 1em;
        text-align: center;
    }
</style>
