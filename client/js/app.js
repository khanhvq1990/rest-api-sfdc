function getCapmaignList(success, error) {
    var soql = "SELECT id, Name FROM Campaign";
    force.query(soql, success, error);
}

function getCampaignDetails(campaignId, success, error) {
	
    var soql = "SELECT Name, Type, NumberOfLeads, NumberOfContacts FROM Campaign WHERE Id='" + campaignId + "'";
    force.query(soql, success, error);
}

function getCampaignMembers(campaignId, success, error) {
    var soql = "SELECT Contact.Email, Lead.Email FROM CampaignMember WHERE CampaignId='" + campaignId + "' and Contact.Email <> ''";
    force.query(soql, success, error);
}

function showCampaignList() {
	console.log('##############################');
    getCapmaignList(
        function (data) {
            var campaigns= data.records,
                html = '';
            for (var i=0; i<campaigns.length; i++) {
                html += '<li class="table-view-cell"><a href="#campaign/'+ campaigns[i].Id +'">' + campaigns[i].Name + '</a></li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                    '<h1 class="title">Campaigns</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view campaign-list">' + html + '</ul>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showCampaignDetails(campaignId) {

    getCampaignDetails(campaignId,
        function (data) {
            var campaign= data.records[0],
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
                '<a class="btn btn-link btn-nav pull-right" href="#campaignmembers/' + campaignId +'"><span class="icon icon-right-nav"></span>Show Members</a>' +
            '<h1 class="title">Selected Campaign</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<div class="card">' +
                        '<ul class="table-view">' +
                            '<li class="table-view-cell">' +
                                '<h4>' + campaign.Name + '</h4>' +
                            '</li>' +
                            '<li class="table-view-cell">キャンペーン種別: ' +
                                campaign.Type +
                            '</li>' +
                            '<!--<li class="table-view-cell">リード数: ' +
                                campaign.NumberOfLeads +
                            '</li>-->' +
                            '<li class="table-view-cell">担当者数: ' +
                                campaign.NumberOfContacts +
                            '</li>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
                '</div>';
            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

function showCampaignMembers(campaignId) {

    getCampaignMembers(campaignId,
        function (data) {
            var cMembers= data.records,
            html = "";
            for (var i=0; i<cMembers.length; i++) {
                html += '<li class="table-view-cell">' + cMembers[i].Contact.Email+ '</li>';
            }
            html =
                '<div class="page">' +
                '<header class="bar bar-nav">' +
                '<a class="btn btn-link btn-nav pull-left" href="#"><span class="icon icon-left-nav"></span>Back</a>' +
                '<a class="btn btn-link btn-nav pull-right" href="#sendContacts/' + campaignId +'"><span class="icon icon-right-nav"></span>Send Contacts Mail</a>' +
                    '<h1 class="title">Contacts Mail</h1>' +
                '</header>' +
                '<div class="content">' +
                    '<ul class="table-view campaign-list">' + html + '</ul>' +
                '</div>' +
                '</div>';

            slider.slidePage($(html));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}

var slider = new PageSlider($('body')); // Initialize PageSlider micro-library for nice and hardware-accelerated page transitions
router.addRoute('', showCampaignList);
router.addRoute('campaign/:id', showCampaignDetails);
router.addRoute('campaignmembers/:id', showCampaignMembers);
