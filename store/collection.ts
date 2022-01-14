import { defineStore } from "pinia";
import { Collection, getHash, newCollection } from "~~/models/interfaces/Collection";
import { List, newList } from "~~/models/interfaces/List";

export const useCollectionStore = defineStore('collection', {
	state: () => ({
		collection: newCollection(""),
		listToDelete: newList(""),
		originalHash: "",
		ready: false
	}),
	actions: {
		async loadCollection() {
			let collectionId = window.localStorage.getItem("collectionId");
			const collection = newCollection();
			if (collectionId) {
				collection.id = collectionId;
				try {
					const response = await $fetch<Collection>("/api/load_collection", { params: { id: collectionId } })
					collectionId = response.id;

					this.collection = response;
					this.originalHash = getHash(response);
				} catch (error) {
					console.error(error);

					this.collection = collection;
					this.originalHash = getHash(collection);
				} finally {
					localStorage.setItem("collectionId", collectionId);
					this.ready = true;
				}

			} else {
				this.collection = collection;
				this.originalHash = getHash(collection);
				localStorage.setItem("collectionId", collection.id);
				this.ready = true;
			}
		},
		async saveChanges() {
			try {
				await $fetch("/api/save_collection", { method: "POST", body: this.collection, headers: { "Content-Type": "application/json" } })
				this.originalHash = getHash(this.collection);
			} catch (error) {
				console.error(error);
			}
		},
		setCollection(collection: Collection) {
			this.collection = collection;
			this.originalHash = getHash(collection);
		},
		addListToCollection(list: List) {
			this.collection.lists.push(list);
		},
		renameList({ id, name }: { id: string; name: string }) {
			this.collection.lists.filter((list) => list.id === id)[0].name = name;
		},
		setListToDelete(list: List) {
			this.listToDelete = list;
		},
		deleteList(id: string) {
			this.collection.lists = this.collection.lists.filter((list) => list.id !== id);
			// if (this.list.id === id) {
			// 	this.list = { id: "", name: "", characters: new Array<Character>(), sortorder: Sortorder.DEFAULT };
			// }
		},
		removeListFromCollection(id: string) {
			this.collection.lists = this.collection.lists.filter((list) => list.id !== id);
		}
	}
})
