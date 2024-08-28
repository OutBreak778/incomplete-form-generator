//@ts-nocheck
"use client";

import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { db } from "@/configs";
import { Jsonforms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { and, eq } from "drizzle-orm";
import { EditIcon, Share2Icon, SquareArrowOutUpRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import FormEdit from "../_components/FormEdit";
import Link from "next/link";

const page = ({ params }: { params: any }) => {
  const { user } = useUser();
  const [jsonForm, setJsonForm] = useState([]);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(Jsonforms)
      .where(
        and(
          eq(Jsonforms.id, params?.formId),
          eq(Jsonforms.createdBy, String(user?.primaryEmailAddress?.emailAddress))
        )
      );
    setRecord(result[0]);
    // console.log(record)
    console.log(JSON.parse(result[0].jsonform));
    setJsonForm(JSON.parse(result[0].jsonform));
  };

  return (
    <div className="px-10 py-2">
      <Heading
        title="Form Editor"
        description="you can edit your form with different style and apperance"
        icon={EditIcon}
        bgColor="bg-blue-500/60"
        iconColor="text-white"
      />
      <div className="flex items-center my-3 justify-between">
        <div>left side</div>
        <div className="flex items-center justify-center gap-x-4">
          <Link href={`/live-preview/${record?.id}`} target="_blank">
            <Button variant="outline">
              <SquareArrowOutUpRight className="w-4 h-4 mr-2" /> Live Preview
            </Button>
          </Link>
          <Button variant="outline">
            <Share2Icon className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>
      <div className="relative w-full gap-x-4">
        <div className="w-full border-2 bg-gradient-to-r from-stone-200 via-neutral-100 to-gray-200 border-gray-600/20 rounded-lg">
          <div className="my-5 relative flex  items-center justify-center">
            <FormEdit jsonForm={jsonForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
