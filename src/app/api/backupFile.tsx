// import { NextRequest, NextResponse } from "next/server";

// import { fetchCSVData, filterData } from "./processData";
// import { processApplications } from "./handleApplications";
// import { processAccepted } from "./handleAccepted";
// import { processApproved } from "./handleApproved";
// import { processRealizations } from "./handleRealized";

// // Define the data structure to match your JSON format
// interface OpportunityData {
//     ID: string;
//     "EP Name": string;
//     "Phone Number": string;
//     "EP ID": string;
//     "Opportunity ID": string;
//     "Home LC": string;
//     "Home MC": string;
//     "LC Alignment": string;
//     "Title": string;
//     "Host LC": string;
//     "Host MC": string;
//     "Product": string;
//     "Status": string;
//     "Applied_Date": string;
//     "Backgrounds": string;
//     "Date EP Accept Offer": string;
//     "Date_Approved": string;
//     "Matched_Date": string;
//     "Date_Realized": string;
//     "Duration_Type": string;
//     "Organization": string;
//     "SDG": string;
//     "SDG Target": string;
//     "Skills": string;
//     "Languages": string;
//     "Nationality": string;
//     "Sub_Product": string;
//     "Experience_End_Date": string;
// }

// // Define the request body interface
// interface FilterRequestBody {
   
//     from?: string;
//     to?: string;
//     project?: string;
//     product?: string;
//     homeMc?: string;
//     homeLc?: string;
//     hostLc?: string;
//     hostMc?: string;
//     status?: string;
//     duration?: string;
//     subProduct?: string;

  
// }





// // function filterDataWithouthomeLc(data: OpportunityData[], body: FilterRequestBody) {

 
 
    
// //     const filteredDataWithouthomeLc = data.filter(item => {
        
       
        


// //         // Check if applied date is within range (only if both from and to are provided)
// //         if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
// //             const appliedDate = new Date(item["Applied_Date"]);
// //             const fromDate = new Date(body.from);
// //             const toDate = new Date(body.to);

// //             // Add one day to toDate to include the end date in the range
// //             toDate.setDate(toDate.getDate() + 1);

// //             if (appliedDate < fromDate || appliedDate > toDate) {
// //                 return false;
// //             }
// //         }

// //         // Only filter by project (Title) if it's provided in the request
// //         if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
// //             return false;
// //         }


// //         // Only filter by homeMc if it's provided in the request
// //         if (body.homeMc && body.homeMc.trim() !== "" && item["Home MC"] !== body.homeMc) {
// //             return false;
// //         }

      
     

// //         if (body.status && body.status.trim() !== "" && item["Status"] !== body.status) {
// //             return false;
// //         }

// //         if (body.hostLc && body.hostLc.trim() !== "" && item["Host LC"] !== body.hostLc) {
// //             return false;
// //         }




// //         // If all applicable conditions pass, include the item
// //         return true;
// //     });



// //     return filteredDataWithouthomeLc;
// // }




// // function filterDataWithoutHost(data: OpportunityData[], body: FilterRequestBody) {



// //     const filteredDataWithoutHost = data.filter(item => {


// //         // Check if applied date is within range (only if both from and to are provided)
// //         if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
// //             const appliedDate = new Date(item["Applied_Date"]);
// //             const fromDate = new Date(body.from);
// //             const toDate = new Date(body.to);

// //             // Add one day to toDate to include the end date in the range
// //             toDate.setDate(toDate.getDate() + 1);

// //             if (appliedDate < fromDate || appliedDate > toDate) {
// //                 return false;
// //             }
// //         }

// //         // Only filter by project (Title) if it's provided in the request
// //         if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
// //             return false;
// //         }

   

// //         // Only filter by homeMc if it's provided in the request
// //         if (body.homeMc && body.homeMc.trim() !== "" && item["Home MC"] !== body.homeMc) {
// //             return false;
// //         }

// //         // Only filter by homeLc if it's provided in the request
// //         if (body.homeLc && body.homeLc.trim() !== "" && item["Home LC"] !== body.homeLc) {
// //             return false;
// //         }

// //         if (body.status && body.status.trim() !== "" && item["Status"] !== body.status) {
// //             return false;
// //         }






// //         // If all applicable conditions pass, include the item
// //         return true;
// //     });

// //     return filteredDataWithoutHost;




// // }



// // function filterDataWithoutHomeLc(data: OpportunityData[], body: FilterRequestBody) {



// //     const filteredDataWithoutHomeLc = data.filter(item => {


// //         // Check if applied date is within range (only if both from and to are provided)
// //         if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
// //             const appliedDate = new Date(item["Applied_Date"]);
// //             const fromDate = new Date(body.from);
// //             const toDate = new Date(body.to);

