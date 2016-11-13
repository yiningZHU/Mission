// TypeScript file
var Task = (function () {
    function Task(id, name) {
        this.id = id;
        this.name = name;
        console.log("task:111");
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
    p.addTask = function () {
    };
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
//# sourceMappingURL=Task.js.map