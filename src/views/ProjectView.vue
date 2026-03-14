<template>
  <div class="project_view">
    <div class="navigation">
      <div class="sticky_header">
        <h3 class="title" @click="$router.push({name: 'home'})">Ordonnancement des tâches</h3>
        <Divider />

        <template v-if="selectedProject">
          <div class="project_description">
            <p>Nom du projet : {{ selectedProject.name }}</p>
            <p>Nombre de tâches : {{ selectedProject.getTasks.size }}</p>
            <p>Durée totale: {{ selectedProject.totalDuration }}</p>
    
              <div style="display: flex; justify-content: end; gap: 5px;">
                <Button icon="pi pi-trash" severity="danger" raised size="small" label="Supprimer" @click="confirmProjectDelete"/>
              </div>
          </div>
          <Divider />
        </template>
      </div>

      <template v-if="selectedProject">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h3>Liste des tâches</h3>
          <Button icon="pi pi-file-plus" variant="text" size="small" severity="secondary" raised @click="openTaskCreationDialog"/>
        </div>
        <div class="taskLists">
          <TaskCard v-for="[taskKey, task] in selectedProject.getTasks" :key="taskKey" :task-key="taskKey" :task="task" 
            @edit="openTaskUpdatingDialog(taskKey, task)" 
            @remove="confirmTaskDelete(taskKey, task)"
          />
        </div>
      </template>

      <div v-if="!selectedProject" class="empty_task"></div>
    </div>

    <div class="wrapper">
      <div class="topnav">
        <div class="tableSelector ">
          <Select v-model="selectedProject" :options="projectList" optionLabel="name" placeholder="Selection de projet" class="w-full md:w-56" />
        </div>
        <div class="addTable">
          <Button label="Créer projet" icon="pi pi-folder-plus" size="small" @click="openTableCreationDialog"/>
        </div>
      </div>
  
      <Card v-if="selectedProject" style="margin-top: 10px;">
        <template #content>
          <TableView :project="selectedProject"/>
      
          <Divider/>
          <MPMGaph :nodes="selectedProject.getNodes" :edges="selectedProject.getEdges"/>
        </template>
      </Card>

      <div v-else class="no_project">
          <DotLottieVue class="dotLottie" autoplay loop :src="LottiesURL.empty" />
          <p>Aucun projet selectionné, veuillez en choisir ou en créer.</p>
      </div>
    </div>

  <CreateNewProjectDialog 
    v-model:isVisible="isCreationDialogVisible" 
    v-model:new-project="initialNewTableValues" 
    @submit="createNewProject"
  />

  <Dialog v-model:visible="isAddingTaskDialogVisible" modal close-on-escape header="Ajout d'une nouvelle tâche" :style="{ width: '30rem' }">
    <form @submit.prevent="submitTaskCreation">
      <div>
        <p style="margin-bottom: 0;">Nom</p>
        <InputText v-model="newTask.name" name="task" type="text" fluid/>
      </div>

      <div>
        <p style="margin-bottom: 0;">Durée</p>
        <InputNumber v-model="newTask.duration" name="duration" fluid/>
      </div>

      <Divider />

      <div style="display: flex; gap: 5px; justify-content: end;">
        <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
        <Button icon="pi pi-times" severity="danger" @click="isAddingTaskDialogVisible = false" raised label="Annuler"/>
      </div>
    </form>
  </Dialog>

  <Dialog v-model:visible="isUpdatingTaskDialogVisible" modal close-on-escape :header='`Mise à jour de la tâche "${selectedTaskKey}"`' :style="{ width: '30rem' }">
    <form @submit.prevent="submitTaskUpdate">
      <div>
        <p style="margin-bottom: 0;">Durée</p>
        <InputNumber v-model="selectedTask.duration" name="duration" fluid/>
      </div>

      <div>
        <p style="margin-bottom: 0;">Tâches antérieures</p>
        <MultiSelect v-model="selectedTask.previousTasks" :options="selectedProject?.getTaskArray(selectedTaskKey)" display="chip" filter placeholder="Selectionner" style="width: 80%;" />
      </div>

      <Divider />

      <div style="display: flex; gap: 5px; justify-content: end;">
        <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
        <Button icon="pi pi-times" severity="danger" @click="isUpdatingTaskDialogVisible = false" raised label="Annuler"/>
      </div>
    </form>
  </Dialog>

  <ConfirmDialog></ConfirmDialog>
  <Toast position="bottom-right"></Toast>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Select from 'primevue/select';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import MultiSelect from 'primevue/multiselect';
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { Dialog } from 'primevue';
import Divider from 'primevue/divider';
import Card from 'primevue/card';
import { Project, type TaskModel } from '@/models/Project';
import TableView from '@/components/TableView.vue';
import MPMGaph from '@/components/MPMGaph.vue';
import { DefaultTable1 } from '@/const/DefaultProjects';
import TaskCard from '@/components/TaskCard.vue';
import { useRoute } from 'vue-router';
import { DotLottieVue } from '@lottiefiles/dotlottie-vue';
import { LottiesURL } from '@/const/lottiesURL';
import CreateNewProjectDialog from '@/components/dialogs/CreateNewProjectDialog.vue';

