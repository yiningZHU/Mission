// TypeScript file
var taskNum = 0;
var obserNum = 0;
var Task = (function () {
    function Task(id, name) {
        this.id = id;
        this.name = name;
        console.log(this.id + ":" + this.name);
    }
    var d = __define,c=Task,p=c.prototype;
    p.setStatus = function (status) {
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
    p.getStatus = function () {
        return this.status;
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskPanel = (function () {
    //_taskService:Taskservice;
    function TaskPanel() {
        this.task_textField = new egret.TextField();
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onchange = function (task) {
        //console.log("PanelonChange"+task.getname());
        this.task = task;
        this.task_textField.text = task.getid() + " : " + task.getname();
    };
    p.init_rule = function () {
        var rule = function (taskList) {
            for (var id in taskList) {
                var task = taskList[id];
                if (task.getStatus() == TaskStatus.CAN_SUBMIT) {
                    return task;
                }
            }
            for (var id in taskList) {
                var task = taskList[id];
                if (task.getStatus() == TaskStatus.ACCEPTABLE) {
                    return task;
                }
            }
        };
    };
    return TaskPanel;
}());
egret.registerClass(TaskPanel,'TaskPanel',["Oberserver"]);
var DialoguePanel = (function () {
    //button:egret.Shape;
    //background:egret.Shape;
    //task:Task;
    function DialoguePanel() {
        this.dialogue_textField = new egret.TextField();
        this.accept = new egret.TextField();
        this.dialogue_textField.text = "Do you want to accept this TASK ?";
        this.accept.text = "Accept";
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function () {
        var _this = this;
        this.accept.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            _this.dialogue_textField.text = "This TASK has been accepted.";
            console.log("This ACCEPT has been touuched!");
        }, this);
    };
    return DialoguePanel;
}());
egret.registerClass(DialoguePanel,'DialoguePanel');
var NPC = (function () {
    function NPC() {
        this.emoji = new egret.Bitmap();
        this.emoji.texture = RES.getRes("task_png");
        //this.service.setInstance(this.service);
    }
    var d = __define,c=NPC,p=c.prototype;
    //对于图标的改变，应该在NPC的onchange（）之中改变，因为这个贴图的改变是根据状态决定，而不是点击
    p.onchange = function (task) {
        this.t = task;
        var id = this.t.getid();
        var name = this.t.getname();
        if (task.getStatus() == TaskStatus.ACCEPTABLE) {
            this.emoji.texture = RES.getRes("taskfinish_png");
        }
        console.log("NPConChange: " + task.getid + "," + task.getname());
    };
    p.onNPCClick = function (diapanel) {
        console.log("This diapanel has been added!");
    };
    return NPC;
}());
egret.registerClass(NPC,'NPC',["Oberserver"]);
var Taskservice = (function () {
    function Taskservice() {
        //private static instance = new Taskservice();
        //private static count:number = 0;
        this.oberserverList = [];
        this.taskList = [];
    }
    var d = __define,c=Taskservice,p=c.prototype;
    //constructor()
    //{
    //Taskservice.count++;
    //if(Taskservice.count>1)
    ///{
    //throw "singletton!!!";
    //}
    //}
    /*public setInstance(_instance)
    {
        if(Taskservice.instance == null)
        {
            Taskservice.instance = new Taskservice();
            _instance = Taskservice.instance;
        }
        else
            _instance = Taskservice.instance;
    }*/
    /*public getInstance()
    {
        if(Taskservice.instance==null)
        {
            Taskservice.instance = new Taskservice();
        }
        return Taskservice.instance;
    }*/
    p.addTask = function (task) {
        //this.oberserver.
        if (task.getStatus() == TaskStatus.ACCEPTABLE) {
            this.taskList[task.getid()] = task;
            console.log(this.taskList[task.getid()]);
            //this.oberserver[] = ;
            //console.log(task.getid() + "," + task.getname() + "," + task.getStatus());
            //task.setStatus(TaskStatus.DURING);
            taskNum++;
            console.log(task.getid() + "," + task.getname() + " has been added!" + task.getStatus(), this.taskList[task.getid()].getStatus());
        }
        if (task.getStatus() == TaskStatus.UNACCEPTABLE) {
            alert(task.getid() + "," + task.getname() + " is UNACCEPTABLE!");
            console.log(task.getid() + "," + task.getname() + " is UNACCEPTABLE!");
        }
    };
    p.addObserver = function (o) {
        this.oberserverList.push(o);
        obserNum++;
        console.log("an Observer has been added!  " + obserNum);
    };
    p.finish = function (id) {
        if (id == null) {
            return ErroCode.ERRO_TASK;
        }
        if (this.taskList[id] == null) {
            return ErroCode.MISSING_MISSION;
        }
        console.log("Finish Task " + this.taskList[id] + this.taskList[name]);
        var task;
        task = this.taskList[id];
        if (task.getStatus() == TaskStatus.CAN_SUBMIT) {
            task.setStatus(TaskStatus.SUBMITTED);
            this.notify(task);
            return ErroCode.SUCCESS;
        }
        else
            return ErroCode.ERRO_TASK;
    };
    p.accpet = function (id) {
        if (this.taskList[id] == TaskStatus.SUBMITTED) {
        }
    };
    p.getTaskByCustomRule = function (rule) {
        console.log(this.taskList);
        return rule(this.taskList);
    };
    p.notify = function (task) {
        for (var i in this.oberserverList) {
            this.oberserverList[i].onchange(task);
        }
    };
    return Taskservice;
}());
egret.registerClass(Taskservice,'Taskservice');
var ErroCode;
(function (ErroCode) {
    ErroCode[ErroCode["SUCCESS"] = 0] = "SUCCESS";
    ErroCode[ErroCode["ERRO_TASK"] = 1] = "ERRO_TASK";
    ErroCode[ErroCode["MISSING_MISSION"] = 2] = "MISSING_MISSION";
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