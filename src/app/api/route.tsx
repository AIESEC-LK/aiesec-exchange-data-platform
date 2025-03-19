import { NextRequest, NextResponse } from "next/server";

import { applicationCounts, fetchCSVData, filterData } from "./processData";
import { processApplications } from "./handleApplications";
import { processAccepted } from "./handleAccepted";
import { processApproved } from "./handleApproved";
import { processRealizations } from "./handleRealized";

// Define the data structure to match your JSON format
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

// Define the request body interface
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








export async function POST(request: NextRequest) {
    try {
        let body: FilterRequestBody = await request.json();




        // console.log(body);
        



        let data: OpportunityData[] = await fetchCSVData(body.product);

        let filteredData = filterData(data, body);


        console.log(filteredData);  
        console.log("filteredData");
        
        



        let responce = null;

        let applicationResponce = processApplications(filteredData, body);

        console.log(applicationResponce);
        console.log("applicationResponce");
        

        if (body.status == "applied") {
            responce = processApplications(filteredData, body);
        } else if (body.status == "accepted") {
            responce = processAccepted(filteredData, body);
        } else if (body.status == "approved") {
            responce = processApproved(filteredData, body);
        }
        else if (body.status == "realized") {
            responce = processRealizations(filteredData, body);
        }

        const appCounts = applicationCounts(filteredData, body);



        let finalResponce = {
            responce,
            applicationResponce,
            appCounts
        }


        









        return NextResponse.json(finalResponce);
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while processing the request', details: error }, { status: 500 });
    }
}