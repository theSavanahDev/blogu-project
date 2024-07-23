import { accessAuthenticated } from "@/payload-access/access-authenticated";

import type { CollectionConfig } from "payload";

export const Users: CollectionConfig = {
	slug: "users",
	labels: {
		singular: "User",
		plural: "Users",
	},
	admin: {
		defaultColumns: ["name", "email"],
		useAsTitle: "name",
	},
	access: {
		admin: accessAuthenticated,
		create: accessAuthenticated,
		delete: accessAuthenticated,
		read: accessAuthenticated,
		update: accessAuthenticated,
	},
	auth: true,
	fields: [
		{
			name: "name",
			label: "Name",
			type: "text",
			required: true,
		},
	],
	timestamps: true,
};
