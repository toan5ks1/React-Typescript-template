import { forwardRef, useEffect } from "react";

export const pdfjs = {
    GlobalWorkerOptions: {
        workerSrc: "abc",
    },
};

export const Outline = null;

export const Page = () => <div>page</div>;

export const Document = forwardRef(
    ({ onLoadSuccess = (pdf = { numPages: 4 }) => pdf.numPages }: any, _ref) => {
        useEffect(() => {
            onLoadSuccess({ numPages: 4 });
        }, [onLoadSuccess]);

        return <div>fake</div>;
    }
);
