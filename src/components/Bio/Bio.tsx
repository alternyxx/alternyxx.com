import { motion } from "motion/react"
import "./Bio.css"

const textVariant = { hidden: {opacity: 0, y: 50},
                      show: {
                        opacity: 1,
                        y: 0,
                      }
                    }
export default function Bio() {
    return (
        <motion.div variants={{ hidden: {opacity: 0, y: 50},
                                show: {
                                    opacity: 1,
                                    y: 0,
                                transition: {staggerChildren: 2}
                                } 
                    }}
                    initial="hidden"
                    animate="show" 
                    className="Bio" >  

            <motion.p variants={textVariant}
                      transition={{duration: 1.5, delay: 3}}
                      className="BioHeader" >
                A Quick Bio ツ
            </motion.p>

            <motion.p variants={textVariant}
                      transition={{duration: 1.5, delay: 3.5}}
                      className="BioText" >
                Name's Nyx!
                This site will mainly serve as a showcase of ongoing and finished projects.
                I'll try my best to create dev logs as blogs here and finished showcases on Youtube!
                If you really liked the entry, I kept it as a standalone
                at <a href="https://static.alternyxx.com" className="Hyperlink">https://static.alternyxx.com</a>
                . And finally, the source code for the site can be found 
                at <a href="https://github.com/alternyxx/alternyxx.com" className="Hyperlink">https://github.com/alternyxx/alternyxx.com</a>.
            </motion.p>

            <motion.p variants={{ hidden: {opacity: 0, y: 30},
                                  show: {
                                    opacity: 1,
                                    y: 0,
                                }
                      }}
                      transition={{duration: 1.5, delay: 4}}
                      className="BioNote" >
                (You can press ↵ Enter to skip entry :P (which is currently not implemented))
            </motion.p>
        </motion.div>
    )
}