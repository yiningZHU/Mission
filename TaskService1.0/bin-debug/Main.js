//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main,p=c.prototype;
    p.onAddToStage = function (event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    p.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    p.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建游戏场景
     * Create a game scene
     */
    p.createGameScene = function () {
        var _this = this;
        var service = new Taskservice();
        var taskPanel = new TaskPanel();
        service.addObserver(taskPanel);
        var id = "001";
        var name = "Get the coin!";
        var task1 = new Task(id, name);
        var npc0 = "npc_0";
        var npc1 = "npc_1";
        var dialogurPanel = new DialoguePanel();
        var pic_MissionStart = "task_png";
        var pic_MissionFinish = "taskfinish_png";
        var npc_1 = new NPC();
        service.addObserver(npc_1);
        var npc_2 = new NPC();
        service.addObserver(npc_2);
        task1.setfromNPCid(npc0);
        task1.settoNPCid(npc1);
        task1.setStatus(TaskStatus.ACCEPTABLE);
        service.addTask(task1);
        npc_1.seiEmoji(pic_MissionStart);
        npc_2.seiEmoji(pic_MissionFinish);
        //this.addChild(npc_1.emoji);
        npc_1.emoji.x = 100;
        npc_1.emoji.y = 100;
        this.addChild(taskPanel.task_textField);
        //当我点击fromNPC的图标
        this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            console.log("This bitmap has been touuched!2");
            npc_1.onNPCClick(dialogurPanel);
            dialogurPanel.dialogue_textField.x = npc_1.emoji.x;
            dialogurPanel.dialogue_textField.y = npc_1.emoji.y - 50;
            dialogurPanel.accept.x = dialogurPanel.dialogue_textField.x + 100;
            dialogurPanel.accept.y = dialogurPanel.dialogue_textField.y + 50;
            //this.addChild(dialogurPanel.button);
            dialogurPanel.dialogue_textField.textAlign = egret.HorizontalAlign.CENTER;
            dialogurPanel.dialogue_textField.textAlign = egret.VerticalAlign.MIDDLE;
            //dialogurPanel.background.x = dialogurPanel.dialogue_textField.x;
            //dialogurPanel.background.y = dialogurPanel.dialogue_textField.y;
            _this.addChild(dialogurPanel.dialogue_textField);
            _this.addChild(dialogurPanel.accept);
            //this.addChild(dialogurPanel.background);
        }, this);
        dialogurPanel.onButtonClick();
        //当我点击接受按钮的时候
        //this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
        //},this);
        /*var sky:egret.Bitmap = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        var topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        var icon:egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        var line = new egret.Shape();
        line.graphics.lineStyle(2,0xffffff);
        line.graphics.moveTo(0,0);
        line.graphics.lineTo(0,117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        var colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "Hello Egret";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);

        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }*/
        /**
         * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
         * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
         */
        /*private createBitmapByName(name:string):egret.Bitmap {
            var result = new egret.Bitmap();
            var texture:egret.Texture = RES.getRes(name);
            result.texture = texture;
            return result;
        }*/
        /**
         * 描述文件加载成功，开始播放动画
         * Description file loading is successful, start to play the animation
         */
        /*
        private startAnimation(result:Array<any>):void {
            var self:any = this;
    
            var parser = new egret.HtmlTextParser();
            var textflowArr:Array<Array<egret.ITextElement>> = [];
            for (var i:number = 0; i < result.length; i++) {
                textflowArr.push(parser.parser(result[i]));
            }
    
            var textfield = self.textfield;
            var count = -1;
            var change:Function = function () {
                count++;
                if (count >= textflowArr.length) {
                    count = 0;
                }
                var lineArr = textflowArr[count];
    
                self.changeDescription(textfield, lineArr);
    
                var tw = egret.Tween.get(textfield);
                tw.to({"alpha": 1}, 200);
                tw.wait(2000);
                tw.to({"alpha": 0}, 200);
                tw.call(change, self);
            };
    
            change();
            */
    };
    /**
     * 切换描述内容
     * Switch to described content
     */
    p.changeDescription = function (textfield, textFlow) {
        textfield.textFlow = textFlow;
    };
    return Main;
}(egret.DisplayObjectContainer));
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map