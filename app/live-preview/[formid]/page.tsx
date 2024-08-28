"use client";
import FormEdit from "@/app/edit-form/_components/FormEdit";
import { db } from "@/configs";
import { Jsonforms } from "@/configs/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";

const page = ({ params }: { params: any }) => {

  const [record, setRecord] = useState()
  const [jsonForm, setJsonForm] = useState()

  useEffect(() => {
    params && GetFormData()
    
  }, [params]);

  const GetFormData = async () => {
    const res = await db.select().from(Jsonforms).where(eq(Jsonforms.id, Number(params?.formid)))
    //@ts-ignore
    setRecord(res[0])
    setJsonForm(JSON.parse(res[0].jsonform))
    
    console.log(res)
  }
  return(
    <div className="p-10 flex items-center justify-center">
      {
        //@ts-ignore
        record && <FormEdit jsonForm={jsonForm} formId={record?.id} />
      }
      
    </div>
  )
};

export default page;
