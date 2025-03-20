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
    "Applied_Date": string;
    "Backgrounds": string;
    "Date EP Accept Offer": string;
    "Date_Approved": string;
    "Matched_Date": string;
    "Date_Realized": string;
    "Duration Type": string;
    "Organization": string;
    "SDG": string;
    "SDG Target": string;
    "Skills": string;
    "Languages": string;
    "Nationality": string;
    "Sub Product": string;
    "Experience_End_Date": string;
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




function filterApplications(data: OpportunityData[], body: FilterRequestBody) {
    const applications = data.filter((application) => {
        if (body.from && body.to && body.from.trim() !== "" && body.to.trim() !== "") {
            const appliedDate = new Date(application["Date_Realized"]);
            const fromDate = new Date(body.from);
            const toDate = new Date(body.to);

            // Add one day to toDate to include the end date in the range
            toDate.setDate(toDate.getDate() + 1);

            return appliedDate >= fromDate && appliedDate <= toDate;
        }
        
        // Return all applications if no date filter is applied
        return true;
    });

    return applications;
}


function filterDataBasedOnSelections(data: OpportunityData[], body: FilterRequestBody) {



    const filteredDataBasedOnSelections = data.filter(item => {
         // Only filter by project (Title) if it's provided in the request
        if (body.project && body.project.trim() !== "" && item["Title"] !== body.project) {
            return false;
        }
        if (body.subProduct && body.subProduct.trim() !== "" && item["Sub Product"] !== body.subProduct) {
            return false;
        }
        if (body.duration && body.duration.trim() !== "" && item["Duration Type"] !== body.duration) {
            return false;
        }
        // Only filter by homeMc if it's provided in the request
        if (body.homeMc && body.homeMc.trim() !== "" && item["Home MC"] !== body.homeMc) {
            return false;
        }
        // Only filter by homeLc if it's provided in the request
        if (body.homeLc && body.homeLc.trim() !== "" && item["Home LC"] !== body.homeLc) {
            return false;
        }
        // Only filter by hostMc if it's provided in the request
        if (body.hostMc && body.hostMc.trim() !== "" && item["Host MC"] !== body.hostMc) {
            return false;
        }
        // Only filter by hostLc if it's provided in the request
        if (body.hostLc && body.hostLc.trim() !== "" && item["Host LC"] !== body.hostLc) {
            return false;
        }
        // If all applicable conditions pass, include the item
        return true;
    });
 return filteredDataBasedOnSelections;
}

