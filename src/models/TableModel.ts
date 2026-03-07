import type { Edge, Node } from "@vue-flow/core";

export interface TaskModel{
    name?: string;
    duration: number;
    lateDate: number;
    earlyDate: number;
    isCritical: boolean;
    nextTasks: string[];
    previousTasks: string[]
}

export class TableModel {
    name: string;
    tasks: Map<string, TaskModel>;
    tasksInCriticalPath: string[];
    orderedTasks: string[]
    tasksDegree?: string[][]
    totalDuration: number;

    constructor(name: string, tasks: Map<string, TaskModel>){
        this.name = name
        this.tasks = tasks
        this.tasksInCriticalPath = []
        this.orderedTasks = []
        this.totalDuration = 0
        
        this.loadAnswer()
    }

    addTask(newTask: TaskModel){
        if(newTask.name) {
            this.tasks.set(newTask.name, {
                duration: newTask.duration,
                earlyDate: newTask.earlyDate,
                lateDate: newTask.lateDate,
                previousTasks: newTask.previousTasks,
                nextTasks: newTask.nextTasks,
                isCritical: (newTask.earlyDate - newTask.lateDate) == 0 
            })

            this.loadAnswer()
        }
    }

    updateTask(key: string, updateTask: TaskModel){
        let task = this.tasks.get(key)

        if(task){
            task.duration = updateTask.duration
            task.earlyDate = updateTask.earlyDate
            task.lateDate = updateTask.lateDate
            task.nextTasks = updateTask.nextTasks
            task.previousTasks = updateTask.previousTasks

            this.loadAnswer()
        }
    }

    deleteTask(selectedTaskkey: string){
        this.tasks.forEach((value, key)=>{
            let newPreviousTasks: string[] =  []

            newPreviousTasks = value.previousTasks.filter((taskKey)=> taskKey != selectedTaskkey )
            console.log(value.previousTasks, newPreviousTasks)
            value.previousTasks = newPreviousTasks
        })

        let result = this.tasks.delete(selectedTaskkey)
        this.loadAnswer()

        return result;
    }

    loadAnswer(){
        this.tasksInCriticalPath = []
        this.orderedTasks = []
        this.totalDuration = 0

        this.resetData()
        this.orderTasks()
        this.setEarlyDate()
        this.setLateDate()
        this.setCriticalPath()
    }

    resetData(){
        this.tasks.delete("deb")
        this.tasks.delete("fin")
        this.tasks.forEach((value, key)=>{
            value.nextTasks = []
            value.earlyDate = 0
            value.lateDate = 0
        })
    }

    orderTasks(){
        return new Promise((resolve, reject)=>{
            this.tasks.delete("deb")
            this.tasks.delete("fin")
            const inDegree = new Map();
            const graph: Map<string, string[]> = new Map();
        
            this.tasks.forEach((_task, key) => {
                _task.previousTasks = _task.previousTasks.sort();
                inDegree.set(key, 0);
                graph.set(key, []);
            });
        
            this.tasks.forEach((_, key) => {
            this.tasks.get(key)?.previousTasks.forEach((prevTask) => {
                const _task = this.tasks.get(prevTask);
                if (_task) {
                if (!_task.nextTasks.includes(key)) {
                    _task.nextTasks.push(key);
                    _task.nextTasks = _task.nextTasks.sort();
                }
                graph.get(prevTask)?.push(key);
                inDegree.set(key, inDegree.get(key) + 1);
                }
            });
            });
        
            const tasksDegree: string[][] = [];
            let zeroDegreTask: string[] = [];
            const inDegreeCopy = new Map(inDegree);
            const graphCopy: Map<string, string[]> = new Map(graph);
        
            const queue: string[] = [];
            const orderedTasks: string[] = [];
            inDegree.forEach((deg, task) => {
            if (deg === 0) queue.push(task);
            });
        
            zeroDegreTask = Array.from(queue);
        
            while (queue.length > 0) {
            const current: string = queue.shift() as string;
            orderedTasks.push(current);
        
            graph.get(current)?.forEach((nextTask) => {
                inDegree.set(nextTask, inDegree.get(nextTask) - 1);
                if (inDegree.get(nextTask) === 0) queue.push(nextTask);
            });
            }
        
            while (zeroDegreTask.length > 0) {
            tasksDegree.push(zeroDegreTask);
            const nextTasks: string[] = [];
            zeroDegreTask.forEach((current) => {
                graphCopy.get(current)?.forEach((nextTask) => {
                inDegreeCopy.set(nextTask, inDegreeCopy.get(nextTask) - 1);
                if (inDegreeCopy.get(nextTask) === 0) nextTasks.push(nextTask);
                });
            });
            zeroDegreTask = nextTasks;
            }
        
            if (orderedTasks.length !== this.tasks.size) {
                console.log("Impossible d'ordonner les tâches : dépendances circulaires détectées.");
                reject()
            } else {
                this.orderedTasks = orderedTasks
                this.tasksDegree = tasksDegree
            };
    
            this.tasks.set("deb", {duration: 0, earlyDate: 0, lateDate: 0, isCritical: true, nextTasks: tasksDegree[0], previousTasks: []})
            this.tasks.set("fin", {duration: 0, earlyDate: 0, lateDate: 0, isCritical: true, nextTasks: [], previousTasks: []})

            this.removeOneTaskFromTasksList("fin").forEach((val, k)=>{
                if(!val.nextTasks.length){
                    val.nextTasks.push("fin")
                    this.tasks.get("fin")?.previousTasks.push(k)
                }
            })
            
            resolve(1)
        })
    }

