<script lang="ts">
	import '$src/app.css';
	export let data;
	const { lang } = data;
</script>

<header class="bg-cyan-800 grid grid-cols-3">
	<h1 class="col-start-2 text-center text-4xl py-5 text-white font-semibold">
		Paladins randomiser
	</h1>
    <div class="col-start-3 self-center ml-auto mr-10 text-white">
        <a href="?lang=ru" sveltekit:reload 
		>RU</a
        >
        <a href="/" sveltekit:reload
		>EN</a
        >

    </div>
</header>
<slot />
