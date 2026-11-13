import { onBeforeUnmount, ref } from 'vue';

/** Whether a CSS media query matches, updated when it changes */
export function useMediaQuery(query: string) {
  const list = window.matchMedia(query);
  const matches = ref(list.matches);
  const update = (e: MediaQueryListEvent) => (matches.value = e.matches);
  list.addEventListener('change', update);
  onBeforeUnmount(() => list.removeEventListener('change', update));
  return matches;
}
