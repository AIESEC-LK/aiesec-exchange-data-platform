

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




function filterApplications(data: OpportunityData[], body: FilterRequestBody) {
    const applications = data.filter((application) => {
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




export function processApplications(data: OpportunityData[], body: FilterRequestBody) {

    // console.log(data);


    const applications = filterApplications(data, body);
    let filterdDataBasedOnSelections = filterDataBasedOnSelections(applications, body);


    // console.log(applications);
    // console.log("applications displayed");




    const homeLcCount: Record<string, number> = {};
    const hostLcCount: Record<string, number> = {};

    const homeMcCount: Record<string, number> = {};
    const homeMcApprovedCount: Record<string, number> = {};
    const hostMcApprovedCount: Record<string, number> = {};


    const hostMcCount: Record<string, number> = {};

    const homeLcPplCount: Record<string, number> = {};
    const homeLcToEpIds: Record<string, Set<string>> = {};
    const hostLcPplCount: Record<string, number> = {};
    const hostLcToEpIds: Record<string, Set<string>> = {};
    // const homeMcProcessTime: Record<string, number> = {};
    // const processTimeforeachApplicationInHomeMc: Record<string, Set<number>> = {};
    // const hostMcProcessTime: Record<string, number> = {};
    // const processTimeforeachApplicationInHostMc: Record<string, Set<number>> = {};



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
        "applied": filterdDataBasedOnSelections.length,
        "approved": 0,
        "accepted": 0,
        "realized": 0
    }








    filterdDataBasedOnSelections.map((application) => {

        if (application["Date Marked Approved"] != "") {

            funnelCounts["approved"] += 1;
        }

        if (application["Date Marked Accepted By Host"] != "") {
            funnelCounts["accepted"] += 1;
        }

        if (application["Date Marked Realized"] != "") {
            funnelCounts["realized"] += 1;
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

        if (application["Date Marked Approved"] != "") {
            if (homeMcApprovedCount[homeMc]) {
                homeMcApprovedCount[homeMc] += 1;
            } else {
                homeMcApprovedCount[homeMc] = 1;
            }
        }



        // if(application["Date Marked Approved"] != "") {
        //     if (processTimeforeachApplicationInHomeMc[homeMc]) 
        //     {
        //         let processTime = new Date(application["Date Marked Approved"]).getTime() - new Date(application["Applied At"]).getTime();
        //         processTimeforeachApplicationInHomeMc[homeMc].add(processTime);
        //     } else {

        //         let processTime = new Date(application["Date Marked Approved"]).getTime() - new Date(application["Applied At"]).getTime();
        //         processTimeforeachApplicationInHomeMc[homeMc] = new Set<number>();
        //         processTimeforeachApplicationInHomeMc[homeMc].add(processTime);
        //     }
        // }




        const hostMc = application["Host MC"];
        if (hostMcCount[hostMc]) {
            hostMcCount[hostMc] += 1;
        } else {
            hostMcCount[hostMc] = 1;
        }

        if (application["Date Marked Approved"] != "") {
            if (hostMcApprovedCount[hostMc]) {
                hostMcApprovedCount[hostMc] += 1;
            } else {
                hostMcApprovedCount[hostMc] = 1;
            }
        }





        // if(application["Date Marked Approved"] != "") {
        //     if (processTimeforeachApplicationInHostMc[hostMc]) 
        //     {
        //         let processTime = new Date(application["Date Marked Approved"]).getTime() - new Date(application["Applied At"]).getTime();
        //         processTimeforeachApplicationInHostMc[hostMc].add(processTime);
        //     } else {

        //         let processTime = new Date(application["Date Marked Approved"]).getTime() - new Date(application["Applied At"]).getTime();
        //         processTimeforeachApplicationInHostMc[hostMc] = new Set<number>();
        //         processTimeforeachApplicationInHostMc[hostMc].add(processTime);
        //     }
        // }



















    });



    const processTimeforeachApplicationInHomeMc: Record<string, number[]> = {};
    const homeMcs: string[] = [];
    // Iterate through applications
    filterdDataBasedOnSelections.forEach((application) => {
        const homeMc = application["Home MC"];
        const appliedAtStr = application["Applied At"];
        const approvedAtStr = application["Date Marked Approved"];
        homeMcs.push(homeMc);
        console.log(homeMc);
        

        // Validate both dates exist and are not empty
        if (appliedAtStr && approvedAtStr) {
            const appliedAt = new Date(appliedAtStr);
            const approvedAt = new Date(approvedAtStr);

            // Check if both dates are valid
            if (!isNaN(appliedAt.getTime()) && !isNaN(approvedAt.getTime())) {
                let processTimeInDays = (approvedAt.getTime() - appliedAt.getTime()) / (1000 * 60 * 60 * 24);

                // Ensure the homeMc key exists in the object
                if (!processTimeforeachApplicationInHomeMc[homeMc]) {
                    processTimeforeachApplicationInHomeMc[homeMc] = [];
                }

                // Store process time in days
                processTimeforeachApplicationInHomeMc[homeMc].push(processTimeInDays);
            }
        }
    });

    // Calculate average process time for each Home MC (optional)
    const averageProcessTimePerHomeMc: Record<string, number> = {};

    for (const homeMc in processTimeforeachApplicationInHomeMc) {

        console.log(homeMc);
        
        const processTimes = processTimeforeachApplicationInHomeMc[homeMc];
        if (processTimes.length > 0) {
            averageProcessTimePerHomeMc[homeMc] =
                processTimes.reduce((sum, time) => sum + time, 0) / processTimes.length;
        }
    }

    console.log(averageProcessTimePerHomeMc);
    














    const processTimeforeachApplicationInHostMc: Record<string, number[]> = {};

    // Iterate through applications
    filterdDataBasedOnSelections.forEach((application) => {
        const hostMc = application["Host MC"];
        const appliedAtStr = application["Applied At"];
        const approvedAtStr = application["Date Marked Approved"];

        // Validate both dates exist and are not empty
        if (appliedAtStr && approvedAtStr) {
            const appliedAt = new Date(appliedAtStr);
            const approvedAt = new Date(approvedAtStr);

            // Check if both dates are valid
            if (!isNaN(appliedAt.getTime()) && !isNaN(approvedAt.getTime())) {
                let processTimeInDays = (approvedAt.getTime() - appliedAt.getTime()) / (1000 * 60 * 60 * 24);

                // Ensure the homeMc key exists in the object
                if (!processTimeforeachApplicationInHostMc[hostMc]) {
                    processTimeforeachApplicationInHostMc[hostMc] = [];
                }

                // Store process time in days
                processTimeforeachApplicationInHostMc[hostMc].push(processTimeInDays);
            }
        }
    });

    // Calculate average process time for each Home MC (optional)
    const averageProcessTimePerHostMc: Record<string, number> = {};

    for (const hostMc in processTimeforeachApplicationInHostMc) {

        // console.log(hostMc);

        const processTimes = processTimeforeachApplicationInHostMc[hostMc];
        if (processTimes.length > 0) {
            averageProcessTimePerHostMc[hostMc] =
                processTimes.reduce((sum, time) => sum + time, 0) / processTimes.length;
        }
    }

    console.log(averageProcessTimePerHostMc);
    















    // for(let homeMc in processTimeforeachApplicationInHomeMc) {
    //     let sum = 0;
    //     let count = 0;
    //     for(let time of processTimeforeachApplicationInHomeMc[homeMc]) {
    //         sum += time;
    //         count += 1;
    //     }
    //     homeMcProcessTime[homeMc] = sum/count;
    // }

    // for(let hostMc in processTimeforeachApplicationInHostMc) {
    //     let sum = 0;
    //     let count = 0;
    //     for(let time of processTimeforeachApplicationInHostMc[hostMc]) {
    //         sum += time;
    //         count += 1;
    //     }
    //     hostMcProcessTime[hostMc] = sum/count;
    // }

    const breakdownBasedOnSelections = {
        selectedHomeLcCount: homeLcCount[body.homeLc || ''] || 0,
        selectedHostLcCount: hostLcCount[body.hostLc || ''] || 0,
        selectedHomeMcCount: homeMcCount[body.homeMc || ''] || 0,
        selectedHostMcCount: hostMcCount[body.hostMc || ''] || 0,
    }

    const breakdown = {

        homeLcCount,
        homeMcs,

        averageProcessTimePerHomeMc,
        processTimeforeachApplicationInHomeMc,

        averageProcessTimePerHostMc,
        homeMcCount,
        hostLcCount,
        hostMcCount,
        homeLcPplCount,
        hostLcPplCount,
        homeRegionalCount,
        hostRegionalCount,
        breakdownBasedOnSelections,
        totalCount: applications.length,
        funnelCounts,
        homeMcApprovedCount,
        hostMcApprovedCount
    }




    return breakdown;

}

