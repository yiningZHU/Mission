// TypeScript file
var Oberserver = (function () {
    function Oberserver() {
    }
    var d = __define,c=Oberserver,p=c.prototype;
    p.onchange = function (task) {
    };
    return Oberserver;
}());
egret.registerClass(Oberserver,'Oberserver');
var taskNum = 0;
var Task = (function () {
    function Task(id, name) {
        this.id = id;
        this.name = name;
        console.log(this.id + ":" + this.name);
    }
    var d = __define,c=Task,p=c.prototype;
    p.getid = function () {
        return this.id;
    };
    p.getname = function () {
        return this.name;
    };
    p.getstatus = function () {
        return this.status;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskPanel = (function () {
    function TaskPanel() {
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    //button;
    p.onchange = function (task) {
        console.log("PanelonChange" + task.getname());
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel');
var DialoguePanel = (function () {
    function DialoguePanel() {
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
    };
    return DialoguePanel;
}());
egret.registerClass(DialoguePanel,'DialoguePanel');
var NPC = (function () {
    //textrue:egret.Texture = RES.getRes("task_png");
    function NPC() {
        this.emoji = new egret.Bitmap();
        this.emoji.texture = RES.getRes("task_png");
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onchange = function (task) {
        console.log("NPConChange: " + task.getid + "," + task.getname());
    };
    p.onNPCClick = function () {
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (evt) {
            var dia = new DialoguePanel();
        }, this);
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC');
var Taskservice = (function () {
    function Taskservice() {
        this.oberserver = [];
        this.taskList = [];
    }
    var d = __define,c=Taskservice,p=c.prototype;
    p.addTask = function (task) {
        if (task.getstatus() == TaskStatus.ACCEPTABLE) {
            this.taskList[taskNum] = task;
        }
        if (task.getstatus() == TaskStatus.UNACCEPTABLE) {
            console.log(task.getid() + "," + task.getname + " is UNACCEPTABLE!");
        }
    };
    p.finish = function (id) {
    };
    p.accpet = function (id) {
    };
    p.getTaskByCustomRole = function (rule) {
    };
    p.notify = function () {
    };
    return Taskservice;
}());
egret.registerClass(Taskservice,'Taskservice');
var ErroCode;
(function (ErroCode) {
    ErroCode[ErroCode["SUCCESS"] = 0] = "SUCCESS";
    ErroCode[ErroCode["ERRO_TASK"] = 1] = "ERRO_TASK";
})(ErroCode || (ErroCode = {}));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED"; //4
})(TaskStatus || (TaskStatus = {}));
