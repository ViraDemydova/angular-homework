var bHTML30Plus = false;
var bHTML40Plus = false; 
var bIE = false;
var bNS = false;
function DetermineBrowser()
{
bIE = false;
var bIE3 = false, bIE4 = false, bIE4_beta = false;
var bIE4_01 = false, bIE5 = false;
bNS = false;
var bNS_2 = false, bNS_3 = false, bNS_4 = false;
var sBrowserInfo = navigator.userAgent;
var sBrowserName = navigator.appName;
var sBrowserVer;
bIE = (sBrowserInfo.indexOf("MSIE")>=1);
if (bIE)
{
bIE3 = (sBrowserInfo.indexOf("MSIE 3.") >= 1);
if(bIE3)
{
bHTML30Plus = true;
return(cmMSIE30);
}
var iMSIE4 = sBrowserInfo.indexOf("MSIE 4.");
bIE4 = (iMSIE4 >= 1);
if(bIE4)
{
bHTML40Plus = true;
var sMinorVer = sBrowserInfo.charAt(iMSIE4 + 8);
bIE4_beta = ((sMinorVer == "b") || (sMinorVer == "p"));
if (bIE4_beta)
{return(cmMSIE40beta)};
bIE4_01 = (sMinorVer == "1");
if (bIE4_01)
{return(cmMSIE40)};
return(cmNoBrowser);	
}
bIE5 = (sBrowserInfo.indexOf("MSIE 5.") >= 1);
if (bIE5)
{return(cmMSIE50)}; 
};
if (sBrowserName == "Netscape")
{
bNS = true;
sBrowserVer = parseInt(navigator.appVersion);
if (sBrowserVer >= 4)
{
bHTML40Plus = true;
return(cmNetNav40);
}
else 
{
if (sBrowserVer >= 3)
{
bHTML30Plus = true;
return(cmNetNav30);
}
else
{
return(cmNetNav20)
};
}
};
return(cmNoBrowser);
}
