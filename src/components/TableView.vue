<template>
    <div class="tableView"> 
        <div class="title">
          <p style="">Tâches</p>
          <p>Durée</p>
          <p>T.ant.</p>
          <p>T.succ.</p>
        </div>

        <div class="data"
          v-for="[key, value] in project.getTasks"  
        >
          <p>{{ key }}</p>
          <p>{{ value.duration }}</p>
          <p>
            <template v-if="value.previousTasks.length > 0">
              <span v-for="prevTask in value.previousTasks">{{ prevTask }}</span>
            </template>
            <span v-else>-</span>
          </p>
          <p>
            <template v-if="value.nextTasks?.[0] == 'fin' ">
              <span style="font-weight: bold;">Fin</span>
            </template>
            <span v-else v-for="nextTask in value.nextTasks">{{ nextTask }}</span>
          </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Project } from '@/models/Project';

defineProps({
    project: {
        type: Project,
        required: true
    }
})
</script>

<style lang="scss">
.tableView{
  display: flex; 
  flex-wrap: wrap;
  margin-top: 20px;
  margin-bottom: 20px; 
  justify-content: center;
  
  p{
    height: 40px; margin: 2px;
  }

  .title{
    padding: 4px; 
    border: 1px solid black; 
    font-weight: bold; 
  }

  .data{
    padding: 4px; 
    min-width: 40px; 
    text-align: center; 
    border: 1px solid black;
  }
}
</style>