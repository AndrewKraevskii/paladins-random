<script lang="ts">
    import { getChampionsInfo } from "$api/getchampioninfo";
    import Loading from "$lib/components/loading.svelte";
    import Randomiser from "$lib/components/randomiser.svelte";
    const champions = getChampionsInfo()
</script>

{#await champions}
    <!-- promise is pending -->
    <Loading></Loading>
{:then champions}
    <!-- promise was fulfilled -->
    <Randomiser {champions}></Randomiser>
{/await}

<!-- TODO: персонаж, 5 карт персонажа (sum цифры на картах == 15), талант персонажа, 4 предмета на закуп -->