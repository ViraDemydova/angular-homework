<#requires -version 3
  Also requires WebAdministration module
 
 History
  1.0 - First release
  1.1 - Added function that adds required links to the environment Path variable
      - Added missed gacing statements
  1.2 - Added SOAP and WCF IIS configuration
      - Added new database support
  1.3 - Added VS2013 support
#>

Set-ExecutionPolicy Unrestricted -Force

function Get-Batchfile ($file) {
    $cmd = "`"$file`" & set"
    cmd /c $cmd | Foreach-Object {
        $p, $v = $_.split('=')
        Set-Item -path env:$p -value $v
    }
}

function Set-VsVars32($vsYear) {
    $vsvars = "vsvars32.bat"

    switch ($vsYear) {
        2008 {$vstools = $env:VS90COMNTOOLS}
        2010 {$vstools = $env:VS100COMNTOOLS}
        2012 {$vstools = $env:VS110COMNTOOLS}
        2013 {$vstools = $env:VS120COMNTOOLS}
        2015 {$vstools = $env:VS140COMNTOOLS}
        2017 {
            $vstools = "C:\Program Files (x86)\Microsoft Visual Studio\2017\Professional\Common7\Tools\"
            $vsvars = "VsDevCmd.bat"
        }
    }

    $batchFile = [System.IO.Path]::Combine($vstools, $vsvars)
   
    Get-Batchfile -file $batchFile
   
    Write-Host -ForegroundColor 'Green' "VsVars has been loaded from: $batchFile"
}

#### Functions Used to add records to the host file ####

function UpdateHost() {
    Write-Host -ForegroundColor Green 'Adding records to the host file...'

    $hostFn = "${env:windir}\system32\drivers\etc\hosts"
    if (-not (Test-Path $hostFn)) {
        Throw "Hosts file not found: $hostFn"
    }

    $hostsByIp = @{}
    Get-Content -Path $hostFn | foreach {
        if ($_ -match '^\s*(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b((?:\s+\S+)+)') {
            $hosts = $matches[2] -split '\s+' | sort -Unique
            if ($hosts -is [string]) { $hosts = , $hosts }
            $hostsByIp[$matches[1]] = $hosts
        }
    }

    $hostsToAdd = @{
        '127.0.0.1'    = 'ipreo' 
        '172.31.6.181' = 'ny-corp-3494'
        '172.31.8.114' = 'msg41ny1us1'
        '172.31.8.108' = 'tfsny tfsny.ideal.corp.local'
        '172.31.8.113' = 'tfs41ny1us02 tfsreport'
        '172.31.8.55'  = 'echo.ideal.corp.local echo moss41ny1us01 moss41ny1us01.ideal.corp.local spny spny.ideal.corp.local'
        '10.17.244.10' = 'SQL30NY1US50 SQL30NY1US50.dev.com'
        '172.31.2.147' = 'web-eq.lab.ideal.corp.local'
        '172.31.6.66'  = 'mpgtc30ny1us01 mpgtc30ny1us01.dev.com'
        '172.31.8.188' = 'tc41ny1us02.ideal.corp.local tc41ny1us02 TeamCity'
        '172.31.5.121' = 'splunk-ny1.ideal.corp.local splunk-ny1 splunk'
    } 

    $hostsToAdd.Keys | foreach {
        $hosts = $hostsToAdd[$_] -split '[\s,;]+'
        if ($hosts -is [string]) { $hosts = , $hosts }

        if (-not ($hostsByIp[$_] -eq $null)) {
            $hosts = $hostsByIp[$_] + $hosts
        }

        $hosts = $hosts | sort -Unique
        if ($hosts -is [string]) { $hosts = , $hosts }
        $hostsByIp[$_] = $hosts | sort -Unique
    }

    $content = ''
    
    $hostsByIp.Keys | foreach {
        $hosts = $hostsByIp[$_]
        if ($hosts -isnot [string]) { $hosts = [string]::Join(' ', $hosts) }
        $pad = 13 - $_.Length
        $pad = New-Object string(' ', $pad)
        $content += "`n$_$pad$hosts"
    }

    $content = $content -replace '\n', "`r`n"

    Set-Content -Value $content -Path $hostFn -Force -Encoding ASCII

    Write-Host -ForegroundColor Green 'Host records added.'
}

