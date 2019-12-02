<template>
    <div class="jsbjl">
        <div class="header">
            <div class="leftBar" @click="getPanel">
                <div>
                    <span>庄</span>
                    <p>15</p>
                </div>
                <div>
                    <span>闲</span>
                    <p>15</p>
                </div>
                <div>
                    <span>和</span>
                    <p>15</p>
                </div>
                <div>
                    <span>对</span>
                    <p>15</p>
                </div>
                <div>
                    <span>对</span>
                    <p>15</p>
                </div>
            </div>
            <div class="cardBox open">
                <div class="cardList row1">
                    <div class="poker"></div>
                    <div class="poker"></div>
                    <div class="poker"></div>
                    <div class="poker"></div>
                    <div class="poker"></div>
                </div>
                <div class="cardList row2">
                    <div class="poker"></div>
                    <div class="poker"></div>
                    <div class="poker"></div>
                    <div class="poker"></div>
                    <div class="poker"></div>
                </div>
                <div class="cardList openResult">
                    <div class="poker rt num1 xianPush"></div>
                    <div class="poker rt num1"></div>
                    <div class="poker rt num1"></div>
                    &nbsp;&nbsp;
                    <div class="poker bt num1"></div>
                    <div class="poker mh num1"></div>
                    <div class="poker fk num1 zhuangPush"></div>
                </div>
            </div>
            <div class="resultBox">
                <div class="xBox win">
                    <span>闲</span>
                    <span>5</span>
                </div>
                <div class="zBox win">
                    <span>庄</span>
                    <span>5</span>
                </div>
            </div>
            <transition name="fadeInLeft">
                <bjl-panel v-show="isShowPanel" class="bjlPanel"></bjl-panel>
            </transition>
        </div>
        <div class="betBox">
            <div class="deskUp">
                <div class="module">
                    <span>非免佣</span>
                </div>
                <div class="status">
                    <span>未开盘</span>
                </div>
                <div class="help">
                    <span>？</span>
                </div>
            </div>
            <div class="desk">
                <j-bet class="zhuang" :item="play.zhuang"/>
                <div class="other">
                    <div class="up">
                        <j-bet class="xlb" :item="play.xlb"/>
                        <j-bet class="zlb" :item="play.zlb"/>
                    </div>
                    <div class="middle">
                        <j-bet class="da" :item="play.da"/>
                        <j-bet class="he" :item="play.he"/>
                        <j-bet class="xiao" :item="play.xiao"/>
                    </div>
                    <div class="bottom">
                        <j-bet class="xiandui" :item="play.xiandui"/>
                        <j-bet class="zhuangdui" :item="play.zhuangdui"/>
                    </div>
                </div>
                <j-bet class="xian" :item="play.xian"/>
            </div>
            <div class="deskBottom"></div>
        </div>
        
    </div>
</template>


<script>
import BjlPanel from './BjlPanel'
import JBet from './JBet'
export default {
    name:'jsbjl',
    data(){
        return{
            play:{
                zhuang:{name:'庄',status:'1:2',isBig:true,type:1}, //name=> 名称, status=> 赔率或者是否封盘或者是否赔, isBig=> 字体是否是大字体, type=> 类型 1右边 2左边 3和
                zlb:{name:'庄龙宝',status:'1:2',isBig:false,type:1},
                xiao:{name:'小',status:'1:2',isBig:false,type:1},
                zhuangdui:{name:'庄对',status:'1:2',isBig:false,type:1},
                xian:{name:'闲',status:'1:2',isBig:true,type:2},
                xlb:{name:'闲龙宝',status:'1:2',isBig:false,type:2},
                da:{name:'大',status:'1:2',isBig:false,type:2},
                xiandui:{name:'闲对',status:'1:2',isBig:false,type:2},
                he:{name:'和',status:'1:2',isBig:false,type:3},
            },
            isShowPanel: false,
        }
    },
    methods:{
        getPanel(){
            this.isShowPanel = !this.isShowPanel;
        }
    },
    components:{
        JBet,
        BjlPanel
    }
}
</script>


