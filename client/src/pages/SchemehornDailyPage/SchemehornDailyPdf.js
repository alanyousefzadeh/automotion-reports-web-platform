import Button from "react-bootstrap/Button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;


const SchemehornDailyPdf = (props) => {

    const { inDate, outDate, data, discounts } = props;

    let rate = [];
    let count = [];
    let disc = [];
    let tax1 = [];
    let total = [];

    let totalCount = 0;
    let totalDisc = 0;
    let totalTax1 = 0;
    let finalTotal = 0;

    let rows = null;
    let xmlContent = data;
    let parser = new DOMParser();
    let xmlDOM = parser.parseFromString(xmlContent, "application/xml");
    //console.log(xmlDOM);
    if (data !== null) {
        rows = xmlDOM.querySelectorAll("ResultingValue");
        console.log(rows);
        rows.forEach((row) => {
            rate.push(row.children[2].children[1].children[6].innerHTML);

            count.push(Number(row.children[2].children[2].children[2].innerHTML));

            disc.push(Number(row.children[2].children[4].children[1].innerHTML));

            tax1.push(Number(row.children[2].children[6].children[1].innerHTML));

            total.push(Number(row.children[2].children[3].children[1].innerHTML));
        });

        totalCount = count.reduce((prev, curr) => prev + curr, 0);
        totalDisc = disc.reduce((prev, curr) => prev + curr, 0);
        totalTax1 = tax1.reduce((prev, curr) => prev + curr, 0);
        finalTotal = total.reduce((prev, curr) => prev + curr, 0.0);

    }

    console.log("totalCount: ", totalCount);
    console.log("totalDisc: ", totalDisc);
    let revenueSummaryArray = [];
    for (let i = 0; i < rate.length; i++) {
        revenueSummaryArray.push([rate[i], count[i], disc[i].toFixed(2), tax1[i].toFixed(2), total[i].toLocaleString(undefined, { minimumFractionDigits: 2, })])
    }

    pdfMake.fonts = {
        NimbusSans: {
            normal: "NimbusSanL-Reg.otf",
            bold: "NimbusSanL-Bol.otf",
            italics: "NimbusSanL-RegIta.otf",
            bolditalics: "NimbusSanL-BolIta.otf"
        }
    };

    const docDefinition = {
        content: [
            { text: `From ${inDate} 12:00AM to ${outDate} 11:59PM`,fontSize: 12,bold: true, alignment: 'left',margin: 10 },
            { text: 'Schemehorn Revenue Summary' },
            {
                margin: 10,
                table: {
                    widths: ['*', '*', '*', '*', 'auto'],
                    body: [['Rate', 'Count', 'Disc', 'Tax1', 'Total'],
                    ...revenueSummaryArray,
                    ['Totals', totalCount, '$' + totalDisc.toFixed(2), '$' + totalTax1.toFixed(2), '$' + finalTotal.toLocaleString(undefined, { minimumFractionDigits: 2, })]
                    ]
                }
            },
            { text: 'Schemehorn Discounts' },
            {
                table:{
                    body:[['asd']]
                }
            }
        ],
        defaultStyle: {
            font: "NimbusSans",

        },
    }

    const create = () => {
        pdfMake.createPdf(docDefinition).download();
        // const pdfDocGenerator = pdfMake.createPdf(docDefinition);
        // pdfDocGenerator.getBlob((blob) => {
        //   const url = URL.createObjectURL(blob);
        //   setUrl(url);
        // });
    };


    return <div>
        <Button onClick={create}>Download PDF</Button>
    </div>
}

export default SchemehornDailyPdf;