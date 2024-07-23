import {
	FixedToolbarFeature,
	HTMLConverterFeature,
	InlineToolbarFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import type { CollectionConfig } from "payload";

export const Authors: CollectionConfig = {
	slug: "authors",
	access: {
		read: () => true,
	},
	labels: {
		singular: "Author",
		plural: "Authors",
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
				features: ({ rootFeatures }) => [
					...rootFeatures,
					FixedToolbarFeature(),
					HTMLConverterFeature({}),
					InlineToolbarFeature(),
				],
			}),
		},
		lexicalHTML("bio", { name: "bio_html" }),
	],
};
