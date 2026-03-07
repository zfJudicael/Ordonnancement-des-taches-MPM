<template>
    <div class="mpmGraph">
        <h3 style="text-align: center;">MPM Graph</h3>

        <VueFlow :nodes="nodes" :edges="edges" :style="{border: '2px solid gray', overflow: 'hidden', height: '450px'}">
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

            <Controls />
        </VueFlow>
    </div>
</template>

<script setup lang="ts">
import type { Node, Edge } from '@vue-flow/core';
import { VueFlow } from '@vue-flow/core';
import { Controls } from '@vue-flow/controls';
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

</script>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
</style>