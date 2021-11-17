<script>
import { text } from "svelte/internal";
import RangeSlider from "svelte-range-slider-pips";
import { timer } from 'rxjs';

let runningTicks = false;
let focusGroupName = "pepsi commercial";
let userName = "ekolu";
let sliderValues = [50]; // default
let tickLog = "";

let timerObservable;
let timerSub;

function timerStart() {
    runningTicks = true;
    timerObservable = timer(1000, 1000);

    timerSub = timerObservable.subscribe(val => {
        tickLog += `tick ${val}... `;
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

<div>
    <a href="/">Home</a>
</div>
