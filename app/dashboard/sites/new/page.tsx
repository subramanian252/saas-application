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

interface Props {}

function Page(props: Props) {
  const {} = props;

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
          <form>
            <div className="grid w-full items-center gap-6">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Site Name</Label>
                <Input id="name" placeholder="Name of your project" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="subdirectory">Subdirectory</Label>
                <Input id="subdirectory" placeholder="subdirectory name" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" placeholder="Give a description" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Page;