// //             // Add one day to toDate to include the end date in the range
// //             toDate.setDate(toDate.getDate() + 1);

// //             if (appliedDate < fromDate || appliedDate > toDate) {
// //                 return false;
// //             }
// //         }

// //         // Only filter by project (Title) if it's provided in the request
// //         if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
// //             return false;
// //         }


   

// //         // Only filter by homeMc if it's provided in the request
// //         if (body.homeMc && body.homeMc.trim() !== "" && item["Home MC"] !== body.homeMc) {
// //             return false;
// //         }

// //         // Only filter by homeLc if it's provided in the request
// //         if (body.hostLc && body.hostLc.trim() !== "" && item["Host LC"] !== body.homeLc) {
// //             return false;
// //         }

// //         if (body.status && body.status.trim() !== "" && item["Status"] !== body.status) {
// //             return false;
// //         }






// //         // If all applicable conditions pass, include the item
// //         return true;
// //     });

// //     return filteredDataWithoutHomeLc;




// // }



// // function filterDataWithoutStatus(data: OpportunityData[], body: FilterRequestBody) {



// //     const filteredDataWithoutStatus = data.filter(item => {


// //         // Check if applied date is within range (only if both from and to are provided)
// //         if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
// //             const appliedDate = new Date(item["Applied_Date"]);
// //             const fromDate = new Date(body.from);
// //             const toDate = new Date(body.to);

// //             // Add one day to toDate to include the end date in the range
// //             toDate.setDate(toDate.getDate() + 1);

// //             if (appliedDate < fromDate || appliedDate > toDate) {
// //                 return false;
// //             }
// //         }

// //         // Only filter by project (Title) if it's provided in the request
// //         if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
// //             return false;
// //         }

   
// //         if (body.hostLc && body.hostLc.trim() !== "" && item["Host LC"] !== body.hostLc) {
// //             return false;
// //         }
      

// //         // Only filter by homeLc if it's provided in the request
// //         if (body.homeLc && body.homeLc.trim() !== "" && item["Home LC"] !== body.homeLc) {
// //             return false;
// //         }

// //         if (body.homeMc && body.homeMc.trim() !== "" && item["Home MC"] !== body.homeMc) {
// //             return false;
// //         }





// //         // If all applicable conditions pass, include the item
// //         return true;
// //     });

// //     return filteredDataWithoutStatus;




// // }



// // function filterDataWithoutHomeMc(data: OpportunityData[], body: FilterRequestBody) {



// //     const filterDataWithoutHomeMc = data.filter(item => {


// //         // Check if applied date is within range (only if both from and to are provided)
// //         if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
// //             const appliedDate = new Date(item["Applied_Date"]);
// //             const fromDate = new Date(body.from);
// //             const toDate = new Date(body.to);

// //             // Add one day to toDate to include the end date in the range
// //             toDate.setDate(toDate.getDate() + 1);

// //             if (appliedDate < fromDate || appliedDate > toDate) {
// //                 return false;
// //             }
// //         }

// //         // Only filter by project (Title) if it's provided in the request
// //         if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
// //             return false;
// //         }

   
// //         if (body.hostLc && body.hostLc.trim() !== "" && item["Host LC"] !== body.hostLc) {
// //             return false;
// //         }
      

// //         // Only filter by homeLc if it's provided in the request
// //         if (body.homeLc && body.homeLc.trim() !== "" && item["Home LC"] !== body.homeLc) {
// //             return false;
// //         }

// //         if (body.status && body.status.trim() !== "" && item["Status"] !== body.status) {
// //             return false;
// //         }






// //         // If all applicable conditions pass, include the item
// //         return true;
// //     });

// //     return filterDataWithoutHomeMc;




// // }


// // function aplToApd(data: OpportunityData[], body: FilterRequestBody) {

// //     const aplToApd = data.filter(item => {

        


// //         if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
// //             const appliedDate = new Date(item["Applied_Date"]);
// //             const fromDate = new Date(body.from);
// //             const toDate = new Date(body.to);

// //             // Add one day to toDate to include the end date in the range
// //             toDate.setDate(toDate.getDate() + 1);

// //             if (appliedDate < fromDate || appliedDate > toDate) {
// //                 return false;
// //             }
// //         }

// //         // Only filter by project (Title) if it's provided in the request
// //         if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
// //             return false;
// //         }

   
// //         if (body.hostLc && body.hostLc.trim() !== "" && item["Host LC"] !== body.hostLc) {
// //             return false;
// //         }
      

    

