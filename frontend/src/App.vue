<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import HeroSection from './components/HeroSection.vue';
import QuestionnaireSection from './components/QuestionnaireSection.vue';
import ResultsSection from './components/ResultsSection.vue';
import MethodSection from './components/MethodSection.vue';
import DataSection from './components/DataSection.vue';
import FooterSection from './components/FooterSection.vue';
import { useExplorer } from './composables/useExplorer';

const { submitted } = useExplorer();
</script>

<template>
  <NavBar />
  <main>
    <HeroSection />
    <QuestionnaireSection />
    <ResultsSection v-if="submitted" />
    <MethodSection />
    <DataSection />
  </main>
  <FooterSection />
</template>
