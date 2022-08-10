<script lang="ts" context="module">
    export async function load({fetch}) {
    const resp =  await fetch("/api");
      return {
        status: 200,
        props: {
            champions: await resp.json()
        }
      };
    }
</script>

<script lang="ts">
	import Randomiser from '$lib/components/randomiser.svelte';
	export let champions;
    // console.log(champions);
</script>

<!-- promise is pending -->
<!-- promise was fulfilled -->
<Randomiser {champions} />

<!-- TODO: персонаж, 5 карт персонажа (sum цифры на картах == 15), талант персонажа, 4 предмета на закуп -->
