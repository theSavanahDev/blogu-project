import { anyoneAccess } from "@/payload-access/access-anyone";
import { authenticatedAccess } from "@/payload-access/access-authenticated";

import type { CollectionConfig } from "payload";

export const Categories: CollectionConfig = {
	slug: "categories",
	labels: {
		singular: "Category",
		plural: "Categories",
	},
	access: {
		create: authenticatedAccess,
		delete: authenticatedAccess,
		read: anyoneAccess,
		update: authenticatedAccess,
	},
	admin: {
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
		},
	],
};
