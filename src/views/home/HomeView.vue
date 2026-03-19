<template>
  <div class="home_view">
    <HeroSection />
    <HistorySection />
    <FeaturesSection />
    <HowItWorksSection />
    <GraphExplanation />
    <CallToActionSection />
  </div>
</template>

<script setup lang="ts">
import HeroSection from './sections/HeroSection.vue';
import HistorySection from './sections/HistorySection.vue';
import FeaturesSection from './sections/FeaturesSection.vue';
import HowItWorksSection from './sections/HowItWorksSection.vue';
import GraphExplanation from './sections/GraphExplanation.vue';
import CallToActionSection from './sections/CallToActionSection.vue';
</script>

<style lang="scss">
.home_view{
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 20px;
}

@media (min-width: 768px) {
  .home_view{
    padding: 40px;
  }
}
</style>