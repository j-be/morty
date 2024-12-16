<script>
	import '../app.sass';
</script>

<header>
	<div class="container">
		<h1>Morty</h1>
	</div>
</header>
<main class="container">
	<slot />
</main>
<footer>
	<div class="container">
		Juri Berlanda<br />
		Bahnstra&szlig;e 52 / Haus 13, 2345 Brunn am Gebirge
	</div>
</footer>

<style lang="sass">
	header > div
		display: flex
		justify-content: space-between
</style>
