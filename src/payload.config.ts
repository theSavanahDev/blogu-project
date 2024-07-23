import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import {
	BoldFeature,
	HeadingFeature,
	ItalicFeature,
	LinkFeature,
	lexicalEditor,
	UnderlineFeature,
} from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

import { Authors } from "@/payload-collections/authors";
import { Categories } from "@/payload-collections/categories";
import { Media } from "@/payload-collections/media";
import { Users } from "@/payload-collections/users";

import { Icon } from "@/components/payload/label-icon";
import { Logo } from "@/components/payload/label-logo";

const fileName = fileURLToPath(import.meta.url);
const databaseURI = process.env.NODE_ENV === "development" ? process.env.DB_URI_DEV! : process.env.DB_URI_PRD!;
const directoryName = path.dirname(fileName);
const payloadSecret = process.env.PAYLOAD_SECRET!;
const resendAPIKey = process.env.RESEND_API_KEY!;
const uploadthingSecret = process.env.UPLOADTHING_SECRET!;

export default buildConfig({
	admin: {
		user: Users.slug,
		meta: {
			titleSuffix: " | Payload",
			icons: [{ url: "/icon.svg" }],
		},
		components: {
			graphics: { Icon, Logo },
		},
	},
	collections: [Authors, Categories, Media, Users],
	db: mongooseAdapter({ url: databaseURI }),
	editor: lexicalEditor({
		features: () => {
			return [
				BoldFeature(),
				HeadingFeature(),
				ItalicFeature(),
				LinkFeature({
					enabledCollections: [],
				}),
				UnderlineFeature(),
			];
		},
	}),
	email: resendAdapter({
		defaultFromAddress: "mta@s3.co.ke",
		defaultFromName: "MTA @ S3",
		apiKey: resendAPIKey,
	}),
	plugins: [
		uploadthingStorage({
			collections: {
				[Media.slug]: true,
			},
			options: {
				apiKey: uploadthingSecret,
				acl: "public-read",
			},
		}),
	],
	secret: payloadSecret,
	sharp,
	typescript: { outputFile: path.resolve(directoryName, "payload-types.ts") },
});
