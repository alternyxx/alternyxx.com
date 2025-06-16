import { useContext, useEffect } from "react"
import { useParams } from "react-router";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { gruvboxDark, gruvboxLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

import { DarkModeContext, BlogsContext, StageContext } from "../common/context"
import { kebab } from "../common/utils";

export default function BlogPost()  {
    const { setStage } = useContext(StageContext);
    const darkMode = useContext(DarkModeContext);
    const blogPosts = useContext(BlogsContext);
    let { blog } = useParams();

    return (
        <div className="Page">
            <div className="mt-[5vh] ml-[5vw] max-w-[85vw] mr-[7vw] lg:mt-[2vh] lg:ml-[10vw] lg:mr-[10vw]">
                <Markdown
                    components={{        // copy pasted from react-markdown :PPPPP
                        h1(props) {
                            return (
                                <h1 className="Heading">
                                    { props.children }
                                </h1>
                            );
                        }, h3(props) {
                            return (
                               <h3 className="lg:mt-[4rem]">
                                    { props.children }
                                </h3>
                            );
                        }, p(props) {
                            return (
                                <p className="text-sm lg:text-xl">
                                    { props.children }
                                </p>
                            );
                        }, code(props) {
                            const {children, className, node, ...rest} = props
                            const match = /language-(\w+)/.exec(className || '')
                            return match ? (
                                <SyntaxHighlighter
                                    {...rest as any}    // LOVE typescript
                                    PreTag="div"
                                    children={ String(children).replace(/\n$/, '') }
                                    language={ match[1] }
                                    style={ darkMode ? gruvboxDark : gruvboxLight }
                                />
                            ) : (
                                <code {...rest} className={className}>
                                    {children}
                                </code>
                            )
                        },
                    }}
                >
                    { blogPosts.blogs[blogPosts.blogs.findIndex((blogPost) => {
                        return kebab(blogPost.title) == blog;
                    })].text }
                </Markdown>
            </div>
        </div>
    );
}