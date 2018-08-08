Param(
    [Parameter(Mandatory = $true)]
    [bool]$UpdatedMode = $false
)

$eventsRootPath = 'C:\Projects\IPREO\IPIC\Main'
$reportServerIpFullPath = 'C:\Program Files\Microsoft SQL Server\MSRS11.IP' # compare with your local RS path
$davosSchedulerRootPath = 'C:\Program Files\Ipreo\Davos.Reporting.IP' # davos scheduler destination folder, will be created automaticalli if doesn't exists

$Environment = "DEV" # please use DEV_NY for NY boxes

$ReportServiceName = 'ReportServer$IP'
$DavosServiceName = 'DavosScheduler_IP'

$IPProfileBuilderLibrary_ConnectionString = '{SHOULD BE REPLACED WITH CORRECT CONNECTION}' # name of IPProfileBuilderLibrary database

function Unzip {
    param([string]$zipfile, [string]$outpath)

    [System.IO.Compression.ZipFile]::ExtractToDirectory($zipfile, $outpath)
}

function Test-EventLog {
    Param(
        [Parameter(Mandatory = $true)]
        [string] $LogName
    )

    [System.Diagnostics.EventLog]::SourceExists($LogName)
}

function AddIfNotExistEventLog {
    Param(
        [Parameter(Mandatory = $true)]
        [string] $LogName
    )

    if (-Not (Test-EventLog($LogName) -ErrorAction SilentlyContinue)) {
        Write-Host "Adding new event source: $LogName" -ForegroundColor Green
        New-EventLog -LogName Application -Source $LogName
    }
}

function RenameWithBackup {
    Param(
        [Parameter(Mandatory = $true)]
        [string] $PathToFile
    )

    if (Test-Path $PathToFile) {
        $file = Get-ChildItem $PathToFile
        $backupFileNameWithExtenshion = '{0}_backup {1}{2}' -f $file.BaseName, $(get-date -f yyyy-MM-dd), $file.Extension
        Rename-Item $PathToFile $backupFileNameWithExtenshion
    }
}

function ReplaceDbPolicyConnectionString {
    Param(
        [Parameter(Mandatory = $true)]
        [string] $PolicyName,

        [Parameter(Mandatory = $true)]
        [string] $ConnectionString
    )

    $dbPolicyPaths = @(
        "$eventsRootPath\Web\Site\iDealiPlannerWeb\dbpolicy.xml",
        "$davosSchedulerRootPath\dbpolicy.xml",
        "$reportServerIpFullPath\Reporting Services\ReportServer\dbpolicy.xml"
    )

    foreach ($dbPolicy in $dbPolicyPaths) {
        [xml] $xml = Get-Content -Path $dbPolicy

        $nodeToReplace = $xml.SelectSingleNode("//phxDatabasePolicies/policy[@name='$PolicyName']/connections/connection")
        if (!$nodeToReplace) { 
            continue
        }

        $nodeToReplace.InnerText = $ConnectionString
        $xml.Save($dbPolicy)
    }
}

