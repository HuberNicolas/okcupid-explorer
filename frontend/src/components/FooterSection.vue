<script setup lang="ts">
import { ORIGINAL, PORTFOLIO, REPOSITORY } from '../links';

const team = [
  { name: 'Daniel Lutziger', url: 'https://github.com/danielLutziger' },
  { name: 'Karim Abouel Naga', url: 'https://github.com/KarimAbouelNaga' },
  { name: 'Nicolas Peter Meyer', url: 'https://github.com/nicolaspetermeyer' },
  { name: 'Nicolas Huber', url: PORTFOLIO },
];
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div>
        <p class="footer__logo mono"><span>♥</span> project eros</p>
        <p class="footer__text">
          Built in 2022 by group nvwd for <em>Interactive Visual Data Analysis</em> at the University of Zurich:
          <template v-for="(member, i) in team" :key="member.name">
            <a :href="member.url" target="_blank" rel="noopener">{{ member.name }}</a>{{ i < team.length - 2 ? ', ' : i === team.length - 2 ? ' and ' : '.' }}
          </template>
          Rebuilt in 2026 with Vue by Nicolas Huber.
        </p>
      </div>
      <nav class="footer__links mono" aria-label="Links">
        <a :href="REPOSITORY" target="_blank" rel="noopener">source ↗</a>
        <a :href="ORIGINAL" target="_blank" rel="noopener">2022 version ↗</a>
        <a :href="PORTFOLIO" target="_blank" rel="noopener">nicolas-huber.dev ↗</a>
      </nav>
    </div>
    <p class="container footer__legal mono">Code under the MIT license · data © their authors, see the dataset's terms</p>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  padding: 48px 0 32px;
}
.footer__inner {
  display: flex;
  justify-content: space-between;
  gap: 32px;
  flex-wrap: wrap;
}
.footer__logo {
  font-size: 14px;
  margin: 0 0 10px;
}
.footer__logo span {
  color: var(--pink);
}
.footer__text {
  color: var(--text-dim);
  font-size: 14px;
  max-width: 560px;
  margin: 0;
}
.footer__text a {
  color: var(--text);
  border-bottom: 1px solid var(--line-strong);
}
.footer__text a:hover {
  border-color: var(--green);
}
.footer__links {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 13px;
  color: var(--text-dim);
}
.footer__links a:hover {
  color: var(--text);
}
.footer__legal {
  font-size: 11.5px;
  color: var(--text-faint);
  margin-top: 32px;
}
</style>
