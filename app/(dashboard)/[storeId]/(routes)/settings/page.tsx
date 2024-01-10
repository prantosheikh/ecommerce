import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./components/settings-form";

interface SettingsPageProps {
   params: {
      storeId: string;
   };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
   const { userId } = auth();

   if (!userId) {
      redirect("sign-in");
   }

   const store = await prismadb.store.findFirst({
      where: {
         id: params?.storeId,
         userId,
      },
   });
   if (!store) {
      redirect("/");
   }


   return (
      <div className="flex-col">
         <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm initialData={store} />
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Delectus voluptatum quo placeat sed id ex consequatur. Iste facere unde maxime.</p>
         </div>
      </div>
   );
};

export default SettingsPage;
