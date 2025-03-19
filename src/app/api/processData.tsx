import Papa from "papaparse";
import { filterDataBasedOnSelections } from "./handleApproved";

interface OpportunityData {
    ID: string;
    "EP Name": string;
    "Phone Number": string;
    "EP ID": string;
    "Opportunity ID": string;
    "Home LC": string;
    "Home MC": string;
    "LC Alignment": string;
    "Title": string;
    "Host LC": string;
    "Host MC": string;
    "Product": string;
    "Status": string;
    "Applied At": string;
    "Backgrounds": string;
    "Date EP Accept Offer": string;
    "Date Marked Approved": string;
    "Date Marked Accepted By Host": string;
    "Date Marked Realized": string;
    "Duration Type": string;
    "Organization": string;
    "SDG": string;
    "SDG Target": string;
    "Skills": string;
    "Languages": string;
    "Nationality": string;
    "Sub Product": string;
}


interface FilterRequestBody {
   
    from?: string;
    to?: string;
    project?: string;
    product?: string;
    homeMc?: string;
    homeLc?: string;
    hostLc?: string;
    hostMc?: string;
    status?: string;
    duration?: string;
    subProduct?: string;

  
}


export async function fetchCSVData(sheet: string | undefined) {

    let csvUrl: string = '';


    if (sheet == 'iGV') {

        csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdXVEsx_IdMU00CqSTCKBtjcVkffp6QkWtu3lpA6Tma1Ve8n30wMSKTTerqYpUjAiAJM2hvu1V6lcX/pub?output=csv";



    } else if (sheet == 'oGV') {
        csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSW84PHE6hSu_ctfzPMrh0EHcFFRCl0ojVc3RHy1ouPBXIoKTtSSA9GPju3pZxZQZdaBUIQ9Y97Nn-8/pub?output=csv';

    }
    else if (sheet == 'iGT') {
        csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRBYXfk9XHxmoigGNAoM_VchnURXqdwfrbfm9MNj8dWdoru15zgYDqX1skMKKM8SyF5XQCeovcN7bXB/pub?output=csv';



    } else if (sheet == 'oGT') {
        csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQNlq9LxNnrRQHdiVAZGhAA7CAkz986gl4yLGQe5gbuaFNjYMP2kvNfq9tuYeAHMCLMmWGXrwBRpZrw/pub?output=csv';

    }

    const response = await fetch(csvUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch data from Google Sheets');
    }

    const csvText = await response.text();

    

    // Parse CSV data using PapaParse
    const parsedData = Papa.parse<OpportunityData>(csvText, { header: true, skipEmptyLines: true });
    
    if (parsedData.errors.length > 0) {
        throw new Error('Failed to parse CSV data');
    }


    return parsedData.data;





}



export function filterData(data: OpportunityData[], body: FilterRequestBody) {

 
 
    
    const filteredData = data.filter(item => {
        
       
        


        // Check if applied date is within range (only if both from and to are provided)
       

        // Only filter by project (Title) if it's provided in the request
        if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
            return false;
        }

        if (body.subProduct && body.subProduct.trim() !== "" && item["Sub Product"] !== body.project) {
            return false;
        }
        if (body.duration && body.duration.trim() !== "" && item["Duration Type"] !== body.project) {
            return false;
        }


        // If all applicable conditions pass, include the item
        return true;
    });



    return filteredData;
}


export function applicationCounts(data: OpportunityData[], body: FilterRequestBody) {


const filterdData = filterDataBasedOnSelections(data, body);




   
        const applications = filterdData.filter((application) => {
            if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
                const appliedDate = new Date(application["Applied At"]);
                const fromDate = new Date(body.from);
                const toDate = new Date(body.to);
    
                // Add one day to toDate to include the end date in the range
                toDate.setDate(toDate.getDate() + 1);
    
                return appliedDate >= fromDate && appliedDate <= toDate;
            }




            
            // Return all applications if no date filter is applied
            return true;
        });




        const approvals = filterdData.filter((application) => {
            if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
                const appliedDate = new Date(application["Date Marked Approved"]);
                const fromDate = new Date(body.from);
                const toDate = new Date(body.to);
    
                // Add one day to toDate to include the end date in the range
                toDate.setDate(toDate.getDate() + 1);
    
                return appliedDate >= fromDate && appliedDate <= toDate;
            }



            
            
            // Return all applications if no date filter is applied
            return true;
        });



        const accepted = filterdData.filter((application) => {
            if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
                const appliedDate = new Date(application["Date Marked Accepted By Host"]);
                const fromDate = new Date(body.from);
                const toDate = new Date(body.to);
    
                // Add one day to toDate to include the end date in the range
                toDate.setDate(toDate.getDate() + 1);
    
                return appliedDate >= fromDate && appliedDate <= toDate;
            }
            
            // Return all applications if no date filter is applied
            return true;
        });
    

        const realizations = filterdData.filter((application) => {
            if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
                const appliedDate = new Date(application["Date Marked Realized"]);
                const fromDate = new Date(body.from);
                const toDate = new Date(body.to);
    
                // Add one day to toDate to include the end date in the range
                toDate.setDate(toDate.getDate() + 1);
    
                return appliedDate >= fromDate && appliedDate <= toDate;
            }
            
            // Return all applications if no date filter is applied
            return true;
        });


        const stats = {
            applied: applications.length,
            approved: approvals.length,
            accepted: accepted.length,
            realized: realizations.length
        }
        return stats;
    
    

}


