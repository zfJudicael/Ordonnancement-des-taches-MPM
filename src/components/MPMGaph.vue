<template>
    <div class="mpmGraph">
        <h3 style="text-align: center;">MPM Graph</h3>

        <div ref="flowRef" :style="{border: '2px solid gray', overflow: 'hidden', height: '500px'}">
            <VueFlow :nodes="nodes" :edges="edges" :style="{ background: 'white' }">
                <template #node-start="startNodeProps">
                    <StartNode v-bind="startNodeProps" />
                </template>
                
                <template #node-step="stepNodeProps">
                    <StepNode v-bind="stepNodeProps" />
                </template>
    
                <template #node-end="endNodeProps">
                    <EndNode v-bind="endNodeProps" />
                </template>
                
                <template #edge-default="defaultEdgeProps">
                    <DefaultEdge v-bind="defaultEdgeProps" />
                </template>
                <Background />
    
                <Controls>
                    <ControlButton title="Download" @click="isDownloadDialogVisible = true">
                        <i class="pi pi-download"></i>
                    </ControlButton>

                    <ControlButton title="FullScreen" @click="toggleFullScreen">
                        <i class="pi pi-window-maximize"></i>
                    </ControlButton>
                </Controls>
            </VueFlow>
        </div>

        <Dialog v-model:visible="isDownloadDialogVisible" modal close-on-escape header='aa' :style="{ width: '20rem' }" :append-to="flowRef">
            <form @submit.prevent="">
                <div>
                    <p style="margin-bottom: 0;">Durée</p>
                    <!-- <InputNumber v-model="selectedTask.duration" name="duration" fluid/> -->
                </div>

                <!-- <div>
                    <p style="margin-bottom: 0;">Tâches antérieures</p>
                    <MultiSelect v-model="selectedTask.previousTasks" :options="selectedTable?.getTaskArray(selectedTaskKey)" display="chip" filter placeholder="Selectionner" style="width: 80%;" />
                </div> -->

                <Divider />

                <div style="display: flex; gap: 5px; justify-content: center;">
                    <Button type="submit" icon="pi pi-check" severity="info" raised label="Confirmer"/>
                    <Button icon="pi pi-times" severity="danger" raised label="Annuler" @click="isDownloadDialogVisible = false"/>
                </div>
            </form>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge } from '@vue-flow/core';
import { VueFlow } from '@vue-flow/core';
import { domToPng } from 'modern-screenshot';
import { Controls, ControlButton } from '@vue-flow/controls';
import { Background } from '@vue-flow/background';
import StartNode from './vue_flow/StartNode.vue';
import StepNode from './vue_flow/StepNode.vue';
import DefaultEdge from './vue_flow/DefaultEdge.vue';
import EndNode from './vue_flow/EndNode.vue';
import { Dialog, Button } from 'primevue';

defineProps({
  nodes: {
    type: Array<Node>,
    required: true
  },
  edges: {
    type: Array<Edge>,
    required: true
  }
})

const isDownloadDialogVisible = ref<boolean>(false)

const flowRef = ref<HTMLElement>()
const download = async ()=>{

    if(flowRef.value){
        const dataURL = await domToPng(flowRef.value, {
            scale: 2
        })

        const link = document.createElement("a")
        link.download = "diagramMPM.png"
        link.href = dataURL
        link.click()
    }
}

const toggleFullScreen = async ()=>{
    if(flowRef.value){
        if(!document.fullscreenElement){
            await flowRef.value.requestFullscreen();
        }else{
            document.exitFullscreen?.()
        }
    }
}
</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
</style>