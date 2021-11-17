<script>
import { onDestroy, onMount, text } from "svelte/internal";
import RangeSlider from "svelte-range-slider-pips";
import { timer } from 'rxjs';
import { createGQLWSClient, createSubscription } from "$lib/graphql-ws";
import TopTicks from "../../components/TopTicks.svelte";

let runningTicks = false;
let focusGroupName = "pepsi commercial";
let userName = "ekolu";
let sliderValues = [50]; // default
let tickLog = "";

let timerObservable;
let timerSub;

let gqlwsClient;
let gqlwsObservable;

// browser-only code
onMount(async () => {
    // setup the client in the index.svelte onMount() handler
    gqlwsClient = createGQLWSClient(import.meta.env.VITE_HASURA_GRAPHQL_URL);

    // execute createSubscription() in the onMount() handler 
    
    // and bind to a new grid/table component
    // src/components/TopTicks.svelte
    const gql = `subscription MySubscription($limit:Int) {
  ratingtick(order_by: {id: desc}, limit: $limit) {
    id
    focusgroup
    username
    rating
    tick_ts
  }
}`;
    const variables = {"limit": 5}; // how many to display
    gqlwsObservable = createSubscription(gqlwsClient, gql, variables);


});

// release memory
onDestroy(() => {
    // if (subscription) {
    //     subscription.unsubscribe();
    // }
});

function timerStart() {
    runningTicks = true;
    timerObservable = timer(1000, 1000);

    timerSub = timerObservable.subscribe(val => {
        tickLog += `tick ${val}... `;

        // execute createMutation() on every tick with the current values

    });
}

function timerStop() {
    timerSub.unsubscribe();
    runningTicks = false;
}

</script>

<h1>Slider</h1>
<p>
    enter your focus group, name and click 'start'. 
</p>
<p>
    Once it starts, move the slider depending on how much you 
    agree/disagree with the video. 
</p>

<form>
<label for="focusgroup">focus group: </label><input type="text" name="focusgroup" bind:value={focusGroupName} />
<label for="username">username: </label><input type="text" name="focusgroup" bind:value={userName} />

<label for="ratingslider">rating slider (0 to 100): </label>

<RangeSlider name="ratingslider" min={0} max={100} bind:values={sliderValues} pips all='label' />
<div>0 = bad/disagree, 50 = neutral, 100 = good/agree</div>
<div>slider Value: {sliderValues[0]}</div>

<button disabled={runningTicks} on:click|preventDefault={timerStart}>Start</button>
<button disabled={!runningTicks} on:click|preventDefault={timerStop}>Stop</button>
</form>
<div>
    Tick output: {tickLog}
</div>

<TopTicks observable={gqlwsObservable} />

<div>
    <a href="/">Home</a>
</div>
