<template>
    <div class="end_node" >
        <div class="value">
            <p class="startDate">{{ props.data.maxDuration }}</p>
            <p>Fin</p>
        </div>

        <Handle type="source" class="handle" :position="Position.Left"/>
    </div>
</template>

<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';

const props = defineProps<NodeProps>()
</script>

<style lang="scss">
.end_node{
    border-radius: 50%;
    color: white;
    font-weight: bold;
    background-color: red;
    padding: 20px;
    border: 1px solid red;
    height: 60px;
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    .value{
        position: relative;
        p{
            margin: 0;
    
            &.startDate{
                position: absolute;
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
                color: black;
            }
        }
    }

    .handle{
        background-color: red;
        border-radius: 0;
        width: 10px;
        height: 10px;
    }
}
</style>