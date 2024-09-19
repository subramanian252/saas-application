import prisma from "@/prisma/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || !user.id || !user.email) {
    throw new Error("User not found");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        firstName: user.given_name || "",
        lastName: user.family_name || "",
        profileImage: user.picture || "",
      },
    });
  }

  return redirect(
    process.env.NODE_ENV === "production"
      ? "https://saas-application-one.vercel.app/dashboard"
      : "http://localhost:3000/dashboard"
  );
}
