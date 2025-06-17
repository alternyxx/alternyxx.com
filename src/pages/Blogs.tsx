import { motion } from "motion/react"
import { useContext, useEffect } from "react"
import { useNavigate, NavigateFunction } from "react-router"

import { CanvasStateContext, BlogsContext } from "../common/context"

import { kebab } from "../common/utils"
import Screen from "../common/vertices/Screen"
import rings from "../common/shaders/rings.wgsl?raw"

const TechFlair = () => {
    return (
        <div className="bg-green-400/70 rounded-xl px-[1rem] py-[0]">
            <span className="block text-lg/5">Tech</span>
        </div>
    );
}

const TravelFlair = () => {
    return (
        <div className="bg-orange-400/70 rounded-xl px-[1rem] py-[0]">
            <span className="block text-lg/5">Travel</span>
        </div>
    );
}

const LifeFlair = () => {
    return (
        <div className="bg-blue-500/70 rounded-xl px-[1rem] py-[0]">
            <span className="block text-lg/5">Life</span>
        </div>
    );
}

const BlogPostPreview = ({navigate, heading, date, description, flairs}: {
    navigate: NavigateFunction,
    heading: string,
    date: string,
    flairs: string[],
    description: string,
}) => {
    return (
        <div className="ml-[4%] mb-[25%] lg:ml-[10%] lg:mb-[10%]">
            <motion.div
                onClick={() => {
                    navigate(kebab(heading));
                    window.scrollTo(0, 0);
                }}
                className="no-underline cursor-pointer lg:mb-[3rem]"
            >
                <p className="Heading mb-[0.5rem] lg:mb-[1rem]">{ heading }</p>
                <p className="text-sm mr-[4%] lg:text-xl lg:mr-[25%]">{ description }</p>
                <div className="flex gap-x-3">
                    { flairs.includes("Tech") && <TechFlair/> }
                    { flairs.includes("Travel") && <TravelFlair/> }
                    { flairs.includes("Life") && <LifeFlair/> }
                </div>
            </motion.div>

            <p className="text-sm ml-[65vw] mb-px lg:text-base">{ date }</p>
        </div>
    );
}

export default function Blogs()  {
    const { setCanvasState } = useContext(CanvasStateContext);
    const blogPosts = useContext(BlogsContext);
    const navigate = useNavigate();

    useEffect(() => {
        setCanvasState({
            vertices: Screen,
            dimensions: 2,
            shader: rings,
        });
    }, []);
    
    return (
        <div className="Page">
            { blogPosts.blogs.map((blogPost, i) => {
                return <BlogPostPreview
                    navigate={navigate}
                    heading={blogPost.title}
                    date="June 6th 2025"
                    description={blogPost.shortDescription}
                    flairs={blogPost.flairs}
                    key={i}
                />;
            }) }
        </div>
    );
}