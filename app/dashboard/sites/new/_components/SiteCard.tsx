import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface Props {
  site: {
    name: string;
    subdirectory: string;
    description: string;
    id: string;
    imageUrl: string | null;
  };
}

async function SiteCard(props: Props) {
  const { site } = props;

  return (
    <Card className="w-full rounded-md">
      <CardContent className="flex flex-col gap-2 p-0">
        <div className="relative w-full h-48">
          <Image
            src={site.imageUrl || "/default.png"}
            className="w-full h-full object-center rounded-md"
            alt="logo"
            fill
          />
        </div>
        <div className="flex flex-col gap-y-1 p-2">
          <h3 className="text-2xl font-semibold truncate">{site.name}</h3>
          <p className="text-sm text-slate-500 line-clamp-2 h-10">
            {site.description}
          </p>
        </div>
        <CardFooter className="px-2">
          <Button variant="default" asChild className="w-full">
            <Link href={`/dashboard/sites/${site.id}`}>View Site</Link>
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default SiteCard;