<style lang="scss" scoped>
.jsbjl{
    font-size: px2rem(14px);
    .header{
        position: relative;
        background-color: black;
        background-image: url('../../../assets/images/bjlBanner.png');
        background-size: 100% 100%;
        width: 100%;
        height: px2rem(230px);
        .leftBar{
            position: absolute;
            top: px2rem(10px);
            z-index: 1;
            left: 0;
            display: flex;
            flex-direction: column;
            height: px2rem(180px);
            width: px2rem(30px);
            color: #fff;
            font-size: px2rem(24px);
            div{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }
            div:nth-of-type(1){
                border-top-right-radius: 5px;
                background-color: #ff373e;
            }
            div:nth-of-type(2){
                background-color: #3374ff;
            }
            div:nth-of-type(3){
                background-color: #149966;
            }
            div:nth-of-type(4){
                border:1px solid #ff373e;
            }
            div:nth-of-type(5){
                border-bottom-right-radius: 5px;
                border:1px solid #3374ff;
            }
        }
        .cardBox{
            display: flex;
            flex-direction: column;
            &.open{
                transform: scale(.8);
            }
            .cardList{
                margin-top: px2rem(10px);
                display: flex;
                flex: 1;
                padding: 0 px2rem(10px) 0 px2rem(40px);
                height: px2rem(50px);
                &.row1{
                     @each $num in (
                        (1,2,3,4,5)
                    ){
                        .poker:nth-of-type(#{$num}){
                            animation: fadeDownAni ease .5s * $num both; 
                        }
                    }
                }
                &.row2{
                    @each $num in (
                        (1,2,3,4,5)
                    ){
                        .poker:nth-of-type(#{$num}){
                            animation: fadeDownAni ease .5s * ($num+5) both; 
                        }
                    }
                }
                .poker{
                    flex: 1;
                    margin: 0 px2rem(5px);
                    position: relative;
                    &:after{
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: '';
                        display: block;
                        background-image: url('../../../assets/images/pokerBg.png');
                        background-size: 100% 100%;
                        width: 100%;
                        height: 100%;
                    }
                    &:before{
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: '';
                        display: block;
                        background-image: url('../../../assets/images/poker.png');
                        background-size: px2rem(157.8px) px2rem(684px);
                        width: 100%;
                        height: 100%;
                        border-radius: 5px;
                        display: none;
                    }
                    &.fk{
                        &:before{
                            display: block;
                            background-position-x: 0;
                        }
                        &:after{
                            display: none;
                        }
                        @each $num in (
                            (0,1,2,3,4,5,6,7,8,9,10,11,12)
                        ){
                            &.num#{$num}:before{
                                background-position-y: px2rem(52.4px * $num,false);
                            }
                        }
                    }
                    &.mh{
                        &:before{
                            display: block;
                            background-position-x: px2rem(40px,false);;
                        }
                        &:after{
                            display: none;
                        }
                        @each $num in (
                            (0,1,2,3,4,5,6,7,8,9,10,11,12)
                        ){
                            &.num#{$num}:before{
                                background-position-y: px2rem(52.4px * $num,false);
                            }
                        }
                    }
                    &.rt{
                        &:before{
                            display: block;
                            background-position-x: px2rem(80px,false);
                        }
                        &:after{
                            display: none;
                        }
                        @each $num in (
                            (0,1,2,3,4,5,6,7,8,9,10,11,12)
                        ){
                            &.num#{$num}:before{
                                background-position-y: px2rem(52.4px * $num,false);
                            }
                        }
                    }
                    &.bt{
                        &:before{
                            display: block;
                            background-position-x: px2rem(120px,false);
                        }
                        &:after{
                            display: none;
                        }
                        @each $num in (
                            (0,1,2,3,4,5,6,7,8,9,10,11,12)
                        ){
                            &.num#{$num}:before{
                                background-position-y: px2rem(52.4px * $num,false);
                            }
                        }
                    }
                }
            }
            .openResult{
                margin-top: px2rem(20px);
                color: #144fa9;
                position: relative;
                padding: 0 px2rem(40px) 0 px2rem(80px);
                .xianPush{
                    position: absolute;
                    width: px2rem(40px);
                    height: px2rem(50px);
                    left: px2rem(20px);
                }
                .zhuangPush{
                    position: absolute;
                    width: px2rem(40px);
                    height: px2rem(50px);
                    right: px2rem(15px,false);
                }
                .xianPush:before{
                    transform: rotate(-90deg);
                }
                .zhuangPush:before{
                    transform: rotate(90deg);
                }
                .poker{
                    margin: 0 px2rem(3px);
                }
            }
        }
        .resultBox{
            position: relative;
            top: px2rem(-10px);
            display: flex;
            padding: 0 px2rem(50px);
            justify-content: space-between;
            div{
                border-radius: 5px;
                padding: px2rem(3px) px2rem(10px);
                background-color: rgba(0,0,0,.5);
                color: #fff;
                font-size: 18px;
                
                &.xBox{
                    span:nth-of-type(1){
                        color: rgb(80, 141, 255);
                        font-weight: bold;
                    }
                    &.win{
                        border: 3px solid rgb(4, 186, 238);
                    }
                }
                &.zBox{
                    span:nth-of-type(1){
                        color: rgb(255, 84, 91);
                        font-weight: bold;
                    }
                    &.win{
                        border: 3px solid rgb(255, 84, 91);
                    }
                }
                
            }
        }
        .bjlPanel{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: px2rem(222px);
        }
    }
    .betBox{
        position: relative;
        height: px2rem(250px);
        width: 100%;
        display: flex;
        flex-direction: column;
        .deskUp{
            position: absolute;
            top: px2rem(-10px);
            background-image: url('../../../assets/images/deskUp.png');
            background-size: 100% 100%;
            height: px2rem(40px);
            width: 100%;
            display: flex;
            div{
                flex: 1;
                justify-content: center;
                align-items: center;
                height: px2rem(35px);
                display: flex;
                color: #fff;
                font-size: px2rem(24px);
                &.status{
                    span{
                        padding-bottom: px2rem(5px);
                    }
                }
                &.module{
                    span{
                        background-image: url('../../../assets/images/moduleBg.png');
                        background-size: 100% 100%;
                        display: block;
                        width: px2rem(80px);
                        text-align: center;
                        line-height: px2rem(28px);
                        height: px2rem(35px);
                    }
                }
                &.help{
                    span{
                        background-image: url('../../../assets/images/helpBtn.png');
                        background-size: 100% 100%;
                        display: block;
                        width: px2rem(40px);
                        padding-left: px2rem(5px);
                        text-align: center;
                        line-height: px2rem(28px);
                        height: px2rem(35px);
                    }
                }
            }
        }
        .desk{
            padding: px2rem(10px) 0;
            background-color: #184fa2;
            box-shadow: inset 0 0 94px 50px #144fa9;
            flex: 1;
            display: flex;
            color: #4f8cfd;
            .zhuang,.xian{
                width: px2rem(60px);
            }
            .other{
                flex: 1;
                border-left: 1px solid rgba(255,255,255,.3);
                border-right: 1px solid rgba(255,255,255,.3);
                display: flex;
                flex-direction: column;
                .middle{
                    flex: 1;
                    border-top: 1px solid rgba(255,255,255,.3);
                    border-bottom: 1px solid rgba(255,255,255,.3);
                    display: flex;
                    div{
                        flex: 1;
                    }
                    div:nth-of-type(2){
                        border-left: 1px solid rgba(255,255,255,.3);
                        border-right: 1px solid rgba(255,255,255,.3);
                    }
                }
                .up,.bottom{
                    flex: 1;
                    display: flex;
                    div{
                        flex: 1;
                    }
                    div:nth-of-type(2){
                        border-left: 1px solid rgba(255,255,255,.3);
                    }
                }
            }
        }
        .deskBottom{
            position: absolute;
            bottom: 0;
            background-image: url('../../../assets/images/deskBottom.png');
            background-size: 100% 100%;
            height: px2rem(30px);
            width: 100%;
        }
    }
}

.fadeInLeft-enter-active,.fadeInLeft-leave-active{
    transition: all .5s;
}

.fadeInLeft-enter,.fadeInLeft-leave-to{
    transform: translate3d(-100%,0,0);
}
@keyframes fadeDownAni {
    from{transform: translate3d(0,-800%,0) rotate(360deg)}
}
</style>