// //         if (item["Status"] !== "approved") {
// //             return false;
// //         }








// //         // If all applicable conditions pass, include the item
// //         return true;




// //     })

// //     return aplToApd;



// // }


// export async function POST(request: NextRequest) {
//     try {
//         let body: FilterRequestBody = await request.json();



//         let data: OpportunityData[] = await fetchCSVData(body.product);

        
        


      
        
        

//         let filteredData = filterData(data, body);

     

//    let responce = null;

//    let applicationResponce = processApplications(filteredData, body);

//    if(body.status == "applied"){
//     responce = processApplications(filteredData, body);
//    }else if(body.status == "accepted"){
//     responce = processAccepted(filteredData, body);
//    }else if(body.status == "approved"){
//     responce = processApproved(filteredData, body);
//    }
//    else if(body.status == "realized"){
//     responce = processRealizations(filteredData, body);
//    }



//    let finalResponce = {
//     responce,
//     applicationResponce
//    }




        


// //         let filteredDataWithoutStatus = filterDataWithoutStatus(data, body);
        
// //         const statusCount: Record<string, number> = {};
// //         statusCount["applied"] = filteredDataWithoutStatus.length;

// //         filteredDataWithoutStatus.forEach(record => {
// //             const status = record.Status;
// //             if (statusCount[status]) {
// //                 statusCount[status] += 1;
// //             } else {
// //                 statusCount[status] = 1;
// //             }
// //         });

// //         const dataForFunnel = {
// //             statusCount,
// //             apl_acc :  statusCount["accepted"] / statusCount["applied"]*100,
// //             acc_apd : statusCount["approved"]/ statusCount["accepted"]*100,
// //             apd_rlz : statusCount["realized"]/ statusCount["approved"]*100,
// //             rlz_com : statusCount["completed"]/ statusCount["realized"]*100

// //         }

// //         let filteredDataWithoutHost = filterDataWithoutHost(data, body);

// //         // Count the data by status
// //         const hostLcApplicationCount: Record<string, number> = {};


// //         filteredDataWithoutHost.forEach(record => {
// //             const lc = record["Host LC"];
// //             if (hostLcApplicationCount[lc]) {
// //                hostLcApplicationCount[lc] += 1;
// //             } else {
// //                hostLcApplicationCount[lc] = 1;
// //             }
// //         });


    

// //         const hostLcPplCount: Record<string, number> = {};
// //         const hostEntityToEpIds: Record<string, Set<string>> = {};

// //         // First pass: collect unique EP IDs for each Host Entity
// //         filteredDataWithoutHost.forEach(record => {
// //             const hostEntity = record["Host LC"];
// //             const epId = record["EP ID"];

// //             if (!hostEntityToEpIds[hostEntity]) {
// //                 hostEntityToEpIds[hostEntity] = new Set<string>();
// //             }

// //             hostEntityToEpIds[hostEntity].add(epId);
// //         });

// //         // Second pass: count the unique EP IDs for each Host Entity
// //         for (const hostEntity in hostEntityToEpIds) {
// //             hostLcPplCount[hostEntity] = hostEntityToEpIds[hostEntity].size;
// //         }

// //         let hostLcs = {
// //             hostLcApplicationCount,
// //             hostLcPplCount
// //         };

    
 


// //         let filteredDataWithoutHomeMc = filterDataWithoutHomeMc(data, body);




// //         const homeMcApplicationCount: Record<string, number> = {};


// //         filteredDataWithoutHomeMc.forEach(record => {
// //             const mc = record["Home MC"];
// //             if (homeMcApplicationCount[mc]) {
// //                 homeMcApplicationCount[mc] += 1;
// //             } else {
// //                 homeMcApplicationCount[mc] = 1;
// //             }
// //         });


// //         let filteredDataWithouthomeLc = filterDataWithouthomeLc(data, body);


// //     const homeLcApplicationCount: Record<string, number> = {};


// //         filteredDataWithouthomeLc.forEach(record => {
// //             const lc = record["Home LC"];
// //             if (homeLcApplicationCount[lc]) {
// //                 homeLcApplicationCount[lc] += 1;
// //             } else {
// //                 homeLcApplicationCount[lc] = 1;
// //             }
// //         });


// //         const homeLcPplCount: Record<string, number> = {};
// //         const homeEntityToEpIds: Record<string, Set<string>> = {};

// //         // First pass: collect unique EP IDs for each Host Entity
// //         filteredDataWithoutHost.forEach(record => {
// //             const homeEntity = record["Host LC"];
// //             const epId = record["EP ID"];

// //             if (!homeEntityToEpIds[homeEntity]) {
// //                 homeEntityToEpIds[homeEntity] = new Set<string>();
// //             }