function Copy-IISSources {
    if ($UpdatedMode -eq $true) {
        Write-Host "Delete IIS sources..." -ForegroundColor Green

        Remove-Item $eventsRootPath\Web\Site\iDealiPlannerWeb\Analyzer\* -Recurse -Force
        Remove-Item $eventsRootPath\Web\Site\iDealiPlannerWeb\bin\* -Include Aspose.*.dll, iDeal.Davos.*.dll, Ipreo.Auth.*.dll, Ipreo.Davos.*.dll, Ipreo.MPG.*.dll, Ipreo.ProfileBuilder.*.dll, Ipreo.Radiant.*.dll, *Davos*.dll, Rad*Net2.dll, Infragistics.*.dll -Force

        Remove-Item $eventsRootPath\Web\Site\iDealiPlannerWeb\ClientBin\* -Include iDeal.Davos.*.xap, Ipreo.Davos.*.xap, Ipreo.ProfileBuilder.*.xap -Force
        Remove-Item $eventsRootPath\Web\Site\iDealiPlannerWeb\DavosOAuth\* -Recurse -Force
        Remove-Item $eventsRootPath\Web\Site\iDealiPlannerWeb\DavosWebService\* -Recurse -Force
    }

    Write-Host "Copy IIS sources..." -ForegroundColor Green

    if (-Not (Test-Path $folderFullPath\events.iis.zip)) {
        Write-Host "File doesn't exist: $folderFullPath\events.iis.zip"
        return
    }

    if (-Not (Test-Path $folderFullPath\events.mte.iis.configuration.zip)) {
        Write-Host "File doesn't exist: $folderFullPath\events.mte.iis.configuration.zip"
        return
    }

    Write-Host "Unzipping '$folderFullPath\events.iis.zip' to '$folderFullPath\events.iis'..." -ForegroundColor Green
    Unzip $folderFullPath\events.iis.zip $folderFullPath\events.iis
    
    Write-Host "Unzipping '$folderFullPath\events.mte.iis.configuration.zip' to '$folderFullPath\events.iis.configuration'..." -ForegroundColor Green
    Unzip $folderFullPath\events.mte.iis.configuration.zip $folderFullPath\events.iis.configuration
    
    Robocopy.exe .\events.iis\i-Deal\Phoenix\WWW\IP\Analyzer $eventsRootPath\Web\Site\iDealiPlannerWeb\Analyzer /e
    Robocopy.exe .\events.iis\i-Deal\Phoenix\WWW\IP\bin $eventsRootPath\Web\Site\iDealiPlannerWeb\bin Aspose.*.dll iDeal.Davos.*.dll Ipreo.Auth.*.dll Ipreo.Davos.*.dll Ipreo.MPG.*.dll Ipreo.ProfileBuilder.*.dll Ipreo.Radiant.*.dll *Davos*.dll Rad*Net2.dll Infragistics.*.dll
    
    Robocopy.exe .\events.iis\i-Deal\Phoenix\WWW\IP\ClientBin $eventsRootPath\Web\Site\iDealiPlannerWeb\ClientBin /e
    Robocopy.exe .\events.iis\i-Deal\Phoenix\WWW\IP\DavosOAuth $eventsRootPath\Web\Site\iDealiPlannerWeb\DavosOAuth /e
    Robocopy.exe .\events.iis\i-Deal\Phoenix\WWW\IP\DavosWebService $eventsRootPath\Web\Site\iDealiPlannerWeb\DavosWebService /e

    Robocopy.exe ".\events.iis.configuration\$Environment\DavosAnalyzer\Program Files\I-Deal\Phoenix\WWW\IP\Analyzer" $eventsRootPath\Web\Site\iDealiPlannerWeb\Analyzer
    Robocopy.exe ".\events.iis.configuration\$Environment\DavosLogger\Program Files\I-Deal\Phoenix\WWW\IP\Analyzer" $eventsRootPath\Web\Site\iDealiPlannerWeb\Analyzer

    RenameWithBackup -PathToFile "$eventsRootPath\Web\Site\iDealiPlannerWeb\dbpolicy.xml"
    Robocopy.exe ".\events.iis.configuration\$Environment\DbPolicy\Program Files\I-Deal\Phoenix\WWW\IP" $eventsRootPath\Web\Site\iDealiPlannerWeb

	Robocopy.exe ".\events.iis.configuration\$Environment\NLog\Program Files\I-Deal\Phoenix\WWW\IP" $eventsRootPath\Web\Site\iDealiPlannerWeb
}

