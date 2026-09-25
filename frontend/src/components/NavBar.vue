<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { REPOSITORY } from '../links';

const scrolled = ref(false);
const onScroll = () => (scrolled.value = window.scrollY > 12);
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

const links = [
  { href: '#explore', label: 'Explore' },
  { href: '#method', label: 'How it works' },
  { href: '#data', label: 'Data' },
];
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="container nav__inner">
      <a href="#top" class="nav__logo mono" aria-label="Project Eros, back to top">
        <span class="nav__heart">♥</span>~/project-eros
      </a>
      <nav class="nav__links" aria-label="Sections">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
        <a :href="REPOSITORY" target="_blank" rel="noopener" class="nav__gh" aria-label="Source code on GitHub">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.1 2.91.84.09-.66.35-1.1.63-1.36-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.32 9.32 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.8-4.58 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
          </svg>
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto;
  height: var(--nav-h);
  z-index: 50;
  transition: background var(--dur) var(--ease), border-color var(--dur) var(--ease);
  border-bottom: 1px solid transparent;
}
.nav--scrolled {
  background: rgba(8, 8, 12, 0.72);
  backdrop-filter: blur(14px);
  border-bottom-color: var(--line);
}
.nav__inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__logo {
  font-size: 14px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
}
.nav__heart {
  color: var(--pink);
}
.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(14px, 3vw, 30px);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-dim);
}
.nav__links a {
  transition: color var(--dur) var(--ease);
}
.nav__links a:hover {
  color: var(--text);
}
.nav__gh svg {
  width: 19px;
  height: 19px;
  display: block;
}
@media (max-width: 560px) {
  .nav__links a:not(.nav__gh):not(:first-child) {
    display: none;
  }
}
</style>
