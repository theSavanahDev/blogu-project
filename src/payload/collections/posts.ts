import { authenticatedAccess } from "@/payload-access/access-authenticated";
import { authenticatedOrPublishedAccess } from "@/payload-access/access-authenticated-or-published";

import type { CollectionConfig } from "payload";

export const Posts: CollectionConfig = {
	slug: "posts",
	labels: {
		singular: "Post",
		plural: "Posts",
	},
	access: {
		create: authenticatedAccess,
		delete: authenticatedAccess,
		read: authenticatedOrPublishedAccess,
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
