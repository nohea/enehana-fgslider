<script>
	import { onDestroy, onMount, text } from 'svelte/internal';
	import RangeSlider from 'svelte-range-slider-pips';
	import { timer } from 'rxjs';
	import { createGQLWSClient, createMutation, createSubscription } from '$lib/graphql-ws';
	import TopTicks from '../../components/TopTicks.svelte';
	import { env } from '$env/dynamic/public';
	import { writable } from 'svelte/store';

	let runningTicks = false;
	let focusGroupName = 'pepsi commercial';
	let userName = 'ekolu';
	let sliderValues = [50]; // default
	let tickLog = '';

	let timerObservable;
	let timerSub;

	let gqlwsClient;
	let gqlwsObservable = writable('');
	let gqlwsSubscriptions = [];

	let message = '';

	// browser-only code
	onMount(async () => {
		console.log("onMount()");
		// setup the client in the index.svelte onMount() handler

		try {
			console.log("env.PUBLIC_HASURA_GRAPHQL_URL ", env.PUBLIC_HASURA_GRAPHQL_URL);
			gqlwsClient = createGQLWSClient(env.PUBLIC_HASURA_GRAPHQL_URL);

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
			console.log("rxjsobservable ", rxjsobservable);
			gqlwsObservable = rxjsobservable;

		}
		catch(err) {
			console.log("catch", err);
			message = JSON.stringify(err);
		}
	});

	// release memory
	onDestroy(() => {
		console.log("onDestroy()");
		if(runningTicks) {
			timerStop();
		}
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
		console.log("submitLatestRatingTick()");
		const gql = `mutation MyMutation($focusgroup:String, $username:String, $rating:Int) {
  insert_ratingtick_one(object: {focusgroup: $focusgroup, username: $username, 
    rating: $rating}) {
    id
  }
}
`;
		const variables = buildRatingTick();

		try {
			createMutation(client, gql, variables);
		}
		catch(err) {
			console.log("createMutation catch", err);
			message = JSON.stringify(err);
		}
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

{#if message}
<div style="color:red">{message}</div>
{/if}

<TopTicks observable={gqlwsObservable} />

<button on:click|preventDefault={removeExcessRecords}>Delete most records</button>

<form action="/api/cleanup" method="post">
	<input type="submit" value="Delete most records via POST" />
</form>

<div>
	<a href="/">Home</a>
</div>

<div>env.PUBLIC_HASURA_GRAPHQL_URL {env.PUBLIC_HASURA_GRAPHQL_URL}</div>