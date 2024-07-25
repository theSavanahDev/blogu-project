import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from "@payloadcms/richtext-lexical";

import { anyoneAccess } from "@/payload-access/access-anyone";
import { authenticatedAccess } from "@/payload-access/access-authenticated";

import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
	slug: "authors",
	labels: {
		singular: "Author",
		plural: "Authors",
	},
	access: {
		create: authenticatedAccess,
		delete: authenticatedAccess,
		read: anyoneAccess,
		update: authenticatedAccess,
	},
	admin: {
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
			name: "photo",
			label: "Photo",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "bio",
			label: "Bio",
			type: "richText",
			editor: lexicalEditor({
				features: ({ rootFeatures }) => [...rootFeatures, HTMLConverterFeature({})],
			}),
		},
		lexicalHTML("bio", { name: "bio_html" }),
	],
};
