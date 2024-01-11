"use client";

import { z } from "zod";
import { useState } from "react";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";

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
import toast from "react-hot-toast";
import axios from "axios";
import { AlertModal } from "@/components/modals/Alert-modal";
import { ApiAlert } from "@/components/ui/api-alert";
import { useOrigin } from "@/hooks/use-origin";

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
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const onSubmit = async (data: SettingFormValues) => {
		try {
			setLoading(true);
			await axios.patch(`/api/stores/${params.storeId}`, data);
			router.refresh();
			toast.success("Store Updated");
		} catch (error) {
			toast.error("Something went wrong");
		} finally {
			setLoading(false);
		}
	};
	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/stores/${params.storeId}`);
			router.refresh();
			router.push("/");
			toast.success("Store deleted.");
		} catch (error: any) {
			toast.error(
				"Make sure you removed all products and categories first."
			);
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title="Setting "
					description="Manage Store performance"
				/>

				<Button
					disabled={loading}
					variant="destructive"
					size="sm"
					onClick={() => setOpen(true)}
				>
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
					<Button disabled={loading}> Save Change</Button>
				</form>
			</Form>
			<Separator />
			<ApiAlert
				title="NEXT_PUBLIC_API_URL"
				description={`${origin}/api/${params.storeId}`}
				variant="public"
			/>
		</>
	);
};

export default SettingsForm;
