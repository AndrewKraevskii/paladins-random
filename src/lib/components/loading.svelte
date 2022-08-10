<script lang="ts">
	import { onMount } from 'svelte';
    const maxdots = 3;
	let dots = 3;
	onMount(() => {
		const id = setInterval(() => {
			dots++;
		}, 100);

        return () => {
            clearInterval(id);
        }
	});
</script>

<h2>Loading{'.'.repeat(dots % (maxdots + 1))}</h2>
