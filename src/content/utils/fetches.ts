export const fetchProductInfo = async (productId: string) => {
    
    try{
        const url = `https://online.ctrip.com/restapi/soa2/12447/ProductDetailTimingV5`;
        const body = {
            contentType: "json",
            head: {
                cid: "",
                ctok: "",
                cver: "1.0",
                lang: "01",
                sid: "8888",
                syscode: "09",
                auth: "",
                extension: []
            },
            ChannelCode: 0,
            ChannelId: 114,
            PlatformId: 4,
            Version: "856000",
            Locale: "zh-CN",
            Currency: "CNY",
            ProductId: productId,
            DepartureCityId: 2,
            QueryNode: {
                IsPriceInfo: true,
                IsScheduleInfo: true,
                IsTourGroupInfo: true,
                IsVendorInfo: true,
                IsTravelIntroductionInfo: true,
                IsCostInfoList: true,
                IsDescriptionInfo: true
            }
        }
        const response = await fetch(url, {
            "headers": {
              "accept": "*/*",
              "content-type": "application/json"
            },
            "body": JSON.stringify(body),
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
          });
        const data = await response.json();
        return {
            ...data,
            productId,
        };
    }catch(e){

    }
    return {
        productId,
    }
}