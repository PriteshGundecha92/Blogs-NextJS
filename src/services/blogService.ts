import gauestAxiosInstance from "@/apiConfig/guestAxios";

export const getAllBlogsService = (blogId: string) => {
  if (blogId) {
    return gauestAxiosInstance.get(
      `blog/?blogId=${blogId}`
    );
  } else {
    return gauestAxiosInstance.get(`blog`);
  }
};

export const getBlogService = (blogId: string) => {
  return gauestAxiosInstance.get(
    `blog/?blogId=${blogId}`
  );
};

export const updateBlogService = (blogId: string, blog: any) => {
  return gauestAxiosInstance.patch(
    `blog/?blogId=${blogId}`, blog);
};

export const createBlogService = (blog: any) => {
  return gauestAxiosInstance.post(`blog`, blog);
};

export const deleteBlogService = (blogId: string) => {
  return gauestAxiosInstance.delete(
    `blog/?blogId=${blogId}`
  );
};