function CreateProjectDir() {
    Write-Host -ForegroundColor Green 'Creating project directory...' 

    if (-not (Test-Path -Path $mainDir)) {
        New-Item -ItemType directory $mainDir
    }

    # create symlink C:\Projects <<===>> D:\Projects
    $mainQual = Split-Path -Path $mainDir -Qualifier
    $mainRootDir = $mainDir.Split("\")[1]
    if (-not("C:" -eq $mainQual) -and -not(Test-Path -Path "C:\$mainRootDir")) {       
        cmd /c MKLINK /d "C:\$mainRootDir" "$mainQual\$mainRootDir"
    }

    Write-Host -ForegroundColor Green 'Project directory created.'
}

function GACRequiredDlls() {
    Write-Host -ForegroundColor Green 'GACing required dlls...'
    Write-Host -ForegroundColor Yellow 'Note: that current version of GACRequiredDlls method does not gac all required Dlls, so please modify it to gac all the res :)'

    $dlls = @(
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\MVC\4.0.30506.0\System.Web.Mvc.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\Optimization\1.1.0\System.Web.Optimization.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\Razor\2.0.20710.0\System.Web.Razor.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\WebPages\2.0.20710.0\System.Web.Helpers.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\WebPages\2.0.20710.0\System.Web.WebPages.Deployment.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\WebPages\2.0.20710.0\System.Web.WebPages.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\ASP.NET\WebPages\2.0.20710.0\System.Web.WebPages.Razor.dll",

        "$ipreoDir\IPIC\Main\Bin\GAC\Common\Interop.TOKENSERVICES_BUSLib.dll",
        "$ipreoDir\IPIC\Main\Bin\GAC\Common\Interop.SECURETOKENS_UTLLib.dll",

        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\2.0\Log4Net\1.2.10.0\log4net.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\Telerik\2013.3.1114.40\Telerik.Web.UI.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\Kendo\Mvc3\Q2 2013\Kendo.Mvc.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\dotless\1.4.0.0\dotless.Core.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\System.Web.Optimization.Less\1.3\System.Web.Optimization.Less.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\WebGrease\1.6\WebGrease.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\Telerik\2013.1.220.40\Telerik.Web.UI.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\2.0\AjaxControlToolkit\3.0.30512.1\AjaxControlToolkit.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\2.0\RadControls\2007.Q3.SP1\RadEditor.Net2.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\2.0\RadControls\2007.Q3.SP1\RadGrid.Net2.dll",
        "C:\Program Files (x86)\Microsoft SDKs\Silverlight\v5.0\Libraries\Client\System.Json.dll",
        "$ipreoDir\Common\Ipreo Common ThirdParty\Components\4.0\AntiXss\4.2\AntiXSSLibrary40.dll"
    )

    for ($i = 0; $i -le $dlls.Length – 1; $i++) {
        Write-Host $dlls[$i]
        gacutil -i $dlls[$i]
    }

    Write-Host -ForegroundColor Green 'Dlls are gaced'
}

function GetPlainTextPassowrd($secureString) {
    $BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($secureString)
    return [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)
}

function GetSources() {
    Write-Host -ForegroundColor Green 'Getting sources...'

    $tfsLogin = Read-Host "Enter your TFS Login: IDEALCORP\"
    $tfsPassword = Read-Host -assecurestring "Password"
    Write-Host 'Adding TFS credentials...'
    
    $plainPassword = GetPlainTextPassowrd $tfsPassword
    CMDKEY -add:$tfsHost -user:"IDEALCORP\$tfsLogin" -pass:$plainPassword

    Write-Host 'Creating TFS workspace...'
    #tf workspace -delete -noprompt IPREO
    $worksspaceName = 'IPREO-' + $env:COMPUTERNAME
    tf workspace -new -noprompt -computer:$env:COMPUTERNAME -collection:$tfsUrl/ProjectCollection $worksspaceName
    tf workfold -map -workspace:$worksspaceName $/ $ipreoDir

    Write-Host 'Getting IPIC/Main from TFS...'
    tf get $ipreoDir/IPIC/Main -recursive -noprompt -force
    Write-Host;
    Write-Host;

    Write-Host 'Getting "Common\Ipreo Common ThirdParty\Components" from TFS...'
    $thirdpartyDir = $ipreoDir + '/Common/Ipreo Common ThirdParty/Components'
    tf get $thirdpartyDir -recursive -noprompt -force
    Write-Host;
    Write-Host;
}

function CopyPhxDir() {
    Write-Host -ForegroundColor Green 'Copying phoenix dir...'

    $phxDir = "${env:ProgramFiles(x86)}\I-Deal\Phoenix"
    if (-not (Test-Path -Path $phxDir)) {
        New-Item -ItemType directory $phxDir
    }

    Copy-Item $ipreoDir\IPIC\Deployment\LocalEnv\Phoenix\* $phxDir -Recurse -Force

    Write-Host -ForegroundColor Green 'Phoenix dir was copied'
}

function CopyDbpolicy() {
    Write-Host -ForegroundColor Green 'Copy dbpolicy.xml'

    if (-not (Test-Path -Path "$ipreoDir\config")) {
        New-Item -ItemType directory "$ipreoDir\config"
    }

    Copy-Item dbpolicy.xml "$ipreoDir\config" -Recurse -Force
    
    Write-Host -ForegroundColor Green 'dbpolicy.xml copied'
}

function AddRegistryKey() {
    if (-not (Test-Path -Path "hklm:\software\i-Deal")) {
        New-Item "hklm:\software\i-Deal"
    }

    if (-not (Test-Path -Path "hklm:\software\i-Deal\Configuration")) {
        New-Item "hklm:\software\i-Deal\Configuration" -Value "$ipreoDir\config"
    }
	
    if (-not (Test-Path -Path "hklm:\software\Wow6432Node")) {
        New-Item "hklm:\software\Wow6432Node"
    }

    if (-not (Test-Path -Path "hklm:\software\Wow6432Node\i-Deal")) {
        New-Item "hklm:\software\Wow6432Node\i-Deal"
    }

    if (-not (Test-Path -Path "hklm:\software\Wow6432Node\i-Deal\Configuration")) {
        New-Item "hklm:\software\Wow6432Node\i-Deal\Configuration" -Value "$ipreoDir\config"
    }
}

function CopyFileStreamerPolicy() {
    Write-Host -ForegroundColor Green 'Copy FileStreamerPolicy.xml'

    if (-not (Test-Path -Path "$ipreoDir\config")) {
        New-Item -ItemType directory "$ipreoDir\config"
    }
    
    Copy-Item FileStreamerPolicy.xml "$ipreoDir\config" -Recurse -Force

    Write-Host -ForegroundColor Green 'FileStreamerPolicy.xml copied'
}

function SetUpAppPool {
    param (            
        [parameter(Mandatory = $true, Position = 1)] $poolName,
        [parameter(Mandatory = $true, Position = 2)] $identityType, 
        [parameter(Mandatory = $true, Position = 3)] $userName, 
        [parameter(Mandatory = $false, Position = 4)] $userPassword
    )

    $path = "IIS:\AppPools\$poolName"
    if (Test-Path $path) {
        Remove-Item $path -Recurse
    }

    New-Item $path

    Set-ItemProperty -Path $path -Name managedRuntimeVersion -Value 'v4.0'
    Set-ItemProperty -Path $path -Name enable32BitAppOnWin64 -Value 'true'
    Set-ItemProperty -Path $path -Name processModel.userName -Value $userName
    Set-ItemProperty -Path $path -Name processModel.password -Value $userPassword
    Set-ItemProperty -Path $path -Name processModel.identityType -Value $identityType
}

function SetUpIIS() {
    if (-not(Get-Service W3SVC)) {
        Write-Host -ForegroundColor Red "Please install IIS first"
        Write-Host "Press any key to continue ..."
        $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        SetUpIIS
    }

    Import-Module WebAdministration

    $options = @()
    @('LocalService', 'LocalSystem', 'NetworkService', 'ApplicationPoolIdentity', "$env:USERNAME@epam.com") | foreach {
        $opt = New-Object System.Management.Automation.Host.ChoiceDescription "&$_", "AppPool Identity $_"
        $options += $opt
    }
   
    $identityIdx = $host.ui.PromptForChoice("AppPool Identity", "Select the Web Applications AppPool identity", [System.Management.Automation.Host.ChoiceDescription[]]$options, 0) 
    if ($identityIdx -eq $null) {
        return
    }

    $userName = $options[$identityIdx].Label.TrimStart("&")
    if ($identityIdx -eq ($options.Length - 1)) {
        $userPassword = Read-host -assecurestring "Password"
        $userPassword = GetPlainTextPassowrd $userPassword
        $identityType = 3
    }
    else {
        $identityType = $userName
        $userPassword = ""
    }
    
    SetUpAppPool 'Phoenix' $identityType $userName $userPassword
    SetUpAppPool 'SOAPServices' $identityType $userName $userPassword

    if (Test-Path IIS:\Sites\Phoenix) {
        Remove-Item IIS:\Sites\Phoenix -Recurse
    }
    New-Item IIS:\Sites\Phoenix -bindings @(@{protocol = "http"; bindingInformation = ":8080:"}, @{protocol = "http"; bindingInformation = ":80:ipreo"}) -physicalPath "${env:ProgramFiles(x86)}\I-Deal\Phoenix\WWW"
    Set-ItemProperty IIS:\Sites\Phoenix -name applicationPool -value Phoenix

    New-Item IIS:\Sites\Phoenix\IP -physicalPath $webDir -type Application
    Set-ItemProperty IIS:\Sites\Phoenix\IP -name applicationPool -value Phoenix

    #Setting up WCF services
    New-WebApplication -Name IpServices -Site 'Phoenix\IP' -PhysicalPath "$mainDir\Web\Site\iDealiPlannerService"
    Set-ItemProperty IIS:\Sites\Phoenix\IP\IpServices -name applicationPool -value Phoenix

    #Setting up SOAP(asmx) services
    if (Test-Path IIS:\Sites\SOAPServices) {
        Remove-Item IIS:\Sites\SOAPServices -Recurse
    }
    New-Item IIS:\Sites\SOAPServices -bindings @{protocol = "http"; bindingInformation = ":83:"} -physicalPath "$mainDir\Web\Site\iDealiPlannerWebService"
    Set-ItemProperty IIS:\Sites\SOAPServices -name applicationPool -value SOAPServices
}

function SetPathVariable() {
    $path = (Get-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment' -Name PATH).Path
    $path = $path.Trim(';').Split(";")

    $path += @(
        "${env:ProgramFiles(x86)}\Java\jre7\bin\",
        "${env:ProgramFiles(x86)}\Microsoft SDKs\Windows\v8.1A\bin\NETFX 4.5.1 Tools\"
    ) | where { $path -inotcontains $_ }

    $path = $path | sort -Unique
    $path = [string]::Join(';', $path)

    Set-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment' -Name PATH –Value $path
}

function RegisterNugetSource() {
    .\nuget sources Add -Name IpreoArtifactory -Source https://ipreo.jfrog.io/ipreo/api/nuget/nuget
    .\nuget sources update -Name IpreoArtifactory -User events-ci -pass AKCp2VpEUknhEUaZ2ssRzKNcuWAAdVAmiyt7Nmc1teH2QvkBb2APoB6ByFXCGyHubzQ766s4r

    .\nuget sources Add -Name IpreoPowerShell -Source https://ipreo.jfrog.io/ipreo/api/nuget/powershell-gallery
    .\nuget sources update -Name IpreoPowerShell -User events-ci -pass AKCp2VpEUknhEUaZ2ssRzKNcuWAAdVAmiyt7Nmc1teH2QvkBb2APoB6ByFXCGyHubzQ766s4r
    .\nuget setapikey events-ci:AKCp2VpEUknhEUaZ2ssRzKNcuWAAdVAmiyt7Nmc1teH2QvkBb2APoB6ByFXCGyHubzQ766s4r -Source IpreoPowerShell
}

#### SET VS2017 Command prompt ####
Write-Host "try to setup for Visual Studio 2017" -ForegroundColor Red
Write-Host "if other version installation required, please change line 367 deploy.ps1 script" -ForegroundColor Red
Set-VsVars32 2017

# choose drive
$options = @()
Get-PSDrive -PSProvider FileSystem | Foreach-Object {
    $n = $_.Name
    $f = [math]::truncate($_.Free / 1GB)
    $opt = New-Object System.Management.Automation.Host.ChoiceDescription "&$n", "Drive $n`: (free $f GB)"
    $options += $opt
}

$projDrive = $host.ui.PromptForChoice("Projects Directory Drive", "Select the Projects directory drive", [System.Management.Automation.Host.ChoiceDescription[]]$options, 0) 
if ($projDrive -eq $null) {
    return
}

$projDrive = $options[$projDrive].Label.TrimStart("&")

$projectDir = "$projDrive`:\Projects"
$ipreoDir = "$projectDir\IPREO"
$mainDir = "$ipreoDir\Events"
$webDir = "$mainDir\Web\Site\iDealiPlannerWeb"
$tfsHost = 'tfsny'
$tfsUrl = 'http://' + $tfsHost + ':8080/tfs'

UpdateHost

SetPathVariable

CopyPhxDir

CopyDbpolicy

CopyFileStreamerPolicy

AddRegistryKey


GACRequiredDlls

SetUpIIS

RegisterNugetSource
