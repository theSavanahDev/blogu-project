import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { uploadthingStorage } from "@payloadcms/storage-uploadthing";

import { Users } from "@/payload-collections/users";
import { Media } from "@/payload-collections/media";

import { Icon } from "@/components/payload/label-icon";
import { Logo } from "@/components/payload/label-logo";

const fileName = fileURLToPath(import.meta.url);
const databaseURI = process.env.NODE_ENV === "production" ? process.env.DB_URI_PROD! : process.env.DB_URI_DEV!;
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
	collections: [Users, Media],
	db: mongooseAdapter({ url: databaseURI }),
	editor: lexicalEditor({}),
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
