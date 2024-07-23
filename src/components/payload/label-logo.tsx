import Image from "next/image";

export const Logo = () => {
	return (
		<div>
			<Image src="/icon.svg" alt="Logo" width={64} height={64} />
		</div>
	);
};