function Copy-RPTSources {
    if ($UpdatedMode -eq $true) {
        Write-Host "Delete RPT sources..." -ForegroundColor Green

        Remove-Item "$reportServerIpFullPath\Reporting Services\ReportServer\bin\*" -Include Aspose.*.lic, Aspose.*.dll, iDeal.Davos.*.dll, Ipreo.Auth.*.dll, Ipreo.Davos.*.dll, Ipreo.MPG.*.dll, Ipreo.OAuth.*.dll, Ipreo.OAuth2.*.dll, Ipreo.Radiant.*.dll -Force
        Remove-Item $davosSchedulerRootPath\* -Include Aspose.*.dll, DavosScheduler.exe, iDeal.Davos.*.dll, Ipreo.Auth.*.dll, Ipreo.Davos.*.dll, Ipreo.MPG.*.dll, Ipreo.OAuth.*.dll, Ipreo.OAuth2.*.dll, Ipreo.Radiant.*.dll -Force
    }

    Write-Host "Copy RPT sources..." -ForegroundColor Green

    if (-Not (Test-Path $folderFullPath\events.rpt.zip)) {
        Write-Host "File doesn't exist: $folderFullPath\events.rpt.zip"
        return
    }

    if (-Not (Test-Path $folderFullPath\events.mte.rpt.configuration.zip)) {
        Write-Host "File doesn't exist: $folderFullPath\events.mte.rpt.configuration.zip"
        return
    }

    Write-Host "Unzipping '$folderFullPath\events.rpt.zip' to '$folderFullPath\events.rpt'..." -ForegroundColor Green
    Unzip $folderFullPath\events.rpt.zip $folderFullPath\events.rpt

    Write-Host "Unzipping '$folderFullPath\events.mte.rpt.configuration.zip' to '$folderFullPath\events.rpt.configuration'..." -ForegroundColor Green
    Unzip $folderFullPath\events.mte.rpt.configuration.zip $folderFullPath\events.rpt.configuration

    Robocopy.exe ".\events.rpt\MSSQL\MSRS11.IP\Reporting Services\ReportServer\bin" "$reportServerIpFullPath\Reporting Services\ReportServer\bin" /e
    Robocopy.exe ".\events.rpt\Program Files\Ipreo\Davos.Reporting.IP" $davosSchedulerRootPath /e

    Robocopy.exe ".\events.rpt.configuration\$Environment\DavosScheduler\AsyncReport_localhost\Program Files\Ipreo\Davos.Reporting.IP" $davosSchedulerRootPath

    RenameWithBackup -PathToFile "$davosSchedulerRootPath\dbpolicy.xml"
    Robocopy.exe ".\events.rpt.configuration\$Environment\RsDbPolicy\Program Files\Ipreo\Davos.Reporting.IP" $davosSchedulerRootPath

    Robocopy.exe ".\events.rpt.configuration\$Environment\DavosScheduler\DavosScheduler\Program Files\Ipreo\Davos.Reporting.IP" $davosSchedulerRootPath
    Robocopy.exe ".\events.iis\i-Deal\iPlanner System\Bin" $davosSchedulerRootPath iDeal.iPlanner.Business.Entity.dll

	Robocopy.exe ".\events.rpt.configuration\$Environment\NLog\Program Files\Ipreo\Davos.Reporting.IP" $davosSchedulerRootPath

    RenameWithBackup -PathToFile "$reportServerIpFullPath\Reporting Services\ReportServer\dbpolicy.xml"
    Robocopy.exe ".\events.rpt.configuration\$Environment\RsDbPolicy\MSSQL\MSRS11.IP\Reporting Services\ReportServer" "$reportServerIpFullPath\Reporting Services\ReportServer"

    Robocopy.exe ".\events.iis\i-Deal\iPlanner System\Bin" "$reportServerIpFullPath\Reporting Services\ReportServer" iDeal.iPlanner.Business.Entity.dll

    RenameWithBackup -PathToFile "$reportServerIpFullPath\Reporting Services\ReportServer\web.config"
    Robocopy.exe ".\events.rpt.configuration\$Environment\SSRS\RsWeb\MSSQL\MSRS11.IP\Reporting Services\ReportServer" "$reportServerIpFullPath\Reporting Services\ReportServer"

	Robocopy.exe ".\events.rpt.configuration\$Environment\NLog\MSSQL\MSRS11.IP\Reporting Services\ReportServer" "$reportServerIpFullPath\Reporting Services\ReportServer"

    [xml] $rsReportServerConfig = Get-Content -Path "$reportServerIpFullPath\Reporting Services\ReportServer\rsreportserver.config"
    $rsDsn = $rsReportServerConfig.configuration.Dsn
    $rsInstallationID = $rsReportServerConfig.configuration.InstallationID
    $rsInstanceId = $rsReportServerConfig.configuration.InstanceId

    RenameWithBackup -PathToFile "$reportServerIpFullPath\Reporting Services\ReportServer\rsreportserver.config"
    Robocopy.exe ".\events.rpt.configuration\$Environment\SSRS\RsReportServer_localhost\MSSQL\MSRS11.IP\Reporting Services\ReportServer" "$reportServerIpFullPath\Reporting Services\ReportServer"

    [xml] $rsReportServerToReplaceConfig = Get-Content -Path "$reportServerIpFullPath\Reporting Services\ReportServer\rsreportserver.config"
    $rsReportServerToReplaceConfig.SelectSingleNode("//Configuration/Dsn").InnerText = $rsDsn
    $rsReportServerToReplaceConfig.SelectSingleNode("//Configuration/InstallationID").InnerText = $rsInstallationID
    $rsReportServerToReplaceConfig.SelectSingleNode("//Configuration/InstanceId").InnerText = $rsInstanceId
    $rsReportServerToReplaceConfig.Save("$reportServerIpFullPath\Reporting Services\ReportServer\rsreportserver.config")
}

