<template>
	<div class="flex my-6 justify-center gap-2">
		<MoeButton
			v-tooltip="'Add New Character'"
			@click="addNewCharacter"
			icon="fas fa-user-plus"
			class="w-24 bg-gray-500"
		/>

		<MoeButton
			v-tooltip="'Add Attributes to all Characters'"
			@click="addListAttribute"
			icon="fas fa-folder-plus"
			class="w-24 bg-gray-500"
		/>
	</div>
</template>

<script setup lang="ts">
import { Modal } from "~~/models/enums/Modal";
import { newCharacter } from "~~/models/interfaces/Character";

const mainStore = useMainStore()
const characterStore = useCharacterStore()

function addNewCharacter() {
	characterStore.setCharacter(newCharacter());
	mainStore.toCharacter();
}

function addListAttribute() {
	mainStore.modal = Modal.NEWATTRIBUTE;
}

</script>
