import Image from "next/image";

export const Icon = () => {
	return (
		<div>
			<Image src="/icon.svg" alt="Logo" width={32} height={32} priority={true} />
		</div>
	);
};
