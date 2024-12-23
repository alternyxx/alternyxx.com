import { useEffect } from "react"

// I just cant be bothered with types
export function useSkip(stage: number, setStage: any) {
    useEffect(() => {
        function keyDown(key: any) {
            if (stage === 0 && key.key === "Enter") {
                key.preventDefault();
                setStage(1);
            }
        }

        document.addEventListener("keydown", keyDown);

        return () => {
            document.removeEventListener("keydown", keyDown);
        };
    }, [])
}