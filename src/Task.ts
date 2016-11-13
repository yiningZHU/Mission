// TypeScript file
abstract class Oberserver
{
    onchange(task:Task)
    {

    }
   
}

var taskNum:number = 0;

class Task
{
    

    private id:string;
    private name:string;
    public status:TaskStatus;

    public desc:string;
    public fromNPCid:string;
    public toNPCid:string;

    constructor(id:string,name:string)
    {
        this.id = id;
        this.name = name;
        console.log(this.id+":"+this.name);
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
    //button;
    onchange(task:Task)
    {
        console.log("PanelonChange"+task.getname());
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
    onchange(task:Task)
    {
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
        this.emoji.addEventListener(egret.TouchEvent.TOUCH_BEGIN,(evt:egret.TouchEvent)=>{
        var dia = new DialoguePanel();

        },this);
    }
   
}

class Taskservice 
{
    private oberserver:Oberserver[]=[];
    private taskList:Task[]=[];

    public addTask(task:Task)
    {
        if(task.getstatus() == TaskStatus.ACCEPTABLE)
        {
            this.taskList[taskNum] = task;
        }
        if(task.getstatus() == TaskStatus.UNACCEPTABLE)
        {
            console.log(task.getid()+","+task.getname+" is UNACCEPTABLE!");
        }
    }

    public finish(id:string):ErroCode
    {

    }

    public accpet(id:string):void
    {
        
    }

    public getTaskByCustomRole(rule:Function):Task
    {

    }
    public notify():void
    {

    }


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