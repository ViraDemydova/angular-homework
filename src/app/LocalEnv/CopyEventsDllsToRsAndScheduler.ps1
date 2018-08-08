$sourceFolder = 'C:\Projects\IPREO\IPIC\Main\Bin'

$rsBinFolder = 'C:\Program Files\Microsoft SQL Server\MSRS11.IP\Reporting Services\ReportServer\bin'
$rsBinFolder32 = 'C:\Program Files (x86)\Microsoft SQL Server\MSRS11.IP\Reporting Services\ReportServer\bin'
$reportServiceName = 'ReportServer$IP'

$davosSchedulerFolder = 'C:\Program Files\Ipreo\Davos.Reporting.IP'
$davosSchedulerServiceName = 'DavosScheduler_IP'

$vsFolder12 = 'C:\Program Files (x86)\Microsoft Visual Studio 11.0\Common7\IDE\PrivateAssemblies'
$vsFolder15 = 'C:\Program Files (x86)\Microsoft Visual Studio 14.0\Common7\IDE\PrivateAssemblies'

if (((Test-Path $rsBinFolder) -or (Test-Path $rsBinFolder32)) -and (Get-Service -Name $reportServiceName -ErrorAction SilentlyContinue)) {
    Stop-Service $reportServiceName -Verbose

    if (Test-Path $rsBinFolder) {
        Write-Host 'Copying dlls to RS bin folder...' -ForegroundColor Green
        Robocopy $sourceFolder $rsBinFolder iDeal.iPlanner.Business.Report.dll iDeal.iPlanner.Business.Report.Principal.dll /NFL /NDL /NJH /NJS /nc /ns /np
    }
    else {
        Write-Host 'Copying dlls to RS bin folder...' -ForegroundColor Green
        Robocopy $sourceFolder $rsBinFolder32 iDeal.iPlanner.Business.Report.dll iDeal.iPlanner.Business.Report.Principal.dll /NFL /NDL /NJH /NJS /nc /ns /np       
    }

    Start-Service $reportServiceName -Verbose
}

if ((Test-Path $davosSchedulerFolder) -and (Get-Service -Name $davosSchedulerServiceName -ErrorAction SilentlyContinue)) {
    Stop-Service $davosSchedulerServiceName -Verbose

    Write-Host 'Copying dlls to Davos Scheduler folder...' -ForegroundColor Green
    Robocopy $sourceFolder $davosSchedulerFolder iDeal.iPlanner.Business.Report.dll iDeal.iPlanner.Business.Report.Principal.dll /NFL /NDL /NJH /NJS /nc /ns /np

    Start-Service $davosSchedulerServiceName -Verbose
}

if (Test-Path $vsFolder12) {
    Write-Host 'Copying dlls to VS 12 private assemblies folder...' -ForegroundColor Green
    Robocopy $sourceFolder $vsFolder12 iDeal.iPlanner.Business.Report.dll /NFL /NDL /NJH /NJS /nc /ns /np
}

if (Test-Path $vsFolder15) {
    Write-Host 'Copying dlls to VS 15 private assemblies folder...' -ForegroundColor Green
    Robocopy $sourceFolder $vsFolder15 iDeal.iPlanner.Business.Report.dll /NFL /NDL /NJH /NJS /nc /ns /np
}
