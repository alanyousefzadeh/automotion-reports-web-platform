import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AtlanticTable from '../../components/AtlanticTable/AtlanticTable';
import ReportHeader from '../../components/ReportHeader/ReportHeader';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

function DailyReportPage(){

    const sortObjectByKeys = (o) => {
        return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
    }
    //access the URL parameters to know which record and garage we are currently on
    let params = useParams();

    //set the state variables
    const [atlanticAllData, setatlanticAllData] = useState([]);
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [garage, setGarage] = useState(params.garageName);
    const [inDate, setInDate]  = useState(Math.floor(new Date().setHours(3, 0, 0, 0) - (24*60*60*1000)));
    const [outDate, setOutDate] = useState(Math.floor(new Date().setHours(3, 0, 0, 0)));
    ////////////////////////////////////////
    let atlanticTable = {
        'Default Rate - 1/2hr' : {
            tally: 0,
            totalPaid: 0
        },
        'Default Rate - 1hr' : {
            tally: 0,
            totalPaid: 0
        },
        'Early' : {
            tally: 0,
            totalPaid: 0
        },
        'Default Rate - 2hr' : {
            tally: 0,
            totalPaid: 0
        },
        'Default Rate - 10hr' : {
            tally: 0,
            totalPaid: 0
        },
        'Default Rate - 24hr' : {
            tally: 0,
            totalPaid: 0
        }
    };

    let atlanticDiscountTable = {};

    let atlanticMiscTable = {
        tally: 0,
        totalPaid: 0
    };

    let start = 0
    //fill the tables with the closed API data
    atlanticAllData.forEach(payment => {
        if(new Date(payment.from_date).getTime() < inDate){
            start += 1
        }
        if((payment.total_amount === payment.total_value) && (payment.total_amount === 3)){
            atlanticTable['Default Rate - 1/2hr'] = {
                tally: (atlanticTable['Default Rate - 1/2hr'].tally + 1) ,
                totalPaid : (atlanticTable['Default Rate - 1/2hr'].totalPaid + parseInt(payment.total_amount))
            }
        }else if((payment.total_amount === payment.total_value) && (payment.total_amount === 6)){
            atlanticTable['Default Rate - 1hr'] = {
                tally: (atlanticTable['Default Rate - 1hr'].tally + 1) ,
                totalPaid : (atlanticTable['Default Rate - 1hr'].totalPaid + parseInt(payment.total_amount)) 
            }
        }else if((payment.total_amount === payment.total_value) && (payment.total_amount === 10)){
            atlanticTable['Early'] = {
                tally: (atlanticTable['Early'] ? (atlanticTable['Early'].tally + 1) : 1) ,
                totalPaid : (atlanticTable['Early'].totalPaid + parseInt(payment.total_amount))
            }
        }else if((payment.total_amount === payment.total_value) && (payment.total_amount === 15)){
            atlanticTable['Default Rate - 2hr'] = {
                tally: (atlanticTable['Default Rate - 2hr'].tally + 1) ,
                totalPaid : (atlanticTable['Default Rate - 2hr'].totalPaid + parseInt(payment.total_amount))
            }
        }else if((payment.total_amount === payment.total_value) && (payment.total_amount === 23)){
            atlanticTable['Default Rate - 10hr'] = {
                tally: (atlanticTable['Default Rate - 10hr'].tally + 1)  ,
                totalPaid : (atlanticTable['Default Rate - 10hr'].totalPaid + parseInt(payment.total_amount))
            }
        }else if((payment.total_amount === payment.total_value) && (payment.total_amount === 40)){
            atlanticTable['Default Rate - 24hr'] = {
                tally:  (atlanticTable['Default Rate - 24hr'].tally + 1) ,
                totalPaid : (atlanticTable['Default Rate - 24hr'].totalPaid + parseInt(payment.total_amount))
            }
        }else if(payment.discount_name){
                if((payment.discount_name === 'ParkWhiz') || (payment.discount_name === 'SpotHero')){
                    atlanticDiscountTable[payment.discount_name] = {
                        tally: (atlanticDiscountTable[payment.discount_name] ? (atlanticDiscountTable[payment.discount_name].tally + 1) : 1) ,
                        totalPaid : (atlanticDiscountTable[payment.discount_name] ? (atlanticDiscountTable[payment.discount_name].totalPaid + parseInt(payment.reservation_value)) : parseInt(payment.reservation_value) )
                    }    
                }else{
                    atlanticDiscountTable[payment.discount_name] = {
                        tally: (atlanticDiscountTable[payment.discount_name] ? (atlanticDiscountTable[payment.discount_name].tally + 1) : 1) ,
                        totalPaid : (atlanticDiscountTable[payment.discount_name] ? (atlanticDiscountTable[payment.discount_name].totalPaid + parseInt(payment.total_amount)) : parseInt(payment.total_amount) )
                    }
                }
        }else{
            atlanticMiscTable = {
                tally: (atlanticMiscTable.tally + 1) ,
                totalPaid : (atlanticMiscTable.totalPaid + parseInt(payment.total_amount)) 
            }
        }  
    })

    const genPDF = () => {
        let file = html2canvas(document.getElementById("pdf-report")).then(function (canvas) {
            const doc = new jsPDF("p","mm","a4");
            const img = canvas.toDataURL("image/png",6.0);
            doc.addImage(img, 'PNG', 10, 10,180,150);
            let date = new Date().toLocaleTimeString();
            let saveInfo = `${garage.split(" ")[0]}-${outDate}-generated-${date}.pdf`;
            doc.save(saveInfo); 
            return saveInfo;
        })
        return file;
    }

    const email = async () =>{
        let filepath = await genPDF();
        axios
            .post('http://localhost:8080/emailGenerator', {
                file: filepath
            })
    }

    useEffect(() => {

            if(garage === 'Atlantic Terrace'){
                axios
                .get('http://localhost:8080/garagedata/atlanticClosed', {
                    params: {
                        inDate: inDate,
                        outDate: outDate
                    }
                })
                .then((res) => {
                    setatlanticAllData(res.data);
                })
                .catch(()=>{
                    setFailedToLoad(true);  
                })

            }else{
                axios
                .get('http://localhost:8080/garagedata')
                .then((res) => { 
                    console.log(res.data)
                    setatlanticAllData(res.data);
                })
                .catch(() => {
                    setFailedToLoad(true);
                });
            } 
         
    }, [])  

    return (
        
        <div className='report'>
            {failedToLoad 
            ? <p>error loading data...</p>
            :
            <div id="pdf-report"> 
            <ReportHeader
            start={start}
            closed={atlanticAllData.length}
            startDate={(new Date(inDate).toLocaleString('en-US', { timeZone: "America/New_York" }))}
            endDate={(new Date(outDate).toLocaleString('en-US', { timeZone: "America/New_York" }))}
            />
            <Button onClick={genPDF} className='button'>Download PDF</Button>
            <Button onClick={email} className='button'>Send as Email</Button>
            <AtlanticTable 
                atlanticTable={(atlanticTable)}
                atlanticDiscountTable={sortObjectByKeys(atlanticDiscountTable)}
                atlanticMiscTable={atlanticMiscTable}   
            />            
            </div>
            }
        </div>
    );
}

export default DailyReportPage; 