    setEarlyDate(){
        let totalDuration = 0
        this.orderedTasks.forEach((key: string) => {
            const _task = this.tasks.get(key)

            _task?.previousTasks.forEach((taskKey: string) => {
                let _previousTask = this.tasks.get(taskKey) as TaskModel
                if(_task.earlyDate <= _previousTask.duration + _previousTask.earlyDate){
                    _task.earlyDate = _previousTask.duration + _previousTask.earlyDate

                    if (totalDuration <= _task.earlyDate + _task.duration){
                        totalDuration = _task.earlyDate + _task.duration;
                    }
                }
            });
        });

        const finTask = this.tasks.get('fin') as TaskModel;
        finTask.earlyDate = totalDuration;
        finTask.lateDate = totalDuration;
        this.totalDuration = totalDuration;
    }

    setLateDate() {
        let reversedOrderedTasks = this.orderedTasks.reverse() as string[];
        for(const taskKey of reversedOrderedTasks){
    
          if (taskKey != 'fin' && taskKey != 'deb') {
              const task = this.tasks.get(taskKey) as TaskModel;
              if (!task.nextTasks.length) {
                  const finTask = this.tasks.get('fin') as TaskModel;
                  task.lateDate = finTask.lateDate - task.duration;
              } else
                  for(const key of task.nextTasks){
                      const nexTask = this.tasks.get(key) as TaskModel;
                      if (task.lateDate == 0 || task.lateDate >= nexTask.lateDate - task.duration) {
                          task.lateDate = nexTask.lateDate - task.duration;
    
                          if(task.lateDate == 0) break;
                      }
                  }
          }
        }

        this.orderedTasks.reverse()
    }

    setCriticalPath(){
        this.tasks.forEach((task, key)=>{
            if(task.earlyDate - task.lateDate == 0){
                task.isCritical = true
                this.tasksInCriticalPath.push(key)
            }else{
                task.isCritical = false
            }
        })
    }

    removeOneTaskFromTasksList(removedTaskKey: string){
        const newTasksList = new Map<string, TaskModel>()
        this.tasks.forEach((value, key)=>{
            if(key != removedTaskKey) newTasksList.set(key, value)
        })

        return newTasksList
    }
    
    public get getTasks(){
        let taskList = new Map<string, TaskModel>()
        this.tasks.forEach((value, key)=>{
            if(key != 'deb' && key != 'fin'){
                taskList.set(key, value)
            }
        })

        return taskList
    }

    public getTaskArray(taskKey: string){
        let taskArray: string[] = []
        this.tasks.forEach((value, key)=>{
            if(key != 'deb' && key != 'fin' && key != taskKey){
                taskArray.push(key)
            }
        })

        return taskArray
    }

    public get getOrderedTasks(){
        let taskList = new Map<string, TaskModel>()
        this.orderedTasks.forEach((val)=>{
            taskList.set(val, this.tasks.get(val) as TaskModel)
        })

        return taskList;
    }
    
    public get getNodes(){
        let nodeList: Node[] = []
        this.tasks.forEach((task, taskKey)=>{
            if(taskKey == 'deb'){
                nodeList.push({
                    id: taskKey,
                    type: 'start',
                    position: {
                        x: 20,
                        y: 200
                    },
                    data: {
                        label: task,
                        duration: 0
                    }
                })
            }else if(taskKey == 'fin'){
                nodeList.push({
                    id: taskKey,
                    type: 'end',
                    position: {
                        x: 200,
                        y: 200
                    },
                    data: {
                        label: taskKey,
                        maxDuration: this.totalDuration
                    }
                })
            }else{
                nodeList.push({
                    id: taskKey,
                    type: 'step',
                    position: {
                        x: 0,
                        y: 200
                    },
                    data: {
                        label: taskKey,
                        earlyDate: task.earlyDate,
                        lateDate: task.lateDate,
                        isCritical: task.isCritical,
                        float: task.lateDate - task.earlyDate
                    }
                })
            }
        })

        let baseX = 120
        for(let [taskKey, task] of this.getOrderedTasks){
            nodeList.forEach((node)=>{
                if(node.id === taskKey) {
                    node.position.x +=baseX
                    baseX = baseX + 80
                }
            })
        }

        if(nodeList[nodeList.length -1 ]) nodeList[nodeList.length -1 ].position.x = baseX

        return nodeList;
    }

    public get getEdges(){
        let edgeList: Edge[] = []
        this.tasks.forEach((task, taskKey)=>{
            task.nextTasks.forEach((nextTaskKey)=>{
                let isCritical:boolean = false
    
                if(task.isCritical && this.tasks.get(nextTaskKey)?.isCritical) isCritical = true
    
                edgeList.push({
                    id: `e${taskKey}->${nextTaskKey}`,
                    type: 'default',
                    source: taskKey,
                    target: nextTaskKey,
                    data: {
                        duration: task.duration,
                        isCritical
                    }
                })
            })
        })

        return edgeList;
    }

    public getOneTask(key: string){
        return this.tasks.get(key)
    }

}
