//@ts-nocheck

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { db } from "@/configs";
import { UserResponse } from "@/configs/schema";
import moment from "moment";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

const FormEdit = ({ jsonForm, formId=1 }) => {
  const [formData, setFormData] = useState();
  let formsRef = useRef();
  const router = useRouter();

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: any, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (
    fieldLabel: string | number,
    label: any,
    value: string | boolean
  ) => {
    const list = formData?.[fieldLabel] ? formData?.[fieldLabel] : [];

    if (value) {
      list.push({
        label: label,
        value: value,
      });
      setFormData({
        ...formData,
        [fieldLabel]: list,
      });
    } else {
      const res = list.filter((i) => i.label == label);
      setFormData({
        ...formData,
        [fieldLabel]: res,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(formData);

    const res = await db.insert(UserResponse).values({
      jsonResponse: formData,
      createdAt: moment().format("DD/MM/yyyy"),
      formRef: formId
    });

    if (res) {
      formsRef.reset()
      router.refresh();
    }
  };

  return (
    <form
      ref={(e: any) => (formsRef = e)}
      onSubmit={handleSubmit}
      className="px-2 py-3 bg-white border-2 rounded-lg h-full md:w-[600px] "
    >
      <div className="px-4">
        <h2 className="font-semibold text-2xl">{jsonForm.formTitle}</h2>
        <h6 className="text-sm font-medium">{jsonForm.formSubheading}</h6>
        <div>
          {jsonForm &&
            jsonForm?.formFields?.map((item: any, index: number) => (
              <div
                key={index}
                className="flex justify-between w-full items-end"
              >
                {item.fieldType == "select" ? (
                  <div key={index}>
                    <Select
                      onValueChange={(value) =>
                        handleSelectChange(item?.fieldLabel, value)
                      }
                      required={item.fieldRequired}
                    >
                      <SelectGroup>
                        <SelectLabel className="text-sm m-0 p-0 font-normal mt-4 mb-2 text-gray-700">
                          {item.fieldLabel}
                        </SelectLabel>
                        <SelectTrigger className="w-full">
                          <SelectValue
                            className="text-gray-700"
                            placeholder={item.fieldPlaceholder}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {item?.fieldOptions?.map(
                            (selectItem: any, index: number) => (
                              <SelectItem key={index} value={selectItem}>
                                {selectItem}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </SelectGroup>
                    </Select>
                  </div>
                ) : item.fieldType == "radio" ? (
                  <div className="mt-3 w-full">
                    <label className="my-2 text-md mb-3 text-gray-700">
                      {item.fieldLabel}
                    </label>
                    <RadioGroup className="mt-2" required={item.fieldRequired}>
                      {item?.fieldOptions?.map((field: any, index: number) => (
                        <div
                          className="flex items-center space-x-2"
                          key={index}
                        >
                          <RadioGroupItem
                            value={field.label}
                            id={field.label}
                            onClick={() =>
                              handleSelectChange(item.fieldLabel, field.label)
                            }
                          />
                          <Label
                            htmlFor={field.label}
                            className="text-sm text-gray-700"
                          >
                            {field.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                ) : item.fieldType == "checkbox" ? (
                  <div className="mt-4 w-full">
                    <label className="text-sm text-gray-700 mt-2">
                      {item.fieldLabel}
                    </label>
                    {item?.fieldOptions?.map((field: any, index: number) => (
                      <div key={index}>
                        <Checkbox
                          required={field.fieldRequired}
                          onCheckedChange={(e) =>
                            handleCheckboxChange(item.fieldName, field.label, e)
                          }
                        />
                        <label className="ml-2 text-sm text-gray-600">
                          {field.label}
                        </label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="mt-4 w-full mr-12" key={item.fieldName}>
                    <div className="my-1">
                      <label className="text-sm text-gray-700">
                        {item.fieldLabel}
                      </label>
                      <Input
                        className="mt-2"
                        type={item.fieldType}
                        placeholder={item.fieldPlaceholder}
                        name={item.fieldName}
                        onChange={(e) => handleInputChange(e)}
                        required={item.fieldRequired}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          <Button
            type="submit"
            variant="secondary"
            className="my-4 mt-12 w-full shadow-sm border-2 border-gray-200/50"
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default FormEdit;
