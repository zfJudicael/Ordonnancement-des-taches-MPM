<template>
    <Dialog v-model:visible="isVisible" modal close-on-escape header="Création d'un nouveau projet" :style="{ width: '35rem'}">
    <form @submit.prevent="submit">
      <div>
        <p style="margin: 0;">Nom du projet: </p>
        <InputText v-model="newProject.name" name="name" type="text" fluid 
        :invalid="nameErrorMessage.length > 0"
        />
        <Message severity="error" variant="simple" size="small">{{ nameErrorMessage }}</Message>
      </div>

      <div style="margin: 10px 0;">
        <p style="margin: 0;">Déscription : </p>
        <Textarea v-model="newProject.description" rows="5" style="width: 100%;" placeholder="..."/>
      </div>
      
      <div style="display: flex; gap: 5px; align-items: center; margin: 10px 0;">
        <p style="margin: 0">Générer automatiquement les identifiants des tâches</p>
        <ToggleSwitch v-model="newProject.isTaskIdGenerated" />
      </div>

      <div v-if="newProject.tasks.length>0">
          <p style="margin-bottom: 0;">{{ 
            (newProject.tasks.length > 1)? "Tâches" : "Tâche"
            }}</p>
        
        <div v-for="(task, index) in newProject.tasks" style="display: flex; gap: 5px; align-items:first baseline; margin: 15px 0;">
          <i class="pi pi-angle-right"></i>
          <div>
            <div style="display: flex; gap: 4px;">
              <div>
                <InputText style="flex-grow: 1;" v-model="task.id" name="task" type="text" placeholder="Identifiant" fluid
                 :invalid="tasksErrorMessage[index].id.length > 0"
                 :disabled="newProject.isTaskIdGenerated"
                 />
                <Message severity="error" variant="simple" size="small">{{ tasksErrorMessage[index].id }}</Message>
              </div>
              <div>
                <InputNumber v-model="task.duration" name="duration" placeholder="Durée" fluid :invalid="tasksErrorMessage[index].duration.length > 0"/>
                <Message severity="error" variant="simple" size="small">{{ tasksErrorMessage[index].duration }}</Message>
              </div>
            </div>

            <InputText style="margin-top: 4px; width: 100%;" v-model="task.name" name="task" type="text" placeholder="Nom" fluid/>
          </div>
          <Button icon="pi pi-trash" variant="text" severity="danger" raised rounded aria-label="Delete" size="small" 
            @click="removeTask(index)"  
          />

        </div>
      </div>

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
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import ToggleSwitch from 'primevue/toggleswitch';
import { ref } from 'vue';
import useGenerateId from '@/composables/useGenerateId';

const isVisible = defineModel('isVisible', { type: Boolean, required: true })

const newProject = defineModel<{
    name: string,
    description: string,
    isTaskIdGenerated: boolean,
    tasks: TaskModel[]
}>('newProject', { required: true })

const emits = defineEmits(['submit'])

const nameErrorMessage = ref('')
const tasksErrorMessage = ref<{
  id:string,
  duration: string
}[]>([])

const addEmptyTask = ()=>{
  let id = ''
  if(newProject.value.isTaskIdGenerated){
    id = useGenerateId()

    if(newProject.value.tasks.some(task => task.id === id)){
      while(newProject.value.tasks.some(task => task.id === id)){
        id = useGenerateId()
      }
    }
  }

  newProject.value.tasks.push({
    id,
    name: '',
    duration: 0,
    lateDate: 0,
    earlyDate: 0,
    isCritical: false,
    previousTasks: [],
    nextTasks: []
  })

  tasksErrorMessage.value.push({
    id: '',
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
    for(let i=0; i < newProject.value.tasks.length; i++){
      if(newProject.value.tasks[i].id.length > 0){

        if(newProject.value.tasks.filter((task, index) => task.id === newProject.value.tasks[i].id && index !== i).length > 0){
          tasksErrorMessage.value[i].id = 'Identifiant utilisé par une autre tâche'
          valid = false
        }else{
          tasksErrorMessage.value[i].id = ''
        }

      }else{
        tasksErrorMessage.value[i].id = 'Champ requis'
        valid = false
      }

      if(newProject.value.tasks[i].duration == undefined){
        tasksErrorMessage.value[i].duration = 'Champ requis'
        valid = false
      }else{
        tasksErrorMessage.value[i].duration = ''
      }
    }
  }

  return valid;
}

const submit = ()=>{
    if(validateName() && validateTasks()){
        emits('submit')
    }
}
</script>