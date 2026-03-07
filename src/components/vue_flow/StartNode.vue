<template>
    <div class="start_node">
        <div class="value">
            <p class="startDate">{{ props.data.duration }}</p>
            <p>Deb</p>
        </div>

        <Handle type="source" :position="Position.Right"/>
    </div>
</template>

<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';

const props = defineProps<NodeProps>()
</script>

<style lang="scss">
.start_node{
    border-radius: 50%;
    color: white;
    font-weight: bold;
    background-color: blue;
    padding: 20px;
    border: 1px solid blue;
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
}
</style>