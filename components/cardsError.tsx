import { AnimatePresence, motion } from "framer-motion";

export default function CardsError(params: { isVisible: boolean, details: any }) {
    return (
        <AnimatePresence>
            {params.isVisible && (
                <div className="m-2">
                    <motion.div
                        initial={{ opacity: 0, scale: 1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0 }}
                        transition={{ duration: 0.4 }}
                        className='rounded-xl max-h-70 h-full'
                    >
                        <h1 className='text-center text-2xl font-bold mt-3 p-2'>
                            0 results found for <span className="text-red-600">{params.details.search}</span>
                            {params.details.types ? ` with ${params.details.types.length === 1 ? `a type` : `types`} of ` : ''}
                            {params.details.types && params.details.types.map((type: string, index: number) =>(
                            <span key={index} className="text-red-600">{type}</span>
                        ))}
                        </h1>

                        <hr />
                        <div className="flex justify-center p-10">
                            <img className="rounded-lg drop-shadow-md border-red-300 border-4" src="https://media.tenor.com/mCOMm-UhklsAAAAC/potchama-fukamaru.gif" />
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}