"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import { ArrowLeftIcon, CreativeCommonsIcon, PencilRuler } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import TailwindEditor from "@/components/tailwind-editor";
import { JSONContent } from "novel";
import { useFormState } from "react-dom";
import { createPost } from "@/actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { postSchema } from "@/zodSchemas";

import slugify from "react-slugify";
import SubmitButton from "@/components/submit-button";

interface Props {
  params: {
    id: string;
  };
}

function Page(props: Props) {
  const { params } = props;

  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(null);

  const [content, setContent] = useState<JSONContent | undefined>(undefined);

  const [title, setTitle] = useState<string>("");

  const [slug, setSlug] = useState<string>("");

  const [lastResult, action] = useFormState(createPost, undefined);
  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const handleSlug = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please enter a title",
        variant: "destructive",
      });
    }

    const newTitle = title;

    const sluggedTitle = setSlug(slugify(newTitle));
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-start gap-x-4 items-center">
        <Button
          type="button"
          variant={"secondary"}
          className=""
          size={"icon"}
          asChild
        >
          <Link href={`/dashboard/sites/${params.id}`}>
            <ArrowLeftIcon className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Create Article</h1>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create Article
          </CardTitle>
          <CardDescription>
            Create your new Article here and publish.
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
              <div className="flex flex-col space-y-3">
                <Label htmlFor="name">Title</Label>
                <Input
                  key={fields.title.key}
                  name={fields.title.name}
                  defaultValue={fields.title.initialValue}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  id="name"
                  placeholder="Give a title to your blog"
                />
                <p className="text-red-500 text-sm">{fields.title.errors}</p>
              </div>
              <input
                hidden
                key={fields.siteId.key}
                name={fields.siteId.name}
                defaultValue={fields.siteId.initialValue}
                value={params.id}
              />
              <div className="flex flex-col space-y-3">
                <Label htmlFor="subdirectory">Slug</Label>
                <Input
                  key={fields.slug.key}
                  name={fields.slug.name}
                  defaultValue={fields.slug.initialValue}
                  id="subdirectory"
                  placeholder="Article slug"
                  value={slug}
                />
                <Button
                  type="button"
                  variant={"secondary"}
                  className="w-fit"
                  onClick={handleSlug}
                >
                  <PencilRuler className="h-4 w-4 mr-2" />
                  Generate Slug
                </Button>
                <p className="text-red-500 text-sm">{fields.slug.errors}</p>
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="description">Small Description</Label>
                <Textarea
                  key={fields.smallDescription.key}
                  name={fields.smallDescription.name}
                  defaultValue={fields.smallDescription.initialValue}
                  className="h-28"
                  id="description"
                  placeholder="Give a description"
                />
                <p className="text-red-500 text-sm">
                  {fields.smallDescription.errors}
                </p>
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="description">Add Image</Label>
                <input
                  hidden
                  key={fields.image.key}
                  name={fields.image.name}
                  defaultValue={fields.image.initialValue}
                  value={image!}
                />
                {!image ? (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImage(res[0].url);
                      toast({
                        variant: "default",
                        title: "Success!",
                        description: "Your image was uploaded.",
                      });
                    }}
                    onUploadError={(e) => {
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                      });
                    }}
                  />
                ) : (
                  <Image
                    src={image}
                    alt="image"
                    width={300}
                    height={300}
                    className="object-cover rounded-md"
                  />
                )}
                <p className="text-red-500 text-sm">{fields.image.errors}</p>
              </div>

              <div className="flex flex-col space-y-3">
                <input
                  hidden
                  value={JSON.stringify(content)}
                  key={fields.articleContent.key}
                  name={fields.articleContent.name}
                  defaultValue={fields.articleContent.initialValue}
                />
                <Label htmlFor="description">Article Content</Label>
                <TailwindEditor content={content} setContent={setContent} />
                <p className="text-red-500 text-sm">
                  {fields.articleContent.errors}
                </p>
              </div>
            </div>
            <CardFooter className="flex justify-end mt-5">
              <SubmitButton />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Page;
