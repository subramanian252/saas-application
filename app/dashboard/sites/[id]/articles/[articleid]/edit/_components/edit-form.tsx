"use client";
import React, { useState } from "react";

import { useForm } from "@conform-to/react";
import { useFormState } from "react-dom";
import { createPost, editPost } from "@/actions";
import { postSchema } from "@/zodSchemas";
import { parseWithZod } from "@conform-to/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { JSONContent } from "novel";
import { useToast } from "@/hooks/use-toast";
import slugify from "react-slugify";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import TailwindEditor from "@/components/tailwind-editor";
import SubmitButton from "@/components/submit-button";
import { Post } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PencilRuler, XIcon } from "lucide-react";
import { CardFooter } from "@/components/ui/card";

interface Props {
  article: Post;
}

function EditForm(props: Props) {
  const { article } = props;

  const [lastResult, action] = useFormState(editPost, undefined);

  const [form, fields] = useForm({
    lastResult,

    onValidate({ formData }) {
      return parseWithZod(formData, { schema: postSchema });
    },

    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    defaultValue: {
      title: article.title,
      smallDescription: article.smallDescription,
      articleContent: JSON.stringify(article.articleContent),
      image: article.image,
      slug: article.slug,
    },
  });

  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(
    fields.image.initialValue ?? null
  );

  const [content, setContent] = useState<JSONContent | undefined>(
    JSON.parse(article.articleContent as string) ?? undefined
  );

  const [title, setTitle] = useState<string>(article.title);

  const [slug, setSlug] = useState<string>(article.slug);

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

  if (!article) return <div>Loading</div>;
  return (
    <div>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
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
            value={article.siteId || ""}
          />
          <input hidden name="editId" value={article.id || ""} />
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
              <div className="relative w-56 h-36">
                <XIcon
                  onClick={() => setImage(null)}
                  className="h-6 w-6 absolute -right-2 -top-2 bg-red-500 p-1 rounded-lg z-10"
                />
                <Image
                  src={image}
                  alt="image"
                  fill
                  className="object-cover rounded-md"
                />
              </div>
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
    </div>
  );
}

export default EditForm;
