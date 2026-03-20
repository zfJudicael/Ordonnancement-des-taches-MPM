import type { Edge, Node } from "@vue-flow/core";

export interface TaskModel{
    id: string,
    name?: string;
    duration: number;
    lateDate: number;
    earlyDate: number;
    isCritical: boolean;
    nextTasks: string[];
    previousTasks: string[]
}

export class Project{
    name: string;
    description: string;
    tasks: Map<string, TaskModel>;
    tasksInCriticalPath: string[];
    orderedTasks: string[]
    tasksDegree?: string[][]
    totalDuration: number;
    startTasks: string[];
    lastTasks: string[];

    constructor(name: string, description: string ,tasks: Map<string, TaskModel>){
        this.name = name
        this.description = description
        this.tasks = tasks
        this.tasksInCriticalPath = []
        this.orderedTasks = []
        this.totalDuration = 0
        this.startTasks = []
        this.lastTasks = []
        
        this.loadAnswer()
    }

    addTask(newTask: TaskModel){
        this.tasks.set(newTask.id, {
            id: newTask.id,
            name: newTask.name,
            duration: newTask.duration,
            earlyDate: newTask.earlyDate,
            lateDate: newTask.lateDate,
            previousTasks: newTask.previousTasks,
            nextTasks: newTask.nextTasks,
            isCritical: (newTask.earlyDate - newTask.lateDate) == 0 
        })
    
        this.loadAnswer()
    }

    updateTask(key: string, updateTask: TaskModel){
        let task = this.tasks.get(key)

        if(task){
            task.name = updateTask.name
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
        this.setNextTasks()
        this.orderTasks()
        this.setStart()
        this.setEnd()
        this.orderTasks()
        this.setEarlyDate()
        this.setLateDate()
        this.setCriticalPath()
    }

    resetData(){
        this.tasks.delete("deb")
        this.tasks.delete("fin")
        this.startTasks = []
        this.lastTasks = []
        this.tasks.forEach((value, key)=>{
            value.nextTasks = []
            value.earlyDate = 0
            value.lateDate = 0
            value.isCritical = false
        })
    }

    setNextTasks(){
        this.tasks.forEach((_task, _taskKey)=>{
            if(_task.previousTasks.length == 0){
                 this.startTasks.push(_taskKey)
            }else{
                _task.previousTasks.forEach((_previousTaskKey)=>{
                    this.tasks.get(_previousTaskKey)?.nextTasks.push(_taskKey)
                })
            }
            
            let isIncluded = false;
            isIncluded = Array.from(this.tasks.values()).some((value)=>{
                return value.previousTasks.includes(_taskKey)
            })
    
            if(!isIncluded){ 
                _task.nextTasks = ["fin"]
                this.lastTasks.push(_taskKey)
            }
        })
    }

    orderTasks() {
        const ordered: string[] = []
        const inDegree = new Map<string, number>()

        // calcul du nombre de prédécesseurs
        this.tasks.forEach((task, key) => {
            inDegree.set(key, task.previousTasks.length)
        })

        const queue: string[] = []

        // tâches sans prédécesseur
        inDegree.forEach((count, key) => {
            if (count === 0) {
                queue.push(key)
            }
        })

        while (queue.length > 0) {
            const current = queue.shift()!
            ordered.push(current)

            const task = this.tasks.get(current)

            task?.nextTasks.forEach(nextKey => {
                const newDegree = (inDegree.get(nextKey) ?? 0) - 1
                inDegree.set(nextKey, newDegree)

                if (newDegree === 0) {
                    queue.push(nextKey)
                }
            })
        }

        this.orderedTasks = ordered
    }

    setStart(){
        this.tasks.set("deb", 
            {   
                id: "deb",
                name: "Début projet",
                duration: 0, 
                earlyDate: 0, 
                lateDate: 0, 
                isCritical: true, 
                nextTasks: this.startTasks, 
                previousTasks: []
            }
        )
    }

    setEnd(){
        this.tasks.set("fin", 
            {
                id: "",
                name: 'Fin du projet',
                duration: 0, 
                earlyDate: 0, 
                lateDate: 0, 
                isCritical: true, 
                nextTasks: [], 
                previousTasks: this.lastTasks
            }
        )
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

        return this.orderedTasks;
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
                        name: task.name,
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
                    animated: isCritical,
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
