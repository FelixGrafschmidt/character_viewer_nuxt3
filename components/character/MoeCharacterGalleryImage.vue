<template>
	<div v-if="image" class="flex flex-col items-center w-1/2 justify-between h-[80vh] gap-3">
		<div class="h-90% justify-center flex">
			<figure class="flex flex-col justify-center h-full">
				<img :alt="character.name" :src="image.src || ''" class="rounded max-h-full m-auto" />
			</figure>
		</div>
		<div class="flex gap-4 items-center justify-self-end h-10%">
			<MoeButton v-tooltip="'Designate as Main Image'" class="bg-gray-500 w-10 h-10" icon="fas fa-star" @click="designateMainImage" />
			<MoeButton v-tooltip="'Remove this Image'" class="bg-red-600 w-10 h-10" icon="fas fa-trash" @click="deleteImage" />
			<MoeButton v-tooltip="'Delete all Images'" class="bg-red-600 w-10 h-10" icon="fas fa-trash" @click="deleteAllImages" />
			<MoeButton v-tooltip="'Add Image'" class="bg-gray-500 w-10 h-10" icon="fas fa-plus" @click="addNewImage" />
			<MoeButton v-tooltip="'Add Images'" class="bg-gray-500 w-10 h-10" icon="fab fa-buffer" @click="addImageMulti" />
			<MoeButton v-tooltip="'Export all Images'" class="bg-gray-500 w-10 h-10" icon="far fa-save" @click="exportImages" />
		</div>
	</div>
</template>

<script lang="ts" setup>
	import pkg from "file-saver";
	import { Modal } from "~/models/enums/Modal";
	import { Character, CharacterImage } from "~/models/interfaces/Character";
	const mainStore = useMainStore();
	const characterStore = useCharacterStore();
	const { saveAs } = pkg;

	const props = defineProps<{
		character: Character;
		image?: CharacterImage;
	}>();

	const emit = defineEmits<{
		(e: "delete", images: CharacterImage[]): void;
	}>();

	function designateMainImage() {
		const index = props.character.images.indexOf(props.image!);
		characterStore.designateMainImage(index);
	}
	function addNewImage() {
		mainStore.modal = Modal.NEWIMAGE;
	}

	function addImageMulti() {
		mainStore.modal = Modal.IMAGEMULTI;
	}

	function deleteAllImages() {
		emit("delete", props.character.images);
	}

	function deleteImage() {
		emit("delete", [props.image!]);
	}

	function exportImages() {
		let imageSources = "";
		props.character.images.forEach((image) => {
			imageSources += image.src + "\n";
		});
		saveAs(new File([imageSources], props.character.name + "_images.txt"));
	}
</script>
