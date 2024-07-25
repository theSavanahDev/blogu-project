import deepMerge from "@/lib/deepMerge";
import formatSlug from "@/lib/formatSlug";

import type { Field } from "payload";

type Slug = (fieldToUse?: string, overrides?: Partial<Field>) => Field;

export const slugField: Slug = (fieldToUse = "title", overrides = {}) =>
	deepMerge<Field, Partial<Field>>(
		{
			name: "slug",
			label: "Slug",
			type: "text",
			required: true,
			admin: {
				position: "sidebar",
			},
			hooks: {
				beforeValidate: [formatSlug(fieldToUse)],
			},
			index: true,
		},
		overrides,
	);
