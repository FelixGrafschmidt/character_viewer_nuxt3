<template>
	<div class="">
		<div
			v-for="(character, index) in characters"
			:ref="character.id"
			:key="index"
			:class="{
				'bg-gray-800': index % 2 === 0,
				'bg-gray-900': index % 2 !== 0,
			}"
			class="flex h-24 hover:bg-gray-700 items-center rounded cursor-pointer my-1"
			@click="selectCharacter(character)"
		>
			<div class="w-[35%] text-center">{{ character.name }}</div>
			<div class="w-[35%] text-center">{{ character.origin }}</div>
			<div class="w-[10%] text-center">{{ character.images.length }}</div>
			<div class="w-[10%] text-center">{{ character.attributeArray.length }}</div>
			<div class="w-[10%] text-center">
				<img loading="lazy" :src="getMainImage(character).src" :alt="character.name" class="h-24 max-w-24 rounded m-auto" />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { Character } from "~~/models/interfaces/Character";

	const listStore = useListStore();
	const characterStore = useCharacterStore();
	const mainStore = useMainStore();

	const characters = computed(() => listStore.list.characters);

	async function selectCharacter(character: Character) {
		characterStore.setCharacter(character);
		await mainStore.toCharacter();
	}

	function getMainImage(character: Character) {
		return (
			character.images.filter((image) => {
				return image.main;
			})[0] || ""
		);
	}
</script>