function Start-DscForDavosScheduler {
    configuration DavosSchedulerService {
        Import-DscResource -Module PSDesiredStateConfiguration
            
        Node $env:Computername { 
            Service DavosSchedulerForIp {
                Name           = $DavosServiceName
                Path           = "$davosSchedulerRootPath\DavosScheduler.exe"
                DisplayName    = "Ipreo Davos Scheduler for 'IP'"
                StartupType    = "Automatic"
                State          = "Running"
                BuiltInAccount = "NetworkService"
                Ensure         = "Present"
            }
        
        } 
    }

    DavosSchedulerService -outputPath .\DavosSchedulerService
    Start-DscConfiguration -Path .\DavosSchedulerService -wait -force -Verbose -ComputerName $env:Computername    
}

function Register-DavosSchedulerService {
    AddIfNotExistEventLog -LogName "Scheduler Davos for IP"
    AddIfNotExistEventLog -LogName "Scheduler Radiant for IP"
    
    if (-Not (Get-Service -Name $DavosServiceName -ErrorAction SilentlyContinue)) {
        Start-DscForDavosScheduler
    }
}

function Add-MissedEventLogs {
    AddIfNotExistEventLog -LogName "SSRS Davos for IP"
    AddIfNotExistEventLog -LogName "SSRS Radiant for IP"
    AddIfNotExistEventLog -LogName "i-Planner Application (Davos)"
    AddIfNotExistEventLog -LogName "i-Planner Application (Radiant)"
    AddIfNotExistEventLog -LogName "i-Planner DavosWebService"
    AddIfNotExistEventLog -LogName "i-Planner DavosOAuth"
}

function Init {
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    
    if ((Get-Service -Name $DavosServiceName -ErrorAction SilentlyContinue)) {
        Stop-Service -Name $DavosServiceName
    }

    Start-Service -Name "WinRM"
    Stop-Service -Name $ReportServiceName
}

$folderFullPath = $PSScriptRoot
Write-Host "PSScriptRoot path: $folderFullPath"

Init
Copy-IISSources
Copy-RPTSources
ReplaceDbPolicyConnectionString -PolicyName 'IPProfileBuilderLibrary' -ConnectionString $IPProfileBuilderLibrary_ConnectionString

Register-DavosSchedulerService
Add-MissedEventLogs

Start-Service -Name $ReportServiceName
Start-Service -Name $DavosServiceName
iisreset.exe
