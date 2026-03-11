<template>
  <BaseEdge :path="path[0]" :style="{ stroke: data.isCritical ? 'red' : '', strokeWidth: 2 }"/>

  <EdgeLabelRenderer>
    <div
      :style="{
        pointerEvents: 'all',
        position: 'absolute',
        top: '-8px',
        transform: `translate(-50%, -50%) translate(${path[1]}px,${path[2]}px)`,
      }"
    >
      {{ data.duration }}
    </div>
  </EdgeLabelRenderer>
</template>

<script setup lang="ts">
import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@vue-flow/core';
import { computed } from 'vue';

const props = defineProps<EdgeProps>()
const path = computed(()=> getBezierPath(props))
</script>