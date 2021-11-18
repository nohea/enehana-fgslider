<script>
	import { onDestroy, onMount, text } from 'svelte/internal';
	import RangeSlider from 'svelte-range-slider-pips';
	import { timer } from 'rxjs';
	import { createGQLWSClient, createMutation, createSubscription } from '$lib/graphql-ws';
	import TopTicks from '../../components/TopTicks.svelte';

	let runningTicks = false;
	let focusGroupName = 'pepsi commercial';
	let userName = 'ekolu';
	let sliderValues = [50]; // default
	let tickLog = '';

	let timerObservable;
	let timerSub;

	let gqlwsClient;
	let gqlwsObservable;
	let gqlwsSubscriptions = [];

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
		const variables = { limit: 5 }; // how many to display
		const rxjsobservable = createSubscription(
			gqlwsClient,
			gql,
			variables
		);
		// const subscription = rxjsobservable.subscribe(subscriber => {
		// 	console.log('subscriber: ', subscriber);
		// });
		// console.log('subscription: ', subscription);
		// gqlwsSubscriptions.push(subscription);
		gqlwsObservable = rxjsobservable;
	});

	// release memory
	onDestroy(() => {
		gqlwsSubscriptions.forEach(s => {
			s.unsubscribe();
		});
	});

	function timerStart() {
		runningTicks = true;
		timerObservable = timer(1000, 1000);

		timerSub = timerObservable.subscribe((val) => {
			tickLog += `tick ${val}... `;

			// execute createMutation() on every tick with the current values
			submitLatestRatingTick(gqlwsClient);
		});
	}

	function timerStop() {
		timerSub.unsubscribe();
		runningTicks = false;
	}

	function submitLatestRatingTick(client) {
		const gql = `mutation MyMutation($focusgroup:String, $username:String, $rating:Int) {
  insert_ratingtick_one(object: {focusgroup: $focusgroup, username: $username, 
    rating: $rating}) {
    id
  }
}
`;
		const variables = buildRatingTick();

		createMutation(client, gql, variables);
	}

	function buildRatingTick() {
		return {
			focusgroup: focusGroupName,
			username: userName,
			rating: sliderValues[0]
		};
	}

	function removeExcessRecords(client) {
		const gql = `mutation DeleteRatingTicksMutation {
  delete_ratingtick(where: {id: {_gt: 10}}) {
    affected_rows
  }
}`;
		const variables = {};

		createMutation(gqlwsClient, gql, variables);
	}

</script>

<h1>Slider</h1>
<p>enter your focus group, name and click 'start'.</p>
<p>Once it starts, move the slider depending on how much you agree/disagree with the video.</p>

<form>
	<label for="focusgroup">focus group: </label><input
		type="text"
		name="focusgroup"
		bind:value={focusGroupName}
	/>
	<label for="username">username: </label><input
		type="text"
		name="focusgroup"
		bind:value={userName}
	/>

	<label for="ratingslider">rating slider (0 to 100): </label>

	<RangeSlider name="ratingslider" min={0} max={100} bind:values={sliderValues} pips all="label" />
	<div>0 = bad/disagree, 50 = neutral, 100 = good/agree</div>
	<div>slider Value: {sliderValues[0]}</div>

	<button disabled={runningTicks} on:click|preventDefault={timerStart}>Start</button>
	<button disabled={!runningTicks} on:click|preventDefault={timerStop}>Stop</button>
</form>
<div>
	Tick output: {tickLog}
</div>

<TopTicks observable={gqlwsObservable} />

<button on:click|preventDefault={removeExcessRecords}>Delete most records</button>

<div>
	<a href="/">Home</a>
</div>
