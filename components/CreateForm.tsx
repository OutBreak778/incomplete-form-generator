"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "./ui/textarea";
import { useState } from "react";
import { AiChatSession } from "@/configs/aiModal";
import { Loader2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { Jsonforms } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";


const CreateForm = () => {
  const [userInput, setUserInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState<boolean>();
  const { user } = useUser();

  const route = useRouter();

  const PROMPT =
    "on the basis of description please give form in json format only and JSON should have a formTitle as a string, a formSubheading as a string, and a formFields array. Each object in the formFields array should contain the following keys: fieldName (string), fieldLabel (string), fieldPlaceholder (string), fieldType (string), fieldType (radio), fieldType (checkbox), and fieldRequired (boolean). Ensure that all keys use camelCase. Ensure that fieldType with checkbox always have a label and a value. last array shout be about the checkbox of declaration that you agree with our policy or if any thing provide to us is correct";

    // Please generate a JSON object with the following structure: The on the basis of description please give form in json format only and JSON should have a formTitle as a string, a formSubheading as a string, and a formFields array. Each object in the formFields array should contain the following keys: fieldName (string), fieldLabel (string), fieldPlaceholder (string), fieldType (string), and fieldRequired (boolean). Ensure that all keys use camelCase 

  const onSubmitForm = async () => {
    setLoading(true);
    const result = await AiChatSession.sendMessage(
      "Description: " + userInput + PROMPT
    );
    
    if (result.response.text()) {
      const res = await db
        .insert(Jsonforms)
        //@ts-ignore
        .values({
          jsonform: result.response.text(),
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format("DD/MM/yyyy"),
        })
        .returning({ id: Jsonforms.id});

      if (res[0].id) {
        route.push("/edit-form/"+res[0].id);
      }
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <div>
      <Button
        variant="outline"
        className="gap-x-1"
        onClick={() => setOpenDialog(true)}
      >
        <span className="text-xl">+</span> Generate Form
      </Button>

      <Dialog open={openDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Fill the details</DialogTitle>
            <DialogDescription>
              Enter the prompt about your form
            </DialogDescription>
          </DialogHeader>
          <Textarea
            placeholder="Create a form for frontend developer with 2 experienced role also add input box about why they are  intrested for this role ?"
            onChange={(e) => setUserInput(e.target.value)}
            className="px-1 py-2 text-popover-foreground resize-none"
            rows={6}
          />
          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              onClick={() => setOpenDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => onSubmitForm()} disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Generate"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateForm;
