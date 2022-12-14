import React, { useState, useEffect } from "react";
import {drawDOM, exportPDF} from "@progress/kendo-drawing";
import axios from "axios";


const base64Email = (from , to , body) => {
    let gridElement = document.querySelector('#PDFExport');
    drawDOM(gridElement, {
        paperSize: "Letter",
        scale:0.68
    })
        .then((group) => {
            return exportPDF(group);
        })
        .then((dataUri) => {
            axios.post('http://localhost:8080/emailGenerator',{dataUri,
                from : from,
                to:to,
                body:body}).then(response => alert(response.data))
            console.log(dataUri.split(";base64,")[1]);
            const last5 = dataUri.slice(-5)
            console.log(last5)
        })
};

function pdfExport (container){
    if (container.current) {
        container.current.save();
    }
}
// function exportPDFWithMethod (container) {
//     if (container.current) {
//         container.current.save();
//     }
// }

export {base64Email,pdfExport}
