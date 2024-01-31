"use client";
import { Editor } from "novel";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  createBlogService,
  getBlogService,
  updateBlogService,
} from "@/services/blogService";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { config } from "@/apiConfig/config";
import Loader from "@/components/Loader";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be require.",
  }),
  description: z.any(),
  shortDescription: z.string().min(2, {
    message: "Short Description must be require.",
  }),
  authorImage: z.any(),
  thumbnailImage: z.any(),
  category: z.string().min(2, {
    message: "Category must be require.",
  }),
});

type ValidationSchema = z.infer<typeof formSchema>;

interface PropsParams {
  params: {
    blogid: string;
  };
}

function BlogForm(props: PropsParams) {
  const navigate = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [blog, setBlog] = useState<any>({});
  const [novel, setNovel] = useState<any>();
  const [autherImg, setAutherImg] = useState<any>();
  const [thumbImg, setThumbImg] = useState<any>();
  const [autherImgURL, setAutherImgURL] = useState<any>();
  const [thumbImgURL, setThumbImgURL] = useState<any>();
  const [novelValid, setNovelValid] = useState<any>(false);
  const [edit, setedit] = useState(props.params?.blogid === "create" ? false : true);

  useEffect(() => {
    if (edit) fetchBlog();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: blog.title,
      description: blog.description,
      shortDescription: blog.short_description,
      authorImage: blog.hero_img,
      thumbnailImage: blog.thumb_img,
      category: blog.category,
    },
  });

  const fetchBlog = async () => {
    setIsLoading(true);
    try {
      let response: any = await getBlogService(props.params?.blogid);
      if (response.success === true) {
        setBlog(response?.data);
        setIsLoading(false);
        form.setValue("title", response?.data.title);
        form.setValue("category", response?.data.category);
        form.setValue("shortDescription", response?.data.short_description);
        form.setValue("authorImage", response?.data.hero_img);
        form.setValue("thumbnailImage", response?.data.thumb_img);
        setAutherImgURL(
          `${config.ImageUrl}/blog/heroImage/${response?.data.hero_img}`
        );
        setThumbImgURL(
          `${config.ImageUrl}/blog/thumbImage/${response?.data.thumb_img}`
        );
        setThumbImg(
          `${config.ImageUrl}/blog/thumbImage/${response?.data.thumb_img}`
        );
        setAutherImg(
          `${config.ImageUrl}/blog/heroImage/${response?.data.hero_img}`
        );
        setNovel(response?.data.description);
      }
    } catch (e: any) {
      console.log("e", e?.message?.error);
    }
  };

  const handleThumbFileChange = (event: any) => {
    const selectedFile = event.currentTarget.files[0];
    setThumbImg(selectedFile);
    form.setValue("thumbnailImage", selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setThumbImgURL(imageUrl);
    }
  };

  const handleAutherFileChange = (event: any) => {
    const selectedFile = event.currentTarget.files[0];
    setAutherImg(selectedFile);
    form.setValue("authorImage", selectedFile);

    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
      setAutherImgURL(imageUrl);
    }
  };

  const convertBlobToFile = async (blobUrl: any, fileName: any) => {
    try {
      if (blobUrl instanceof File) {
        return blobUrl;
      } else {
        const response = await fetch(blobUrl);
        const blob = await response.blob();
        const file = new File([blob], fileName, { type: "image/jpeg" });
        return file;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function onSubmit(values: ValidationSchema) {
    if (!thumbImgURL || !autherImg) {
      toast({
        variant: "destructive",
        title: "Images Should be required",
      });
    }
    if (novel && thumbImgURL && autherImg) {
      const formData = new FormData();
      if (edit) {
        try {
          const thumbImgConvert: any = await convertBlobToFile(
            thumbImg,
            blog?.thumb_img
          );
          const autherConvert: any = await convertBlobToFile(
            autherImg,
            blog?.hero_img
          );
          formData.append("title", values.title);
          formData.append("description", novel);
          formData.append("short_description", values.shortDescription);
          formData.append("hero_img", autherConvert);
          formData.append("thumb_img", thumbImgConvert);
          formData.append("category", values.category);

          let response: any = await updateBlogService(props.params?.blogid, formData);
          if (response.success === true) {
            navigate.push("/");
            toast({
              title: response.message,
            });
          }
        } catch (e: any) {
          console.log("e", e?.message?.error);
          toast({
            variant: "destructive",
            title: e?.message?.error,
          });
        }
      } else {
        try {
          formData.append("title", values.title);
          formData.append("description", novel);
          formData.append("short_description", values.shortDescription);
          formData.append("hero_img", autherImg);
          formData.append("thumb_img", thumbImg);
          formData.append("category", values.category);
          let response: any = await createBlogService(formData);
          if (response.success === true) {
            navigate.push("/");
            toast({
              title: response.message,
            });
          }
        } catch (e: any) {
          console.log("e", e?.message?.error);
          toast({
            variant: "destructive",
            title: e?.message?.error,
          });
        }
      }
      setNovelValid(false);
    } else {
      setNovelValid(true);
    }
  }

  return (
    <div className="flex justify-center wrapper">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="my-10 border w-4/5 p-5 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className="text-3xl pb-5">{!edit ? "Add Blog" : "Edit Blog"}</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Editor
                        className="h-96 h-fit w-full rounded-md border border-input"
                        defaultValue={novel || ""}
                        disableLocalStorage={true}
                        onUpdate={(editor) => {
                          setNovel(editor?.storage.markdown.getMarkdown());
                        }}
                      />
                    </FormControl>
                    {novelValid && (
                      <p className="text-sm font-medium text-destructive">
                        Please enter description.
                      </p>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short description</FormLabel>
                    <FormControl>
                      <Input placeholder="Short description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="authorImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author image</FormLabel>
                    {autherImgURL ? (
                      <>
                        <img
                          src={autherImgURL}
                          alt="Preview"
                          className="rounded-lg"
                          style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                        <Button
                          onClick={() => {
                            setAutherImg("");
                            setAutherImgURL("");
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </>
                    ) : (
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/png, image/jpeg"
                          placeholder="Author image"
                          onChangeCapture={(event: any) => {
                            handleAutherFileChange(event);
                          }}
                          value={autherImg}
                          // {...field}
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnailImage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail image</FormLabel>
                    {thumbImgURL ? (
                      <>
                        <img
                          src={thumbImgURL}
                          className="rounded-lg"
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "300px" }}
                        />
                        <Button
                          onClick={() => {
                            setThumbImg("");
                            setThumbImgURL("");
                          }}
                        >
                          <Trash2 />
                        </Button>
                      </>
                    ) : (
                      <FormControl>
                        <Input
                          type="file"
                          accept="image/png, image/jpeg"
                          placeholder="Thumbnail image"
                          onChangeCapture={(event: any) => {
                            handleThumbFileChange(event);
                          }}
                          value={thumbImg}
                        />
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Choose category</FormLabel>
                    <FormControl>
                      <Input placeholder="Choose category" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" style={{ backgroundColor: "black" }}>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}

export default BlogForm;
