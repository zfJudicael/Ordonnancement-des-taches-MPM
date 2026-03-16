<template>
    <Dialog v-model:visible="isVisible" modal close-on-escape header="Création d'un nouveau projet" :style="{ width: '35rem'}">
    <form @submit.prevent="submit">
      <div style="width: 60%;">
        <p style="flex-grow: 1; text-wrap: nowrap; margin: 0;">Nom du projet: </p>
        <InputText style="flex-grow: 1;" v-model="newProject.name" name="name" type="text" fluid 
        :invalid="nameErrorMessage.length > 0"
        />
        <Message severity="error" variant="simple" size="small">{{ nameErrorMessage }}</Message>
      </div>

      <div v-if="newProject.tasks.length>0">
        <p style="margin-bottom: 0;">{{ 
          (newProject.tasks.length > 1)? "Tâches" : "Tâche"
          }}</p>
        <div v-for="(task, index) in newProject.tasks" style="display: flex; gap: 5px; align-items:first baseline;">
          <i class="pi pi-angle-right"></i>
          <div>
            <InputText style="flex-grow: 1;" v-model="task.name" name="task" type="text" placeholder="Nom" fluid
             :invalid="tasksErrorMessage[index].name.length > 0"/>
            <Message severity="error" variant="simple" size="small">{{ tasksErrorMessage[index].name }}</Message>
          </div>
          <div>
            <InputNumber v-model="task.duration" name="duration" placeholder="Durée" fluid :invalid="tasksErrorMessage[index].duration.length > 0"/>
            <Message severity="error" variant="simple" size="small">{{ tasksErrorMessage[index].duration }}</Message>
          </div>
          <Button icon="pi pi-trash" variant="text" severity="danger" raised rounded aria-label="Delete" size="small" 
            @click="removeTask(index)"  
          />
        </div>
      </div>

      <Message severity="error" variant="simple" size="small" style="margin-top: 10px;">{{ taskError }}</Message>
      <Divider />
      <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 4px;">
        <Button icon="pi pi-file-plus" raised label="Ajouter tâche" @click="addEmptyTask"/>

        <div style="display: flex; gap: 2px; margin-left: auto;">
          <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
          <Button icon="pi pi-times" severity="danger" @click="isVisible = false" raised label="Annuler"/>
        </div>
      </div>
    </form>
  </Dialog>
</template>

<script setup lang="ts">
import type { TaskModel } from '@/models/Project';
import { Dialog } from 'primevue';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref } from 'vue';

const isVisible = defineModel('isVisible', { type: Boolean, required: true })

const newProject = defineModel<{
    name: string,
    tasks: TaskModel[]
}>('newProject', { required: true })

const emits = defineEmits(['submit'])

const nameErrorMessage = ref('')
const taskError = ref('')
const tasksErrorMessage = ref<{
  name:string,
  duration: string
}[]>([])

const addEmptyTask = ()=>{
  newProject.value.tasks.push({
    name: '',
    duration: 0,
    lateDate: 0,
    earlyDate: 0,
    isCritical: false,
    previousTasks: [],
    nextTasks: []
  })

  taskError.value = ''
  tasksErrorMessage.value.push({
    name: '',
    duration: ''
  })
}

const removeTask = (index: number)=>{
  newProject.value.tasks.splice(index, 1)
  tasksErrorMessage.value.splice(index, 1)
}

const validateName = ()=>{
  if(newProject.value.name.length > 0){
    nameErrorMessage.value = ''
  }else{
    nameErrorMessage.value = 'Veuillez remplir le nom du tableau'
  }
  
  return (newProject.value.name.length > 0);
}

const validateTasks = ()=>{
  let valid = true;

  if(newProject.value.tasks.length > 0){
    taskError.value = ''

    for(let i=0; i < newProject.value.tasks.length; i++){
      if(newProject.value.tasks[i].name!.length > 0){
        tasksErrorMessage.value[i].name = ''
      }else{
        tasksErrorMessage.value[i].name = 'Champ requis'
        valid = false
      }

      if(newProject.value.tasks[i].duration == undefined){
        tasksErrorMessage.value[i].duration = 'Champ requis'
        valid = false
      }else{
        tasksErrorMessage.value[i].duration = ''
      }
    }
  }else{
    taskError.value = 'Veuillez ajouter au moins une tâche'
    valid = false
  }

  return valid;
}

const submit = ()=>{
    if(validateName() && validateTasks()){
        emits('submit')
    }
}
</script>