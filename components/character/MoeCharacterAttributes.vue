<template>
	<form class="w-1/2 flex flex-col h-80vh justify-between" @submit.prevent="saveChanges">
		<div
			class="h-85% flex flex-col items-center scrollbar scrollbar-rounded scrollbar-w-2 scrollbar-radius-2 scrollbar-track-radius-4 scrollbar-thumb-radius-4 scrollbar-track-color-gray-500 scrollbar-thumb-color-gray-9 overflow-auto px-8"
		>
			<div class="pb-2 w-full">
				<label>
					Name
					<input
						:value="character.name"
						type="text"
						class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
						@input="changeName"
					/>
				</label>
			</div>
			<div class="py-2 w-full">
				<label>
					Origin
					<input
						:value="character.origin"
						type="text"
						class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
						@input="changeOrigin"
					/>
				</label>
			</div>
			<div v-for="(attribute, i) in character.attributeArray" :key="i" class="py-2 w-full relative">
				<span
					v-tooltip="'Remove Attribute'"
					class="items-center justify-center top-9 right-0 flex bg-red-600 hover:bg-red-700 text-gray-900 h-8 w-8 rounded-lg cursor-pointer absolute fas fa-times"
					@click.prevent="removeAttribute(attribute)"
				></span>
				<label>
					<input
						v-model="attribute.name"
						type="text"
						class="h-6 p-1 block border border-teal-500 rounded text-gray-100 bg-gray-900 focus:outline-none w-32 mb-1 pl-0"
					/>
					<input
						v-model="attribute.value"
						type="text"
						class="block px-1 rounded-lg border text-gray-900 bg-gray-300 focus:outline-none h-8 w-full"
					/>
				</label>
			</div>
			<div class="flex justify-center mt-8">
				<MoeButton icon="fas fa-plus" class="py-2 w-48 bg-gray-500 h-10" @click.prevent="addAttribute">Add Attribute</MoeButton>
			</div>
		</div>
		<div class="flex gap-2 justify-center h-7% items-center">
			<MoeButton icon="fas fa-save" class="py-2 h-10 w-auto bg-green-600 text-color-unset"> Save Character </MoeButton>
			<MoeButton icon="fas fa-trash" class="py-2 h-10 w-auto bg-red-600 text-color-unset" @click.prevent="deleteCharacter">
				Delete character
			</MoeButton>
			<div v-if="copied">
				<MoeButton icon="fas fa-trash" class="py-2 h-10 w-auto bg-gray-500" @click.prevent="copyCharacter"> Copied! </MoeButton>
			</div>
			<MoeButton v-else icon="fas fa-copy" class="py-2 h-10 w-auto bg-gray-500" @click.prevent="copyCharacter"
				>Copy Character</MoeButton
			>
			<MoeButton icon="fas fa-file-export" class="py-2 h-10 w-auto bg-gray-500" @click.prevent="exportCharacter"
				>Export Character</MoeButton
			>
		</div>
	</form>
</template>

<script setup lang="ts">
	import pkg from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { CharacterAttribute } from "~~/models/interfaces/Character";
	const { saveAs } = pkg;

	const mainStore = useMainStore();
	const collectionStore = useCollectionStore();
	const characterStore = useCharacterStore();

	const copied = ref(false);
	const character = characterStore.character;

	async function saveChanges() {
		mainStore.loading = true;
		try {
			await collectionStore.saveChanges();
			mainStore.modal = Modal.NONE;
		} catch (error) {
			mainStore.modal = Modal.SAVEERROR;
		} finally {
			mainStore.loading = false;
		}
		await backToCharacterList();
	}

	function deleteCharacter() {
		mainStore.modal = Modal.DELETECHARACTER;
	}

	function changeName(event: Event) {
		const name = (event.target as HTMLInputElement).value;
		characterStore.changeCharacterName(name);
	}

	function changeOrigin(event: Event) {
		const origin = (event.target as HTMLInputElement).value;
		characterStore.changeCharacterOrigin(origin);
	}

	function copyCharacter() {
		copied.value = true;
		window.setTimeout(() => {
			copied.value = false;
		}, 1000 * 2);
		navigator.clipboard.writeText(JSON.stringify(character));
	}

	function exportCharacter() {
		saveAs(new File([JSON.stringify(character)], character.name + ".json"));
	}

	async function backToCharacterList() {
		characterStore.resetCharacter();
		await mainStore.toList();
	}

	function addAttribute() {
		characterStore.addAttribute();
	}

	function removeAttribute(attribute: CharacterAttribute) {
		characterStore.removeAttribute(attribute);
	}
</script>
