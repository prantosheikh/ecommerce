"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Popover, PopoverTrigger } from "./ui/popover";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { Button } from "./ui/button";
import { Store } from "lucide-react";
import { cn } from "@/lib/utils";

type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>;

interface StoreSwitherProps extends PopoverTriggerProps {
	items: Record<string, any>[];
}

export default function StoreSwither({
	className,
	items = [],
}: StoreSwitherProps) {
	const storeModal = useStoreModal; // Fix the typo here
	const params = useParams();
	const router = useRouter();

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id,
	}));

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	);

	const [open, setOpen] = React.useState(false);

	const onStoreSelect = (store: { value: string; label: string }) => {
		setOpen(false);
		router.push(`/${store.value}`);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					role="combobox"
					aria-expanded={open}
					aria-label="Select a store"
					className={cn("w-[200px] justify-between", className)}
				>
					<Store />
				</Button>
			</PopoverTrigger>
		</Popover>
	);
}
