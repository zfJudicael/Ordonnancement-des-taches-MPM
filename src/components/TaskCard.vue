<template>
    <Card class="taskCard">
        <template #content>
          <div class="header">
            <p class="key"># {{ taskKey }}</p>
            <div class="action">
              <Button icon="pi pi-pen-to-square" variant="text" severity="info" raised rounded aria-label="Edit" size="small" 
               @click="$emit('edit')"/>
              <Button icon="pi pi-trash" variant="text" severity="danger" raised rounded aria-label="Delete" size="small" 
               @click="$emit('remove')"/>
            </div>
          </div>
          <p>Durée : {{ task.duration }}</p>
          <p>Marge de retard : {{ task.lateDate - task.earlyDate }}</p>
          <p style="margin-bottom: 2px;">Tâche(s) antérieure(s) :</p>
          <div class="previousTask_container">
            <Chip v-for="previousTask in task.previousTasks" :label="previousTask"/>
          </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
import { Card } from 'primevue';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import type { TaskModel } from '@/models/TableModel';

defineProps<{
    taskKey: string,
    task: TaskModel
}>()

defineEmits(['edit', 'remove'])
</script>

<style lang="scss">
.taskCard{
  margin-bottom: 5px;

  .header{
    display: flex; justify-content: space-between; align-items: center;

    .key{
      margin: 0; font-weight: bold; font-size: larger;
    }

    .action{
      display: flex; justify-content: end; gap: 4px;
    }
  }

  .previousTask_container{
    display: flex; flex-wrap: wrap; gap: 5px;
  }


}
</style>