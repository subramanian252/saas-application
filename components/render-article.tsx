import Document from "@tiptap/extension-document"; // Option 1: Browser + server-side
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";
import BlockQuote from "@tiptap/extension-blockquote";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";
import OrderList from "@tiptap/extension-ordered-list";
import Bold from "@tiptap/extension-bold"; // Ajoutez cette ligne
import HardBreak from "@tiptap/extension-hard-break";

import { generateHTML } from "@tiptap/html";
import React, { useMemo } from "react";

export function RenderArticle({ jsonNew }: { jsonNew: any }) {
  const parsedJson = JSON.parse(jsonNew);
  const output = useMemo(() => {
    return generateHTML(parsedJson, [
      Document,
      Paragraph,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      Code,
      BlockQuote,
      TextStyle,
      CodeBlock,
      OrderList,
      Bold,
      HardBreak,
    ]);
  }, [parsedJson]);

  return (
    <div
      className="prose w-11/12 sm:prose-lg dark:prose-invert sm:w-2/3 prose-li:marker:text-primary"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}
