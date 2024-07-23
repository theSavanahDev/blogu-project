import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	access: {
		read: () => true,
	},
	labels: {
		singular: "Media",
		plural: "Media",
	},
	upload: {
		imageSizes: [
			{
				name: "avartar",
				width: 150,
				height: 150,
				position: "centre",
			},
			{
				name: "thumbnail",
				width: 300,
				height: 400,
				position: "centre",
			},
		],
		adminThumbnail: "thumbnail",
		mimeTypes: ["image/*"],
		resizeOptions: {
			width: 2160,
		},
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
};
