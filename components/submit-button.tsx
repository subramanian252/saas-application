"use client";

import React from "react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  text?: string;
  variant?: "default" | "destructive";
}

function SubmitButton(props: Props) {
  const { text = "submit", variant = "default" } = props;

  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Finishing Up
        </>
      ) : (
        <>{text}</>
      )}
    </Button>
  );
}

export default SubmitButton;
