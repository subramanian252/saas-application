"use client";

import { uploadImage } from "@/actions";
import SubmitButton from "@/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { UploadDropzone } from "@/utils/uploadthing";
import { XIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

interface Props {
  imageUrl: string | null;
}

function UploadImageForm(props: Props) {
  const { imageUrl } = props;

  const { toast } = useToast();

  const [image, setImage] = useState<string | null>(imageUrl);

  const params = useParams();

  console.log(params.id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold">
          {image ? "Edit Image" : "Add Image"}{" "}
        </CardTitle>
        <CardDescription>Edit your site Image.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col space-y-3">
        <form action={uploadImage}>
          <input type="hidden" name="imageUrl" value={image ?? ""} />
          <input type="hidden" name="siteId" value={params.id} />

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
            <div className="relative w-[400px] h-[300px]">
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
          <div className="flex justify-end mt-5">
            <SubmitButton text="Upload" />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default UploadImageForm;
