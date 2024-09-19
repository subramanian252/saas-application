"use client"; // form.tsx

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { siteCreationSchema, siteSchema } from "@/zodSchemas";
import { createSite } from "@/actions";
import SubmitButton from "@/components/submit-button";

interface Props {}

function Page(props: Props) {
  const {} = props;

  const [lastResult, action] = useFormState(createSite, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="flex h-full justify-center items-center">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Create Site</CardTitle>
          <CardDescription>
            Create your site here. Click the button below once you are done.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
            noValidate
          >
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input
                  key={fields.name.key}
                  name={fields.name.name}
                  defaultValue={fields.name.initialValue}
                  id="name"
                  placeholder="Name of your project"
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="subdirectory">Subdirectory</Label>
                <Input
                  key={fields.subdirectory.key}
                  name={fields.subdirectory.name}
                  defaultValue={fields.subdirectory.initialValue}
                  id="subdirectory"
                  placeholder="subdirectory name"
                />
                <p className="text-red-500 text-sm">
                  {fields.subdirectory.errors}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={fields.subdirectory.initialValue}
                  id="description"
                  placeholder="Give a description"
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
            </div>
            <CardFooter className="flex justify-end mt-5">
              <SubmitButton variant="default" text="Create" />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
