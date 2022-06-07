<script>
	import feather from 'feather-icons';
	export let icon = 'home';
	export let size = 24;
</script>

{@html feather.icons[icon].toSvg({ width: size, height: size })}