const toast = useToast()

const projectList = ref<Project[]>([])
const selectedProject = ref<Project>()

const route = useRoute()
const isExample = ref<boolean>(true)

onMounted(()=>{
  let exampleQuery = route.query.isExample?.toString();
  if(exampleQuery){
    let val = parseInt(exampleQuery)

    if(isNaN(val)) isExample.value = true

    if(val == 0) isExample.value = false
    else isExample.value = true
  }

  if(isExample.value){

    console.log("Exempleee")
    projectList.value = [DefaultTable1]
    selectedProject.value = projectList.value[0]

  }else{
    console.log("Noon")
  }
})


///////////////////////////////////////////
///////////////////////////////////////////
/////////    Task creation      //////////
///////////////////////////////////////////
///////////////////////////////////////////
const newTask = ref<TaskModel>({
  name: '',
  duration: 0,
  earlyDate: 0,
  lateDate: 0,
  isCritical: false,
  previousTasks: [],
  nextTasks: []
})
const isAddingTaskDialogVisible = ref<boolean>(false)
const openTaskCreationDialog = ()=>{
  isAddingTaskDialogVisible.value = true
  newTask.value = {
    name: '',
    duration: 0,
    earlyDate: 0,
    lateDate: 0,
    isCritical: false,
    previousTasks: [],
    nextTasks: []
  }
}

const submitTaskCreation = ()=>{
  selectedProject.value?.addTask(newTask.value)
  isAddingTaskDialogVisible.value = false
}


///////////////////////////////////////////
///////////////////////////////////////////
/////////      Task update       //////////
///////////////////////////////////////////
///////////////////////////////////////////
const selectedTaskKey = ref<string>('')
const selectedTask = ref<TaskModel>({
  duration: 0,
  earlyDate: 0,
  lateDate: 0,
  isCritical: false,
  previousTasks: [],
  nextTasks: []
})
const isUpdatingTaskDialogVisible = ref<boolean>(false)
const openTaskUpdatingDialog = (key: string, task: TaskModel)=>{
  isUpdatingTaskDialogVisible.value = true
  selectedTaskKey.value = key
  selectedTask.value = task
}

const submitTaskUpdate = ()=>{
  selectedProject.value?.updateTask(selectedTaskKey.value, selectedTask.value)
  isUpdatingTaskDialogVisible.value = false
}

///////////////////////////////////////////
///////////////////////////////////////////
/////////      Task delete      //////////
///////////////////////////////////////////
///////////////////////////////////////////

const confirm = useConfirm()

