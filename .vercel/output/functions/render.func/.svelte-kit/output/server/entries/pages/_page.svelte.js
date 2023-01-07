import { c as create_ssr_component, e as escape } from "../../chunks/index.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let TEST = {}.VITE_TEST;
  return `<h1>Focus Group Slider</h1>
<ul><li><a href="${"/slider"}">Slider page</a></li></ul>

<div>${escape(TEST)}</div>`;
});
export {
  Page as default
};
