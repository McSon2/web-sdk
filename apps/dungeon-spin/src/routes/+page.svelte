<script lang="ts">
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	
	setContext();
</script>

<Game />