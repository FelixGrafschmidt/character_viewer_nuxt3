<template>
	<button
		class="p-2 rounded-md flex flex-row gap-1 justify-center items-center text-sm font-medium hover:text-teal-400"
		@click="$emit('click', $event)"
	>
		<i v-if="icon !== ''" :class="icon"></i>
		<slot />
	</button>
</template>

<script setup lang="ts">
	defineProps({
		icon: { type: String, default: "" },
	});
	defineEmits<{
		(e: "click"): void;
	}>();
</script>
