function makeBaxterRateTable(rateData, ratesTable){
    rateData.forEach((record)=>{
        if((record.total === 25) && (((new Date(record.OutDateTime) - new Date(record.InDateTime)) > 3600000)) ){
            ratesTable['Early Bird'] = {
                count: ratesTable['Early Bird'].count + 1,
                revenue: ratesTable['Early Bird'].revenue + record.total
            }
        }else if(record.total === 15){
            ratesTable['Up to 1/2 hour'] = {
                count: ratesTable['Up to 1/2 hour'].count + 1,
                revenue: ratesTable['Up to 1/2 hour'].revenue + record.total
            }    
        }else if(record.total === 25){
            ratesTable['Up to 1 hour'] = {
                count: ratesTable['Up to 1 hour'].count + 1,
                revenue: ratesTable['Up to 1 hour'].revenue + record.total
            }  
        }else if(record.total === 32){
            ratesTable['Up to 2 hours'] = {
                count: ratesTable['Up to 2 hours'].count + 1,
                revenue: ratesTable['Up to 2 hours'].revenue + record.total
            }
        }else if(record.total === 42){
            ratesTable['Up to 3 hours'] = {
                count: ratesTable['Up to 3 hours'].count + 1,
                revenue: ratesTable['Up to 3 hours'].revenue + record.total
            }
        }else if(record.total === 46){
            ratesTable['Up to 12 hours'] = {
                count: ratesTable['Up to 12 hours'].count + 1,
                revenue: ratesTable['Up to 12 hours'].revenue + record.total
            }
        }else if(record.total === 55){
            ratesTable['Up to 24 hours'] = {
                count: ratesTable['Up to 24 hours'].count + 1,
                revenue: ratesTable['Up to 24 hours'].revenue + record.total
            }
        }else{
            ratesTable['Other'] = {
                count: ratesTable['Other'].count + 1,
                revenue: ratesTable['Other'].revenue + record.total
            }
        }
    })
}

function makeWaverlyRateTable(rateData, ratesTable){
    rateData.forEach((record)=>{
        if((record.total === 15) && (((new Date(record.OutDateTime) - new Date(record.InDateTime)) > 1800000)) ){
            ratesTable['Early Bird'] = {
                count: ratesTable['Early Bird'].count + 1,
                revenue: ratesTable['Early Bird'].revenue + record.total
            }
        }else if(record.total === 5){
            ratesTable['Up to 1/2 hour'] = {
                count: ratesTable['Up to 1/2 hour'].count + 1,
                revenue: ratesTable['Up to 1/2 hour'].revenue + record.total
            }     
        }else if(record.total === 15){
            ratesTable['Up to 2 hours'] = {
                count: ratesTable['Up to 2 hours'].count + 1,
                revenue: ratesTable['Up to 2 hours'].revenue + record.total
            }
        }else if(record.total === 20){
            ratesTable['Up to 3 hours'] = {
                count: ratesTable['Up to 3 hours'].count + 1,
                revenue: ratesTable['Up to 3 hours'].revenue + record.total
            }
        }else if(record.total === 25){
            ratesTable['Up to 8 hours'] = {
                count: ratesTable['Up to 8 hours'].count + 1,
                revenue: ratesTable['Up to 8 hours'].revenue + record.total
            }
        }else if(record.total === 35){
            ratesTable['Up to 24 hours'] = {
                count: ratesTable['Up to 24 hours'].count + 1,
                revenue: ratesTable['Up to 24 hours'].revenue + record.total
            }
        }else{
            ratesTable['Other'] = {
                count: ratesTable['Other'].count + 1,
                revenue: ratesTable['Other'].revenue + record.total
            }
        }
    })
}

function roundToTwo(num) {
    return +(Math.round((num + Number.EPSILON) * 100) / 100);
}

function makeVanVorstRateTable(rateData, ratesTable){
    rateData.forEach((record)=>{
    
        if(roundToTwo(record.total) === (3.56)){
            ratesTable['Up to 1/2 hour'] = {
                count: ratesTable['Up to 1/2 hour'].count + 1,
                revenue: ratesTable['Up to 1/2 hour'].revenue + roundToTwo(record.total)
            }     
        }else if(roundToTwo(record.total) === (10.67)){
            ratesTable['Up to 1 hour'] = {
                count: ratesTable['Up to 1 hour'].count + 1,
                revenue: ratesTable['Up to 1 hour'].revenue + roundToTwo(record.total)
            }
        }else if(roundToTwo(record.total) === (13.04)){
            ratesTable['Up to 2 hours'] = {
                count: ratesTable['Up to 2 hours'].count + 1,
                revenue: ratesTable['Up to 2 hours'].revenue + roundToTwo(record.total)
            }
        }else if(roundToTwo(record.total) === (17.78)){
            ratesTable['Up to 3 hours'] = {
                count: ratesTable['Up to 3 hours'].count + 1,
                revenue: ratesTable['Up to 3 hours'].revenue + roundToTwo(record.total)
            }
        }else if(roundToTwo(record.total) === (20.15)){
            ratesTable['Up to 12 hours'] = {
                count: ratesTable['Up to 12 hours'].count + 1,
                revenue: ratesTable['Up to 12 hours'].revenue + roundToTwo(record.total)
            }
        }else if(roundToTwo(record.total) === (28.44)){
            ratesTable['Up to 24 hours'] = {
                count: ratesTable['Up to 24 hours'].count + 1,
                revenue: ratesTable['Up to 24 hours'].revenue + roundToTwo(record.total)
            }
        }else{
            ratesTable['Other'] = {
                count: ratesTable['Other'].count + 1,
                revenue: ratesTable['Other'].revenue + record.total
            }
        }
    })
}
function make24thStreetRateTable(rateData, ratesTable){
    rateData.forEach((record)=>{
    
        if((record.total) === (25)){
            ratesTable['Early Bird'] = {
                count: ratesTable['Early Bird'].count + 1,
                revenue: ratesTable['Early Bird'].revenue + (record.total)
            }     
        }else if((record.total) === (8)){
            ratesTable['Up to 1/2 hour'] = {
                count: ratesTable['Up to 1/2 hour'].count + 1,
                revenue: ratesTable['Up to 1/2 hour'].revenue + (record.total)
            }
        }else if((record.total) === (33)){
            ratesTable['Up to 2 hours'] = {
                count: ratesTable['Up to 2 hours'].count + 1,
                revenue: ratesTable['Up to 2 hours'].revenue + (record.total)
            }
        }else if((record.total) === (39)){
            ratesTable['Up to 3 hours'] = {
                count: ratesTable['Up to 3 hours'].count + 1,
                revenue: ratesTable['Up to 3 hours'].revenue + (record.total)
            }
        }else if(roundToTwo(record.total) === (46)){
            ratesTable['Up to 24 hours'] = {
                count: ratesTable['Up to 24 hours'].count + 1,
                revenue: ratesTable['Up to 24 hours'].revenue + (record.total)
            }
        }else{
            ratesTable['Other'] = {
                count: ratesTable['Other'].count + 1,
                revenue: ratesTable['Other'].revenue + record.total
            }
        }
    })

}
export {makeBaxterRateTable, makeWaverlyRateTable, makeVanVorstRateTable, make24thStreetRateTable} ;