// //             homeEntityToEpIds[homeEntity].add(epId);
// //         });

// //         // Second pass: count the unique EP IDs for each Host Entity
// //         for (const homeEntity in homeEntityToEpIds) {
// //             homeLcPplCount[homeEntity] = homeEntityToEpIds[homeEntity].size;
// //         }



// //         let homeLcs = {
// //             homeLcApplicationCount,
// //              homeLcPplCount
// //          };
 
        

// //     const apltoApd = aplToApd(data, body);


// //     const apdCounts: Record<string, number> = {};

// //     apltoApd.forEach(record => {
// //         const lc = record["Home MC"];
// //         if (apdCounts[lc]) {
// //             apdCounts[lc] += 1;
// //         } else {
// //             apdCounts[lc] = 1;}

// //     });

// //     const aplapd: Record<string, number> = {};

// //     for (const record in homeMcApplicationCount) {
// //         if (apdCounts[record] != null && homeMcApplicationCount[record] != null) {
// //             aplapd[record] = (apdCounts[record] / homeMcApplicationCount[record]);
// //         }
// //     }
    



// //     let aplToApdConverstion = {

// //         apdCounts,
// //         homeMcApplicationCount,
// //         aplapd


// //     }

// //     const americas = [
// //         "Argentina", "Bolivia", "Brazil", "Canada", "Chile", "Colombia", "Costa Rica",
// //         "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Mexico",
// //         "Nicaragua", "Panama", "Paraguay", "Peru", "United States", "Venezuela"
// //       ];
      
// //       const asiaPacific = [
// //         "Australia", "Bangladesh", "Cambodia", "Mainland of China", "Hong Kong", "India",
// //         "Indonesia", "Japan", "Malaysia", "Mongolia", "Myanmar", "Nepal", "New Zealand",
// //         "Pakistan", "Philippines", "Singapore", "Korea", "Sri Lanka", "Taiwan",
// //         "Thailand", "Vietnam"
// //       ];
      
// //       const europe = [
// //         "Albania", "Armenia", "Austria", "Azerbaijan", "Belgium", "Bosnia and Herzegovina",
// //         "Bulgaria", "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland",
// //         "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Italy",
// //         "Kazakhstan", "Kyrgyzstan", "Latvia", "Lithuania", "Macedonia", "Moldova",
// //         "Montenegro", "Norway", "Poland", "Portugal", "Romania", "Russia", "Serbia",
// //         "Slovakia", "Spain", "Sweden", "Switzerland", "The Netherlands", "Türkiye",
// //         "Ukraine", "United Kingdom"
// //       ];
      
// //       const middleEastAfrica = [
// //         "Algeria", "Bahrain", "Benin", "Burkina Faso", "Cabo Verde", "Cameroon",
// //         "Cote D'Ivoire", "Egypt", "Ethiopia", "Ghana", "Jordan", "Kenya", "Kuwait",
// //         "Lebanon", "Liberia", "Malawi", "Morocco", "Mozambique", "Namibia", "Nigeria",
// //         "Rwanda", "Senegal", "South Africa", "Tanzania", "Togo", "Tunisia", "Uganda",
// //         "United Arab Emirates"
// //       ];


// //       const regionCount: Record<string, number> = {
// //         "Americas": 0,
// //         "Asia Pacific": 0,
// //         "Europe": 0,
// //         "Middle East Africa": 0
// //     };
    
// //     filteredData.forEach(record => {
// //         const homeMC = record["Home MC"]; // Extract Home MC
    
// //         if (americas.includes(homeMC)) {
// //             regionCount["Americas"] += 1;
// //         } else if (asiaPacific.includes(homeMC)) {
// //             regionCount["Asia Pacific"] += 1;
// //         } else if (europe.includes(homeMC)) {
// //             regionCount["Europe"] += 1;
// //         } else if (middleEastAfrica.includes(homeMC)) {
// //             regionCount["Middle East Africa"] += 1;
// //         }
// //     });



    
   
    










// //         // Prepare the response object
// //         const responseData = {
           
// //             statusCount,
// //             totalCount: filteredData.length,
// //             hostLcs,
// //             homeLcs,
          
// //             homeMcApplicationCount,
// //             homeLcApplicationCount,
// //             aplToApdConverstion,
// //             dataForFunnel,
// //             regionCount

// //         };


// // console.log(responseData.aplToApdConverstion);

//         return NextResponse.json(finalResponce);
//     } catch (error) {
//         return NextResponse.json({ error: 'An error occurred while processing the request', details: error }, { status: 500 });
//     }
// }