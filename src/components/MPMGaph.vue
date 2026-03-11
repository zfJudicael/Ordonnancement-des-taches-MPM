<template>
    <div class="mpmGraph">
        <h3 style="text-align: center;">MPM Graph</h3>

        <div ref="vueFlowRef" :style="{border: '2px solid gray', overflow: 'hidden', height: '500px', position: 'relative'}">
            <div id="toolbar">
                <div class="dropdown_button">
                    <div class="menu_item">
                        <i class="pi pi-camera"></i>

                        <ul class="dropdown">
                            <li style="font-size: small;">Format :</li>
                            <li class="dropdown-item" @click="doScreenshot('png')">Png</li>
                            <li class="dropdown-item" @click="doScreenshot('jpeg')">Jpeg</li>
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
import { Controls, ControlButton } from '@vue-flow/controls';
import { Background } from '@vue-flow/background';
import StartNode from './vue_flow/StartNode.vue';
import StepNode from './vue_flow/StepNode.vue';
import DefaultEdge from './vue_flow/DefaultEdge.vue';
import EndNode from './vue_flow/EndNode.vue';
import { useScreenshot } from '@/composables/useScreenshot';
import type { ImageType } from '@/types';

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

const vueFlowRef = ref<HTMLElement>()
const filter = (node: globalThis.Node)=>{
    if (node instanceof HTMLElement && node.id === 'toolbar') return false;

    return true;
}

const { capture } = useScreenshot()
const doScreenshot = async (imageType: ImageType)=>{
    if(!vueFlowRef.value){
        return;
    }
    
    await capture(vueFlowRef.value, {
        type: imageType,
        scale: 2,
        quality: 0.95,
        filter: filter
    })
}

const toggleFullScreen = async ()=>{
    if(vueFlowRef.value){
        if(!document.fullscreenElement){
            await vueFlowRef.value.requestFullscreen();
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