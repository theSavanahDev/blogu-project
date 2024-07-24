import { anyoneAccess } from "@/payload-access/access-anyone";
import { authenticatedAccess } from "@/payload-access/access-authenticated";

import type { CollectionConfig } from "payload";

export const Comments: CollectionConfig = {
	slug: "comments",
	labels: {
		singular: "Comment",
		plural: "Comments",
	},
	access: {
		create: anyoneAccess,
		delete: authenticatedAccess,
		read: anyoneAccess,
		update: authenticatedAccess,
	},
	admin: {
		defaultColumns: ["name", "email"],
		useAsTitle: "name",
	},
	fields: [
		{
			name: "name",
			label: "Name",
			type: "text",
			required: true,
		},
		{
			name: "email",
			label: "Email",
			type: "text",
			required: true,
		},
		{
			name: "comment",
			label: "Comment",
			type: "textarea",
			maxLength: 500,
			required: true,
		},
	],
};
