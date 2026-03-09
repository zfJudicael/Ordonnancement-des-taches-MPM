<template>
    <div class="mpmGraph">
        <h3 style="text-align: center;">MPM Graph</h3>

        <div ref="flowRef" :style="{border: '2px solid gray', overflow: 'hidden', height: '500px', position: 'relative'}">
            <div id="toolbar">
                <div class="dropdown_button">
                    <div class="menu_item">
                        <i class="pi pi-download"></i>

                        <ul class="dropdown">
                            <li style="font-size: small;">Format :</li>
                            <li class="dropdown-item">Pdf</li>
                            <li class="dropdown-item" @click="downloadDiagram('png')">Png</li>
                            <li class="dropdown-item" @click="downloadDiagram('jpeg')">Jpeg</li>
                        </ul>
                    </div>
                </div>
            </div>

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
                    <ControlButton title="FullScreen" @click="toggleFullScreen">
                        <i class="pi pi-window-maximize"></i>
                    </ControlButton>
                </Controls>
            </VueFlow>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Node, Edge } from '@vue-flow/core';
import { VueFlow } from '@vue-flow/core';
import { domToJpeg, domToPng } from 'modern-screenshot';
import { Controls, ControlButton } from '@vue-flow/controls';
import { Background } from '@vue-flow/background';
import StartNode from './vue_flow/StartNode.vue';
import StepNode from './vue_flow/StepNode.vue';
import DefaultEdge from './vue_flow/DefaultEdge.vue';
import EndNode from './vue_flow/EndNode.vue';

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

const flowRef = ref<HTMLElement>()
const filter = (node: globalThis.Node)=>{
    if (node instanceof HTMLElement && node.id === 'toolbar') return false;

    return true;
}
const downloadDiagram = async (documentFormat: 'jpeg' | 'png')=>{
    if(flowRef.value){
        let dataURL = '';

        if(documentFormat == 'jpeg'){
            dataURL = await domToJpeg(flowRef.value, {
                scale: 2,
                filter: filter
            })
        }else{
            dataURL = await domToPng(flowRef.value, {
                scale: 2,
                filter: filter
            })
        }

        const link = document.createElement("a");
        link.download = `diagram.${documentFormat}`
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

<style lang="scss">
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';

#toolbar{
    border: 0.5px solid grey; 
    position: absolute; 
    top: 0; 
    right: 0; 
    z-index: 1; 
    padding: 5px; 
    margin: 5px; 
    border-radius: 4px;

    .dropdown_button{
        position: relative;
        
        .menu_item{
            width: fit-content;
            cursor: pointer;
            
            .dropdown{
                overflow: hidden;
                max-height: 0;
                position: absolute;
                top: 60%;
                right: 0;
                list-style: none;
                padding: 0;
                transition: max-height 0.5s ease-in-out;
        
                .dropdown-item{
                    padding: 5px 20px;
                    background-color: rgb(236, 236, 236);
    
                    &:hover{
                        background-color: rgb(182, 182, 182);
                    }
                }
            }
        
            &:hover{
                .dropdown{
                    max-height: 300px;
                }
            }
        }
    }
}
</style>