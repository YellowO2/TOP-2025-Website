import { Suspense } from "react";
import DistrictPage from "./DistrictPage";

function DistrictPageWrapper() {
    return (
        <Suspense fallback={<div className="flex w-full h-screen items-center justify-center">Loading...</div>}>
            <DistrictPage />
        </Suspense>
    );
}

export default DistrictPageWrapper;