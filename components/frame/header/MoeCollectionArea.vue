<template>
	<div class="w-[50%] flex gap-3 items-center justify-end mr-4">
		<span>{{ collection.id }}</span>
		<MoeButton v-tooltip="'Copy ID'" icon="fas fa-copy" class="h-10 w-10 bg-gray-500" @click="copyID" />
		<MoeButton v-tooltip="'Load Collection'" icon="fas fa-folder-open" class="bg-gray-500 h-10 w-10" @click="loadCollection" />
		<MoeButton v-tooltip="'Export Collection'" icon="fas fa-download" class="bg-gray-500 h-10 w-10" @click="exportCollection" />
		<MoeButton
			v-tooltip="'Unload Collection'"
			icon="fas fa-times"
			class="hover:bg-red-700 bg-gray-500 h-10 w-10"
			@click="unloadCollection"
		/>
	</div>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~~/models/enums/Modal";
	const { saveAs } = pkg;

	const collectionStore = useCollectionStore();
	const mainStore = useMainStore();

	const collection = computed(() => collectionStore.collection);

	function loadCollection() {
		mainStore.modal = Modal.LOADCOLLECTION;
	}
	function copyID() {
		useClipboard({ source: collection.value.id }).copy();
	}

	function exportCollection() {
		saveAs(new File([JSON.stringify(collection)], collection.value.id + ".json"));
	}

	function unloadCollection() {
		mainStore.modal = Modal.UNLOADCOLLECTION;
	}
</script>
