function report_print(hidControlNm)
{
document.all(hidControlNm).style.visibility = 'hidden';
print();
document.all(hidControlNm).style.visibility = 'visible';
}
