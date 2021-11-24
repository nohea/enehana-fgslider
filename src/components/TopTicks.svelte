<script>
    export let observable;
</script>

{#if $observable}
<h3>Top Ticks</h3>
<table>
    <thead>
        <tr>
            <th>id</th>
            <th>focus group</th>
            <th>user</th>
            <th>rating</th>
            <th>tick ts</th>
        </tr>
    </thead>
    <tbody>
        {#each $observable.data.ratingtick as item}
        <tr>
            <td>{item.id}</td>
            <td>{item.focusgroup}</td>
            <td>{item.username}</td>
            <td>{item.rating}</td>
            <td>{item.tick_ts}</td>
        </tr>
        {/each}

    </tbody>
</table>
{/if}
