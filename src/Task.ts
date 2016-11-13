// TypeScript file


var taskNum:number = 0;

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

    public setStstus(status:TaskStatus)
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

    public getstatus():TaskStatus
    {
        return this.status;   
    }
    
  
}

class TaskPanel implements Oberserver
{
    task_textField:egret.TextField;

    onchange(task:Task)
    {
        //console.log("PanelonChange"+task.getname());
        this.task_textField.text = task.getid+" : " + task.getname;
    }
    
}

class DialoguePanel
{
    dialogue_textField:egret.TextField;
    button:any;///?
    
    public onButtonClick()
    {
        
    }
    
}

class NPC implements Oberserver
{
    /*fromnpc:string;
    tonpc:string;
    tast:string;*/
    onchange(task:Task)
    {
        //this.fromnpc = task.getfromNPCid();
        //this.tonpc = task.gettoNPCid();
        console.log("NPConChange: "+task.getid+","+task.getname());
    }
    

    emoji:egret.Bitmap;
    
    //textrue:egret.Texture = RES.getRes("task_png");
    constructor()
    {
        this.emoji = new egret.Bitmap();
        this.emoji.texture = RES.getRes("task_png");
    }

    onNPCClick()
    {
        var diapanel = new DialoguePanel();
        console.log("This bitmap has been touuched!1");
    }
   
}

class Taskservice 
{
    private oberserver:Oberserver[]=[];
    private taskList:Task[]=[];
    
    public addTask(task:Task)
    {
        //this.oberserver.
        if(task.getstatus() == TaskStatus.ACCEPTABLE)
        {
            this.taskList[taskNum] = task;
            taskNum++;
            console.log(task.getid() + "," + task.getname() + " has been added!");
        }
        if(task.getstatus() == TaskStatus.UNACCEPTABLE)
        {
            //alert(task.getid() + ","+task.getname() +" is UNACCEPTABLE!");
            console.log(task.getid() + ","+task.getname() +" is UNACCEPTABLE!");
        }
    }

    public finish(id:string):ErroCode
    {

    }

    public accpet(id:string):void//?
    {
        
    }

    public getTaskByCustomRole(rule:Function):Task//?
    {

    }
    public notify():void
    {
        
    }


}
interface  Oberserver
{
    onchange(task:Task);
   
}
enum ErroCode
{
    SUCCESS,ERRO_TASK
}

enum TaskStatus
{
    UNACCEPTABLE,//0
    ACCEPTABLE,//1
    DURING,//2
    CAN_SUBMIT,//3
    SUBMITTED//4
}