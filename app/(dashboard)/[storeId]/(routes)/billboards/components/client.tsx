"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
// import { ApiList } from "@/components/ui/api-list";

import { columns, BillboardColumn } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
   data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
   data
}) => {
   const params = useParams();
   const router = useRouter();

<<<<<<< HEAD
   return (
      <>
         <div className="flex items-center justify-between">
            <Heading title={`Billboards (${data.length})`} description="Manage billboards for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
               <Plus className="mr-2 h-4 w-4" /> Add New
            </Button>
         </div>
         <Separator />
         {/* <DataTable searchKey="label" columns={columns} data={data} /> */}
         <Heading title="API" description="API Calls for Billboards" />
         <Separator />
         {/* <ApiList entityName="billboards" entityIdName="billboardId" /> */}
      </>
   );
};
=======
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Billboards (${data.length})`}
					description="Manage billboards for your store"
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/billboards/new`)
					}
				>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="label" columns={columns} data={data} />
			<Heading title="API" description="API Calls for Billboards" />
			<Separator />
			<ApiList entityName="billboards" entityIdName="billboardId" />
		</>
	);
};
>>>>>>> bd4151d91f338c70c83726487d1da419e13e6e48
