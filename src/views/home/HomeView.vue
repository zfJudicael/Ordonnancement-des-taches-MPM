<template>
  <div class="home_view">
    <HeroSection class="section"/>
    <HistorySection class="section"/>
    <FeaturesSection class="section"/>
    <HowItWorksSection class="section"/>
    <GraphExplanation class="section"/>
    <CallToActionSection class="section"/>
    <div class="section-divider">
       <svg
           viewBox="0 0 1440 150"
           preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg"
       >
           <path
               fill="#1f2937"
               d="M0,0 C240,100 480,100 720,50 C960,0 1200,30 1440,0 L1440,150 L0,150 Z"
           />
       </svg>
    </div>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import HeroSection from './sections/HeroSection.vue';
import HistorySection from './sections/HistorySection.vue';
import FeaturesSection from './sections/FeaturesSection.vue';
import HowItWorksSection from './sections/HowItWorksSection.vue';
import GraphExplanation from './sections/GraphExplanation.vue';
import CallToActionSection from './sections/CallToActionSection.vue';
import Footer from './sections/Footer.vue';
import Lenis from 'lenis'


let lenis: Lenis | null = null
let animationFrame: number
onMounted(() => {
  lenis = new Lenis({
    duration: 1.8,
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis?.raf(time)
    animationFrame = requestAnimationFrame(raf)
  }

  animationFrame = requestAnimationFrame(raf)
})

onUnmounted(() => {
  if (lenis) {
    lenis.destroy()
    lenis = null
  }
})
</script>

<style lang="scss">
.section-divider {
    width: 100%;
    height: 60px;
    line-height: 0;
    overflow: hidden;
    background-color: white;
}

.section-divider svg {
    width: 100%;
    height: 100%;
    display: block;
}

.home_view{
  background-color: #f8fafc;
  min-height: 100vh;
  
  .section{
    padding: 20px;
  }
}

@media (min-width: 768px) {
  .home_view{
    .section{
      padding: 40px;
    }
  }
}
</style>