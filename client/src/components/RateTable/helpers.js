function makeBaxterRateTable(rateData, ratesTable){
    rateData.forEach((record)=>{
        if((record.total === 25) && (((new Date(record.OutDateTime) - new Date(record.InDateTime)) > 1800000)) ){
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
export {makeBaxterRateTable} ;