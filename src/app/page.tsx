"use client";
import { useEffect, useState } from "react";
import BlurImage from "@/components/blur-image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { placeholderBlurhash } from "@/libs/utils";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteBlogService, getAllBlogsService } from "@/services/blogService";
import { config } from "@/apiConfig/config";
import { SkeletonCard } from "@/components/Skeleton";
import { toast } from "@/components/ui/use-toast";
import DeleteModal from "@/components/DeleteModal";

export default function Home() {
  const navigate = useRouter();
  const [blogs, setBlogs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    try {
      let response: any = await getAllBlogsService("");
      if (response.success === true) {
        setBlogs(response.data);
        setIsLoading(false);
      }
    } catch (e: any) {
      if (e.code === 500) {
        console.log("error,", e);
      }
    }
  };

  const deleteBlog = async (blogId: any) => {
    setIsLoading(true);
    try {
      let response: any = await deleteBlogService(blogId);
      if (response.success === true) {
        fetchBlogs();
        setIsLoading(false);
        toast({
          title: response.message,
        });
        return <DialogClose />;
      }
    } catch (e: any) {
      console.log("error,", e);
      toast({
        variant: "destructive",
        title: e?.message?.error,
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="text-end pt-5 pr-10">
        <Button
          className="bg-rose-500 py-3 text-white transition hover:bg-rose-600 hover:opacity-80"
          onClick={() => navigate.push("/create", { scroll: true })}
        >
          Create blog
        </Button>
      </div>
      <div className="flex justify-around pt-5 flex-wrap transition ease-in-out delay-150">
        {!isLoading ? (
          <>
            {blogs.map((blog: any, key: any) => (
              <Card
                key={key}
                className="w-[400px] m-5 border border-gray-200 rounded-lg shadow dark:bg-gray-800 transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white"
              >
                <BlurImage
                  onClick={() => navigate.push(`/detail/${blog?.id}`)}
                  alt={"Card thumbnail"}
                  width={400}
                  height={250}
                  className="h-60 object-cover object-center rounded-t-lg hover:opacity-90 cursor-pointer"
                  src={
                    blog?.thumb_img
                      ? `${config.ImageUrl}/blog/thumbImage/${blog?.thumb_img}`
                      : "https://flowbite.com/docs/images/blog/image-1.jpg"
                  }
                  placeholder="blur"
                  blurDataURL={placeholderBlurhash}
                />
                <CardHeader>
                  <CardTitle
                    onClick={() => navigate.push(`/detail/${blog?.id}`)}
                    className="transition ease-in-out delay-150 hover:opacity-75 cursor-pointer"
                  >
                    {blog?.title}
                  </CardTitle>
                  <CardDescription>
                    {blog?.short_description || ""}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between ">
                  <Button
                    onClick={() => navigate.push(`/${blog?.id}`)}
                    className="rounded-lg border border-black bg-white w-full flex justify-center me-2 px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-slate-200 hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
                  >
                    <Pencil color="#4d58ff" />
                  </Button>
                  <DeleteModal deleteBlog={deleteBlog} id={blog?.id} />
                </CardFooter>
              </Card>
            ))}
          </>
        ) : (
          Array.from({ length: 6 }).map((_, index) => {
            return <SkeletonCard key={index} />;
          })
        )}
      </div>
    </div>
  );
}
