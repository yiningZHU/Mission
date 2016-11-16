// TypeScript file


var taskNum:number = 0;
var obserNum:number =0 ;

class Task
{
    

    private id:string;
    private name:string;
    private status:TaskStatus;

    private desc:string;
    private fromNPCid:string;
    private toNPCid:string;

    constructor(id:string,name:string)
    {
        this.id = id;
        this.name = name;
        console.log(this.id+":"+this.name);
    }

    public setStatus(status:TaskStatus)
    {
        this.status = status;
    }

    public settoNPCid(id:string)
    {
        this.toNPCid = id;
    }
    public setfromNPCid(id:string)
    {
        this.fromNPCid = id;
    }
    public getfromNPCid():string
    {
        return this.fromNPCid;
    }

    public gettoNPCid():string
    {
        return this.toNPCid;
    }

    public getid():string
    {
        return this.id;
    }

    public getname():string
    {
        return this.name;
    }

    public getStatus():TaskStatus
    {
        return this.status;   
    }
    
  
}

class TaskPanel implements Oberserver
{
    task_textField:egret.TextField;
    task:Task;
    //_taskService:Taskservice;

    constructor()
    {
        this.task_textField = new egret.TextField();
    }
    
    onchange(task:Task)
    {
        //console.log("PanelonChange"+task.getname());
        this.task = task;
        this.task_textField.text = task.getid() + " : " + task.getname();
    }


    init_rule()
    {
       let rule=(taskList) => 
       {
           for(var id in taskList)
           {
               var task = taskList[id];
               if(task.getStatus() == TaskStatus.CAN_SUBMIT)
               {
                   return task;
               }
           }
           for(var id in taskList)
           {
               var task = taskList[id];
               if(task.getStatus() == TaskStatus.ACCEPTABLE)
               {
                   return task;
               }
           }
       }
     }
}

class DialoguePanel
{
    dialogue_textField:egret.TextField;
    accept:egret.TextField;
    //button:egret.Shape;
    //background:egret.Shape;
    //task:Task;

    constructor()
    {
        this.dialogue_textField = new egret.TextField();
        this.accept = new egret.TextField();
        this.dialogue_textField.text = "Do you want to accept this TASK ?";
        this.accept.text = "Accept";

    }

    public onButtonClick()
    {
        this.accept.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
        this.dialogue_textField.text = "This TASK has been accepted.";  
        console.log("This ACCEPT has been touuched!");
        },this);

    }
    
}

class NPC implements Oberserver 
{

    emoji:egret.Bitmap;
    t:Task;
    service:Taskservice;
    constructor()
    {
        this.emoji = new egret.Bitmap();
        this.emoji.texture = RES.getRes("task_png");
        //this.service.setInstance(this.service);
    }
    
    //对于图标的改变，应该在NPC的onchange（）之中改变，因为这个贴图的改变是根据状态决定，而不是点击
    onchange(task:Task)
    {
        this.t = task;
        var id:string = this.t.getid();
        var name:string = this.t.getname();
        if(task.getStatus() == TaskStatus.ACCEPTABLE)
        {
            this.emoji.texture = RES.getRes("taskfinish_png");
        }
        console.log("NPConChange: "+task.getid+","+task.getname());
    }

    onNPCClick(diapanel:DialoguePanel)//点击弹出对话面板
    {
        console.log("This diapanel has been added!");
    }

}

class Taskservice 
{
    //private static instance = new Taskservice();
    //private static count:number = 0;
    private oberserverList:Oberserver[]=[];
    private taskList:Task[]=[];
    
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

    public addTask(task:Task)
    {
        //this.oberserver.
        if(task.getStatus() == TaskStatus.ACCEPTABLE)
        {
            this.taskList[task.getid()] = task;
            console.log(this.taskList[task.getid()]);
            //this.oberserver[] = ;
            //console.log(task.getid() + "," + task.getname() + "," + task.getStatus());
            //task.setStatus(TaskStatus.DURING);
            taskNum++;
            console.log(task.getid() + "," + task.getname() + " has been added!" + task.getStatus(),this.taskList[task.getid()].getStatus());
        }
        if(task.getStatus() == TaskStatus.UNACCEPTABLE)
        {
            alert(task.getid() + ","+task.getname() +" is UNACCEPTABLE!");
            console.log(task.getid() + ","+task.getname() +" is UNACCEPTABLE!");
        }
    }

    public addObserver(o:Oberserver)
    {
        this.oberserverList.push(o);
        obserNum++;
        console.log("an Observer has been added!  "+ obserNum);
    }

    public finish(id:string):ErroCode
    {
        if(id == null)
        {
            return ErroCode.ERRO_TASK;
        }
        
        if(this.taskList[id] == null)
        {
            return ErroCode.MISSING_MISSION;
        }
        console.log("Finish Task " + this.taskList[id] + this.taskList[name] );

        var task:Task;
        task = this.taskList[id];
        if(task.getStatus() == TaskStatus.CAN_SUBMIT)
        {
            task.setStatus(TaskStatus.SUBMITTED);
            this.notify(task);
            return ErroCode.SUCCESS;
        }
        else
        return ErroCode.ERRO_TASK;

    }

    public accpet(id:string):void//?
    {
        if(this.taskList[id] == TaskStatus.SUBMITTED)
        {

        }
    }

    public getTaskByCustomRule(rule:Function):Task//?
    {   
        console.log(this.taskList);
        return rule(this.taskList);
    }

    public notify(task:Task):void
    {
        for(var i in this.oberserverList)
        {
            this.oberserverList[i].onchange(task);
        }
    }


}

interface  Oberserver
{
    onchange(task:Task);
   
}
enum ErroCode
{
    SUCCESS,ERRO_TASK,MISSING_MISSION
}

enum TaskStatus
{
    UNACCEPTABLE,//0
    ACCEPTABLE,//1
    DURING,//2
    CAN_SUBMIT,//3
    SUBMITTED//4
}