import { anyoneAccess } from "@/payload-access/access-anyone";
import { authenticatedAccess } from "@/payload-access/access-authenticated";

import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	labels: {
		singular: "Media",
		plural: "Media",
	},
	access: {
		create: authenticatedAccess,
		delete: authenticatedAccess,
		read: anyoneAccess,
		update: authenticatedAccess,
	},
	upload: {
		imageSizes: [
			{
				name: "thumbnail",
				width: 320,
				height: 320,
				position: "centre",
			},
			{
				name: "card",
				width: 640,
				height: 768,
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
