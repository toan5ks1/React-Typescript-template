import ReactPDF from "@react-pdf/renderer";

// Register font for ReactPDF
ReactPDF.Font.register({
    family: "MPlus",
    fonts: [
        {
            src: "https://fonts.gstatic.com/s/mplus2/v5/7Auhp_Eq3gO_OGbGGhjdwrDdpeIBxlkwOa6VxlqHrzNgAw.ttf",
        }, // fontWeight: 400
    ],
});

// Create styles
export const commonStyle = ReactPDF.StyleSheet.create({
    page: {
        padding: "20px",
    },
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        display: "flex",
        alignItems: "flex-start",
    },
    text: {
        wordWrap: "break-all",
        fontFamily: "MPlus",
    },
});
