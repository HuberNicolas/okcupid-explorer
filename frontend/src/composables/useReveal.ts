import { onBeforeUnmount, onMounted } from 'vue';

/** Fade in elements with the class "reveal" when they scroll into view. */
export function useReveal() {
  let observer: IntersectionObserver | undefined;
  let mutations: MutationObserver | undefined;
  onMounted(() => {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'));
      return;
    }
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const observe = () => document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => observer?.observe(el));
    observe();
    // Sections that appear later (results) register themselves again
    mutations = new MutationObserver(observe);
    mutations.observe(document.body, { childList: true, subtree: true });
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    mutations?.disconnect();
  });
}
