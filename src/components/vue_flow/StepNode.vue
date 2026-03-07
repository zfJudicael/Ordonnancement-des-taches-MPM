<template>
    <div class="step_node" :class="{ critical: data.isCritical }">
        <div class="value">
            <p class="totalFloat">{{ data.float }}</p>
            <div class="date">
                <p>{{ data.earlyDate }}</p>
                <p>{{ data.lateDate }}</p>
            </div>
            <p class="label">{{ data.label }}</p>
        </div>

        <Handle type="target" class="left_handle" :position="Position.Left"/>
        <Handle type="source" :position="Position.Right"/>
    </div>
</template>

<script setup lang="ts">
import { Position, Handle } from '@vue-flow/core';
import type { NodeProps } from '@vue-flow/core';

const props = defineProps<NodeProps>()
</script>

<style lang="scss">
.step_node{
    border-radius: 50%;
    height: 70px;
    width: 70px;
    font-weight: bold;
    padding: 20px;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;


    &.critical{
        background-color: lightgrey;
    }

    .value{
        position: relative;
        p{
            margin: 0;
        }

        .totalFloat{
            position: absolute;
            top: -25px;
            left: 50%;
            padding: 2px;
            background-color: green;
            transform: translateX(-50%);
            color: white;
        }

        .date{
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            height: 60%;

            p{
                padding: 5px;

                &:first-of-type{
                    border-right: 1px solid black;
                    color: red;
                }

                &:nth-of-type(2){
                    color: blue;
                }
            }
        }

        .label{
            border-top: 1px solid black;
            width: 100%;
            text-align: center;
            padding-top: 4px;
        }
    }

    .left_handle{
        border-radius: 0;
        width: 10px;
        height: 10px;
    }
}
</style>