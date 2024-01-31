"use client";
import BlurImage from "@/components/blur-image";
import { placeholderBlurhash } from "@/libs/utils";
import React, { useEffect, useState } from "react";
import { getBlogService } from "@/services/blogService";
import { config } from "@/apiConfig/config";
import moment from "moment";
import Loader from "@/components/Loader";
import ReactMarkdown from "react-markdown";

interface PropsParams {
  params: {
    blogid: string;
  };
}

function Detail(props: PropsParams) {
  const [isLoading, setIsLoading] = useState(true);
  const [blog, setBlog] = useState<any>({});

  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      let response: any = await getBlogService(props.params?.blogid);
      if (response.success === true) {
        setBlog(response?.data);
        setIsLoading(false);
      }
    } catch (e: any) {
      console.log("e", e?.message?.error);
    }
  };

  return (
    <div className="flex justify-center wrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="border my-10 w-4/5 p-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div>
            <h1 className="text-3xl pb-5 font-medium text-center">
              {blog.title}
            </h1>
            <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full">
              <BlurImage
                alt={"Card thumbnail"}
                width={1500}
                height={250}
                className="h-96 object-cover object-center rounded-lg hover:opacity-90"
                src={
                  blog?.thumb_img
                    ? `${config.ImageUrl}/blog/thumbImage/${blog?.thumb_img}`
                    : "https://flowbite.com/docs/images/blog/image-1.jpg"
                }
                placeholder="blur"
                blurDataURL={placeholderBlurhash}
              />
            </div>
            <div className="flex justify-between items-center py-5">
              <h1 className="pb-5">{moment(blog.createdAt).format("LL")}</h1>
              <h1 className="pb-5 font-medium">{blog.category}</h1>
            </div>
            <div className="flex justify-center flex-col items-center">
              <BlurImage
                alt={"Card thumbnail"}
                width={128}
                height={200}
                className=" h-32 object-cover object-center rounded-full hover:opacity-90"
                src={
                  blog?.hero_img
                    ? `${config.ImageUrl}/blog/heroImage/${blog?.hero_img}`
                    : "https://flowbite.com/docs/images/blog/image-1.jpg"
                }
                placeholder="blur"
                blurDataURL={placeholderBlurhash}
              />
              <h1 className="pt-5 font-medium">Auther image</h1>
            </div>
            <div className="font-medium text-2xl text-center py-5">
              {blog.short_description}
            </div>

            <ReactMarkdown>{blog.description}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
