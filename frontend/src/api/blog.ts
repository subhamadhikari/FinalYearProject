import { API } from "../backend";
import { Blog, BlogDetails,UpdateBlog } from "../types/blog";

export const postBlog = async(blog:Blog) => {
    const url = API + "/blog/createBlog"
    const formData = new FormData();
    formData.append("blogAuthor", blog.blogAuthor.toString());
    formData.append("blogTag", blog.blogTag);
    formData.append("blogTitle", blog.blogTitle);
    formData.append("blogContent", blog.blogContent);
    formData.append("blogCoverImage",blog.blogCoverImage)

    if (blog.imageFile) formData.append("imageFile",blog.imageFile)
    const response = await fetch(url,{
        method:"POST",
        body:formData
    })

    const data = await response.json()
    console.log(data)
}

export const getAllBlogs = async ():Promise<BlogDetails[]> => {
    const url = API + "/blog/getAllBlogs"
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    return data
}

export const getBlogByID = async (id:number):Promise<Blog> => {
    const url = API + `/blog/getBlogByID/${id}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    return data
}

export const getBlogByTag = async (tag:string):Promise<Blog[]> => {
    const url = API + `/blog/getBlogByTag/${tag}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    return data
}

export const getMyBlogs = async (userID:number):Promise<BlogDetails[]> => {
    const url = API + `/blog/getMyBlog/${userID}`
    const response = await fetch(url,{
        method:"GET"
    })
    const data = await response.json()
    return data
}

export const deleteBlogByID = async (id:number) => {
    const url = API + `/blog/deleteBlog/${id}`
    const response = await fetch(url,{
        method:"DELETE"
    })
    const data = await response.json()
    console.log(data)
}

export const updateBlog = async (blog:UpdateBlog) => {
    const url = API + `/blog/updateBlog/${blog.blogID}`
    const response = await fetch(url,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(blog)
    })
    const data = await response.json()
    console.log(data)

}