export function processRealizations(data: OpportunityData[], body: FilterRequestBody) {

    // console.log(data);
    

    const applications = filterApplications(data, body);

    let filterdDataBasedOnSelections = filterDataBasedOnSelections(applications, body);



    // console.log(applications);
    // console.log("applications displayed");
    
    


    const homeLcCount: Record<string, number> = {};
    const hostLcCount: Record<string, number> = {};
    const homeMcCount: Record<string, number> = {};
    const hostMcCount: Record<string, number> = {};
    const homeLcPplCount: Record<string, number> = {};
    const homeLcToEpIds: Record<string, Set<string>> = {};
    const hostLcPplCount: Record<string, number> = {};
    const hostLcToEpIds: Record<string, Set<string>> = {};
    const americas = [
        "Argentina", "Bolivia", "Brazil", "Canada", "Chile", "Colombia", "Costa Rica",
        "Dominican Republic", "Ecuador", "El Salvador", "Guatemala", "Mexico",
        "Nicaragua", "Panama", "Paraguay", "Peru", "United States", "Venezuela"
    ];

    const asiaPacific = [
        "Australia", "Bangladesh", "Cambodia", "Mainland of China", "Hong Kong", "India",
        "Indonesia", "Japan", "Malaysia", "Mongolia", "Myanmar", "Nepal", "New Zealand",
        "Pakistan", "Philippines", "Singapore", "Korea", "Sri Lanka", "Taiwan",
        "Thailand", "Vietnam"
    ];

    const europe = [
        "Albania", "Armenia", "Austria", "Azerbaijan", "Belgium", "Bosnia and Herzegovina",
        "Bulgaria", "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland",
        "France", "Georgia", "Germany", "Greece", "Hungary", "Iceland", "Italy",
        "Kazakhstan", "Kyrgyzstan", "Latvia", "Lithuania", "Macedonia", "Moldova",
        "Montenegro", "Norway", "Poland", "Portugal", "Romania", "Russia", "Serbia",
        "Slovakia", "Spain", "Sweden", "Switzerland", "The Netherlands", "Turkey",
        "Ukraine", "United Kingdom"
    ];

    const middleEastAfrica = [
        "Algeria", "Bahrain", "Benin", "Burkina Faso", "Cabo Verde", "Cameroon",
        "Cote D'Ivoire", "Egypt", "Ethiopia", "Ghana", "Jordan", "Kenya", "Kuwait",
        "Lebanon", "Liberia", "Malawi", "Morocco", "Mozambique", "Namibia", "Nigeria",
        "Rwanda", "Senegal", "South Africa", "Tanzania", "Togo", "Tunisia", "Uganda",
        "United Arab Emirates"
    ];


    const homeRegionalCount: Record<string, number> = {
        "Americas": 0,
        "Asia Pacific": 0,
        "Europe": 0,
        "Middle East Africa": 0
    };

    const hostRegionalCount: Record<string, number> = {
        "Americas": 0,
        "Asia Pacific": 0,
        "Europe": 0,
        "Middle East Africa": 0
    };

    const funnelCounts = {
        "applied":filterdDataBasedOnSelections.length,
        "approved":0,
        "accepted":0,
        "realized":0,
        "finished":0
    }








    filterdDataBasedOnSelections.map((application) => {

        if (application["Date_Approved"] !=  "") {

            funnelCounts["approved"] += 1;
        }

        if(application["Matched_Date"] != "") {
            funnelCounts["accepted"] += 1;
        }

        if(application["Date_Realized"] != "") {
            funnelCounts["realized"] += 1;
        }

        if(application["Experience_End_Date"] != "") {
            funnelCounts["finished"] += 1;
        }


        const homeMc = application["Home MC"];
        const hostMc = application["Host MC"];




        if (americas.includes(homeMc)) {
            homeRegionalCount["Americas"] += 1;
        } else if (asiaPacific.includes(homeMc)) {
            homeRegionalCount["Asia Pacific"] += 1;
        } else if (europe.includes(homeMc)) {
            homeRegionalCount["Europe"] += 1;
        } else if (middleEastAfrica.includes(homeMc)) {
            homeRegionalCount["Middle East Africa"] += 1;
        }

        if (americas.includes(hostMc)) {
            hostRegionalCount["Americas"] += 1;
        } else if (asiaPacific.includes(hostMc)) {
            hostRegionalCount["Asia Pacific"] += 1;
        } else if (europe.includes(hostMc)) {
            hostRegionalCount["Europe"] += 1;
        } else if (middleEastAfrica.includes(hostMc)) {
            hostRegionalCount["Middle East Africa"] += 1;
        }





    });


    filterdDataBasedOnSelections.map((application) => {


        
       


        const homeLc = application["Home LC"];
        if (homeLcCount[homeLc]) {
            homeLcCount[homeLc] += 1;
        } else {
            homeLcCount[homeLc] = 1;
        }

        const epId = application["EP ID"];

        if (!homeLcToEpIds[homeLc]) {
            homeLcToEpIds[homeLc] = new Set<string>();
        }

        homeLcToEpIds[homeLc].add(epId);

        for (const homeLc in homeLcToEpIds) {
            homeLcPplCount[homeLc] = homeLcToEpIds[homeLc].size;
        }


        const hostLc = application["Host LC"];
        if (hostLcCount[hostLc]) {
            hostLcCount[hostLc] += 1;
        } else {
            hostLcCount[hostLc] = 1;
        }


        if (!hostLcToEpIds[hostLc]) {
            hostLcToEpIds[hostLc] = new Set<string>();
        }

        hostLcToEpIds[hostLc].add(epId);

        for (const hostLc in hostLcToEpIds) {
            hostLcPplCount[hostLc] = hostLcToEpIds[hostLc].size;
        }

        const homeMc = application["Home MC"];
        if (homeMcCount[homeMc]) {
            homeMcCount[homeMc] += 1;
        } else {
            homeMcCount[homeMc] = 1;
        }

        const hostMc = application["Host MC"];
        if (hostMcCount[hostMc]) {
            hostMcCount[hostMc] += 1;
        } else {
            hostMcCount[hostMc] = 1;
        }

    

        









    });

    const breakdownBasedOnSelections = {
        selectedHomeLcCount: homeLcCount[body.homeLc || ''] || 0,
        selectedHostLcCount: hostLcCount[body.hostLc || ''] || 0,
        selectedHomeMcCount: homeMcCount[body.homeMc || ''] || 0,
        selectedHostMcCount: hostMcCount[body.hostMc || ''] || 0,
    }

    const breakdown = {
        homeLcCount,
        homeMcCount,
        hostLcCount,
        hostMcCount,
        homeLcPplCount,
        hostLcPplCount,
        homeRegionalCount,
        hostRegionalCount,
        breakdownBasedOnSelections,
        totalCount: applications.length,
        funnelCounts
    }




    return breakdown;

}

