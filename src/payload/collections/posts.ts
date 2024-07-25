import {
	FixedToolbarFeature,
	HTMLConverterFeature,
	InlineToolbarFeature,
	lexicalEditor,
	lexicalHTML,
} from "@payloadcms/richtext-lexical";

import { slugField } from "@/payload-fields/field-slug";

import { anyoneAccess } from "@/payload-access/access-anyone";
import { authenticatedAccess } from "@/payload-access/access-authenticated";

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
		read: anyoneAccess,
		update: authenticatedAccess,
	},
	admin: {
		defaultColumns: ["title", "slug"],
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			label: "Title",
			type: "text",
			required: true,
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
				features: ({ rootFeatures }) => [...rootFeatures, HTMLConverterFeature({})],
			}),
			required: true,
		},
		lexicalHTML("content", { name: "content_html" }),
		slugField(),
		{
			name: "categories",
			label: "Categories",
			type: "relationship",
			relationTo: "categories",
			admin: {
				position: "sidebar",
			},
			hasMany: true,
			required: true,
		},
		{
			name: "authors",
			label: "Author",
			type: "relationship",
			relationTo: "authors",
			admin: {
				position: "sidebar",
			},
			required: true,
		},
		{
			name: "featured",
			label: "Featured Post",
			type: "checkbox",
			admin: {
				position: "sidebar",
			},
			defaultValue: false,
		},
	],
};
