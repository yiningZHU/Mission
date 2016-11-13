// TypeScript file
var taskNum = 0;
var Task = (function () {
    function Task(id, name) {
        this.id = id;
        this.name = name;
        console.log(this.id + ":" + this.name);
    }
    var d = __define,c=Task,p=c.prototype;
    p.setStstus = function (status) {
        this.status = status;
    };
    p.settoNPCid = function (id) {
        this.toNPCid = id;
    };
    p.setfromNPCid = function (id) {
        this.fromNPCid = id;
    };
    p.getfromNPCid = function () {
        return this.fromNPCid;
    };
    p.gettoNPCid = function () {
        return this.toNPCid;
    };
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
    p.onchange = function (task) {
        //console.log("PanelonChange"+task.getname());
        this.task_textField.text = task.getid + " : " + task.getname;
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Oberserver"]);
var DialoguePanel = (function () {
    function DialoguePanel() {
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        this.button.addEventListener();
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
    /*fromnpc:string;
    tonpc:string;
    tast:string;*/
    p.onchange = function (task) {
        //this.fromnpc = task.getfromNPCid();
        //this.tonpc = task.gettoNPCid();
        console.log("NPConChange: " + task.getid + "," + task.getname());
    };
    p.onNPCClick = function () {
        console.log("This bitmap has been touuched!1");
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Oberserver"]);
var Taskservice = (function () {
    function Taskservice() {
        this.oberserver = [];
        this.taskList = [];
    }
    var d = __define,c=Taskservice,p=c.prototype;
    p.addTask = function (task) {
        //this.oberserver.
        if (task.getstatus() == TaskStatus.ACCEPTABLE) {
            this.taskList[taskNum] = task;
            taskNum++;
            console.log(task.getid() + "," + task.getname() + " has been added!");
        }
        if (task.getstatus() == TaskStatus.UNACCEPTABLE) {
            //alert(task.getid() + ","+task.getname() +" is UNACCEPTABLE!");
            console.log(task.getid() + "," + task.getname() + " is UNACCEPTABLE!");
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
//# sourceMappingURL=Task.js.map