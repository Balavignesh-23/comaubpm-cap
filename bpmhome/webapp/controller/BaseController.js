sap.ui.define(["sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
], function (Controller, Fragment) {
    "use strict";

    return Controller.extend("com.dev.comau.bpmhome.controller.BaseController", {

        addCountryData: function() {
            var appId = this.getOwnerComponent().getManifestEntry("/sap.app/id");
            var appPath = appId.replaceAll(".", "/");
            var appModulePath = jQuery.sap.getModulePath(appPath);
            var url = appModulePath + "/getCountry";
            var that = this;
            jQuery.ajax({
                url:url,
                method:"GET",
                contentType: 'application/json',
                headers: {
                    "X-CSRF-Token": this.getOwnerComponent()._fetchToken(),
                },
                success: function(result) {
                    that.aCountryModel.setData(result);
                },
                error: function(e) {
                    // log error in browser
                    console.log("app history failed :" +e.message);
                    this.getView().setBusy(false);
                }
            });    
        }   

    });
})