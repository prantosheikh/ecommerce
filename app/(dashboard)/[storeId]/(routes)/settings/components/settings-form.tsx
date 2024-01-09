"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";

interface SettingsFormPage {
	initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormPage> = ({ initialData }) => {
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title="Setting "
					description="Manage Store performance"
				/>

				<Button variant="destructive" size="sm" onClick={() => {}}>
					<Trash className="h-4 w-4" />
				</Button>
			</div>
		</>
	);
};

export default SettingsForm;
