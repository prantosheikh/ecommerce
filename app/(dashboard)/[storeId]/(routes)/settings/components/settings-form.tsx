"use client";

import { z } from "zod";
import { useState } from "react";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface SettingsFormPage {
	initialData: Store;
}
const formScema = z.object({
	name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formScema>;

export const SettingsForm: React.FC<SettingsFormPage> = ({ initialData }) => {
	const form = useForm<SettingFormValues>({
		resolver: zodResolver(formScema),
		defaultValues: initialData,
	});

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: SettingFormValues) => {
		console.log(data);
	};

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
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="space-y-8 w-full"
				>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder="Store name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading}>Save Change</Button>
				</form>
			</Form>
		</>
	);
};

export default SettingsForm;
