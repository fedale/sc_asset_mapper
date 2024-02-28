import './bootstrap.js';
import './styles/app.css';
import alienGreeting from './lib/alien-greeting.js';
import { shouldPerformTransition, performTransition } from "turbo-view-transitions";

alienGreeting('Give us all your candy!', false);
console.log('Give us')
console.log('This log comes from assets/app.jwwwws - welcome to AssetMapper! 🎉');

let skipNextRenderTransition = false;

document.addEventListener("turbo:before-render", (event) => {
  if (shouldPerformTransition() && !skipNextRenderTransition) {
    event.preventDefault();

    performTransition(document.body, event.detail.newBody, async () => {
      await event.detail.resume();
    });
  }
});

document.addEventListener("turbo:load", () => {
  // View Transitions don't play nicely with Turbo cache
//  if (shouldPerformTransition()) Turbo.cache.exemptPageFromCache();
});

document.addEventListener("turbo:before-frame-render", (event) => {
    if (shouldPerformTransition()) {
      event.preventDefault();

      skipNextRenderTransition = true;
      setTimeout( () => {
        skipNextRenderTransition = false;
      }, 100);
  
      performTransition(event.target, event.detail.newFrame, async () => {
        await event.detail.resume();
      });
    }
  });