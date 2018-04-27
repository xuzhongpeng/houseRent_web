<template>
  <div>
      <footer>
        <div class="footer" id="magix_vf_footer">  
            <div class="foot-left">          
                <div class="foot-content" p-id="43">
                    <div class="title">租房网</div>
                    XX租房网，旨在提供最优质的房源，用最好的服务给各位带来更高的生活品质。
                </div>
                <div class="foot-copy-right" p-id="47">©all, powered by XZP.
                    <a href="javascript:;" class="fa-click ml5" mx-click="showLegal()" p-id="49">法律声明</a>
                    <br>转载内容版权归作者及来源网站所有，
                    本站原创内容转载请注明来源， <br>商业媒体及纸媒请先联系：xuzhongpeng@foxmail.com
                </div>
            </div>
       
            <div class="foot-right" p-id="53">
                <div class="links-title" p-id="54">友情链接</div>
                <ul class="links clearfix" p-id="56"><li p-id="57">
                    <a href="http://xuzhongpeng.github.io/" target="_blank" p-id="58">github</a></li>
                    <li p-id="60">
                        <a href="https://chongqing.anjuke.com" target="_blank" p-id="61">安居客</a>
                    </li>
                    <li p-id="63">
                        <a href="http://cq.58.com/" target="_blank" p-id="64">58同城</a>
                    </li>
                </ul>            
            </div>
        </div>
      </footer>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.footer .foot-left .foot-content {
    margin-top: 25px;
}

footer{
    font-size: 12px;
    text-align: left;
    height: 200px;
    background: #06060b;
    color: #60606d;
    .footer{
        width: 1160px!important;
        margin: 0 auto;
        position: relative;
        .foot-left{
            width: 636px;
            height: 100%;
            margin-top: 45px;
            overflow: hidden;
            font-size: 12px;
            line-height: 18px;
            .foot-copy-right,.foot-content{
                margin-top: 27px;
            }
            a{
              color: #60606d;
            }
        }
        .foot-right{
            width: 380px;
            position: absolute;
            right: 0;
            top: 45px;
            ul{
                list-style-type: none;
                li{
                    float: left;
                    padding: 0 2px;
                    margin-bottom: 5px;
                    margin-right: 15px;
                    a{
                        color: #60606d;
                    }
                }
            }
        }
    }
}


</style>
