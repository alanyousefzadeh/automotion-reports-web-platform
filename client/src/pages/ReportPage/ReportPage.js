import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './ReportPage.scss';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AtlanticTable from '../../components/AtlanticTable/AtlanticTable';
import DatePicker from '../../components/DatePicker/DatePicker';
import ReportHeader from '../../components/ReportHeader/ReportHeader';
import html2canvas from 'html2canvas';
import jsPDF from "jspdf";

function ReportPage(){

    const sortObjectByKeys = (o) => {
        return Object.keys(o).sort().reduce((r, k) => (r[k] = o[k], r), {})
    }
    //access the URL parameters to know which record and garage we are currently on
    let params = useParams();

    //set the state variables
    const [atlanticAllData, setatlanticAllData] = useState([]);
    const [failedToLoad, setFailedToLoad] = useState(false);
    const [garage, setGarage] = useState(params.garageName);
    const [inDate, setInDate]  = useState("");
    const [outDate, setOutDate] = useState("");

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

    //fill the tables with the closed API data
    atlanticAllData.forEach(payment => {
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

    console.log(atlanticMiscTable)
    /////
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

    const generateReport = () => {
        if(inDate !== "" && outDate !== ""){
            if(garage === 'Atlantic Terrace'){
                axios
                .get('http://localhost:8080/garagedata/atlanticClosed', {
                    params: {
                        inDate: Math.floor(new Date(inDate).getTime() / 1000),
                        outDate: Math.floor(new Date(outDate).getTime() / 1000)
                    }
                })
                .then((res) => {
                    setatlanticAllData(res.data);
                })
                .then(()=> {
                    axios
                        .get('http://localhost:8080/garagedata/atlanticOpen', {
                            params: {
                                inDate: Math.floor(new Date(inDate).getTime() / 1000),
                                outDate: Math.floor(new Date(outDate).getTime() / 1000)                 
                            }
                        })
                        // .then((res) => {
                            //starting open = previous days open (data saved in local storage)
                            //ending day open tickets = openData.length 
                            //save ending day open tickets locally to be used as starting open tomorrow
                            //issued tickets = closed - starting
                        // })
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
        } 
    }  

    return (
        
        <div className='report'>
            {failedToLoad 
            ? <p>error loading data...</p>
            :
            <div id="pdf-report"> 
            <ReportHeader
            closed={atlanticAllData.length}
            endDate={outDate}
            />
            <section className='datepicker m-2'>
                <DatePicker label={'In-Date'} setDate={setInDate}/>
                <DatePicker label={'Out-Date'} setDate={setOutDate}/>
            </section>
            <Button onClick={generateReport} className='button'>Generate Report</Button>
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

export default ReportPage; 
