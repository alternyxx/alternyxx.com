export const TechFlair = () => {
    return (
        <div className="bg-green-400/70 rounded-xl px-[1rem] py-[0]">
            <span className="block text-sm lg:text-lg/5">Tech</span>
        </div>
    );
}

export const TravelFlair = () => {
    return (
        <div className="bg-orange-400/70 rounded-xl px-[1rem] py-[0]">
            <span className="block text-sm lg:text-lg/5">Travel</span>
        </div>
    );
}

export const LifeFlair = () => {
    return (
        <div className="bg-blue-500/70 rounded-xl px-[1rem] py-[0]">
            <span className="block text-sm lg:text-lg/5">Life</span>
        </div>
    );
}

export default function Flairs({ flairs }: { flairs: string[] }) {
    return (
        <div className="flex gap-x-1 lg:gap-x-3">
            {/* there is prob a better way than this by creating a hashmap and using .map()*/}
            { flairs.includes("Tech") && <TechFlair/> }
            { flairs.includes("Travel") && <TravelFlair/> }
            { flairs.includes("Life") && <LifeFlair/> }
        </div>
    );
}