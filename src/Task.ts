// TypeScript file
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
        console.log("task:111");
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

    public addTask()
    {

    }
}

enum TaskStatus
{
    UNACCEPTABLE = 0,
    ACCEPTABLE = 1,
    DURING = 2,
    CAN_SUBMIT = 3,
    SUBMITTED = 4
}