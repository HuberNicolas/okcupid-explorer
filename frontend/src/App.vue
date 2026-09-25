<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import HeroSection from './components/HeroSection.vue';
import StatsStrip from './components/StatsStrip.vue';
import QuestionnaireSection from './components/QuestionnaireSection.vue';
import ResultsSection from './components/ResultsSection.vue';
import MethodSection from './components/MethodSection.vue';
import DataSection from './components/DataSection.vue';
import FooterSection from './components/FooterSection.vue';
import { useExplorer } from './composables/useExplorer';
import { useReveal } from './composables/useReveal';

const { submitted } = useExplorer();
useReveal();
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <StatsStrip />
    <QuestionnaireSection />
    <ResultsSection v-if="submitted" />
    <MethodSection />
    <DataSection />
  </main>
  <FooterSection />
</template>
