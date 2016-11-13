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
var TaskService = (function () {
    function TaskService() {
        this.oberserver = [];
        this.taskList = [];
    }
    var d = __define,c=TaskService,p=c.prototype;
    p.addTask = function (task) {
    };
    return TaskService;
}());
egret.registerClass(TaskService,'TaskService');
//# sourceMappingURL=TaskService.js.map