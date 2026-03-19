<template>
  <div class="home_view">
    <HeroSection class="section"/>
    <HistorySection class="section"/>
    <FeaturesSection class="section"/>
    <HowItWorksSection class="section"/>
    <GraphExplanation class="section"/>
    <CallToActionSection class="section"/>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './sections/HeroSection.vue';
import HistorySection from './sections/HistorySection.vue';
import FeaturesSection from './sections/FeaturesSection.vue';
import HowItWorksSection from './sections/HowItWorksSection.vue';
import GraphExplanation from './sections/GraphExplanation.vue';
import CallToActionSection from './sections/CallToActionSection.vue';
import Footer from './sections/Footer.vue';
</script>

<style lang="scss">
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