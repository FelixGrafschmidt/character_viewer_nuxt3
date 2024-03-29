<template>
	<aside class="bg-gray-700 py-4 px-4" @mouseenter="captureScroll" @mouseleave="releaseScroll">
		<h3 class="text-lg max-w-[15rem] whitespace-nowrap truncate">
			<template v-if="list.id">
				<span class="cursor-pointer" @click="navigateToList(list)">{{ list.name }}</span>
			</template>
			<template v-else>
				<span>No list selected</span>
			</template>
		</h3>
		<div
			:class="{
				'scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-gray-500 scrollbar-thumb-color-gray-9 overflow-y-scroll':
					showScrollbars,
			}"
			class="rounded min-h-[35vh] max-h-[35vh] overflow-hidden"
		>
			<div
				v-for="characteritem of list.characters"
				:key="characteritem.id"
				:class="{ 'bg-teal-500 hover:bg-teal-400': character.id && characteritem.id === character.id }"
				class="hover:bg-gray-800 rounded pl-6 py-1 cursor-pointer"
				role="link"
				@click="navigateToCharacter(characteritem)"
			>
				{{ characteritem.name }}
			</div>
		</div>
		<h3 class="text-lg flex flex-row gap-2 items-baseline pt-4">
			<span class="cursor-pointer" @click="toCollection">Lists</span>
			<MoeButton icon="fas fa-plus" @click="addList">Add</MoeButton>
		</h3>
		<div
			:class="{
				'scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-gray-500 scrollbar-thumb-color-gray-9 overflow-y-scroll':
					showScrollbars,
			}"
			class="rounded min-h-[35vh] max-h-[35vh] overflow-hidden"
		>
			<div
				v-for="listitem of collection.lists"
				:key="listitem.id"
				:class="{ 'bg-teal-500 hover:bg-teal-400': listitem.id === list.id }"
				class="hover:bg-gray-800 rounded pl-6 py-1 cursor-pointer"
				role="link"
				@click="navigateToList(listitem)"
			>
				{{ listitem.name }}
			</div>
		</div>
	</aside>
</template>

<script setup lang="ts">
	import { storeToRefs } from "pinia";
	import { Modal } from "~/models/enums/Modal";
	import { Character } from "~~/models/interfaces/Character";
	import { List } from "~~/models/interfaces/List";

	const showScrollbars = ref(false);

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const listStore = useListStore();
	const characterStore = useCharacterStore();

	const collection = computed(() => collectionStore.collection);
	const { list } = storeToRefs(listStore);
	const character = computed(() => characterStore.character);

	async function navigateToList(list: List) {
		listStore.setList(list);
		await mainStore.toList();
	}

	async function navigateToCharacter(character: Character) {
		characterStore.setCharacter(character);
		await mainStore.toCharacter();
	}

	async function toCollection() {
		await mainStore.toCollection();
	}

	function captureScroll() {
		showScrollbars.value = true;
	}

	function releaseScroll() {
		showScrollbars.value = false;
	}

	function addList() {
		mainStore.modal = Modal.NEWLIST;
	}
</script>