const confirmTaskDelete = (taskKey: string, task: TaskModel)=>{
  selectedTaskKey.value = taskKey
  selectedTask.value = task

  confirm.require({
    message: `Voulez vous vraiment supprimer la tâche "${selectedTaskKey.value}"?`,
        header: 'Suppression',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Annuler',
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Supprimer',
            severity: 'danger'
        },
        accept: () => {
          let result = selectedProject.value?.deleteTask(selectedTaskKey.value)
          if(result) toast.add({ severity: 'info', summary: 'Succées', detail: 'Suppression effectuée', life: 3000 });
          else toast.add({ severity: 'error', summary: 'Echec', detail: 'Suppession échouée', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejeté', detail: 'Vous avez rejeté la supppression', life: 3000 });
        }
  })
}

///////////////////////////////////////////
///////////////////////////////////////////
/////////    Project creation      ////////
///////////////////////////////////////////
///////////////////////////////////////////
const isCreationDialogVisible = ref<boolean>(false)

const initialNewTableValues = reactive<{
  name: string,
  tasks: TaskModel[]
}>({
  name: '',
  tasks: []
})
const openTableCreationDialog = ()=>{
  isCreationDialogVisible.value = true
  initTableCreation()
  console.log(isCreationDialogVisible.value)
}

const initTableCreation = ()=>{
  initialNewTableValues.name = ''
  initialNewTableValues.tasks = []
}

const createNewProject = ()=>{
  isCreationDialogVisible.value = false
  let taskMap = new Map<string, TaskModel>()
  initialNewTableValues.tasks.forEach((task)=>{
    if(task.name) taskMap.set(task.name, {
      duration: task.duration,
      lateDate: task.lateDate,
      earlyDate: task.earlyDate,
      isCritical: false,
      previousTasks: task.previousTasks,
      nextTasks: task.nextTasks
    })
  })

  projectList.value.push(new Project(initialNewTableValues.name, taskMap))

  toast.add({ severity: 'info', summary: 'Succées', detail: 'Votre projet est créé avec succès.', life: 3000 });
}

///////////////////////////////////////////
///////////////////////////////////////////
/////////    Delete Project      //////////
///////////////////////////////////////////
///////////////////////////////////////////
const confirmProjectDelete = ()=>{
  confirm.require({
    message: `Voulez vous vraiment supprimer ce projet "${selectedProject.value?.name}"?`,
        header: 'Suppression',
        icon: 'pi pi-info-circle',
        rejectLabel: 'Annuler',
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Supprimer',
            severity: 'danger'
        },
        accept: () => {
          projectList.value = projectList.value.filter((table)=>{
            return table.name != selectedProject.value?.name
          })
          selectedProject.value = projectList.value[0]
          toast.add({ severity: 'info', summary: 'Succées', detail: 'Suppression effectuée', life: 3000 });
        },
        reject: () => {
            toast.add({ severity: 'warn', summary: 'Rejeté', detail: 'Vous avez rejeté la supppression', life: 3000 });
        }
  })
}
</script>

<style scoped lang="scss">
.project_view{
    background-color: #f8fafc;
  .navigation{
    padding: 0 15px 15px 15px;

    .sticky_header{
      position: sticky;
      top: 0;
      z-index: 3;
      background-color: #f8fafc;

      .title{
        font-size: 1.2rem;
        text-align: center;
        padding: 20px;
        margin: 0;
        cursor: default;
      }

      .project_description{
        p{
          margin: 10px;
        }
      }
    }

    .taskLists{
      display: grid;
      gap: 5px;
      grid-template-columns: repeat(2, 1fr);
    }

    .empty_task{
      display: none;
    }
  }

  .wrapper{
    min-height: 100vh;

    .topnav{
      display: grid; 
      grid-template-columns: repeat(2, 1fr); 
      padding: 10px;
      position: sticky;
      top: 0;
      background-color: white;

      .addTable{
        display: flex; 
        justify-content: end;
      }
    }

     .no_project{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-top: 40px;
        
        .dotLottie{
          width: 100%;
        }

        p{
          color: grey;
        }
      }
  }
}

@media (min-width: 768px) {
  .project_view{
    display: flex;
    height: 100vh;
    overflow: hidden;

    .navigation{
      width: 24%;
      padding: 0 15px 15px 15px;
      display: flex;
      flex-direction: column;

      .title{
        font-size: 1.2rem;
        text-align: center;
        position: sticky;
        top: 0;
        z-index: 3;
        padding: 20px;
        margin: 0;
        background-color: #f8fafc;
      }

      .taskLists{
        display: block;
        overflow-y: scroll;
      }

      .empty_task{
        display: block;
        background-color: white;
        flex: 1;
      }
    }

    .wrapper{
      width: 76%;
      overflow-y: scroll;
      min-height: 100vh;

      .topnav{
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        padding: 8px;
        position: sticky;
        top: 0;
        background-color: white;

        .tableSelector{
          grid-column: 1/4; 
          display: flex; 
          justify-content: center;
        }

        .addTable{
          display: flex; 
          justify-content: end;
        }
      }

      .no_project{
        padding-top: 80px;
        .dotLottie{
          width: 80%;
        }

        p{
          margin: 0;
        }
      }
    }
  }
}
</style>