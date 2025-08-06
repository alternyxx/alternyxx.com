import { useContext, useState, useEffect, useRef } from "react"
import { motion } from "motion/react"
import { useLocation, useParams } from "react-router";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxDark, gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import rehypeRaw from "rehype-raw";

import Flairs from "../components/Flairs"
import { DarkModeContext, BlogsContext, CanvasStateContext } from "../common/context"
import Screen from "../common/vertices/Screen";
import rings from "../common/shaders/rings.wgsl?raw"

// maybe put this in a types.ts?...
interface Blog {
    title: string,
    date: string,
    shortDescription: string,
    flairs: string[],
    text: string,
}

export default function BlogPost()  {
    const { setCanvasState } = useContext(CanvasStateContext);
    const darkMode = useContext(DarkModeContext);
    const blogPosts = useContext(BlogsContext);
    const [blogPost, setBlogPost] = useState<Blog>();
    const sectionLinks = useRef<Map<string, HTMLHeadingElement>>(new Map());

    const location = useLocation();
    let { blog } = useParams();
    
    useEffect(() => {
        setCanvasState({
            vertices: Screen,
            dimensions: 2,
            shader: rings,
        });
    
        setBlogPost(
            blogPosts.blogs[blogPosts.blogs.findIndex(blogPost => {
                return blogPost.title.toKebab() == blog;
            })]
        );
    }, [blogPosts, blog]);

    useEffect(() => {
        if (location.hash) {
            const section = location.hash.slice(1);
            console.log(section, sectionLinks.current)
            sectionLinks.current.get(section)?.scrollIntoView();
        }
    }, [location.hash]);

    return (
        <div className="Page BlogPost">
            <div className="ml-[5vw] max-w-[85vw] mr-[7vw] lg:ml-[10vw] lg:mr-[10vw]">
                <h1 className="Heading">
                    { blogPost?.title }
                </h1>
                { blogPost && <Flairs flairs={ blogPost.flairs }/> }
                <p className="text-sm lg:text-xl pt-[1rem]">
                    { blogPost?.shortDescription }
                </p>
                <h4 className="flex text-sm justify-end pr-[1rem] lg:text-lg lg:pr-[5rem]">
                    Date: { blogPost?.date }
                </h4>
                <motion.div className="bg-gray-600/50 rounded-xl h-[0.15rem] w-[98%] mt-[1.6rem] mb-[-2rem] lg:mb-[-3.5rem]"/>

                <Markdown
                    components={{        // copy pasted from react-markdown :PPPPP
                        h1(props) {
                            return (
                                <h1
                                    ref={ref => {
                                        sectionLinks.current.set(props.children?.toString().toKebab()!, ref!);
                                    }}
                                    className="Heading mt-[5rem] lg:mt-[8rem]"
                                >
                                    { props.children }
                                </h1>
                            );
                        }, h2(props) {
                            return (
                                <h2 className="text-lg lg:text-2xl">
                                    { props.children }
                                </h2>
                            );
                        }, h3(props) {
                            return (
                               <h3 className="text-sm lg:text-xl">
                                    { props.children }
                                </h3>
                            );
                        }, p(props) {
                            return (
                                <p style={ props.style } className={`${props.className ? props.className : ''} text-sm lg:text-xl`}>
                                    { props.children }
                                </p>
                            );
                        }, a(props) {
                            return (
                                <a href={ props.href } className="text-fuchsia-50 font-medium">
                                    { props.children }
                                </a>
                            );
                        },  code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest as any}    // LOVE typescript
                                    PreTag="div"
                                    children={ String(children).replace(/\n$/, '') }
                                    language={ match[1] }
                                    style={ darkMode ? gruvboxDark : gruvboxLight }
                                    class="text-xs lg:text-lg"
                                />
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            )
                        },
                    }}
                    rehypePlugins={[rehypeRaw]}
                >
                    { blogPost?.text }
                </Markdown>
            </div>
        </div>
    );
}