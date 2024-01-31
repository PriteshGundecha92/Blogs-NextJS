import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import { writeFile } from "fs/promises";

const uploadImage = async (img: string | any, folderName: string) => {
    const byteData = await img.arrayBuffer();
    const buffer = Buffer.from(byteData);
    const path = `./public/blog/${folderName}/${img.name}`;
    await writeFile(path, buffer);
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const blogId = searchParams.get("blogId");
        let blogs;
        if (blogId) {
            blogs = await prisma.blog.findUnique({
                where: {
                    id: blogId,
                },
            });
        } else {
            blogs = await prisma.blog.findMany();
        }
        return NextResponse.json(
            {
                message: "Blog fetched successfully",
                success: true,
                data: blogs,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const title: string | any = formData.get("title");
        const description: string | any = formData.get("description");
        const short_description: string | any = formData.get("short_description");
        const hero_img: File | string | any = formData.get("hero_img");
        const thumb_img: File | string | any = formData.get("thumb_img");
        const category: string | any = formData.get("category");

        const blog1: any = await prisma.blog.findUnique({
            where: {
                title,
            },
        });

        if (blog1) {
            return NextResponse.json(
                { error: "Blog title already exists..!", success: false },
                { status: 400 }
            );
        }

        if (
            !title ||
            !description ||
            !short_description ||
            !hero_img ||
            !thumb_img ||
            !category
        ) {
            return NextResponse.json(
                { error: "Please add alll fields", success: false },
                { status: 400 }
            );
        }

        await uploadImage(hero_img, "heroImage")
        await uploadImage(thumb_img, "thumbImage")

        const blogs = await prisma.blog.create({
            data: {
                title,
                description,
                short_description,
                hero_img: hero_img.name,
                thumb_img: thumb_img.name,
                category,
            },
        });

        return NextResponse.json(
            {
                message: "Blog created successfully",
                success: true,
                data: blogs,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const blogId = searchParams.get("blogId");
        const formData = await request.formData();
        const title: string | any = formData.get("title");
        const description: string | any = formData.get("description");
        const short_description: string | any = formData.get("short_description");
        const hero_img: File | string | any = formData.get("hero_img");
        const thumb_img: File | string | any = formData.get("thumb_img");
        const category: string | any = formData.get("category");

        await uploadImage(hero_img, "heroImage")
        await uploadImage(thumb_img, "thumbImage")

        const blogs = await prisma.blog.update({
            where: {
                id: blogId as any,
            },
            data: {
                title,
                description,
                short_description,
                hero_img: hero_img.name,
                thumb_img: thumb_img.name,
                category,
            },
        });

        return NextResponse.json(
            {
                message: "Blog updated successfully",
                success: true,
                data: blogs,
            },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const blogId = searchParams.get("blogId");

        const blog: any = await prisma.blog.findUnique({
            where: {
                id: blogId as any,
            },
        });

        if (!blog) {
            return NextResponse.json(
                {
                    message: "Blog not found",
                    success: false,
                },
                { status: 400 }
            );
        }

        await prisma.blog.delete({
            where: {
                id: blogId as any,
            },
        });

        return NextResponse.json(
            {
                message: "Blog deleted successfully",
                success: true,
            },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
