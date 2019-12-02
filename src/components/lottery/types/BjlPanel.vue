<template>
    <div class="panel">
        <div class="title">线路</div>
        <div class="data">
            <div class="ball blue">庄</div>
            <div class="ball red">闲</div>
            <div class="ball green">和</div>
            <div class="ball red red-dot">庄</div>
            <div class="ball blue blue-dot">闲</div>
            <div class="ball red"></div>
            <div class="ball blue"></div>
            <div class="ball red-circle">1</div>
            <div class="ball blue-circle">1</div>
            <div class="ball red-slash"></div>
            <div class="ball blue-slash"></div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div><div class="ball">庄</div>
            <div class="ball">闲</div>
            <div class="ball">和</div>
            
        </div>
        <div class="tabs">
            <span>珠盘路</span>
            <span>大路</span>
            <span>大眼仔</span>
            <span>小路</span>
            <span>曱甴路</span>
        </div>
    </div>
</template>


<script>
export default {
    name:'panel',
}
</script>

<style lang="scss" scoped>
.panel{
    background-color: #000;
    display: flex;
    flex-direction: column;
    font-size: 16px;
    color: #fff;
    .title{
        height: 20px;
        line-height: 20px;
        padding: 8px 0;
        text-align: center;
    }
    .data{
        flex: 1;
        display: flex;
        flex-flow: column wrap;
        padding: 0 40px;
        .ball{
            width: 20px;
            height: 20px;
            font-size: 12px;
            margin: 1px;
            border: 1px solid rgb(64, 64, 64);
            box-sizing: border-box;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            &.blue{
                background-color: rgb(15, 92, 236);
                border-color:rgb(15, 92, 236);
            }
            &.green{
                background-color: rgb(20, 163, 113);
                border-color:rgb(20, 163, 113);
            }
            &.red{
                background-color: rgb(255, 64, 71);
                border-color:rgb(255, 64, 71);
            }
            &.red{
                background-color: rgb(255, 64, 71);
                border-color:rgb(255, 64, 71);
            }
            &.red-dot{
                position: relative;
                &:before{
                    content: "";
                    position: absolute;
                    top: -3px;
                    left: -3px;
                    width: 6px;
                    height: 6px;
                    display: block;
                    background-color: rgb(255, 64, 71);
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(0, 0, 0);
                    border-image: initial;
                    border-radius: 50%;
                }
            }
            &.blue-dot{
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    bottom: -3px;
                    right: -3px;
                    width: 6px;
                    height: 6px;
                    display: block;
                    background-color: rgb(15, 92, 236);
                    border-width: 1px;
                    border-style: solid;
                    border-color: rgb(0, 0, 0);
                    border-image: initial;
                    border-radius: 50%;
                }
            }
            &.red-circle{
                color: rgb(20, 163, 113);
                font-weight: bold;
                border-width: 2px;
                border-style: solid;
                border-color: rgb(255, 64, 71);
                border-image: initial;
            }
            &.blue-circle{
                color: rgb(20, 163, 113);
                font-weight: bold;
                border-width: 2px;
                border-style: solid;
                border-color: rgb(15, 92, 236);
                border-image: initial;
            }
            &.red-slash{
                &:before{
                    content: "";
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%) rotate(-45deg);
                    left: 0px;
                    right: 0px;
                    border-bottom: 4px solid rgb(255, 64, 71);
                }
            }
            &.blue-slash{
                &:before{
                    content: "";
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    transform: translateY(-50%) rotate(-45deg);
                    left: 0px;
                    right: 0px;
                    border-bottom: 4px solid rgb(15, 92, 236);
                }
            }
        }
    }
    .tabs{
        height: 50px;
        padding: 0 30px;
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        span{
            padding: 2px 3px;
            border: 1px solid #fff;
            border-radius: 5px;
            margin: 0 2px;
        }
    }
}

  .weui-grids:before, .weui-grid:before {
    border: none;
  }

  .weui-grids:after, .weui-grid:after {
    border: none;
  }
</style>
