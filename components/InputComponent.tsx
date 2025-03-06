import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function InputComponent() {
	const id = useId();
	return (
		<div className="*:not-first:mt-2">
			<Input id={id} placeholder="Email" type="email" />
		</div>
	);
}
