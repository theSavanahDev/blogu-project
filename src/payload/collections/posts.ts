import {
	FixedToolbarFeature,
	HTMLConverterFeature,
	InlineToolbarFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { slugField } from "@/payload-fields/field-slug";

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
		slugField(),
		{
			name: "categories",
			label: "Categories",
			type: "relationship",
			admin: {
				position: "sidebar",
			},
			hasMany: true,
			relationTo: "categories",
		},
		{
			name: "authors",
			label: "Author",
			type: "relationship",
			admin: {
				position: "sidebar",
			},
			relationTo: "authors",
		},
		{
			name: "image",
			label: "Featured Image",
			type: "upload",
			relationTo: "media",
			required: true,
		},
		{
			name: "excerpt",
			label: "Excerpt",
			type: "textarea",
			maxLength: 500,
			required: true,
		},
		{
			name: "content",
			label: "Content",
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
		lexicalHTML("content", { name: "content_html" }),
	],
};
